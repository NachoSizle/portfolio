import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(__dirname, '..');
const claude = readFileSync(resolve(root, 'CLAUDE.md'), 'utf8');
const copilot = readFileSync(resolve(root, '.github/instructions/copilot-instructions.md'), 'utf8');
const readme = readFileSync(resolve(root, 'README.md'), 'utf8');

describe('GYM-120: docs alineadas con el stack real', () => {
  it('CLAUDE.md ya no anuncia "Astro 4" como framework', () => {
    expect(claude).not.toMatch(/\*\*Astro 4\*\*/);
    expect(claude).toMatch(/Astro\s*[56]/);
  });

  it('CLAUDE.md menciona Tailwind v4 vía @tailwindcss/vite (no @astrojs/tailwind)', () => {
    expect(claude).not.toMatch(/@astrojs\/tailwind/);
    expect(claude).toMatch(/@tailwindcss\/vite/);
  });

  it('CLAUDE.md menciona Umami como analítica activa', () => {
    expect(claude).toMatch(/Umami/i);
  });

  it('copilot-instructions.md ya no anuncia "Astro 4"', () => {
    expect(copilot).not.toMatch(/\*\*Astro 4\*\*/);
    expect(copilot).toMatch(/Astro\s*[56]/);
  });

  it('copilot-instructions.md recomienda astro:assets + sharp como pipeline de imágenes', () => {
    expect(copilot).toMatch(/astro:assets/);
    expect(copilot).toMatch(/sharp/);
    // Si menciona @astrojs/image debe ser únicamente para descartarlo
    const imageMatches = copilot.match(/@astrojs\/image/g) ?? [];
    if (imageMatches.length > 0) {
      expect(copilot).toMatch(/sin necesidad de `@astrojs\/image`/);
    }
  });

  it('README.md describe el proyecto con stack real (Astro, Bun, Tailwind v4)', () => {
    expect(readme).toMatch(/Astro/);
    expect(readme).toMatch(/Bun/);
    expect(readme).toMatch(/Tailwind/);
  });
});
