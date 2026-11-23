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

/** Capability areas, in the order /projects/ renders them. */
export const projectAreas = [
  'Identity & Access',
  'Email Security',
  'Detection & Response',
  'Cloud & Infrastructure',
  'Assessment Tooling',
] as const;
export type ProjectArea = (typeof projectAreas)[number];

export interface Project {
  /** Stable id, used as the anchor on /projects/ (e.g. /projects/#email-security-build). */
  id: string;
  title: string;
  /** Capability area the project is grouped under on /projects/. */
  area: ProjectArea;
  /** Former ids that should still resolve as anchors (e.g. after a merge). */
  aliases?: string[];
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

export const projects: Project[] = [
  {
    id: 'hybrid-identity-lab',
    area: 'Identity & Access',
    title: 'Hybrid identity lab: Active Directory to Microsoft Entra ID',
    category: 'Identity · Entra Connect Sync',
    summary:
      'A VMware lab connecting on-premises Active Directory to Microsoft Entra ID with Entra Connect Sync, built to test each hybrid identity flow from the user side and to work out what evidence proves it. Tested password hash sync, self-service password reset with writeback, and Kerberos Seamless SSO on an AD-joined client. Identifiers in the public repository are anonymized.',
    problem:
      "Hybrid identity features are easy to switch on and easy to misread: a successful sync run, a password-free page, or a reset confirmation doesn't show which flow worked. Each one needs its own test and its own evidence.",
    role: 'Personal lab, built and documented by me on a domain I own. Not a client or employer environment.',
    deliverable:
      'A rebuild guide, test procedures, a troubleshooting log, and an evidence register that separates captured results from operator-confirmed ones.',
    built: [
      'A domain controller, a separate Entra Connect Sync member server, and a Windows 11 client, with sync scoped to one lab OU',
      'Password hash sync, password writeback, and Seamless SSO, with the SSO Group Policy scoped to the lab OU',
      'Test procedures for each flow, written so an existing session or a Success label cannot pass for a result',
      'A read-only PowerShell check of DNS discovery, Connect staging state, the SSO computer account and key age, and device and token state',
    ],
    validation: [
      'Password hash sync: the changed AD password worked in a fresh cloud sign-in (operator-confirmed)',
      'Writeback: a credentialed query to the domain controller succeeded with the new SSPR password (operator-confirmed)',
      'Seamless SSO: a captured Kerberos ticket for the SSO endpoint with no Entra join or PRT on the device, plus a password-free browser sign-in',
      'Read-only validation script run on all three machines: DNS discovery, Connect active and not staged, SSO computer account enabled, and the SSO ticket re-observed in the synced user’s session',
      'The validation run found the sync server’s secure channel failing and the domain time root on an unsynced hardware clock; both were fixed and the troubleshooting is documented',
    ],
    limitations: [
      'One forest, one synchronized test user, one group: a learning lab, not a production migration or rollout',
      'The client is AD joined only; Entra hybrid device join and Autopilot are not claimed',
      'Some results are operator-confirmed rather than captured; the evidence gaps are listed in the repository',
    ],
    status: 'published',
    link: 'https://github.com/Blackvectra/hybrid-identity-lab',
    linkLabel: 'View the lab',
    topics: ['Entra Connect Sync', 'Password hash sync', 'SSPR writeback', 'Seamless SSO', 'Kerberos'],
  },
  {
    id: 'email-security-build',
    aliases: ['dmarc-enforcement-methodology'],
    area: 'Email Security',
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
      'A staged DMARC enforcement method: monitoring to quarantine to reject, with entry criteria and a rollback trigger defined before each stage',
    ],
    validation: [
      'Verified against public DNS and the live MTA-STS policy host, with the validation output documented in the repository',
      "Documented checks against MXToolbox's MTA-STS lookup, Verisign's DNSSEC analyzer, and Exchange Online PowerShell",
      'Markdown lint and link checks run on every push',
    ],
    limitations: [
      'Two further domains are recorded in the repository as in progress',
      'Deployed on my own domains, not in a client or employer environment',
      'DMARC sender-inventory templates and a worked example are still to come',
    ],
    status: 'published',
    link: 'https://github.com/Blackvectra/nextlayersec-email-security',
    linkLabel: 'View the framework',
    extraLinks: [
      {
        label: 'Read the DMARC enforcement notes',
        href: 'https://github.com/Blackvectra/nextlayersec-email-security/tree/main/dmarc',
      },
    ],
    topics: ['DNSSEC', 'SMTP DANE', 'MTA-STS', 'TLS-RPT', 'DMARC', 'Exchange Online'],
  },
  {
    id: 'entra-passkey-readiness',
    area: 'Identity & Access',
    title: 'Entra SMS and voice retirement and passkey readiness assessment',
    category: 'Entra ID · Assessment tooling',
    summary:
      'A read-only PowerShell 7 assessment that finds which Entra ID users are exposed to the retirement of Microsoft-provided SMS and voice authentication and which already have a passkey. It reports two populations that are easy to conflate: users the SMS and voice policy targets, and users with a phone method registered. It also reports separately the narrower set whose only MFA-capable method is a phone. Every Microsoft Graph call is a GET.',
    problem:
      'The Entra portal does not show which specific users are both targeted by the SMS and voice policy and unable to satisfy MFA without it after the retirement date, which is the list that decides who is blocked at sign-in.',
    role: 'Sole author and maintainer. Public under the MIT license; the published sample output is generated from fictional data.',
    deliverable:
      'Per-user CSVs, an HTML report, a multi-tenant sweep and an estate roll-up, all from GET-only Graph reads.',
    built: [
      'Per-user policy-scope resolution through nested groups and exclusions, alongside method registration from the registration report',
      'A count of users whose only MFA-capable method is a phone, kept separate from the risk bands',
      'Privileged-account discovery by role assignment (active, PIM-eligible and PIM for Groups) that withholds the targeting exports when any read is incomplete, instead of reporting an empty list',
      'A multi-tenant sweep with optional concurrency, an assessment comparison, an estate roll-up page and a Windows GUI',
      'A remediation script written to disk for a person to review and run, rather than any write from the tool',
      'CSV formula and HTML escaping for display names that reach files another person opens',
    ],
    validation: [
      'A Pester suite and PSScriptAnalyzer run in CI on every push and weekly, because the code branches on hardcoded retirement dates',
      'Published samples are regenerated from the script\'s own functions, and a test fails if a regeneration differs',
      'End-to-end tests run the full script against a stubbed Graph tenant, including runs where role or PIM reads are refused',
    ],
    limitations: [
      'No results from a live tenant are published; the repository holds fictional sample output only',
      'Conditional Access is not evaluated, so policy scope is not the same as effective sign-in behavior',
      'The registration report is not real-time, and disabled users are not assessed',
      'Guest passkey readiness is on a separate Microsoft timeline and needs independent validation',
    ],
    status: 'published',
    link: 'https://github.com/Blackvectra/entra-passkey-readiness',
    linkLabel: 'View the project',
    topics: ['Entra ID', 'Microsoft Graph', 'Passkeys', 'PowerShell', 'Read-only'],
  },
  {
    id: 'm365-entra-assessment-tool',
    area: 'Assessment Tooling',
    title: 'Microsoft 365 and Entra security assessment tool',
    category: 'Microsoft 365 · Assessment tooling',
    summary:
      'A read-only assessment tool that collects tenant configuration through Microsoft Graph and reports each check as pass, fail, not applicable, not assessed, or inconclusive. "Not assessed" and "inconclusive" are kept separate from "pass" so a permission gap or a failed query is reported as such instead of as a clean result. PowerShell 7, read-only against Microsoft Graph and Exchange Online. Controls are mapped to NIST SP 800-53, CIS, CISA SCuBA, CMMC, and the HIPAA Security Rule, with Conditional Access and Intune checklists aligned to Maester, and the output is a client-facing report. Public and under active development.',
    problem:
      'An assessment is only useful if its findings are accurate. The tool has to tell a confirmed gap apart from a collection error or a control nobody assessed, and a missing license should not be reported as a failing control.',
    role: "Published as TenantPosture; it is the assessment tool I develop and maintain at work, under a new name. I design, write, and test it, and I'm working through its false findings myself.",
    deliverable:
      'A read-scope assessment run over 253 controls, each with framework references, reported with distinct result states and gated by a Pester test suite.',
    built: [
      'Collectors for Microsoft Graph, Exchange Online, Purview, Teams, SharePoint, Intune device compliance, and DNS, using read scopes for assessment runs',
      'Distinct result states, including not assessed and error, so a failed collection is never reported as a pass',
      "Framework references on each of 253 controls, as mapping context rather than a compliance verdict: NIST SP 800-53 Rev 5 and CMMC 2.0 Level 2 on every control, the HIPAA Security Rule on 242, CIS Controls v8.1 on 229, CIS Microsoft 365 Foundations v7.0.0 on 119 where the check matches the benchmark's audit, and CISA SCuBA on 90",
      'Framework reports from the same run: a HIPAA Security Rule readiness report covering its 63 standards and implementation specifications, a system security plan against all 110 NIST SP 800-171 Rev 2 requirements for CMMC Level 2, and NIST SP 800-53 results by control family',
      "License-aware scoring, so controls the tenant isn't licensed for are separated from the score instead of counted as gaps",
      "Manual-review entries for controls that can't be checked automatically, with statuses such as not implemented, compensating control, and risk accepted",
    ],
    validation: [
      'A Pester suite of about 3,700 tests across 145 files, run as one gate; the repository records CI as not executed on recent runs because of a GitHub Actions billing restriction',
      "An accuracy review documented in the repository found about 31 controls returning results the collected data didn't support: 13 were fixed to read real data, 16 now report not assessed, 2 were null-guarded",
      'The root cause of a collector error that reported zero Global Admins on a tenant that had several is documented and fixed',
      'A framework-accuracy suite checks every CISA SCuBA citation against the ScubaGear policy list and every CIS Controls v8.1 citation against the safeguard list, plus CMMC domains and levels, so a wrong citation fails the pull request',
      "A HIPAA citation review removed or replaced 17 citations that did not describe what the control's check examines",
    ],
    limitations: [
      'Framework references are mapping context. The tool does not certify compliance or evaluate a whole framework automatically',
      'The HIPAA readiness report is not a HIPAA risk analysis or a compliance determination. It covers what Microsoft 365 configuration can show and lists the documentation the client still owns',
      'No live validation against a seeded test tenant yet, as recorded in the repository',
      'Separate, clearly labeled baseline scripts in the same repository do change tenant configuration; they are not part of an assessment run',
    ],
    // Hidden until the repository is public. It carries employer branding and
    // ADR 0001 item 3 keeps NRG work off the site until NRG's policy is
    // confirmed. Set back to 'published' only when both are settled.
    status: 'planned',
    link: 'https://github.com/Blackvectra/TenantPosture',
    linkLabel: 'View the project',
    extraLinks: [{ label: 'Read the accuracy review', href: '/writing/tenantposture-accuracy-review/' }],
    topics: ['Microsoft Graph', 'Entra ID', 'Microsoft 365', 'Intune', 'Read-only'],
  },
];

/** Projects shown on the site. Planned work lives in the backlog, not here. */
export const visibleProjects = projects.filter((p) => p.status !== 'planned');
