import { describe, expect, it } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..', '..');

const PROJECT_DETAIL = resolve(ROOT, 'src/components/ProjectDetail.astro');
const SLUG_ES = resolve(ROOT, 'src/pages/projects/[slug].astro');
const SLUG_EN = resolve(ROOT, 'src/pages/en/projects/[slug].astro');

describe('GYM-96 · paridad ES/EN en /projects/[slug]', () => {
  it('existe el componente compartido ProjectDetail.astro', () => {
    expect(existsSync(PROJECT_DETAIL)).toBe(true);
  });

  it('ambas páginas delegan en ProjectDetail (wrapper ligero)', () => {
    const es = readFileSync(SLUG_ES, 'utf-8');
    const en = readFileSync(SLUG_EN, 'utf-8');

    // Importan el componente compartido
    expect(es).toMatch(/ProjectDetail/);
    expect(en).toMatch(/ProjectDetail/);

    // Wrapper ligero: ambas páginas pequeñas (<60 líneas)
    expect(es.split('\n').length).toBeLessThan(60);
    expect(en.split('\n').length).toBeLessThan(60);
  });

  it('ninguna página /[slug] tiene strings hardcoded en español/inglés', () => {
    const es = readFileSync(SLUG_ES, 'utf-8');
    const en = readFileSync(SLUG_EN, 'utf-8');
    const hardcodedES = /Volver a proyectos|Ver demo|Ver repositorio/i;
    const hardcodedEN = /Back to projects|View demo|View repository/i;
    expect(es).not.toMatch(hardcodedES);
    expect(es).not.toMatch(hardcodedEN);
    expect(en).not.toMatch(hardcodedES);
    expect(en).not.toMatch(hardcodedEN);
  });

  it('ProjectDetail.astro renderiza el body MDX vía <Content />', () => {
    const detail = readFileSync(PROJECT_DETAIL, 'utf-8');
    expect(detail).toMatch(/render\(project\)/);
    expect(detail).toMatch(/<Content\s*\/>/);
  });
});
