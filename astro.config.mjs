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
/** slug -> frontmatter date (YYYY-MM-DD) for each published entry. */
const publishedDates = new Map();
for (const file of readdirSync(writingDir)) {
  if (!file.endsWith('.md')) continue;
  const text = readFileSync(new URL(file, writingDir), 'utf8');
  if (!/^status:\s*["']?published/m.test(text)) continue;
  publishedDates.set(file.slice(0, -3), text.match(/^date:\s*["']?(\d{4}-\d{2}-\d{2})/m)?.[1]);
}
const hasPublishedWriting = publishedDates.size > 0;
const latestPublished = [...publishedDates.values()].filter(Boolean).sort().at(-1);

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
  integrations: [
    sitemap({
      filter: (page) => hasPublishedWriting || !page.endsWith('/writing/'),
      // lastmod only where a real date exists: each entry's own date, and the
      // newest entry's date for the Writing index. Other pages carry none
      // rather than a build timestamp that would change on every deploy.
      serialize(item) {
        const slug = item.url.match(/\/writing\/([^/]+)\/$/)?.[1];
        const date = slug ? publishedDates.get(slug) : item.url.endsWith('/writing/') ? latestPublished : undefined;
        return date ? { ...item, lastmod: date } : item;
      },
    }),
  ],
});
