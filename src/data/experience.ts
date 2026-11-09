// Work experience, shown as highlights on the home page and in full on About.
//
// These describe work done in employment, at the level of detail of a
// resume: no client names, no tenant identifiers, no internal details.
// Personal projects live in projects.ts; keep the two apart.

export const role = {
  title: 'Security Engineer I',
  employer: 'NRG Technology Services',
  employerKind: 'managed service provider',
  period: 'May 2023 to present',
} as const;

export interface ExperienceEntry {
  /** Stable id, used as the anchor on /about/ (e.g. /about/#endpoint-modernization). */
  id: string;
  /** Short label for the badge column. */
  area: string;
  title: string;
  /** One or two sentences: what I did. */
  summary: string;
  /** Detail shown on About only. */
  points: string[];
  tools: string[];
}

export const experience: ExperienceEntry[] = [
  {
    id: 'endpoint-modernization',
    area: 'Endpoint',
    title: 'Endpoint protection modernization',
    summary:
      'Led the move from Webroot to Microsoft Defender for managed clients, including an Attack Surface Reduction rule baseline for Windows endpoints.',
    points: [
      'Built the ASR rule baseline with impact validation and exclusion tuning before enforcement',
      'Wrote the rollout guidance used to deploy it',
    ],
    tools: ['Microsoft Defender', 'Attack Surface Reduction', 'Windows'],
  },
  {
    id: 'email-migration',
    area: 'Email',
    title: 'Email filtering migration and DMARC enforcement',
    summary:
      'Migrated managed clients from Proofpoint to Defender email filtering and drove SPF, DKIM, and DMARC enforcement across client domains.',
    points: [
      'Configured and tuned the anti-spam and anti-phishing policies',
      'Stood up a dedicated phishing triage mailbox across client tenants',
    ],
    tools: ['Microsoft Defender', 'SPF', 'DKIM', 'DMARC'],
  },
  {
    id: 'identity-hardening',
    area: 'Identity',
    title: 'Identity and access security across 35 tenants',
    summary:
      'Administer Microsoft 365 and Entra ID security across 35 client tenants, from sign-in policy to privileged access.',
    points: [
      'Conditional Access, MFA, and passwordless sign-in with Windows Hello for Business',
      'Privileged Identity Management for just-in-time admin elevation',
      'Single sign-on app integrations over SAML and OIDC',
      'Intune MDM and MAM, and Purview DLP, for HIPAA-regulated clients',
    ],
    tools: ['Entra ID', 'Conditional Access', 'PIM', 'Intune', 'Purview DLP'],
  },
  {
    id: 'detection-triage',
    area: 'Detection',
    title: 'Detection triage and investigation',
    summary:
      'Monitor, investigate, document, and escalate detections in Microsoft Defender and Cortex XDR, including state and public sector environments.',
    points: [
      'Enrich investigations with VirusTotal, IP and domain reputation, and Wireshark',
      'Review sign-in and audit logs during investigations',
    ],
    tools: ['Microsoft Defender', 'Cortex XDR', 'VirusTotal', 'Wireshark'],
  },
  {
    id: 'assessment-tooling',
    area: 'Assessment',
    title: 'NIST-aligned assessment tooling',
    summary:
      'Develop and maintain a NIST-aligned security assessment tool used to evaluate client environments.',
    points: [
      'Identifies control gaps and documents evidence limitations and exceptions',
      'Prioritizes remediation recommendations from the findings',
    ],
    tools: ['PowerShell', 'Microsoft Graph', 'NIST'],
  },
];
