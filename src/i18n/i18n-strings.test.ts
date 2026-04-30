import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { ui } from './ui';

const ROOT = new URL('../../', import.meta.url).pathname;
const SCAN_DIRS = ['src/components', 'src/pages', 'src/islands', 'src/layouts'];

// Files we accept won't be scanned (data modules, tests, generated, etc.).
const FILE_EXTENSIONS = ['.astro', '.tsx'];

// Forbidden literal substrings that indicate a hardcoded i18n string.
// Each entry: { needle, contexts } where contexts is the list of file globs allowed to contain it.
const FORBIDDEN: Array<{ needle: string; allowed?: RegExp[] }> = [
  { needle: 'Cambiar idioma' },
  { needle: 'Cambiar tema' },
  { needle: 'Cambiar a tema' },
  { needle: 'Desarrollador Frontend' },
  { needle: 'Perfil de' },
  { needle: 'Stack Tecnológico' },
  { needle: 'Volver a proyectos' },
  { needle: 'Cover de' },
  { needle: 'Cover of' },
  { needle: 'Demo de' },
  { needle: 'Repositorio de' },
  { needle: 'Stack de' },
  { needle: 'Ver Demo' },
  { needle: 'Ver Repositorio' },
  { needle: 'Construyendo experiencias' },
  { needle: 'Entregando soluciones' },
  { needle: 'Dominando tecnologías' },
  { needle: 'Cada línea de código' },
  { needle: '✨ Nuevo' },
  { needle: 'Back to projects' },
];

function walk(dir: string): string[] {
  const out: string[] = [];
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const entry of entries) {
    const p = join(dir, entry);
    const st = statSync(p);
    if (st.isDirectory()) {
      out.push(...walk(p));
    } else if (FILE_EXTENSIONS.some((ext) => p.endsWith(ext))) {
      out.push(p);
    }
  }
  return out;
}

function gatherFiles(): string[] {
  return SCAN_DIRS.flatMap((d) => walk(join(ROOT, d)));
}

describe('i18n: no hardcoded strings in components/pages', () => {
  const files = gatherFiles();

  it('scans at least one file', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  for (const { needle, allowed } of FORBIDDEN) {
    it(`forbids hardcoded "${needle}"`, () => {
      const offenders: string[] = [];
      for (const file of files) {
        const rel = relative(ROOT, file);
        if (allowed && allowed.some((rx) => rx.test(rel))) continue;
        const content = readFileSync(file, 'utf8');
        if (content.includes(needle)) offenders.push(rel);
      }
      expect(offenders, `Found "${needle}" in:\n${offenders.join('\n')}`).toEqual([]);
    });
  }
});

describe('i18n: required keys exist in both locales', () => {
  const REQUIRED_KEYS = [
    'language.change',
    'theme.toggle',
    'theme.toggle.toLight',
    'theme.toggle.toDark',
    'profile.photoAlt',
    'profile.badge',
    'projects.backToList',
    'projects.coverAlt',
    'projects.newBadge',
    'projects.stackTitle',
    'projects.stackOf',
    'projects.demoOf',
    'projects.repoOf',
    'projects.viewDemo',
    'projects.viewRepository',
    'about.stats.experience.subtitle',
    'about.stats.projects.subtitle',
    'about.stats.technologies.subtitle',
    'about.stats.passion.subtitle',
  ];

  for (const key of REQUIRED_KEYS) {
    it(`has key "${key}" in es and en`, () => {
      expect((ui.es as Record<string, string>)[key], `missing es.${key}`).toBeDefined();
      expect((ui.en as Record<string, string>)[key], `missing en.${key}`).toBeDefined();
    });
  }
});
