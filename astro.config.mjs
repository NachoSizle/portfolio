// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import compressor from 'astro-compressor';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://nachosizle.github.io',
  base: '/portfolio',
  integrations: [sitemap(), compressor()],

  vite: {
    plugins: [tailwindcss()],
  },
});