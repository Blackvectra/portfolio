// Project entries. Typed data, rendered by the home and projects pages.
//
// status: "planned" | "in-progress" | "published".
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
      'The mail security stack on a domain I control, with Exchange Online as the mail platform: DNSSEC on the zone, SMTP DANE for inbound transport, MTA-STS and TLS-RPT for TLS policy and reporting, and DMARC on top of SPF and DKIM. Configured today on nextlayersec.io: SPF and DKIM, DMARC at p=reject with strict alignment and aggregate reporting, MTA-STS in enforce mode with TLS-RPT, and DNSSEC with the DNSSEC-aware MX endpoint, whose host publishes TLSA records for DANE-validating senders. Verified against public DNS and the live MTA-STS policy host, and documented with the records, the PowerShell, and the validation output.',
    status: 'published',
    link: 'https://github.com/Blackvectra/nextlayersec-email-security',
    linkLabel: 'View the framework',
    topics: ['DNSSEC', 'SMTP DANE', 'MTA-STS', 'TLS-RPT', 'DMARC', 'Exchange Online'],
  },
  {
    id: 'm365-entra-assessment-tool',
    title: 'Microsoft 365 and Entra security assessment tool',
    summary:
      'A read-only assessment tool that collects tenant configuration through Microsoft Graph and reports each check as pass, fail, not applicable, not assessed, or inconclusive. "Not assessed" and "inconclusive" are kept separate from "pass" so a permission gap or a failed query is reported as such instead of as a clean result. PowerShell 7, read-only against Microsoft Graph and Exchange Online. Controls are mapped to CIS Microsoft 365 Foundations v7, CISA SCuBA and NIST SP 800-53, with Conditional Access and Intune checklists aligned to Maester, and the output is a client-facing report. Public and under active development.',
    status: 'published',
    link: 'https://github.com/Blackvectra/TenantPosture',
    linkLabel: 'View the project',
    topics: ['Microsoft Graph', 'Entra ID', 'Microsoft 365', 'Read-only'],
  },
  {
    id: 'dmarc-enforcement-methodology',
    title: 'DMARC enforcement methodology',
    summary:
      'A repeatable method for moving a domain to DMARC enforcement without breaking legitimate mail: build an inventory of every sender, move policy in stages from monitoring to quarantine to reject, and define rollback criteria before each step. Published so far: the staged rollout schedule from monitoring to quarantine to reject and the notes on reading aggregate reports, in the email security repository. Sender-inventory templates and a worked example are still to come.',
    status: 'in-progress',
    link: 'https://github.com/Blackvectra/nextlayersec-email-security/tree/main/dmarc',
    linkLabel: 'Read the current notes',
    topics: ['DMARC', 'SPF', 'DKIM', 'Sender inventory', 'Rollback'],
  },
] satisfies Project[];
