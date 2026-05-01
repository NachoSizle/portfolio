// BASE_URL viene de astro.config (`base`). Se expone vía Vite en `import.meta.env.BASE_URL`.
// Se normaliza SIN barra final para concatenar de forma segura.
export const BASE_URL = (
  (import.meta as unknown as { env?: { BASE_URL?: string } }).env?.BASE_URL ?? '/'
).replace(/\/+$/, '');

/**
 * Única fuente de verdad para enlaces sociales y datos de contacto.
 * Cualquier vista (Hero, Footer, BaseLayout JSON-LD, etc.) DEBE consumir estos
 * valores en lugar de duplicar URLs. Centralizar evita drift entre handles
 * (ej. Threads `@nachosizle` vs `@nacho.sizle`) y URLs de LinkedIn no canónicas.
 */
export const SOCIAL_LINKS = {
  github: 'https://github.com/NachoSizle',
  linkedin: 'https://www.linkedin.com/in/nachosizle/',
  threads: 'https://www.threads.net/@nachosizle',
} as const;

export const CONTACT = {
  email: 'hola@nachosizle.dev',
  mailto: 'mailto:hola@nachosizle.dev',
} as const;

/**
 * Currículum hosteado como asset propio en `public/cv/`. El path es relativo a
 * `BASE_URL`; los consumidores DEBEN componer la URL final como
 * `${BASE_URL}${CV.path}` para respetar el `base` de Astro en GitHub Pages.
 */
export const CV = {
  path: '/cv/Nacho_Martinez_CV.pdf',
  filename: 'Nacho_Martinez_CV.pdf',
} as const;

/**
 * Año de inicio de carrera profesional. Fuente única para calcular los años
 * de experiencia mostrados en `AboutSection` (PRF-13). Mantener sincronizado
 * con la copy i18n `about.stats.experience.subtitle` ("desde 2015").
 */
export const CAREER_START_YEAR = 2015;

/**
 * Idiomas en los que está disponible el portfolio. Usado como métrica
 * verificable en la 4ª card de `StatsGrid` (PRF-13).
 */
export const LANGUAGES = ['es', 'en'] as const;

/**
 * Catálogo único de tecnologías mostradas en `TechOrbit` y contadas en
 * `StatsGrid` (PRF-13). Centralizar evita drift entre lo renderizado en la
 * órbita y la métrica "Tecnologías dominadas".
 */
export type Technology = {
  name: string;
  icon: string;
  color: string;
  angle: number;
  size: 'small' | 'medium' | 'large';
};

export const TECHNOLOGIES: readonly Technology[] = [
  { name: 'HTML5', icon: 'html5', color: 'from-orange-500 to-red-600', angle: 0, size: 'large' },
  { name: 'React', icon: 'react', color: 'from-cyan-400 to-blue-500', angle: 28, size: 'small' },
  { name: 'CSS3', icon: 'css3', color: 'from-blue-400 to-blue-600', angle: 56, size: 'large' },
  {
    name: 'Astro',
    icon: 'astro',
    color: 'from-orange-500 to-purple-600',
    angle: 84,
    size: 'medium',
  },
  {
    name: 'JavaScript',
    icon: 'javascript',
    color: 'from-yellow-400 to-yellow-600',
    angle: 112,
    size: 'large',
  },
  {
    name: 'MongoDB',
    icon: 'mongo',
    color: 'from-green-500 to-green-700',
    angle: 140,
    size: 'medium',
  },
  {
    name: 'Vitest',
    icon: 'vitest',
    color: 'from-yellow-400 to-green-500',
    angle: 168,
    size: 'small',
  },
  {
    name: 'TypeScript',
    icon: 'typescript',
    color: 'from-blue-500 to-blue-700',
    angle: 196,
    size: 'large',
  },
  {
    name: 'Playwright',
    icon: 'playwright',
    color: 'from-red-500 to-green-500',
    angle: 224,
    size: 'small',
  },
  { name: 'Vue.js', icon: 'vue', color: 'from-green-400 to-green-600', angle: 252, size: 'large' },
  {
    name: 'Supabase',
    icon: 'supabase',
    color: 'from-green-400 to-emerald-600',
    angle: 280,
    size: 'medium',
  },
  { name: 'Bun', icon: 'bun', color: 'from-amber-100 to-amber-300', angle: 308, size: 'medium' },
  {
    name: 'GitHub',
    icon: 'github',
    color: 'from-gray-700 to-gray-900',
    angle: 336,
    size: 'medium',
  },
] as const;
