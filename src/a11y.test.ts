import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = resolve(__dirname, '..');
const aboutSection = readFileSync(resolve(root, 'src/components/AboutSection.astro'), 'utf-8');
const projectList = readFileSync(resolve(root, 'src/components/ProjectList.astro'), 'utf-8');
const footer = readFileSync(resolve(root, 'src/components/Footer.astro'), 'utf-8');
const profilePhoto = readFileSync(resolve(root, 'src/components/ProfilePhoto.astro'), 'utf-8');
const themeToggle = readFileSync(resolve(root, 'src/components/ThemeToggle.astro'), 'utf-8');
const socialButton = readFileSync(resolve(root, 'src/components/SocialButton.astro'), 'utf-8');
const globalCss = readFileSync(resolve(root, 'src/styles/global.css'), 'utf-8');

describe('GYM-104: anchors in-page válidos (no <a self-closing sin href>)', () => {
  it('AboutSection no usa <a id="experience" /> self-closing', () => {
    expect(aboutSection).not.toMatch(/<a\s+id="experience"[^>]*\/>/);
    // Debe existir un id="experience" alcanzable (span o sección)
    expect(aboutSection).toMatch(/id="experience"/);
  });

  it('ProjectList no usa <a id="projects" /> self-closing', () => {
    expect(projectList).not.toMatch(/<a\s+id="projects"[^>]*\/>/);
    expect(projectList).toMatch(/id="projects"/);
  });

  it('Footer no usa <a id="contact" /> self-closing', () => {
    expect(footer).not.toMatch(/<a\s+id="contact"[^>]*\/>/);
    expect(footer).toMatch(/id="contact"/);
  });
});

describe('GYM-104: ProfilePhoto sin role="status" decorativo', () => {
  it('badge del nombre no usa role="status"', () => {
    expect(profilePhoto).not.toMatch(/role="status"/);
  });
});

describe('GYM-104: ThemeToggle anuncia cambios a screen reader', () => {
  it('expone una región aria-live polite para anunciar el tema activo', () => {
    expect(themeToggle).toMatch(/aria-live="polite"/);
  });
});

describe('GYM-104: SocialButton tooltip accesible por teclado', () => {
  it('muestra el tooltip también en focus, no sólo en hover (CSS group-hover + group-focus-within)', () => {
    expect(socialButton).toMatch(/group-hover/);
    expect(socialButton).toMatch(/group-focus-within|group-focus|focus-within|focus-visible/);
  });
});

describe('GYM-104: prefers-reduced-motion respetado globalmente', () => {
  it('global.css declara un bloque @media (prefers-reduced-motion: reduce)', () => {
    expect(globalCss).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  });

  it('reduce desactiva animaciones decorativas (animation: none)', () => {
    const block = globalCss.match(/@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{[\s\S]*?\n\}/);
    expect(block).not.toBeNull();
    expect(block?.[0]).toMatch(/animation:\s*none/);
  });
});
