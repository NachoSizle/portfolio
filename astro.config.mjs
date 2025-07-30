// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://nachosizle.github.io',
  base: '/portfolio',
  integrations: [sitemap()],
});
