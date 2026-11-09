import { defineConfig } from "astro/config";

// Keep in sync with the canonical URL in src/layouts/Base.astro.
const SITE_URL = "https://mattlevorson.com";

export default defineConfig({
  site: SITE_URL,
  trailingSlash: "never",
  /*
   * Astro 7's compressHTML drops the newline between a text node and an
   * inline element, so "the <a>link</a> reads" ships as "thelinkreads".
   * Uncompressed HTML costs a few KB before Cloudflare compresses it and
   * nothing after. Same setting as nextlayersec-io, for the same reason.
   */
  compressHTML: false,
  build: {
    // about.astro -> dist/about.html, served at /about. Matches
    // trailingSlash "never" above and html_handling in wrangler.jsonc.
    format: "file",
    /*
     * REQUIRED, not a preference. The default "auto" inlines small
     * stylesheets into a <style> tag. public/_headers sets a CSP of
     * style-src 'self' with no 'unsafe-inline', so an inlined stylesheet is
     * blocked and the page renders unstyled. Every style must be a file.
     */
    inlineStylesheets: "never",
  },
});
