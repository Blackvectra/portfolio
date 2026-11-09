// Site-wide facts and outbound links.
//
// Any value that is not a URL (https://...) or an internal path (/...) is
// treated as an unfilled placeholder and rendered as visible text instead of
// a link. Replace each placeholder with a real URL before launch, then run
// `npm run check:placeholders`.

export const site = {
  name: 'Matthew Levorson',
  role: 'Security engineer',
  business: 'NextLayerSec LLC',
  location: 'North Dakota',
  description:
    'Matthew Levorson, security engineer. Identity, endpoint, and email security on Microsoft 365: control rollouts, detection triage, and assessment tooling.',
} as const;

export const links = {
  /** Business site; linked once, in the footer. */
  nextlayersec: 'https://nextlayersec.io/',
  linkedin: 'https://www.linkedin.com/in/matthew-l-116776227',
  github: 'https://github.com/Blackvectra',
} as const;

/** True when a value is a real link target rather than placeholder text. */
export function isLink(value: string): boolean {
  return /^(https:\/\/|\/)/.test(value);
}

export const nav = [
  { href: '/projects/', label: 'Projects' },
  { href: '/writing/', label: 'Writing' },
  { href: '/about/', label: 'About' },
] as const;
