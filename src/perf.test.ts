import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';

const root = resolve(__dirname, '..');
const hero = readFileSync(resolve(root, 'src/components/Hero.astro'), 'utf-8');

function walk(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

const srcFiles = walk(resolve(root, 'src')).filter(
  (f) => /\.(astro|ts|tsx)$/.test(f) && !/\.test\.ts$/.test(f)
);

describe('GYM-106: Hero sin islas Solid innecesarias', () => {
  it('Hero.astro no usa client:load (carga inmediata pesada)', () => {
    expect(hero).not.toMatch(/client:load/);
  });

  it('Hero.astro no importa el island HeroCTA.tsx', () => {
    expect(hero).not.toMatch(/from\s+["'][^"']*islands\/HeroCTA/);
  });

  it('Hero.astro no usa client:* para los SocialButton', () => {
    // Tras la refactor SocialButtonWrapper deja de hidratar Solid
    const wrapperBlocks = hero.match(/<SocialButtonWrapper[\s\S]*?\/>/g) ?? [];
    for (const block of wrapperBlocks) {
      expect(block).not.toMatch(/client:/);
    }
  });

  it('Hero.astro renderiza un CTA al mapa interactivo con tracking umami inline', () => {
    expect(hero).toMatch(/href=["']#quest-map["']/);
    expect(hero).toMatch(/data-umami-event=["']cta-click["']/);
  });
});

describe('GYM-106: islands Solid retiradas', () => {
  it('src/islands/HeroCTA.tsx ya no existe (sustituido por markup estático)', () => {
    expect(existsSync(resolve(root, 'src/islands/HeroCTA.tsx'))).toBe(false);
  });

  it('src/islands/SocialButton.tsx ya no existe (sustituido por componente Astro)', () => {
    expect(existsSync(resolve(root, 'src/islands/SocialButton.tsx'))).toBe(false);
  });
});

describe('GYM-106: dependencias Motion/solid-icons fuera del primer paint', () => {
  it('ningún componente .astro/.ts/.tsx en uso importa @motionone/solid', () => {
    const offenders = srcFiles.filter((f) => /@motionone\/solid/.test(readFileSync(f, 'utf-8')));
    expect(offenders).toEqual([]);
  });

  it('ningún componente .astro/.ts/.tsx en uso importa solid-icons', () => {
    const offenders = srcFiles.filter((f) =>
      /from\s+["']solid-icons/.test(readFileSync(f, 'utf-8'))
    );
    expect(offenders).toEqual([]);
  });

  it('el mapa interactivo no importa motores de juego pesados en el MVP', () => {
    const offenders = srcFiles.filter((f) =>
      /from\s+["'](?:phaser|kaboom|pixi\.js|three|@react-three\/fiber)/.test(
        readFileSync(f, 'utf-8')
      )
    );
    expect(offenders).toEqual([]);
  });
});

describe('GYM-106: SocialButton estático con tooltip accesible por CSS', () => {
  const socialAstro = resolve(root, 'src/components/SocialButton.astro');

  it('existe src/components/SocialButton.astro', () => {
    expect(existsSync(socialAstro)).toBe(true);
  });

  it('renderiza un <a> con href, target _blank y rel noopener', () => {
    const src = readFileSync(socialAstro, 'utf-8');
    expect(src).toMatch(/<a[\s\S]*href=\{href\}/);
    expect(src).toMatch(/target=["']_blank["']/);
    expect(src).toMatch(/rel=["']noopener noreferrer["']/);
  });

  it('expone tooltip por hover y focus vía CSS (group-hover + group-focus-within o focus-visible)', () => {
    const src = readFileSync(socialAstro, 'utf-8');
    expect(src).toMatch(/group/);
    expect(src).toMatch(/role=["']tooltip["']/);
    // Debe ser visible al focus, no sólo al hover
    expect(src).toMatch(/group-focus-within|group-focus|focus-within|focus-visible/);
  });
});

describe('GYM-106: bundle JS first-load reducido', () => {
  it('dist/_astro no incluye chunks de motionone tras el build (si dist/ existe)', () => {
    const distAstro = resolve(root, 'dist/_astro');
    if (!existsSync(distAstro)) return; // build aún no ejecutado en CI fresca
    const offenders = readdirSync(distAstro).filter((f) => /motion/i.test(f));
    expect(offenders).toEqual([]);
  });
});
