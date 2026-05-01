import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { CV } from '../constants';

const root = resolve(__dirname, '..', '..');
const read = (p: string) => readFileSync(resolve(root, p), 'utf8');

describe('PRF-14: Hosting de CV propio en /public/cv/', () => {
  it('expone CV.path en constants.ts apuntando a /cv/Nacho_Martinez_CV.pdf', () => {
    expect(CV).toBeDefined();
    expect(CV.path).toBe('/cv/Nacho_Martinez_CV.pdf');
  });

  it('coloca el PDF físicamente en public/cv/Nacho_Martinez_CV.pdf con tamaño > 0', () => {
    const pdfPath = resolve(root, 'public/cv/Nacho_Martinez_CV.pdf');
    expect(existsSync(pdfPath), 'falta public/cv/Nacho_Martinez_CV.pdf').toBe(true);
    expect(statSync(pdfPath).size).toBeGreaterThan(0);
  });

  it('elimina docs/Nacho_Martinez_CV_Updated.pdf duplicado tras la migración', () => {
    const oldPdf = resolve(root, 'docs/Nacho_Martinez_CV_Updated.pdf');
    expect(existsSync(oldPdf), 'docs/Nacho_Martinez_CV_Updated.pdf no debe seguir presente').toBe(
      false
    );
  });
});

describe('PRF-14: Hero.astro consume el CV propio', () => {
  const hero = read('src/components/Hero.astro');

  it('importa CV y BASE_URL desde constants', () => {
    expect(hero).toMatch(/from\s+["']\.\.\/constants["']/);
    expect(hero).toMatch(/\bCV\b/);
    expect(hero).toMatch(/\bBASE_URL\b/);
  });

  it('no enlaza al CV antiguo de iCloud', () => {
    expect(hero).not.toMatch(/icloud\.com/);
  });

  it('genera el href usando BASE_URL + CV.path', () => {
    expect(hero).toMatch(/\$\{BASE_URL\}\$\{CV\.path\}/);
  });

  it('marca el enlace como descarga directa con nombre estable', () => {
    expect(hero).toMatch(/\bdownload=["']Nacho_Martinez_CV\.pdf["']/);
  });

  it('emite evento Umami cv-download con el idioma actual', () => {
    expect(hero).toMatch(/data-umami-event=["']cv-download["']/);
    expect(hero).toMatch(/data-umami-event-lang=\{lang\}/);
  });

  it('mantiene seguridad de target externo', () => {
    expect(hero).toMatch(/rel=["']noopener noreferrer["']/);
  });
});
