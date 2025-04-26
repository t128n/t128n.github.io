// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://t128n.github.io',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [icon(), react(), sitemap()],

  markdown: {
    shikiConfig: {
      theme: 'vesper'
    },
    smartypants: false,
    remarkPlugins: [
      ["remark-smartypants", { 
           openingQuotes: { double: '»', single: '›' },
           closingQuotes: { double: '«', single: '‹' }
      }]
    ]
  }
});