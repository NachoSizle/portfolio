import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const card = readFileSync(resolve(__dirname, './ProjectCard.astro'), 'utf8');

describe('GYM-117: ProjectCard tipos y seguridad', () => {
  it('no usa cast (t as any) en translateOrRaw', () => {
    expect(card).not.toMatch(/\(t\s+as\s+any\)/);
  });

  it('Props sigue tipado con CollectionEntry<"projects">', () => {
    expect(card).toMatch(/project:\s*CollectionEntry<['"]projects['"]>/);
  });

  it('no contiene "any" como tipo de project', () => {
    expect(card).not.toMatch(/project:\s*any/);
  });
});

describe('GYM-117: ProjectCard respeta prefers-reduced-motion', () => {
  it('declara un bloque @media (prefers-reduced-motion: reduce)', () => {
    expect(card).toMatch(/@media\s*\(\s*prefers-reduced-motion:\s*reduce\s*\)/);
  });

  it('desactiva las animaciones decorativas en reduced-motion', () => {
    // Aceptamos varias estrategias: animation: none, transition: none, etc.
    expect(card).toMatch(/animation:\s*none\s*!important/);
  });
});

describe('GYM-117: i18n completa', () => {
  it('usa t("projects.newBadge") (no hardcoded "Nuevo")', () => {
    expect(card).toMatch(/t\(\s*['"]projects\.newBadge['"]/);
  });

  it('usa t("projects.stackTitle") (no hardcoded)', () => {
    expect(card).toMatch(/t\(\s*['"]projects\.stackTitle['"]/);
  });
});
