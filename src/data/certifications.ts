// Certifications held. Source of truth for the home page list and the About
// page line, so the two never disagree. Newest first; entries without a
// known year sort last. Only completed certifications belong here; anything
// in progress stays off the site.

export interface Certification {
  name: string;
  issuer: string;
  /** Short form for the line under the home headline, e.g. "CySA+". */
  short: string;
  /** Year earned. Leave out until known; the year column stays blank. */
  year?: number;
}

export const certifications = [
  { name: 'CompTIA CySA+', issuer: 'CompTIA', short: 'CySA+', year: 2026 },
  { name: 'CompTIA Security+', issuer: 'CompTIA', short: 'Security+', year: 2025 },
  { name: 'Certified in Cybersecurity', issuer: 'ISC2', short: 'ISC2 CC', year: 2025 },
  { name: 'CompTIA A+', issuer: 'CompTIA', short: 'A+', year: 2024 },
  // Years to be confirmed by the owner.
  { name: 'CompTIA PenTest+', issuer: 'CompTIA', short: 'PenTest+' },
  { name: 'CompTIA Linux+', issuer: 'CompTIA', short: 'Linux+' },
  { name: 'CompTIA Network+', issuer: 'CompTIA', short: 'Network+' },
] satisfies Certification[];

/**
 * "CompTIA CySA+ (2026), ..., ISC2 Certified in Cybersecurity (2025), ..." for
 * running text. The issuer is prefixed only when the name does not already
 * carry it, so CompTIA is never written twice; a missing year is omitted.
 */
export const certificationsLine = certifications
  .map((c) => {
    const name = c.name.startsWith(c.issuer) ? c.name : `${c.issuer} ${c.name}`;
    return c.year ? `${name} (${c.year})` : name;
  })
  .join(', ');
