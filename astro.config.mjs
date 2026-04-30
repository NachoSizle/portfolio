// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import compressor from 'astro-compressor';
import mdx from '@astrojs/mdx';

import tailwindcss from '@tailwindcss/vite';

import solidJs from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
  site: 'https://nachosizle.github.io',
  base: '/portfolio',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-ES',
          en: 'en-US',
        },
      },
    }),
    compressor(),
    // `include` fuerza a que el plugin de Solid también transforme los .jsx
    // que vienen sin compilar dentro de `solid-icons`, evitando el error
    // "React is not defined" durante el SSR.
    solidJs({ include: ['**/solid-icons/**', '**/*.{jsx,tsx}'] }),
  ],
  build: {
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [/** @type {any} */ (tailwindcss())],
    resolve: {
      alias: [
        // El export raíz de `solid-icons` resuelve a `index.jsx` sin compilar
        // bajo la condición "astro"/"solid", lo que rompe el SSR de Astro 6
        // (`React is not defined`). Forzamos la build precompilada `index.js`.
        {
          find: /^solid-icons$/,
          replacement: 'solid-icons/lib/index.js',
        },
      ],
    },
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    remotePatterns: [{ protocol: 'https', hostname: 'placehold.co', pathname: '/**' }],
  },
  cacheDir: '.astro-cache',
  devToolbar: {
    enabled: false,
  },
});
