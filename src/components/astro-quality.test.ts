import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(__dirname, '../..');

function read(path: string) {
  return readFileSync(resolve(root, path), 'utf-8');
}

const header = read('src/components/Header.astro');
const languagePicker = read('src/components/LanguagePicker.astro');
const themeToggle = read('src/components/ThemeToggle.astro');
const projectList = read('src/components/ProjectList.astro');
const questMap = read('src/components/QuestMap.astro');
const footer = read('src/components/Footer.astro');
const baseLayout = read('src/layouts/BaseLayout.astro');
const indexEs = read('src/pages/index.astro');
const indexEn = read('src/pages/en/index.astro');

const staticVisualComponents = [
  'src/components/Hero.astro',
  'src/components/AboutSection.astro',
  'src/components/ProjectList.astro',
  'src/components/ProjectCard.astro',
  'src/components/StatsGrid.astro',
  'src/components/ProjectDetail.astro',
  'src/components/SystemStatusPanel.astro',
  'src/components/QuestMap.astro',
  'src/components/Footer.astro',
];

describe('Astro quality: controles interactivos reutilizables', () => {
  it('Header pasa IDs únicos cuando renderiza ThemeToggle y LanguagePicker dos veces', () => {
    expect(header).toContain('<ThemeToggle id="theme-toggle-desktop" />');
    expect(header).toContain('<ThemeToggle id="theme-toggle-mobile" />');
    expect(header).toContain('<LanguagePicker id="language-toggle-desktop" />');
    expect(header).toContain('<LanguagePicker id="language-toggle-mobile" />');
  });

  it('LanguagePicker acepta id por props y no enlaza JS a IDs hardcoded', () => {
    expect(languagePicker).toMatch(/export interface Props/);
    expect(languagePicker).toMatch(/id\?:\s*string/);
    expect(languagePicker).toMatch(/define:vars=\{\{[^}]*LANGUAGE_TOGGLE_ID/s);
    expect(languagePicker).not.toMatch(/getElementById\(\s*['"]language-toggle['"]\s*\)/);
    expect(languagePicker).not.toMatch(/getElementById\(\s*['"]language-menu['"]\s*\)/);
    expect(languagePicker).not.toMatch(/getElementById\(\s*['"]chevron['"]\s*\)/);
  });

  it('ThemeToggle mantiene el mismo patrón de id por props', () => {
    expect(themeToggle).toMatch(/export interface Props/);
    expect(themeToggle).toMatch(/id\?:\s*string/);
    expect(themeToggle).toMatch(/define:vars=\{\{[^}]*THEME_TOGGLE_ID/s);
  });
});

describe('Astro quality: Content Collections y render estático', () => {
  it('ProjectList recibe proyectos tipados como CollectionEntry<"projects">[]', () => {
    expect(projectList).toMatch(/CollectionEntry<['"]projects['"]>/);
    expect(projectList).not.toMatch(/projects:\s*any\[\]/);
    expect(projectList).not.toMatch(/\(\s*(p|project)\s*:\s*any/);
  });

  it('los componentes visuales principales no añaden directivas client:* innecesarias', () => {
    for (const path of staticVisualComponents) {
      expect(read(path), path).not.toMatch(/client:(load|idle|visible|media|only)/);
    }
  });
});

describe('Astro quality: reglas visuales verificables', () => {
  it('evita tipografía basada en viewport, tracking excesivo y tamaños de 10px en componentes principales', () => {
    for (const path of staticVisualComponents) {
      const source = read(path);
      expect(source, path).not.toMatch(/clamp\(/);
      expect(source, path).not.toMatch(/\b\d+(?:\.\d+)?vw\b/);
      expect(source, path).not.toMatch(/tracking-(tight|wide|widest)/);
      expect(source, path).not.toMatch(/text-\[10px\]/);
    }
  });

  it('Footer respeta prefers-reduced-motion en el scroll-to-top', () => {
    expect(footer).toMatch(/matchMedia\(\s*['"]\(prefers-reduced-motion: reduce\)['"]\s*\)/);
    expect(footer).toMatch(/behavior:\s*getScrollBehavior\(\)/);
    expect(footer).toMatch(/addEventListener\(\s*['"]scroll['"][\s\S]*\{\s*passive:\s*true\s*\}/);
  });

  it('QuestMap aporta interacción tipo RPG sin motor pesado ni client directives', () => {
    expect(questMap).toMatch(/id="quest-map"/);
    expect(questMap).toMatch(/data-quest-node/);
    expect(questMap).toMatch(/aria-live="polite"/);
    expect(questMap).toMatch(/height:\s*100%/);
    expect(questMap).toMatch(/overflow:\s*hidden/);
    expect(questMap).toMatch(/matchMedia\(\s*['"]\(prefers-reduced-motion: reduce\)['"]\s*\)/);
    expect(questMap).not.toMatch(/client:(load|idle|visible|media|only)/);
    expect(questMap).not.toMatch(/from\s+["'](?:phaser|kaboom|pixi\.js|three|@react-three\/fiber)/);
    expect(questMap).not.toMatch(/Pokemon|Pokémon/);
  });

  it('las homes renderizan QuestMap como experiencia principal, sin secciones tradicionales', () => {
    for (const source of [indexEs, indexEn]) {
      expect(source).toMatch(/<BaseLayout[\s\S]*immersive/);
      expect(source).toMatch(/<QuestMap\s*\/>/);
      expect(source).not.toMatch(/<Hero\s*\/>/);
      expect(source).not.toMatch(/<AboutSection\s*\/>/);
      expect(source).not.toMatch(/<ProjectList/);
    }

    expect(baseLayout).toMatch(/immersive\?:\s*boolean/);
    expect(baseLayout).toMatch(/data-immersive/);
    expect(baseLayout).toMatch(/!immersive\s*&&\s*<Footer\s*\/>/);
  });
});
