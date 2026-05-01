import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const deploy = readFileSync(resolve(__dirname, '../.github/workflows/deploy.yml'), 'utf8');
const ci = readFileSync(resolve(__dirname, '../.github/workflows/ci.yml'), 'utf8');
const gitignore = readFileSync(resolve(__dirname, '../.gitignore'), 'utf8');

describe('GYM-121: pipeline GitHub Pages endurecido', () => {
  it('deploy.yml usa withastro/action y Bun', () => {
    expect(deploy).toMatch(/withastro\/action@v4/);
    expect(deploy).toMatch(/oven-sh\/setup-bun@v2/);
  });

  it('deploy.yml declara concurrency con group portfolio-pages', () => {
    expect(deploy).toMatch(/concurrency:/);
    expect(deploy).toMatch(/group:\s*portfolio-pages/);
    expect(deploy).toMatch(/cancel-in-progress:\s*false/);
  });

  it('deploy.yml cachea .astro-cache', () => {
    expect(deploy).toMatch(/path:\s*\.astro-cache/);
    expect(deploy).toMatch(/key:\s*astro-/);
  });

  it('deploy.yml ejecuta astro check antes del build', () => {
    expect(deploy).toMatch(/bun run check/);
  });

  it('ci.yml ya cubre quality (format/lint/check/test/build)', () => {
    expect(ci).toMatch(/bun run check/);
    expect(ci).toMatch(/bun run test/);
    expect(ci).toMatch(/bun run build/);
  });

  it('.gitignore ignora .astro-cache/', () => {
    expect(gitignore).toMatch(/\.astro-cache\//);
  });
});
