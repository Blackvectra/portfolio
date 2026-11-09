# mattlevorson.com

Static portfolio site, served by a Cloudflare Worker using
[Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/).
There is no Worker script: everything under `public/` is served as-is, with the
response headers in `public/_headers` and the redirects in `public/_redirects`.

## Layout

```text
wrangler.jsonc        Worker config: name, compatibility date, assets directory
package.json          Pins the Wrangler version Workers Builds deploys with
public/
  index.html          Front page
  404.html            Served with a 404 status for any unknown path
  styles.css          The only stylesheet (no inline styles — see CSP below)
  _headers            Security headers applied to every response
  _redirects          www -> apex
  robots.txt
```

## Local

```bash
npm install
npm run dev        # http://localhost:8787 — serves public/ with headers and 404 handling
npm run check      # validates wrangler.jsonc and the assets without deploying
```

`wrangler dev` runs locally and needs no Cloudflare login.

## Deploy

Deploys happen from Git through **Workers Builds**, not from a laptop and not
from GitHub Actions:

1. Cloudflare dashboard → Workers & Pages → Create → **Workers** → *Import a
   repository* → `Blackvectra/portfolio`.
2. Build settings: leave the build command **empty** (nothing to build), deploy
   command `npx wrangler deploy` (the default). Wrangler reads `wrangler.jsonc`.
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
| `Content-Security-Policy` | `default-src 'none'; style-src 'self'; img-src 'self'; font-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'` | Nothing loads from anywhere but this origin; no scripts at all. Adding JavaScript means adding `script-src 'self'` here, never `'unsafe-inline'`. |
| `X-Content-Type-Options` | `nosniff` | No MIME sniffing |
| `X-Frame-Options` | `DENY` | Belt and braces for `frame-ancestors` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Origin only on cross-site navigation |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Features this site never uses |
| `Cross-Origin-Opener-Policy` | `same-origin` | |
| `Cross-Origin-Resource-Policy` | `same-origin` | |
| `Strict-Transport-Security` | `max-age=31536000` | One year. `includeSubDomains` is deliberately absent: it would also bind `mta-sts.mattlevorson.com`, which is served by GitHub, not this Worker. |

## Dependencies

Wrangler is the only dependency and is pinned to an exact version in
`package.json`. Dependabot (`.github/dependabot.yml`) proposes a bump weekly,
seven days after each release.
