import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const src = readFileSync(resolve(__dirname, './BackgroundGradients.astro'), 'utf8');

describe('GYM-118: BackgroundGradients endurecido', () => {
  it('no usa el hack global :global(.dark) .opacity-0', () => {
    expect(src).not.toMatch(/:global\(\.dark\)\s*\.opacity-0/);
  });

  it('usa clases explícitas para el fondo técnico', () => {
    expect(src).toMatch(/class="[^"]*theme-background/);
    expect(src).toContain('theme-background-dots');
    expect(src).toContain('theme-background-vignette');
    expect(src).toContain('theme-background-lines');
  });

  it('oculta el fondo decorativo en modo claro para mantenerlo plano', () => {
    expect(src).toMatch(/html:not\(\.dark\)\)\s+\.theme-background/);
    expect(src).toMatch(/display:\s*none/);
  });

  it('respeta prefers-reduced-motion desactivando la animación', () => {
    expect(src).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)/);
    expect(src).toMatch(/animation:\s*none/);
  });
});
