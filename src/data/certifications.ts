// Certifications held, shown on their own page (/certifications/, in the
// menu). Newest first. No years are shown (the owner's choice). Only
// completed certifications belong here; anything in progress stays off the
// site.
//
// Each `href` is the credential's own public verification page: the
// Microsoft Learn share link, or the Credly badge (the same links the
// NextLayerSec site uses), so the claim and its proof are one click.

export interface Certification {
  name: string;
  issuer: string;
  /** Public verification page for this credential. */
  href: string;
}

export const certifications = [
  {
    name: 'Microsoft Certified: Security, Compliance, and Identity Fundamentals (SC-900)',
    issuer: 'Microsoft',
    href: 'https://learn.microsoft.com/api/credentials/share/en-us/LevorsonMatthew-4235/8B1E20D7F90F7D4A?sharingId=F7EE74BFABDEEC7B',
  },
  {
    name: 'CompTIA PenTest+',
    issuer: 'CompTIA',
    href: 'https://www.credly.com/badges/1a42e7fc-9311-4973-88c8-8d695a88ee65',
  },
  {
    name: 'CompTIA CySA+',
    issuer: 'CompTIA',
    href: 'https://www.credly.com/badges/47c5c89d-18aa-41e3-8d9b-02f7a3944119',
  },
  {
    name: 'CompTIA Security+',
    issuer: 'CompTIA',
    href: 'https://www.credly.com/badges/71b5d8a6-a3ec-4847-974a-83f28655862e',
  },
  {
    name: 'Certified in Cybersecurity',
    issuer: 'ISC2',
    href: 'https://www.credly.com/badges/1367ff23-c4b7-463c-af56-0d2a6597a6a4',
  },
  {
    name: 'CompTIA Linux+',
    issuer: 'CompTIA',
    href: 'https://www.credly.com/badges/af65a7cc-e596-4400-81c5-aa791c1244fc',
  },
  {
    name: 'CompTIA Network+',
    issuer: 'CompTIA',
    href: 'https://www.credly.com/badges/9a1dc981-d5fd-4666-bd36-74cd8c567112',
  },
  {
    name: 'CompTIA A+',
    issuer: 'CompTIA',
    href: 'https://www.credly.com/badges/1cff9f7f-86ed-4c28-a13f-a5c6aba67483',
  },
] satisfies Certification[];
