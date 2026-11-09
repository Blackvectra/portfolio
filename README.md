# mattlevorson.com

Portfolio site built with [Astro](https://astro.build) and served by a
Cloudflare Worker using
[Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/).
There is no Worker script: `astro build` writes `dist/`, and the Worker serves
it as-is with the response headers in `public/_headers` and the redirects in
`public/_redirects` (Astro copies `public/` into `dist/` verbatim).

## Layout

```text
astro.config.mjs      Site URL, trailingSlash "never", build.format "file",
                      inlineStylesheets "never" (required by the CSP, see below)
wrangler.jsonc        Worker config: assets directory ./dist, 404 page, URL shape
package.json          Pinned toolchain: astro, @astrojs/check, typescript, wrangler
tsconfig.json         astro/tsconfigs/strict
.npmrc                ignore-scripts=true — no dependency may run install scripts
.nvmrc                Node version Workers Builds uses
src/
  layouts/Base.astro  <head>, canonical URL, footer; every page uses it
  pages/index.astro   Front page
  pages/404.astro     Served with a 404 status for any unknown path
  styles/global.css   The only stylesheet
public/
  _headers            Security headers applied to every response
  _redirects          www -> apex
  robots.txt
  favicon.svg
```

## Local

```bash
npm install
npm run dev        # Astro dev server with hot reload (no headers; see preview)
npm run build      # -> dist/
npm run preview    # wrangler dev over dist/: the real headers, 404 and URL handling
npm run check      # astro check: types and template errors
npm run verify     # build + wrangler deploy --dry-run: what Workers Builds will do
```

`wrangler dev` runs locally and needs no Cloudflare login.

## Deploy

Deploys happen from Git through **Workers Builds**, not from a laptop and not
from GitHub Actions:

1. Cloudflare dashboard → Workers & Pages → Create → **Workers** → *Import a
   repository* → `Blackvectra/portfolio`.
2. Build command `npm run build`; deploy command `npx wrangler deploy` (the
   default). Wrangler reads `wrangler.jsonc`.
3. Production branch `main`. Every push to `main` deploys; every pull request
   gets a preview URL.

The Worker is reachable at `portfolio.<account>.workers.dev` as soon as the
first deploy finishes. Check the site there **before** attaching the domain.

### Attaching mattlevorson.com

Only once the `workers.dev` URL looks right:

1. Worker → Settings → Domains & Routes → *Add* → **Custom domain** →
   `mattlevorson.com`, then again for `www.mattlevorson.com`. The zone is on
   Cloudflare, so the DNS records are created for you and stay proxied.
2. `public/_redirects` sends `www` to the apex.
3. Then, and only then, turn off wherever the site was served from before.

Do **not** add `mta-sts.mattlevorson.com`. That hostname is a DNS-only CNAME to
GitHub Pages serving the MTA-STS policy for the domain's mail, and it has to
stay exactly as it is. The Worker never touches it.

## Security headers

`public/_headers` sets, on every response:

| Header | Value | Why |
|---|---|---|
| `Content-Security-Policy` | `default-src 'none'; style-src 'self'; img-src 'self'; font-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'` | Nothing loads from anywhere but this origin and there is no JavaScript. Adding a script means adding `script-src 'self'` here, never `'unsafe-inline'`; `inlineStylesheets: "never"` in `astro.config.mjs` is what keeps styles out of `<style>` tags so `style-src 'self'` holds. |
| `X-Content-Type-Options` | `nosniff` | No MIME sniffing |
| `X-Frame-Options` | `DENY` | Belt and braces for `frame-ancestors` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Origin only on cross-site navigation |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Features this site never uses |
| `Cross-Origin-Opener-Policy` | `same-origin` | |
| `Cross-Origin-Resource-Policy` | `same-origin` | |
| `Strict-Transport-Security` | `max-age=31536000` | One year. `includeSubDomains` is deliberately absent: it would also bind `mta-sts.mattlevorson.com`, which is served by GitHub, not this Worker. |

## Dependencies

Every package is pinned to an exact version in `package.json`, chosen at least
seven days after its release. Dependabot (`.github/dependabot.yml`) proposes
bumps weekly on the same cooldown, grouped as `astro` and `tooling`.
`.npmrc` sets `ignore-scripts=true` so no dependency runs code at install
time, locally or in Workers Builds.
