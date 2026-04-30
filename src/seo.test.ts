import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const baseLayout = readFileSync(resolve(root, 'src/layouts/BaseLayout.astro'), 'utf-8');
const astroConfig = readFileSync(resolve(root, 'astro.config.mjs'), 'utf-8');
const ui = readFileSync(resolve(root, 'src/i18n/ui.ts'), 'utf-8');

describe('SEO · BaseLayout meta', () => {
  it('incluye <link rel="manifest"> al manifest.webmanifest', () => {
    expect(baseLayout).toMatch(/rel=(["'])manifest\1/);
    expect(baseLayout).toMatch(/manifest\.webmanifest/);
  });

  it('incluye <meta name="theme-color"> con valor explícito', () => {
    expect(baseLayout).toMatch(/name=(["'])theme-color\1/);
  });

  it('incluye twitter:site y twitter:creator', () => {
    expect(baseLayout).toMatch(/name=(["'])twitter:site\1/);
    expect(baseLayout).toMatch(/name=(["'])twitter:creator\1/);
  });

  it('incluye JSON-LD con @type Person y WebSite', () => {
    expect(baseLayout).toMatch(/type=(["'])application\/ld\+json\1/);
    expect(baseLayout).toMatch(/['"]@type['"]\s*:\s*['"]Person['"]/);
    expect(baseLayout).toMatch(/['"]@type['"]\s*:\s*['"]WebSite['"]/);
  });
});

describe('SEO · manifest.webmanifest', () => {
  const manifestPath = resolve(root, 'public/manifest.webmanifest');

  it('existe en public/', () => {
    expect(existsSync(manifestPath)).toBe(true);
  });

  it('es JSON válido con campos PWA mínimos', () => {
    const json = JSON.parse(readFileSync(manifestPath, 'utf-8'));
    expect(json).toMatchObject({
      name: expect.any(String),
      short_name: expect.any(String),
      start_url: expect.any(String),
      display: expect.any(String),
      theme_color: expect.any(String),
      background_color: expect.any(String),
    });
    expect(Array.isArray(json.icons)).toBe(true);
    expect(json.icons.length).toBeGreaterThan(0);
  });
});

describe('SEO · páginas 404 bilingües', () => {
  it('existe src/pages/404.astro (es)', () => {
    expect(existsSync(resolve(root, 'src/pages/404.astro'))).toBe(true);
  });

  it('existe src/pages/en/404.astro', () => {
    expect(existsSync(resolve(root, 'src/pages/en/404.astro'))).toBe(true);
  });

  it('ui.ts contiene claves seo.404.* en es y en', () => {
    expect(ui).toMatch(/'seo\.404\.title'\s*:/);
    expect(ui).toMatch(/'seo\.404\.description'\s*:/);
    expect(ui).toMatch(/'seo\.404\.cta'\s*:/);
  });
});

describe('SEO · sitemap i18n', () => {
  it('astro.config.mjs configura sitemap con i18n', () => {
    expect(astroConfig).toMatch(/sitemap\(\s*\{[\s\S]*i18n[\s\S]*\}\s*\)/);
    expect(astroConfig).toMatch(/defaultLocale\s*:\s*['"]es['"]/);
  });
});
