import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { SOCIAL_LINKS, CONTACT } from './constants';

const root = resolve(__dirname, '..');
const read = (p: string) => readFileSync(resolve(root, p), 'utf8');

describe('GYM-107: SOCIAL_LINKS y CONTACT centralizados en src/constants.ts', () => {
  it('exporta el objeto SOCIAL_LINKS con github, linkedin y threads canónicos', () => {
    expect(SOCIAL_LINKS).toBeDefined();
    expect(SOCIAL_LINKS.github).toBe('https://github.com/NachoSizle');
    expect(SOCIAL_LINKS.linkedin).toBe('https://www.linkedin.com/in/nachosizle/');
    expect(SOCIAL_LINKS.threads).toBe('https://www.threads.net/@nachosizle');
  });

  it('exporta CONTACT con email único y mailto válido', () => {
    expect(CONTACT).toBeDefined();
    expect(CONTACT.email).toBe('hola@nachosizle.dev');
    expect(CONTACT.mailto).toBe('mailto:hola@nachosizle.dev');
  });
});

describe('GYM-107: Hero.astro lee de constants.ts', () => {
  const hero = read('src/components/Hero.astro');

  it('importa SOCIAL_LINKS desde constants', () => {
    expect(hero).toMatch(/from\s+["'][^"']*\.\.\/constants["']/);
    expect(hero).toMatch(/SOCIAL_LINKS/);
  });

  it('no contiene URLs sociales hardcodeadas', () => {
    expect(hero).not.toMatch(/href="https:\/\/github\.com\/NachoSizle"/);
    expect(hero).not.toMatch(/href="https:\/\/(www\.)?linkedin\.com\/(comm|in)\//);
    expect(hero).not.toMatch(/href="https:\/\/(www\.)?threads\.(com|net)\//);
  });
});

describe('GYM-107: footer.data.ts lee de constants.ts', () => {
  const footer = read('src/components/footer.data.ts');

  it('importa SOCIAL_LINKS y CONTACT desde constants', () => {
    expect(footer).toMatch(/from\s+["']\.\.\/constants["']/);
    expect(footer).toMatch(/SOCIAL_LINKS/);
    expect(footer).toMatch(/CONTACT/);
  });

  it('no contiene URLs sociales ni email hardcodeados', () => {
    expect(footer).not.toMatch(/https:\/\/github\.com\/NachoSizle/);
    expect(footer).not.toMatch(/https:\/\/(www\.)?linkedin\.com\/in\/nachosizle/);
    expect(footer).not.toMatch(/mailto:hola@nachosizle\.dev/);
  });
});

describe('GYM-107: BaseLayout.astro JSON-LD usa constants.ts', () => {
  const layout = read('src/layouts/BaseLayout.astro');

  it('importa SOCIAL_LINKS para sameAs', () => {
    expect(layout).toMatch(/SOCIAL_LINKS/);
  });

  it('no incluye URLs sociales literales en el array sameAs', () => {
    // Los literales deben venir solo desde constants.ts
    expect(layout).not.toMatch(/'https:\/\/github\.com\/NachoSizle'/);
    expect(layout).not.toMatch(/'https:\/\/www\.linkedin\.com\/in\/nachosizle\/'/);
    expect(layout).not.toMatch(/'https:\/\/www\.threads\.net\/@/);
  });
});
