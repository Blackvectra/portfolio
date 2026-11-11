# mattlevorson.com

Static portfolio site for Matthew Levorson: work experience, projects, and technical write-ups. Built with [Astro](https://astro.build/) as plain static HTML and CSS. No analytics, cookies, forms, embeds, or third-party requests.

## Requirements

- Node.js version in [`.nvmrc`](.nvmrc) (current LTS). With nvm: `nvm use`.
- npm (ships with Node).

## Install

```sh
npm ci
```

`.npmrc` sets `save-exact=true`, so new dependencies are pinned. Commit `package-lock.json` with any dependency change.

## Develop

```sh
npm run dev       # local dev server at http://localhost:4321/
```

## Build and preview

```sh
npm run build     # outputs static files to dist/
npm run preview   # serves dist/ locally
```

## Checks

| Command | What it does | Runs in CI |
| --- | --- | --- |
| `npm run check` | `astro check` type and template diagnostics | Yes |
| `npm run check:inline` | Fails if `dist/` HTML has inline scripts, `<style>` blocks, `style` attributes, or event-handler attributes. Run after `npm run build`. | Yes |
| `npm audit --audit-level=high` | Fails on high or critical advisories | Yes |
| `npm run check:placeholders` | Pre-launch gate. Fails if any `PLACEHOLDER` text remains in `src/` or `public/`. Draft writing entries are skipped and listed. | No |

## Content

- **Projects**: `src/data/projects.ts`. Each entry has a category, summary, problem, role, one-line deliverable, what was built, validation performed, limitations, a status (`planned`, `in-progress`, `published`), a link, and optional extra links. Home shows a scannable card per project; `/projects/` shows the full entry. A link that is not a URL or internal path renders as visible placeholder text.
- **Writing**: Markdown files in `src/content/writing/` with frontmatter `title`, `date`, `summary`, `status` (`draft` or `published`). Drafts get no page, no index entry, and no sitemap entry. `case-study-template.md` is the case study template; copy it to start a new one.
- The Writing menu item, the home page's Writing section, and the sitemap entry appear once the first entry is `published`; until then the Writing index is `noindex`.
- **Experience**: `src/data/experience.ts`. Work done in employment, at resume-level detail with no client names. Home shows one row per entry; About shows the full entries.
- **Portrait**: `public/portrait.webp` with a `public/portrait.jpg` fallback, 320x320, cropped from the NextLayerSec site's portrait. Re-encode any replacement so it carries no EXIF, GPS, or XMP data, and keep the file on this domain (`img-src 'self'`).
- **Links and site facts**: `src/data/site.ts` (LinkedIn, GitHub). **Certifications**: `src/data/certifications.ts`, shown as their own section on About (`/about/#certifications`), newest first, without years.

## Security headers and CSP

`public/_headers` sets the response headers on Cloudflare Pages, including a CSP with `script-src 'self'` and `style-src 'self'`, so nothing inline will run. The build is configured to keep it that way:

- `build.inlineStylesheets: "never"` and `vite.build.assetsInlineLimit: 0` in `astro.config.mjs`.
- The theme toggle is `public/theme.js`, loaded with `src` in `<head>` so the saved theme applies before first paint.
- Markdown syntax highlighting is off, because Shiki writes inline `style` attributes.

Do not loosen the CSP to make something work. Move the code to an external file instead, and run `npm run check:inline`.

`public/.well-known/security.txt` expires `2027-10-31T00:00:00Z`. Update it before then.

## Styling

Editorial and monospace, deliberately not the look of the NextLayerSec
business site. Serif for reading (Newsreader, optical-size axis, self-hosted
from `@fontsource-variable/newsreader`), monospace for labels, dates, tags,
navigation and code (IBM Plex Mono, `@fontsource/ibm-plex-mono`), one accent
(oxblood in light, brick in dark), hairline rules instead of cards or fills,
a 36rem reading measure. All tokens live at the top of `global.css` with the
contrast ratios they were checked against; `--border` is decorative and
`--border-strong` is the one used on control edges (3:1 or better on the
background in both themes).

`src/styles/tailwind.css` is the single stylesheet entry (imported by
`BaseLayout.astro`). It wraps the site's own CSS with Tailwind 4 in cascade
layers:

| Layer | Source | Notes |
| --- | --- | --- |
| `theme` | Tailwind | Default theme values, with the colour palette replaced by the site's tokens |
| `base` | `src/styles/global.css` | The reset, element styles and design tokens — unchanged |
| `utilities` | Tailwind | Generated only for classes that appear in `src/` |

Tailwind's preflight is **not** included: `global.css` already owns the reset,
and preflight would change the rendered site. Because utilities sit in a layer
above `base`, a utility on an element wins over a base rule.

- The tokens are Tailwind colours via `@theme inline`, so `bg-bg`, `text-text`,
  `text-muted`, `border-border`, `bg-accent-soft`, `rounded-site`,
  `max-w-measure` exist and switch with the theme on their own (they resolve to
  the CSS variables at paint time; no `dark:` prefix needed for a token colour).
- `dark:` follows the theme toggle (`data-theme="dark"`), and falls back to the
  OS preference when nothing is stored — the same rule as the token blocks in
  `global.css`.
- Tailwind runs as a Vite plugin and its output is part of the same external
  stylesheet, so `build.inlineStylesheets: 'never'` and the CSP still hold;
  `npm run check:inline` covers it.
- Only `src/` is scanned for class names (`@source` in `tailwind.css`). The
  layout wrapper class is `.wrap`: Tailwind has a `container` utility of its own
  and the two would collide in the `utilities` layer.

## Deploying on Cloudflare Pages

Hosting is set up separately. Settings for a Pages project connected to this repo:

| Setting | Value |
| --- | --- |
| Framework preset | Astro (or None) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Environment variable `NODE_VERSION` | Same as `.nvmrc` (currently `26.13.0`) |

`_headers`, `robots.txt`, `.well-known/security.txt`, and `404.html` are copied into `dist/` by the build, and Pages picks them up automatically.

## Before launch

1. Fill every placeholder, then run `npm run check:placeholders` until it passes.
2. Confirm each project's `status` in `src/data/projects.ts`.
3. Set the real `Contact` URL in `public/.well-known/security.txt`.
