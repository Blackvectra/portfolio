// Project entries. Typed data, rendered by the home and projects pages.
//
// status: "planned" | "in-progress" | "published".
//
// link: a URL (https://...) or internal path (/writing/slug/). Anything else
// is treated as a placeholder and shown as visible text instead of a link.
//
// The structured fields (problem, role, built, validation, limitations) are
// what a reader skims: what problem it solves, what I did, what I actually
// checked, and what it does not do. Keep every item verifiable against the
// linked repository; never state an outcome that is not published.

export type ProjectStatus = 'planned' | 'in-progress' | 'published';

export interface Project {
  /** Stable id, used as the anchor on /projects/ (e.g. /projects/#email-security-build). */
  id: string;
  title: string;
  /** Short label above the title, e.g. "Microsoft 365 · Assessment tooling". */
  category: string;
  /** One paragraph. Describe scope; do not claim results that are not published. */
  summary: string;
  /** What problem it addresses, in one or two sentences. */
  problem: string;
  /** My role: personal project, sole author, maintainer, and what environment it ran in. */
  role: string;
  /** One line for the home page card: the deliverable. */
  deliverable: string;
  /** What I built or contributed. Short items, each verifiable. */
  built: string[];
  /** Validation actually performed: tests, CI gates, external checks. Not outcomes. */
  validation: string[];
  /** Limitations and open work. */
  limitations: string[];
  status: ProjectStatus;
  link: string;
  linkLabel: string;
  /** Other public links, such as a documentation site. */
  extraLinks?: { label: string; href: string }[];
  topics: string[];
}

