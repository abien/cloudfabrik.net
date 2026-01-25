// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://cloudfabrik.net',
  integrations: [
    tailwind(),
    sitemap(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: true,
    },
  },
  build: {
    assets: '_assets',
    inlineStylesheets: 'auto',
  },
  vite: {
    server: {
      watch: {
        awaitWriteFinish: {
          stabilityThreshold: 1000,
          pollInterval: 1000,
        },
      },
    },
    build: {
      cssMinify: true,
    },
  },
});
