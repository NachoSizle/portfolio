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
