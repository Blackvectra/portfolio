#!/usr/bin/env node
// Pre-launch gate. Exits nonzero if placeholder text remains in anything that
// ships: src/ and public/. Not part of the default build or CI.
//
// Markdown entries whose frontmatter says `status: draft` are skipped because
// drafts never reach the built site. They are listed so nothing is forgotten.
import { readdir, readFile } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';

const ROOTS = ['src', 'public'];
const TEXT_EXT = new Set(['.astro', '.ts', '.js', '.mjs', '.md', '.mdx', '.json', '.css', '.txt', '.svg', '.html', '.xml', '.yml', '.yaml', '']);
const MARKER = /PLACEHOLDER/;

async function* walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

function isDraft(text) {
  const fm = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return Boolean(fm && /^status:\s*["']?draft["']?\s*(#.*)?$/m.test(fm[1]));
}

const hits = [];
const skippedDrafts = [];

for (const root of ROOTS) {
  for await (const file of walk(root)) {
    const ext = extname(file);
    // _headers has no extension; include extensionless files.
    if (!TEXT_EXT.has(ext)) continue;
    const text = await readFile(file, 'utf8');
    if (!MARKER.test(text)) continue;
    const rel = relative(process.cwd(), file);
    if ((ext === '.md' || ext === '.mdx') && isDraft(text)) {
      skippedDrafts.push(rel);
      continue;
    }
    text.split(/\r?\n/).forEach((line, i) => {
      if (MARKER.test(line)) hits.push(`${rel}:${i + 1}: ${line.trim()}`);
    });
  }
}

if (skippedDrafts.length) {
  console.log('Skipped drafts (not built, still contain placeholders):');
  for (const f of skippedDrafts) console.log(`  ${f}`);
}

if (hits.length) {
  console.error(`\n${hits.length} placeholder(s) remain:`);
  for (const h of hits) console.error(`  ${h}`);
  process.exit(1);
}

console.log('No placeholders remain in src/ or public/.');
