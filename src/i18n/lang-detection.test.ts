import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(__dirname, '../..');
const indexEs = readFileSync(resolve(root, 'src/pages/index.astro'), 'utf-8');
const indexEn = readFileSync(resolve(root, 'src/pages/en/index.astro'), 'utf-8');
const baseLayout = readFileSync(resolve(root, 'src/layouts/BaseLayout.astro'), 'utf-8');
const header = readFileSync(resolve(root, 'src/components/Header.astro'), 'utf-8');

describe('GYM-99: detección de idioma sin redirect cliente', () => {
  it('index.astro (es) no usa navigator.language ni window.location.href para redirect', () => {
    expect(indexEs).not.toMatch(/navigator\.language/);
    expect(indexEs).not.toMatch(/window\.location\.href\s*=/);
    expect(indexEs).not.toMatch(/sessionStorage\.(get|set)Item\(['"]lang-detected['"]/);
  });

  it('index.astro (en) tampoco contiene redirect cliente por idioma', () => {
    expect(indexEn).not.toMatch(/navigator\.language/);
    expect(indexEn).not.toMatch(/window\.location\.href\s*=/);
  });

  it('BaseLayout declara hreflang es, en y x-default', () => {
    expect(baseLayout).toMatch(/hreflang="es"/);
    expect(baseLayout).toMatch(/hreflang="en"/);
    expect(baseLayout).toMatch(/hreflang="x-default"/);
  });

  it('Header expone LanguagePicker fuera del drawer móvil (siempre visible)', () => {
    expect(header).toMatch(/<LanguagePicker\s*\/?>/);
    // El picker está dentro del bloque de controles "siempre visibles"
    const controlsMatch = header.match(/Controles \(siempre visibles\)[\s\S]*?<LanguagePicker/);
    expect(controlsMatch).not.toBeNull();
  });
});
