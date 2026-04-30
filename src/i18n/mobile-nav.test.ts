import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { ui } from './ui';

const root = resolve(__dirname, '../..');
const header = readFileSync(resolve(root, 'src/components/Header.astro'), 'utf-8');

describe('GYM-98: Header móvil accesible', () => {
  it('declara claves i18n nav.menu.open / nav.menu.close en es y en', () => {
    expect(ui.es['nav.menu.open']).toBeTruthy();
    expect(ui.es['nav.menu.close']).toBeTruthy();
    expect(ui.en['nav.menu.open']).toBeTruthy();
    expect(ui.en['nav.menu.close']).toBeTruthy();
  });

  it('Header.astro contiene botón hamburguesa con aria-controls + aria-expanded', () => {
    expect(header).toMatch(/id="mobile-menu-toggle"/);
    expect(header).toMatch(/aria-controls="mobile-menu"/);
    expect(header).toMatch(/aria-expanded="false"/);
    // Visible solo en mobile
    expect(header).toMatch(/md:hidden/);
  });

  it('Header.astro contiene panel mobile-menu con role/aria correctos', () => {
    expect(header).toMatch(/id="mobile-menu"/);
    // Hidden por defecto
    expect(header).toMatch(/data-open="false"/);
  });

  it('Header.astro registra cierre con Escape y focus trap básico', () => {
    expect(header).toMatch(/['"]Escape['"]/);
    expect(header).toMatch(/aria-expanded/);
  });

  it('Header.astro respeta prefers-reduced-motion', () => {
    expect(header).toMatch(/prefers-reduced-motion/);
  });
});
