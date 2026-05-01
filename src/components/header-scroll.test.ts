import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const header = readFileSync(resolve(__dirname, '../components/Header.astro'), 'utf8');

describe('GYM-115: Header smooth scroll respeta prefers-reduced-motion', () => {
  it('detecta prefers-reduced-motion en el script', () => {
    expect(header).toMatch(/prefers-reduced-motion/);
    expect(header).toMatch(/matchMedia/);
  });

  it('no usa behavior: "smooth" como literal incondicional dentro de scrollTo', () => {
    // El behavior debe elegirse dinámicamente; no debe quedar la cadena
    // literal `behavior: 'smooth'` después del refactor.
    expect(header).not.toMatch(/behavior:\s*['"]smooth['"]/);
  });

  it('usa una función o variable para resolver el scroll behavior', () => {
    // Indica que se evalúa la media query antes de hacer scroll.
    expect(header).toMatch(/(getScrollBehavior|scrollBehavior|prefersReducedMotion)/);
  });
});

describe('GYM-115: Header sin BASE_URL hardcoded', () => {
  it("no usa la cadena literal '/portfolio/' en el script (debe venir de define:vars)", () => {
    // El destino se calcula vía HOME_URL (getTranslatedPath en SSR).
    expect(header).not.toMatch(/['"]\/portfolio\//);
  });

  it('inyecta HOME_URL via define:vars (ES y EN)', () => {
    expect(header).toMatch(/define:vars=\{\{\s*HOME_URL/);
  });
});
