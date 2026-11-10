// @ts-check
import { readdirSync, readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Static output only. The CSP in public/_headers blocks inline code, so the
// build must emit every stylesheet and script as an external file.
// True once any writing entry has `status: published`. Until then the
// Writing index is an empty page, so it stays out of the sitemap (the page
// also sets noindex, and the menu and home page leave it out).
const writingDir = new URL('./src/content/writing/', import.meta.url);
const hasPublishedWriting = readdirSync(writingDir).some(
  (file) =>
    file.endsWith('.md') &&
    /^status:\s*["']?published/m.test(readFileSync(new URL(file, writingDir), 'utf8')),
);

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
  integrations: [sitemap({ filter: (page) => hasPublishedWriting || !page.endsWith('/writing/') })],
});
