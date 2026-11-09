// Site-wide facts and outbound links.
//
// Any value that is not a URL (https://...) or an internal path (/...) is
// treated as an unfilled placeholder and rendered as visible text instead of
// a link. Replace each placeholder with a real URL before launch, then run
// `npm run check:placeholders`.

export const site = {
  name: 'Matthew Levorson',
  role: 'Security engineer',
  business: 'NextlayerSec LLC',
  location: 'North Dakota',
  description:
    'Matthew Levorson, security engineer. Microsoft 365 and Entra security assessments, enterprise email security, and DMARC enforcement.',
} as const;

export const links = {
  /** Business site. Every "Work with me" call to action points here. */
  nextlayersec: 'https://nextlayersec.io/',
  /** The same Bookings link the NextlayerSec site's "Book a call" uses. */
  booking:
    'https://outlook.office.com/bookwithme/user/c9954428b8c34e5ea76d24d6fbc08696@nextlayersec.io/meetingtype/F1HOsBpnVUav5mLhdR8NXA2?anonymous&ep=mlink',
  /** NextlayerSec company page. Swap for a personal profile URL if preferred. */
  linkedin: 'https://linkedin.com/company/nextlayersec',
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
