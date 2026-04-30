import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(__dirname, '..');
const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf-8'));

describe('GYM-109 · DX scripts y CI', () => {
  it('package.json define scripts check/test/build', () => {
    expect(pkg.scripts.check).toBeTruthy();
    expect(pkg.scripts.test).toBeTruthy();
    expect(pkg.scripts.build).toBeTruthy();
  });

  it('package.json define scripts lint, format y format:check', () => {
    expect(pkg.scripts.lint).toBeTruthy();
    expect(pkg.scripts.format).toBeTruthy();
    expect(pkg.scripts['format:check']).toBeTruthy();
  });

  it('declara @biomejs/biome como devDependency', () => {
    expect(pkg.devDependencies?.['@biomejs/biome']).toBeTruthy();
  });

  it('existe biome.json en la raíz', () => {
    expect(existsSync(resolve(root, 'biome.json'))).toBe(true);
  });

  it('existe .github/workflows/ci.yml', () => {
    expect(existsSync(resolve(root, '.github/workflows/ci.yml'))).toBe(true);
  });

  it('ci.yml ejecuta install, check, test y build con Bun', () => {
    const ci = readFileSync(resolve(root, '.github/workflows/ci.yml'), 'utf-8');
    expect(ci).toMatch(/oven-sh\/setup-bun/);
    expect(ci).toMatch(/bun install/);
    expect(ci).toMatch(/bun run check/);
    expect(ci).toMatch(/bun run test/);
    expect(ci).toMatch(/bun run build/);
  });

  it('ci.yml dispara en pull_request y push a main', () => {
    const ci = readFileSync(resolve(root, '.github/workflows/ci.yml'), 'utf-8');
    expect(ci).toMatch(/pull_request:/);
    expect(ci).toMatch(/push:/);
    expect(ci).toMatch(/branches:\s*\[?\s*main/);
  });
});
