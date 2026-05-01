import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const src = readFileSync(resolve(__dirname, './BackgroundGradients.astro'), 'utf8');

describe('GYM-118: BackgroundGradients endurecido', () => {
  it('no usa el hack global :global(.dark) .opacity-0', () => {
    expect(src).not.toMatch(/:global\(\.dark\)\s*\.opacity-0/);
  });

  it('usa una clase explícita bg-blob para los blobs', () => {
    expect(src).toMatch(/class="[^"]*bg-blob/);
  });

  it('reduce el número de blobs a 5 o menos', () => {
    const blobMatches = src.match(/class="[^"]*bg-blob/g) ?? [];
    expect(blobMatches.length).toBeGreaterThan(0);
    expect(blobMatches.length).toBeLessThanOrEqual(5);
  });

  it('respeta prefers-reduced-motion desactivando la animación', () => {
    expect(src).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)/);
    expect(src).toMatch(/animation:\s*none/);
  });
});
