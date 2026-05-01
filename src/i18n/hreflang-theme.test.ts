import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { getTranslatedPath } from './utils';

const themeToggle = readFileSync(resolve(__dirname, '../components/ThemeToggle.astro'), 'utf8');

describe('GYM-116: hreflang seguro frente a rutas exóticas', () => {
  it('rutas como /energy o /estado NO se confunden con prefijo de idioma', () => {
    // /energy -> sigue siendo es (default), no debe perder /energy
    expect(getTranslatedPath('/energy', 'es')).toMatch(/\/energy$/);
    expect(getTranslatedPath('/energy', 'en')).toMatch(/\/en\/energy$/);
    expect(getTranslatedPath('/estado', 'es')).toMatch(/\/estado$/);
    expect(getTranslatedPath('/estado', 'en')).toMatch(/\/en\/estado$/);
  });

  it('/en/foo se reconoce como prefijo de idioma y se traduce correctamente', () => {
    expect(getTranslatedPath('/en/foo', 'es')).toMatch(/\/foo$/);
    expect(getTranslatedPath('/en/foo', 'en')).toMatch(/\/en\/foo$/);
  });
});

describe('GYM-116: ThemeToggle no flickea icono al cargar', () => {
  it('updateTheme se ejecuta inmediatamente, no esperando DOMContentLoaded', () => {
    // Anti-flicker: el script va después del botón en el DOM, así que puede
    // sincronizar iconos sin esperar DOMContentLoaded.
    expect(themeToggle).not.toMatch(/addEventListener\(\s*['"]DOMContentLoaded['"]/);
  });

  it('escucha cambios de preferencia del sistema (matchMedia change)', () => {
    expect(themeToggle).toMatch(/matchMedia\(\s*['"]\(prefers-color-scheme: dark\)['"]/);
    expect(themeToggle).toMatch(/addEventListener\(\s*['"]change['"]/);
  });
});
