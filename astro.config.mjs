// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import compressor from 'astro-compressor';
import critters from 'astro-critters';
import mdx from '@astrojs/mdx';

import tailwindcss from '@tailwindcss/vite';

import solidJs from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
  site: 'https://nachosizle.github.io',
  base: '/portfolio',
  integrations: [mdx(), sitemap(), compressor(), critters(), solidJs()],
  build: {
    inlineStylesheets: "always",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
     remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co', pathname: '/**' },
    ],
  },
  cacheDir: '.astro-cache'
});