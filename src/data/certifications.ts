// Certifications held, shown on their own page (/certifications/, in the
// menu). Newest first. No
// years are shown (the owner's choice). Only completed certifications belong
// here; anything in progress stays off the site.

export interface Certification {
  name: string;
  issuer: string;
}

export const certifications = [
  { name: 'CompTIA PenTest+', issuer: 'CompTIA' },
  { name: 'CompTIA CySA+', issuer: 'CompTIA' },
  { name: 'CompTIA Security+', issuer: 'CompTIA' },
  { name: 'Certified in Cybersecurity', issuer: 'ISC2' },
  { name: 'CompTIA Linux+', issuer: 'CompTIA' },
  { name: 'CompTIA Network+', issuer: 'CompTIA' },
  { name: 'CompTIA A+', issuer: 'CompTIA' },
] satisfies Certification[];
