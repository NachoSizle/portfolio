// BASE_URL viene de astro.config (`base`). Se expone vía Vite en `import.meta.env.BASE_URL`.
// Se normaliza SIN barra final para concatenar de forma segura.
export const BASE_URL = (import.meta.env.BASE_URL ?? '/').replace(/\/+$/, '');
