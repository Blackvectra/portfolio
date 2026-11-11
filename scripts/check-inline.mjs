#!/usr/bin/env node
// Fails if any built HTML file contains code the CSP would block:
// inline <script> bodies, <script> tags without src, <style> blocks,
// style="" attributes, on*="" event handler attributes, or javascript: URLs.
// One exception: <script type="application/ld+json"> is a data block the
// browser never executes, so the CSP does not apply to it. Its body must
// still parse as JSON.
// Usage: node scripts/check-inline.mjs [dir]   (default: dist)
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const root = process.argv[2] ?? 'dist';

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (entry.name.endsWith('.html')) yield path;
  }
}

const problems = [];
let files = 0;

try {
  for await (const file of walk(root)) {
    files++;
    const html = await readFile(file, 'utf8');
    const rel = relative(process.cwd(), file);

    // <script> elements: must have src and an empty body.
    for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)) {
      const [, attrs, body] = m;
      if (/\stype\s*=\s*["']?application\/ld\+json["']?(\s|$)/i.test(` ${attrs}`)) {
        try {
          JSON.parse(body);
        } catch {
          problems.push(`${rel}: JSON-LD block that is not valid JSON`);
        }
        continue;
      }
      if (!/\ssrc\s*=/i.test(` ${attrs}`)) problems.push(`${rel}: inline <script> without src`);
      else if (body.trim() !== '') problems.push(`${rel}: <script src> with an inline body`);
    }

    if (/<style\b/i.test(html)) problems.push(`${rel}: <style> block`);

    // Attribute checks run on start tags only, so text content cannot match.
    for (const m of html.matchAll(/<[a-zA-Z][^\s>/]*(\s[^>]*)?>/g)) {
      const attrs = m[1] ?? '';
      if (/\sstyle\s*=/i.test(attrs)) problems.push(`${rel}: style attribute in ${m[0].slice(0, 80)}`);
      if (/\son[a-z]+\s*=/i.test(attrs)) problems.push(`${rel}: event handler attribute in ${m[0].slice(0, 80)}`);
      if (/=\s*["']?\s*javascript:/i.test(attrs)) problems.push(`${rel}: javascript: URL in ${m[0].slice(0, 80)}`);
    }
  }
} catch (err) {
  console.error(`check-inline: cannot read ${root}: ${err.message}. Run the build first.`);
  process.exit(2);
}

if (files === 0) {
  console.error(`check-inline: no HTML files found in ${root}. Run the build first.`);
  process.exit(2);
}

if (problems.length > 0) {
  console.error(`check-inline: ${problems.length} problem(s) in ${files} HTML file(s):`);
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}

console.log(`check-inline: OK. ${files} HTML file(s), no inline scripts, style blocks, style attributes, or event handlers.`);
