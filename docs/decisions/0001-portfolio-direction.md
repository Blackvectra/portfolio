# 0001: Portfolio direction

Date: 2026-11-21. Status: accepted.

Decided in a planning interview, informed by
[security-engineer-portfolio-gaps.md](../research/security-engineer-portfolio-gaps.md).

## Context

The site listed three projects, all Microsoft 365 or email security. The
research found employers asking most for detection engineering, incident
response, infrastructure-as-code, identity engineering and tested automation.

## Decisions

1. **Audience.** Hiring managers for security engineer roles come first.
   NextLayerSec stays in the footer and on the About page, never in project
   cards.
2. **Evidence bar.** A *project* needs a public repository. A *case study* is a
   sanitized write-up with no repository. It contains no client or employer
   identifiers, keeps observation apart from interpretation, and states its
   limitations. Case studies live under Writing, labelled as such.
3. **Employer work.** Nothing from NRG is published until NRG's policy on it
   is confirmed. Gaps are filled with personal lab work first.
4. **Upkeep.** Each month: one new or updated item, plus a backlog review.
   The backlog is GitHub issues labelled `idea`, `project`, `writing` and `site`.
5. **Project priority.** Projects are ranked on relevance to work at NRG,
   employer demand, and new learning:
   1. BEC and token-theft investigation (simulated attack, hunting queries,
      IR playbook, write-up)
   2. Detections-as-code: Sigma is the portable source of truth and KQL runs
      against Defender XDR and Sentinel, with an ATT&CK coverage map and CI
   3. Conditional Access and PIM architecture as code, verified by
      TenantPosture

   Backlog: drift monitor, Azure landing zone, SOAR playbooks, vulnerability
   management workflow, AI-assisted triage, a non-Microsoft SIEM (Wazuh or
   Elastic), and an email-auth lab.
6. **Lab.** A new Microsoft 365 / Entra trial tenant with nextlayersec.co as
   its only custom domain, and fake users only. The .dev and .io tenants are
   never used for simulations. Simulated phishing stays inside the tenant.
   SPF, DKIM and DMARC are published on .co from day one. The domain is
   removed before the trial expires. SIEM: Sentinel connected to Defender XDR,
   with a budget alert on the Azure subscription. Current trial and pricing
   terms must be checked before provisioning.
7. **Site structure.** `/projects/` is grouped by capability area: Identity &
   Access, Email Security, Detection & Response, Cloud & Infrastructure, and
   Assessment Tooling. Empty groups are hidden. Planned work is not shown on
   the site; it lives in the backlog. The DMARC methodology card is merged
   into the email security card.

## Consequences

- The site will look thinner until projects 1–3 ship. That is preferable to
  advertising unbuilt work.
- Each new project lives in its own repository and adds a card here when it
  is published.
