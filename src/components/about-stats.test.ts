import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { CAREER_START_YEAR, LANGUAGES, TECHNOLOGIES } from '../constants';

const root = resolve(__dirname, '..', '..');
const aboutSrc = readFileSync(resolve(root, 'src/components/AboutSection.astro'), 'utf-8');
const uiSrc = readFileSync(resolve(root, 'src/i18n/ui.ts'), 'utf-8');
const techOrbitSrc = readFileSync(resolve(root, 'src/components/TechOrbit.astro'), 'utf-8');

describe('PRF-13 · AboutSection stats verificables', () => {
  it('no contiene los números marketing-fluff hard-coded', () => {
    expect(aboutSrc).not.toMatch(/'10\+'/);
    expect(aboutSrc).not.toMatch(/'50\+'/);
    expect(aboutSrc).not.toMatch(/'15\+'/);
    expect(aboutSrc).not.toMatch(/'100%'/);
  });

  it('importa CAREER_START_YEAR, LANGUAGES y TECHNOLOGIES desde constants', () => {
    expect(aboutSrc).toMatch(/from\s+['"]\.\.\/constants['"]/);
    expect(aboutSrc).toMatch(/CAREER_START_YEAR/);
    expect(aboutSrc).toMatch(/LANGUAGES/);
    expect(aboutSrc).toMatch(/TECHNOLOGIES/);
  });

  it('cuenta proyectos mediante getCollection("projects")', () => {
    expect(aboutSrc).toMatch(/getCollection\(['"]projects['"]\)/);
  });

  it('calcula años de experiencia derivados de la fecha actual', () => {
    expect(aboutSrc).toMatch(/new Date\(\)\.getFullYear\(\)\s*-\s*CAREER_START_YEAR/);
  });
});

describe('PRF-13 · constants verificables', () => {
  it('CAREER_START_YEAR = 2015 (coherente con i18n subtitle)', () => {
    expect(CAREER_START_YEAR).toBe(2015);
    expect(uiSrc).toContain('desde 2015');
    expect(uiSrc).toContain('since 2015');
  });

  it('LANGUAGES contiene exactamente ES y EN', () => {
    expect(LANGUAGES).toEqual(['es', 'en']);
  });

  it('TECHNOLOGIES es la única fuente consumida por TechOrbit', () => {
    expect(techOrbitSrc).toMatch(/from\s+['"]\.\.\/constants['"]/);
    expect(techOrbitSrc).toContain('TECHNOLOGIES');
    // Ya no debe declarar el array localmente.
    expect(techOrbitSrc).not.toMatch(/const\s+technologies\s*=\s*\[/);
    expect(TECHNOLOGIES.length).toBeGreaterThanOrEqual(13);
  });
});

describe('PRF-13 · i18n: card 4 reorientada a idiomas', () => {
  it('reemplaza la key passion por languages en ambos idiomas', () => {
    expect(uiSrc).toMatch(/'about\.stats\.languages':\s*'Idiomas'/);
    expect(uiSrc).toMatch(/'about\.stats\.languages':\s*'Languages'/);
    expect(uiSrc).toMatch(/'about\.stats\.languages\.subtitle'/);
    expect(uiSrc).not.toMatch(/'about\.stats\.passion'/);
  });
});
