import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(__dirname, '../..');

describe('GYM-100: Tailwind v4 CSS-first', () => {
  it('no debe existir tailwind.config.mjs (config legacy v3)', () => {
    expect(existsSync(resolve(root, 'tailwind.config.mjs'))).toBe(false);
  });

  it('global.css declara tokens primary vía @theme', () => {
    const css = readFileSync(resolve(root, 'src/styles/global.css'), 'utf-8');
    expect(css).toMatch(/@theme\s*\{/);
    // DEFAULT (text-primary / bg-primary) alineado con Neo 8-bit.
    expect(css).toMatch(/--color-primary:\s*#5EE6A8/);
    expect(css).toMatch(/--theme-accent:\s*#047857/);
    expect(css).toMatch(/:root\.dark\s*\{/);
    // Escala usada en componentes
    expect(css).toMatch(/--color-primary-400:/);
    expect(css).toMatch(/--color-primary-500:/);
    expect(css).toMatch(/--color-primary-600:/);
  });
});
