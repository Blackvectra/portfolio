#!/usr/bin/env node
// Fails if any project card shown on the site links to a URL that does not
// answer 200. A GitHub repository that is private, renamed or deleted answers
// 404 to a visitor, so a card can go stale without a commit here; CI runs this
// on a weekly schedule as well as on push for that reason.
//
// Reads the typed card data directly (Node strips the TypeScript types), so
// there is no second list of links to keep in step.
import { visibleProjects } from '../src/data/projects.ts';

const urls = new Set();
for (const project of visibleProjects) {
  for (const href of [project.link, ...(project.extraLinks ?? []).map((l) => l.href)]) {
    // Internal paths are covered by the built-site checks.
    if (/^https?:\/\//.test(href)) urls.add(href);
  }
}

let failed = 0;
for (const url of urls) {
  let status;
  try {
    // GET, not HEAD: some hosts answer HEAD differently from a browser visit.
    const res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(15000) });
    status = res.status;
  } catch (err) {
    status = `request failed (${err.cause?.code ?? err.name})`;
  }
  const ok = status === 200;
  if (!ok) failed++;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${status} ${url}`);
}

if (failed) {
  console.error(`check-project-links: ${failed} of ${urls.size} link(s) do not answer 200.`);
  process.exit(1);
}
console.log(`check-project-links: OK. ${urls.size} external link(s).`);
