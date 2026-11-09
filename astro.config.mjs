// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Static output only. The CSP in public/_headers blocks inline code, so the
// build must emit every stylesheet and script as an external file.
export default defineConfig({
  site: 'https://mattlevorson.com',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // Never inline CSS into <style> blocks.
    inlineStylesheets: 'never',
  },
  vite: {
    // Tailwind 4 runs as a Vite plugin; its CSS is part of the same external
    // stylesheet bundle, so inlineStylesheets "never" above still holds.
    plugins: [tailwindcss()],
    build: {
      // Never inline assets or small scripts as data: URIs or inline code.
      assetsInlineLimit: 0,
    },
  },
  markdown: {
    // Shiki and Prism both emit inline style attributes or need extra CSS.
    // Disabled so Markdown output stays CSP-clean. Code blocks render as plain <pre>.
    syntaxHighlight: false,
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [sitemap()],
});