export const projects = [
  {
    id: 'email-security-build',
    title: 'Email security build on my own domain',
    category: 'Email security · Exchange Online',
    summary:
      'The mail security stack on a domain I control, with Exchange Online as the mail platform: DNSSEC on the zone, SMTP DANE for inbound transport, MTA-STS and TLS-RPT for TLS policy and reporting, and DMARC on top of SPF and DKIM. Configured today on nextlayersec.io: SPF and DKIM, DMARC at p=reject with strict alignment and aggregate reporting, MTA-STS in enforce mode with TLS-RPT, and DNSSEC with the DNSSEC-aware MX endpoint, whose host publishes TLSA records for DANE-validating senders. Verified against public DNS and the live MTA-STS policy host, and documented with the records, the PowerShell, and the validation output.',
    problem:
      "DMARC on its own doesn't protect mail in transit or the DNS answers it depends on. Each control closes a different gap, so they need to be deployed, documented, and checked as one stack, in a way that can be repeated for the next domain.",
    role: 'Deployed and written up by me on domains I run. The public repository keeps the domain names and tenant identifiers out.',
    deliverable:
      'A repeatable deployment framework with DNS record templates and runbooks, applied to my own domains; the primary domain is at full enforcement.',
    built: [
      'Deployment guides and copy-ready DNS record templates for each control',
      'DNSSEC and DNSSEC-aware MX enablement through Exchange Online PowerShell',
      'MTA-STS policy hosting on GitHub Pages, with a repeatable deployment guide',
      'An Exchange Online hardening runbook and baseline checklist',
      'DKIM selector management and key rotation, and a guide to reading DMARC aggregate reports',
      'Per-domain status records from a reusable onboarding template',
    ],
    validation: [
      'Verified against public DNS and the live MTA-STS policy host, with the validation output documented in the repository',
      "Documented checks against MXToolbox's MTA-STS lookup, Verisign's DNSSEC analyzer, and Exchange Online PowerShell",
      'Markdown lint and link checks run on every push',
    ],
    limitations: [
      'Two further domains are recorded in the repository as in progress',
      'Deployed on my own domains, not in a client or employer environment',
    ],
    status: 'published',
    link: 'https://github.com/Blackvectra/nextlayersec-email-security',
    linkLabel: 'View the framework',
    topics: ['DNSSEC', 'SMTP DANE', 'MTA-STS', 'TLS-RPT', 'DMARC', 'Exchange Online'],
  },
  {
    id: 'm365-entra-assessment-tool',
    title: 'Microsoft 365 and Entra security assessment tool',
    category: 'Microsoft 365 · Assessment tooling',
    summary:
      'A read-only assessment tool that collects tenant configuration through Microsoft Graph and reports each check as pass, fail, not applicable, not assessed, or inconclusive. "Not assessed" and "inconclusive" are kept separate from "pass" so a permission gap or a failed query is reported as such instead of as a clean result. PowerShell 7, read-only against Microsoft Graph and Exchange Online. Controls are mapped to CIS Microsoft 365 Foundations v7, CISA SCuBA and NIST SP 800-53, with Conditional Access and Intune checklists aligned to Maester, and the output is a client-facing report. Public and under active development.',
    problem:
      'An assessment is only useful if its findings are accurate. The tool has to tell a confirmed gap apart from a collection error or a control nobody assessed, and a missing license should not be reported as a failing control.',
    role: "My project, published as TenantPosture. I design, write, and test it, and I'm working through its false findings myself.",
    deliverable:
      'A read-scope assessment run over 253 controls, each with framework references, reported with distinct result states and gated by a Pester test suite.',
    built: [
      'Collectors for Microsoft Graph, Exchange Online, Purview, Teams, SharePoint, Intune device compliance, and DNS, using read scopes for assessment runs',
      'Distinct result states, including not assessed and error, so a failed collection is never reported as a pass',
      'Framework references on each of 253 controls, as mapping context rather than a compliance verdict',
      "License-aware scoring, so controls the tenant isn't licensed for are separated from the score instead of counted as gaps",
      "Manual-review entries for controls that can't be checked automatically, with statuses such as not implemented, compensating control, and risk accepted",
    ],
    validation: [
      'A Pester suite of about 3,700 tests across 145 files, run as one gate; the repository records CI as not executed on recent runs because of a GitHub Actions billing restriction',
      "An accuracy review documented in the repository found about 31 controls returning results the collected data didn't support: 13 were fixed to read real data, 16 now report not assessed, 2 were null-guarded",
      'The root cause of a collector error that reported zero Global Admins on a tenant that had several is documented and fixed',
    ],
    limitations: [
      'Framework references are mapping context. The tool does not certify compliance or evaluate a whole framework automatically',
      'No live validation against a seeded test tenant yet, as recorded in the repository',
      'Separate, clearly labeled baseline scripts in the same repository do change tenant configuration; they are not part of an assessment run',
    ],
    status: 'published',
    link: 'https://github.com/Blackvectra/TenantPosture',
    linkLabel: 'View the project',
    topics: ['Microsoft Graph', 'Entra ID', 'Microsoft 365', 'Intune', 'Read-only'],
  },
  {
    id: 'entra-passkey-readiness',
    title: 'Entra passkey readiness',
    category: 'Identity · Microsoft Entra ID',
    summary:
      'A read-only PowerShell 7 assessment that identifies which Entra ID users are exposed to the retirement of Microsoft-provided SMS and voice authentication, and which of them are ready for passkeys. Five scripts assess one tenant, sweep many, compare runs, roll results up into an HTML estate report, and offer a small GUI. Version 1.0.0 was released in August 2026 and development continues.',
    problem:
      "The Entra portal doesn't directly answer which specific users are both targeted by the SMS and voice authentication methods policy and unable to satisfy MFA without it once those methods retire. Finding them by hand across a tenant, or across many tenants, is slow and error-prone.",
    role: 'My project. I wrote and tested it.',
    deliverable:
      'Five scripts that assess one tenant, sweep many, compare runs, roll results up into an HTML estate report, and offer a GUI, all through read-only Graph calls.',
    built: [
      "A per-tenant assessment that cross-references the authentication methods policy with each user's registered methods to find who is exposed and who is passkey-ready",
      'A multi-tenant sweep, a run-to-run comparison, and an HTML estate roll-up for reporting across tenants',
      'A WPF front end for running the sweep without the command line',
      'Read-only by design. The only non-GET Graph call is the $batch envelope, which carries GET requests',
      'Synthetic example tenants and documented usage, under an MIT license',
    ],
    validation: [
      '384 Pester tests across 23 files, run in CI on every push',
      'A changelog from 1.0.0 onward records what each change fixed',
    ],
    limitations: ['Client-side only; it reports exposure and readiness and changes nothing in the tenant'],
    status: 'published',
    link: 'https://github.com/Blackvectra/entra-passkey-readiness',
    linkLabel: 'View the project',
    topics: ['Microsoft Graph', 'Entra ID', 'MFA', 'Passkeys', 'PowerShell'],
  },
  {
    id: 'nextlayersec-guides',
    title: 'Blue-team guides and detections',
    category: 'Detection engineering · Knowledge base',
    summary:
      'A blue-team knowledge base published as a documentation site, with detections kept as code alongside incident-response playbooks, hardening guides, and plain-language framework explainers. Twelve KQL queries, twelve Sigma rules, and a YARA rule are validated for structure in CI, and the repository runs CodeQL, OpenSSF Scorecard, secret scanning, and OSV dependency scanning against itself.',
    problem:
      "Detection rules and response playbooks scattered across notes and tickets drift out of date and can't be tested. Keeping them in a repository with validators and CI means a broken rule or a stale page fails a check instead of surviving unnoticed.",
    role: "Written and maintained by me under the NextLayerSec name. It's reference material, not a product.",
    deliverable:
      'A versioned, CI-checked knowledge base with 12 KQL and 12 Sigma detections, a YARA rule, Python validators, and a published documentation site.',
    built: [
      'Detections as code: 12 KQL queries, 12 Sigma rules, and a YARA rule, with Python validators that check their structure',
      'Incident-response playbooks and detection workflows',
      'Hardening guides and explainers for NIST CSF, MITRE ATT&CK, ISO 27001, IRS 1075, and SOC 2',
      'A MkDocs Material site deployed from the repository',
      'Repository hygiene workflows: CodeQL, OpenSSF Scorecard, secret scanning, and OSV dependency scanning',
    ],
    validation: [
      'Pytest suites for the content and rule validators, run with lint and content-correctness checks on every push',
      'CodeQL, Scorecard, secret-scan, and OSV workflows run against the repository itself',
    ],
    limitations: [
      'The framework explainers are summaries for orientation, not compliance guidance',
      'Rules are validated for structure in CI; they are not run against live telemetry there',
    ],
    status: 'published',
    link: 'https://github.com/Blackvectra/nextlayersec-guides',
    linkLabel: 'View the repository',
    extraLinks: [{ label: 'Read the docs', href: 'https://blackvectra.github.io/nextlayersec-guides/' }],
    topics: ['KQL', 'Sigma', 'YARA', 'Python', 'MkDocs'],
  },
  {
    id: 'dmarc-enforcement-methodology',
    title: 'DMARC enforcement methodology',
    category: 'Email security · Method',
    summary:
      'A repeatable method for moving a domain to DMARC enforcement without breaking legitimate mail: build an inventory of every sender, move policy in stages from monitoring to quarantine to reject, and define rollback criteria before each step. Published so far: the staged rollout schedule from monitoring to quarantine to reject and the notes on reading aggregate reports, in the email security repository. Sender-inventory templates and a worked example are still to come.',
    problem:
      'Moving straight to p=reject breaks any legitimate sender that is not aligned. Staying at p=none indefinitely leaves the domain open to spoofing.',
    role: 'Written by me, from the rollouts on my own domains, and published in the email security repository.',
    deliverable:
      'A staged rollout schedule from monitoring to quarantine to reject, with rollback criteria defined before each step, plus notes on reading aggregate reports.',
    built: [
      'The staged rollout schedule, with entry criteria and a rollback trigger for each stage',
      'Notes on setting up DMARC aggregate reporting and reading the reports',
    ],
    validation: ['Applied on my own domains as part of the email security build above'],
    limitations: ['Sender-inventory templates and a worked example are still to come'],
    status: 'in-progress',
    link: 'https://github.com/Blackvectra/nextlayersec-email-security/tree/main/dmarc',
    linkLabel: 'Read the current notes',
    topics: ['DMARC', 'SPF', 'DKIM', 'Sender inventory', 'Rollback'],
  },
] satisfies Project[];
