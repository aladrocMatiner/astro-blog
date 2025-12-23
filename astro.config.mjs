import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'http://localhost:8080',
  markdown: {
    syntaxHighlight: 'prism'
  },
  integrations: [mdx()]
});
