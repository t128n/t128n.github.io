// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  base: '/t128n', // Add the base path for GitHub Pages
  site: 'https://t128n.github.io',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()]
});