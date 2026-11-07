// Project entries. Typed data, rendered by the home and projects pages.
//
// status: "planned" | "in-progress" | "published". Every entry starts as
// "planned" because current status has not been confirmed. Update each one.
//
// link: a URL (https://...) or internal path (/writing/slug/). Anything else
// is treated as a placeholder and shown as visible text instead of a link.

export type ProjectStatus = 'planned' | 'in-progress' | 'published';

export interface Project {
  /** Stable id, used as the anchor on /projects/ (e.g. /projects/#email-security-build). */
  id: string;
  title: string;
  /** One paragraph. Describe scope; do not claim results that are not published. */
  summary: string;
  status: ProjectStatus;
  link: string;
  linkLabel: string;
  topics: string[];
}

export const projects = [
  {
    id: 'email-security-build',
    title: 'Email security build on my own domain',
    summary:
      'The mail security stack on a domain I control, with Exchange Online as the mail platform: DNSSEC on the zone, SMTP DANE for inbound transport, MTA-STS and TLS-RPT for TLS policy and reporting, and DMARC on top of SPF and DKIM. [PLACEHOLDER: one or two sentences on what is configured today, what was verified, and how]',
    status: 'planned', // [PLACEHOLDER: confirm status]
    link: '[PLACEHOLDER: link to the write-up or repository]',
    linkLabel: 'Read the write-up',
    topics: ['DNSSEC', 'SMTP DANE', 'MTA-STS', 'TLS-RPT', 'DMARC', 'Exchange Online'],
  },
  {
    id: 'm365-entra-assessment-tool',
    title: 'Microsoft 365 and Entra security assessment tool',
    summary:
      'A read-only assessment tool that collects tenant configuration through Microsoft Graph and reports each check as pass, fail, not applicable, not assessed, or inconclusive. "Not assessed" and "inconclusive" are kept separate from "pass" so a permission gap or a failed query is reported as such instead of as a clean result. [PLACEHOLDER: language or runtime, checks covered, required Graph permissions, and current state]',
    status: 'planned', // [PLACEHOLDER: confirm status]
    link: '[PLACEHOLDER: link to the repository or write-up]',
    linkLabel: 'View the project',
    topics: ['Microsoft Graph', 'Entra ID', 'Microsoft 365', 'Read-only'],
  },
  {
    id: 'dmarc-enforcement-methodology',
    title: 'DMARC enforcement methodology',
    summary:
      'A repeatable method for moving a domain to DMARC enforcement without breaking legitimate mail: build an inventory of every sender, move policy in stages from monitoring to quarantine to reject, and define rollback criteria before each step. [PLACEHOLDER: what the published method includes, such as templates, checklists, or a worked example]',
    status: 'planned', // [PLACEHOLDER: confirm status]
    link: '[PLACEHOLDER: link to the methodology write-up]',
    linkLabel: 'Read the methodology',
    topics: ['DMARC', 'SPF', 'DKIM', 'Sender inventory', 'Rollback'],
  },
] satisfies Project[];
