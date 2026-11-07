# mattlevorson.com

Static portfolio site for Matthew Levorson: projects, technical write-ups, and a route to NextlayerSec for consulting work. Built with [Astro](https://astro.build/) as plain static HTML and CSS. No analytics, cookies, forms, embeds, or third-party requests.

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

- **Projects**: `src/data/projects.ts`. Each entry has a summary, a status (`planned`, `in-progress`, `published`), and a link. A link that is not a URL or internal path renders as visible placeholder text.
- **Writing**: Markdown files in `src/content/writing/` with frontmatter `title`, `date`, `summary`, `status` (`draft` or `published`). Drafts get no page, no index entry, and no sitemap entry. `case-study-template.md` is the case study template; copy it to start a new one.
- **Links and site facts**: `src/data/site.ts` (LinkedIn, GitHub, booking link).

## Security headers and CSP

`public/_headers` sets the response headers on Cloudflare Pages, including a CSP with `script-src 'self'` and `style-src 'self'`, so nothing inline will run. The build is configured to keep it that way:

- `build.inlineStylesheets: "never"` and `vite.build.assetsInlineLimit: 0` in `astro.config.mjs`.
- The theme toggle is `public/theme.js`, loaded with `src` in `<head>` so the saved theme applies before first paint.
- Markdown syntax highlighting is off, because Shiki writes inline `style` attributes.

Do not loosen the CSP to make something work. Move the code to an external file instead, and run `npm run check:inline`.

`public/.well-known/security.txt` expires `2027-10-31T00:00:00Z`. Update it before then.

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
