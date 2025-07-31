// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import compressor from 'astro-compressor';
import critters from 'astro-critters';
import mdx from '@astrojs/mdx';
import react from "@astrojs/react";

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://nachosizle.github.io',
  base: '/portfolio',
  integrations: [react(), mdx(), sitemap(), compressor(), critters()],
  build: {
    inlineStylesheets: "always",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
     remotePatterns: [
      { protocol: 'https', hostname: 'picsum.dev', pathname: '/**' },
    ],
  },
  cacheDir: '.astro-cache'
});