# Security Engineer Portfolio: Expectations and Gap Analysis

Researched 2026-11-21. All sources accessed 2026-11-21 unless noted.

**Conventions used here**
- **[Fact]** means the source says it. The source is named next to the claim.
- **[Inference]** means it is my own reading or synthesis.
- Task and skill IDs are copied from the NICE Framework Components v2.2.0 JSON file published by NIST. None of them were typed from memory.

**Portfolio under review**
- Read-only Microsoft 365/Entra assessment tooling: PowerShell and Microsoft Graph, with mappings to NIST 800-53, CIS, SCuBA, CMMC and HIPAA.
- Email security work: DNSSEC, SMTP DANE, MTA-STS, TLS-RPT and DMARC.

---

## 1. NICE Framework (NIST SP 800-181 Rev 1, Components v2.2.0)

### Source
- **[Fact]** NIST's NICE Framework "Current Version" page links the v2.2.0 components JSON:
  - Current Version page: https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center/current-version
  - JSON file: https://csrc.nist.gov/csrc/media/Projects/cprt/documents/nice/v2-2-0_nf_components.json
  - The JSON's document record names the publication "Workforce Framework for Cybersecurity (NICE Framework) (NIST SP 800-181 Rev 1)", version 2.2.0.
  - It contains 42 work roles, 962 tasks, 693 knowledge statements, 556 skill statements and 11 competency areas.
- **[Fact]** The NICCS work-role pages are rendered with JavaScript, so their role lists could not be retrieved:
  - https://niccs.cisa.gov/workforce-development/nice-framework/work-roles
  - https://www.niccs.cisa.gov/tools/nice-framework/work-role

  Those pages state that their data is NICE Framework Components v2.2.0, the same data as the JSON file.
- **[Fact]** v2.2.0 has **no work role named "Systems Security Engineering"**. The nearest roles are DD-WRL-004 Secure Systems Development and IO-WRL-006 Systems Security Analysis.

### Work roles that fit "security engineer" ([Inference] on fit; definitions are [Fact])

| ID | Work role | NICE definition (verbatim) | Counts (tasks / skills / knowledge) |
|---|---|---|---|
| DD-WRL-004 | Secure Systems Development | "Responsible for the secure design, development, and testing of systems and the evaluation of system security throughout the systems development life cycle." | 73 / 40 / 117 |
| DD-WRL-001 | Cybersecurity Architecture | "Responsible for ensuring that security requirements are adequately addressed in all aspects of enterprise architecture, including reference models, segment and solution architectures, and the resulting systems that protect and support organizational mission and business processes." | 50 / 48 / 120 |
| IO-WRL-006 | Systems Security Analysis | "Responsible for developing and analyzing the integration, testing, operations, and maintenance of systems security. Prepares, performs, and manages the security aspects of implementing and operating a system." | 44 / 18 / 86 |
| PD-WRL-001 | Defensive Cybersecurity | "Responsible for analyzing data collected from various cybersecurity defense tools to mitigate risks." | 43 / 38 / 124 |
| PD-WRL-003 | Incident Response | "Responsible for investigating, analyzing, and responding to network cybersecurity incidents." | 29 / 23 / 54 |
| PD-WRL-007 | Vulnerability Analysis | "Responsible for assessing systems and networks to identify deviations from acceptable configurations, enclave policy, or local policy. Measure effectiveness of defense-in-depth architecture against known vulnerabilities." | 15 / 18 / 63 |
| OG-WRL-012 | Security Control Assessment (adjacent) | "Responsible for conducting independent comprehensive assessments of management, operational, and technical security controls and control enhancements employed within or inherited by a system to determine their overall effectiveness." | (not extracted) |

### Key task and skill statements ([Fact] verbatim; [Inference] on which are "key")

**Secure Systems Development (DD-WRL-004)**
- T0122 Implement security designs for new or existing systems
- T1148 Develop systems security design documentation
- T1138 Create system testing and validation procedures and documentation
- T1118 Identify vulnerabilities
- T1119 Recommend vulnerability remediation strategies
- T1161 Resolve system vulnerabilities
- T1522 Determine if systems meet minimum security requirements
- T1586 Conduct cybersecurity risk assessments
- T1132 Design system data backup capabilities
- T1150 Test disaster recovery and continuity of operations plans for systems prior to deployment
- T0084 Employ secure configuration management processes
- Skills:
  - S0532 Skill in analyzing software configurations
  - S0543 Skill in scanning for vulnerabilities
  - S0428 Skill in designing architectures

**Cybersecurity Architecture (DD-WRL-001)**
- T1264 Identify gaps in security architecture
- T1527 Define baseline system security requirements
- T1519 Design system security measures
- T1434 Create cybersecurity architecture functional specifications
- T1423 Create system security concept of operations (ConOps) documents
- T1361 Determine the impact of new system and interface implementations on organization's cybersecurity posture
- T1265 Develop a cybersecurity risk management plan
- T1126 Determine disaster recovery and continuity of operations system requirements
- Skills:
  - S0418 Skill in applying secure network architectures
  - S0853 Skill in performing cybersecurity architecture analysis

**Systems Security Analysis (IO-WRL-006)**
- T0309 Assess the effectiveness of security controls
- T1548 Determine adequacy of access controls
- T1437 Determine effectiveness of configuration management processes
- T1218 Integrate automated capabilities for updating or patching system software
- T1173 Determine that the application of security patches for commercial products meets timeline requirements
- T1539 Analyze organizational cybersecurity posture trends
- T1541 Develop system security posture trend reports
- T1574 Develop risk acceptance documentation for senior leaders and authorized representatives
- T1533 Test failover for system operations transfer to alternative sites

**Defensive Cybersecurity (PD-WRL-001)**
- T0020 Develop content for cyber defense tools
- T1406 Construct cyber defense network tool signatures
- T1347 Detect cybersecurity attacks and intrusions
- T1348 Distinguish between benign and potentially malicious cybersecurity attacks and intrusions
- T1112 Validate network alerts
- T1350 Perform continuous monitoring of system activity
- T1391 Reconstruct malicious attacks
- T0164 Perform cyber defense trend analysis and reporting
- Skills:
  - S0566 Skill in developing signatures
  - S0567 Skill in deploying signatures
  - S0866 Skill in performing log file analysis
  - S0572 Skill in detecting host- and network-based intrusions

**Incident Response (PD-WRL-003)**
- T1250 Perform cyber defense incident triage
- T1252 Determine the scope, urgency, and impact of cyber defense incidents
- T1315 Track cyber defense incidents from initial detection through final resolution
- T1316 Document cyber defense incidents from initial detection through final resolution
- T1370 Collect intrusion artifacts
- T1256 Perform forensically sound image collection
- T1332 Produce incident findings reports
- T1485 Prepare after action reviews (AARs)
- T1251 Recommend incident remediation strategies
- Skills:
  - S0805 Skill in designing incident responses
  - S0806 Skill in performing incident responses

**Vulnerability Analysis (PD-WRL-007)**
- T1619 Perform risk and vulnerability assessments
- T1091 Perform authorized penetration testing on enterprise network assets
- T1069 Evaluate organizational cybersecurity policy regulatory compliance
- T1279 Prepare audit reports
- T1620 Recommend cost-effective security controls
- Skills:
  - S0588 Skill in performing threat modeling
  - S0641 Skill in reviewing logs
  - S0804 Skill in assessing an organization's threat environment

---

## 2. Employer job postings (first-party ATS / career pages)

### How the postings were collected
- **[Fact]** Each posting was retrieved on 2026-11-21 from the employer's own applicant-tracking board. Greenhouse postings came from `boards-api.greenhouse.io/v1/boards/<employer>/jobs/<id>`. Lever postings came from `api.lever.co/v0/postings/<employer>/<id>`.
- No aggregator site was used as a source.
- The "Updated/created" column is the timestamp the ATS returned.

| # | Employer (sector) | Posting | URL | Updated/created (per ATS) |
|---|---|---|---|---|
| 1 | Avertium (MSSP, Microsoft practice) | CyberSecurity Engineer \| Microsoft | https://jobs.lever.co/avertium/239fa674-6b92-49cb-8536-78eafa25474a | created 2026-08 (epoch 1787173805673) |
| 2 | Avertium (MSSP) | CyberSecurity Consultant \| Microsoft Azure | https://jobs.lever.co/avertium/2780d41d-d4c3-46c0-ab0e-bcee60b1188a | created 2025-05 (epoch 1747411158469) |
| 3 | Coalfire (security services / managed VM) | Security Engineer (ConMon) | https://jobs.lever.co/coalfire/20c11af4-9b77-4865-97c9-641de598a4b7 | created 2024-04 (epoch 1713379989948); still listed |
| 4 | Databricks (cloud/enterprise) | Sr. Security Engineer, Enterprise Security | https://databricks.com/company/careers/open-positions/job?gh_jid=8841962002 | 2026-11-19 |
| 5 | Samsara (enterprise) | Senior Security Engineer - Enterprise Security | https://www.samsara.com/company/careers/roles/8223369?gh_jid=8223369 | 2026-11-11 |
| 6 | Coinbase (enterprise) | Security Engineer, Corporate Security | https://www.coinbase.com/careers/positions/8319444?gh_jid=8319444 | 2026-10-30 |
| 7 | Cloudflare (cloud) | Security Engineer (IAM) | https://boards.greenhouse.io/cloudflare/jobs/8124227?gh_jid=8124227 | 2026-11-09 |
| 8 | PagerDuty (cloud SaaS) | Senior Security Engineer - Cloud Security | https://job-boards.greenhouse.io/pagerduty/jobs/6211202004 | 2026-10-08 |
| 9 | Vercel (cloud) | Security Engineer, Cloud | https://job-boards.greenhouse.io/vercel/jobs/6102335004 | 2026-10-30 |
| 10 | Robinhood (enterprise/fintech) | Senior Security Engineer, Detection & Response | https://boards.greenhouse.io/robinhood/jobs/8202863?gh_jid=8202863 | 2026-10-30 |
| 11 | Airbnb (enterprise) | Senior Security Engineer, Threat Detection & Incident Response | https://careers.airbnb.com/positions/8374537?gh_jid=8374537 | 2026-11-11 |
| 12 | Twilio (cloud) | Security Engineer, Incident Response | https://job-boards.greenhouse.io/twilio/jobs/8055481 | 2026-11-20 |

### Postings excluded or not retrieved (not fabricated)
- **Zscaler, "Information Security Engineer"** (greenhouse id 5302790007): the body is template placeholder text ("Responsibility 1", "MQ 1"), so it was excluded.
- **Cyderes, "Security Engineer II – Microsoft Sentinel SIEM"** and **Core BTS, "Senior Engineer - M365 Security"**: web search found Lever URLs for both, but the Lever API returned 404, most likely because the postings had closed. Neither was used.
- **Netrix**: the Breezy URL resolved to a job index page, not a posting. Not used.
- **Gap in coverage**:
  - Only two employers are MSP/MSSP (Avertium, Coalfire). Small-MSP postings tend to sit on ATSs without public APIs, which may explain the shortfall.
  - Several postings are senior level (5–8+ years).

### Recurring requirements ([Fact] per posting; tally and grouping are [Inference])

| Theme | Postings that state it (by #) | Example wording (verbatim) |
|---|---|---|
| Scripting / production automation (Python, Go, PowerShell) | 1, 4, 5, 6, 7, 8, 11 | #4: "Strong programming and automation skills using Python, Go, or comparable languages, including API integrations, infrastructure-as-code, and version control." #1: "Some automation or scripting experience with Regex and PowerShell." |
| Detection engineering / SIEM content / threat hunting | 1, 8, 10, 11, 12 | #10: "Build, tune, and maintain our global detection catalog…"; #1: "Experience with Kusto Query Language (KQL)." |
| Incident response, on-call, RCAs, IR documentation | 8, 10, 11, 12 (and 1) | #12: "Own the security incident lifecycle… participate in RCAs"; #12: "craft best practices as runbooks and standard operating procedures" |
| SOAR / response automation | 5, 10, 11, 12 | #12: "Experience with SOAR tools and automating manual security processes" |
| Infrastructure as code / policy as code (Terraform, OPA) | 4, 5, 7, 8, 9 | #9: "Harden infrastructure components using infrastructure-as-code, policy enforcement, and service isolation." |
| Cloud security (AWS/Azure/GCP, K8s) | 2, 8, 9, 10, 11, 12 | #8: "Harden … AWS and Kubernetes environments against CIS Benchmarks, DISA STIGs, and FedRAMP Moderate … proving results through evidence" |
| Identity / IAM / Zero Trust (SSO, OAuth, PAM, PIM) | 2, 4, 6, 7, 8, 9 | #7: "Build SSO integrations leveraging SAML, OIDC, OAuth, and SCIM"; #2 required: "Microsoft Azure, Microsoft 365, Microsoft Entra, Identity & Access Management (IAM)" |
| Continuous control validation, drift detection, compliance evidence | 3, 4, 8 | #4: "Automate recurring configuration checks, access validation, evidence collection, and remediation workflows"; "Experience developing automated security checks, configuration validation, drift detection, and remediation workflows." |
| Vulnerability management (scanning, CVSS, POA&M) | 3, 5, 10 | #3: "Create a Plan of Action and Milestones (POAM) based on customer scan data."; "Knowledge of vulnerability scoring systems (CVSS/CMSS)." |
| Standards and frameworks (CIS, NIST, HIPAA, FedRAMP, MITRE ATT&CK) | 1, 2, 3, 8, 11 | #2: "Ability to apply industry standards and best practices (such as CIS, NIST, PCI, HIPAA, etc)"; #11: "Knowledge and familiarity of the Cyber Kill Chain Framework and MITRE ATT&CK Framework" |
| AI / agentic security automation | 4, 6, 7, 8, 10, 12 | #4: "Hands-on experience building or integrating AI-assisted or agent-based security automation, including appropriate access controls, testing, monitoring, and auditability." |
| Endpoint security (EDR, Intune/MDM) | 2 (Intune pref.), 5, 6 | #5: "Hands-on experience operating and maintaining endpoint security and visibility tools at enterprise scale" |
| Software engineering hygiene (tests, CI/CD) | 4, 8, 9 | #4: "Experience applying reliable software engineering practices, including automated testing, CI/CD, error handling, and operational monitoring." |
| Documentation, architecture diagrams, runbooks, client communication | 1, 3, 5, 12 | #1: "Ability to create internal documentation including architectural diagrams." |
| Email security named explicitly | 5 (as one option) | #5: "…such as Secure Access Service Edge (SASE), zero trust systems, email security, Data Loss Prevention (DLP)…" |
| Microsoft certs | 1 (preferred) | #1: "Microsoft Certifications (AZ500,MS500, SC200, SC100) preferred." |
| Microsoft security stack (Defender XDR, Sentinel, Purview, Intune, PIM) | 1, 2 (MSSP); 8 ("Azure security exposure (Entra ID, Defender for Cloud) a plus") | see #2 preferred competencies list |

**[Inference] What the postings show**
- Across all three sectors, the dominant asks are:
  1. Code-based automation of controls.
  2. Detection and response, including on-call IR.
  3. IaC and cloud hardening.
  4. Identity engineering.
- Compliance mapping shows up as **evidence produced by automation**, not as a standalone skill. See #4 and #8.
- Email-protocol security is named explicitly in only one of 12 postings, and there only as one option among several.

---

## 3. First-party workforce and hiring guidance

**ISC2 2025 Cybersecurity Workforce Study** (https://www.isc2.org/Insights/2025/12/2025-ISC2-Cybersecurity-Workforce-Study)
- **[Fact]** Per ISC2's article, hiring managers named cloud security (29%), AI (27%) and security engineering (24%) as priority technical skills.
- **[Fact]** ISC2 reports that "AI was the most pressing skills need (41%)… followed by cloud security (36%)."
- **[Fact]** The most highly rated AI-specific skill was "the ability to use AI in threat detection and response" (42%).
- **[Fact]** ISC2 also says "the top five skills hiring managers are looking for were all nontechnical skills", with problem-solving first.
- **Caveat:** this page was read through an automated fetch-and-summarize tool. Check the exact figures against the page before quoting them publicly.
- The article does not discuss portfolios or projects.

**Not retrieved**
- SANS and CISA guidance specifically about how to *demonstrate* skills, such as portfolio advice, was not found in a first-party form within this session's scope, so no claim is made about it.
- [Inference] CISA/NICCS does provide the NICE TKS statements themselves (section 1). Those statements are the closest primary source for "evidence of competence".

---

## 4. Gap analysis

Ratings describe what the portfolio **demonstrates publicly**, not what the author can do. All ratings are [Inference].

| Area (NICE role / posting theme) | Rating | Rationale |
|---|---|---|
| Control assessment and configuration analysis (OG-WRL-012; IO-WRL-006 T0309, T1548; DD-WRL-004 T1522; S0532) | **Covered** | Read-only M365/Entra assessment against baselines is exactly "assess the effectiveness of security controls" and "determine adequacy of access controls". |
| Framework / regulatory mapping (PD-WRL-007 T1069, T1279; postings #2, #3, #8) | **Covered** | Mappings to NIST 800-53/CIS/SCuBA/CMMC/HIPAA. |
| Scripting and API automation (postings 1, 4–8, 11) | **Covered → partial** | PowerShell + Graph is directly relevant. Postings also ask for Python/Go, automated tests and CI/CD (#4, #8, #9), which are not shown. |
| Secure protocol / network architecture (DD-WRL-001 S0418; DNS/mail transport) | **Partial** | Email transport security shows protocol depth. Only one posting names email security. |
| Posture trend reporting (IO-WRL-006 T1539, T1541) | **Partial** | Point-in-time assessment exists. Trend over time and drift detection (#4) are not shown. |
| Remediation / implementing controls (DD-WRL-004 T0122, T1161; IO-WRL-006 T1563; #4 "turn requirements into working protections") | **Not shown** | The tooling is read-only by design, so nothing demonstrates designing and deploying controls. |
| Security architecture design docs (DD-WRL-001 T1434, T1423, T1264; #1 "architectural diagrams") | **Not shown / partial** | Gap findings exist, but there is no target-state architecture, ConOps or decision record. |
| Detection engineering / signatures / log analysis (PD-WRL-001 T0020, T1406, S0566, S0866; postings 1, 8, 10–12) | **Not shown** | No KQL/Sigma detections, tuning or ATT&CK coverage. |
| Incident response (PD-WRL-003 T1250, T1332, T1485, S0806; postings 8, 10–12) | **Not shown** | No IR playbooks, findings reports or after-action reviews. |
| SOAR / response automation (#5, #10–12) | **Not shown** | |
| IaC / policy as code / cloud hardening (#4, #5, #7–9) | **Not shown** | No Terraform/Bicep, Azure Policy or pipeline. |
| Vulnerability management (PD-WRL-007 T1619; DD-WRL-004 T1119; #3 POA&M, CVSS) | **Partial** | Config findings with remediation advice exist. Software and CVE vulnerability workflow, prioritisation and POA&M are not shown. |
| Identity engineering (CA, PIM, workload identities, SSO) (#2, #4, #7) | **Partial** | Entra is assessed. Designing CA/PIM and fixing workload identity is not demonstrated. |
| Endpoint (Intune / Defender for Endpoint) (#2, #5, #6) | **Not shown** | Unless the assessment covers Intune. |
| Resilience / backup / DR (DD-WRL-004 T1132, T1150; DD-WRL-001 T1126) | **Not shown** | Lower priority in postings. |
| AI-assisted security automation (#4, #6–8, #10, #12; ISC2) | **Not shown** | Appears in 6 of 12 postings and in ISC2's top needs. |

---

## 5. Proposed portfolio projects

Effort estimates are [Inference] and assume one person working evenings or weekends against a free M365 developer or Azure trial tenant.

### 1. KQL detection-engineering repo for M365/Entra ("detections-as-code")
- **Gap it fills:**
  - Detection engineering (PD-WRL-001 T0020, T1406, S0566/S0567, S0866).
  - Postings #1 (KQL), #8, #10, #12.
- **Deliverable:**
  - About 15–25 Sentinel/Defender XDR analytics rules in YAML covering Entra and M365 attack paths, for example:
    - Consent phishing / illicit OAuth grant
    - MFA method registration from a new location
    - Inbox forwarding rules
    - Privileged role assignment outside PIM
    - Token replay
    - Service principal credential addition
  - Each rule carries an ATT&CK mapping, a false-positive note and test data.
  - A GitHub Actions pipeline validates the KQL schema and deploys the rules.
- **Evidence it produces:**
  - Rule files and a CI badge.
  - An ATT&CK coverage matrix.
  - A tuning log showing before/after alert volume, using simulated events.
  - Links back to the controls your assessment tool checks, showing "prevent" alongside "detect".
- **Effort:** 3–5 weeks.

### 2. Incident-response case studies (simulated BEC and token theft) with after-action reviews
- **Gap it fills:**
  - Incident Response (PD-WRL-003 T1250, T1252, T1316, T1332, T1370, T1485; S0805/S0806).
  - Postings #10–#12.
- **Deliverable:**
  - Two or three lab-reproduced incidents in a test tenant, for example an AiTM-style session theft leading to an inbox rule and internal phishing.
  - A written IR playbook.
  - A KQL investigation notebook.
  - A timeline and a findings report.
  - An AAR with control improvements, linked to findings from the assessment tool.
- **Evidence it produces:**
  - Redacted reports in NIST SP 800-61-style phases.
  - Hunting queries.
  - Containment steps scripted in PowerShell/Graph: revoke sessions, reset, remove rules.
- **Effort:** 2–4 weeks.

### 3. Conditional Access / Zero Trust reference architecture as code
- **Gap it fills:**
  - Architecture design (DD-WRL-001 T1434, T1519, T1527, T1264).
  - Identity engineering (#2, #4, #7).
  - Moves the portfolio from "assess" to "implement" (DD-WRL-004 T0122).
- **Deliverable:**
  - A persona-based CA policy set: admins, users, guests, workload identities and break-glass accounts.
  - The policy set expressed as code with Microsoft Graph, PowerShell or Terraform `azuread`, with report-only → enforce rollout.
  - A PIM role design.
  - An architecture doc with diagrams and decision records.
  - A What-If test matrix.
- **Evidence it produces:**
  - Diagrams and ADRs.
  - A deployable policy JSON and a test matrix.
  - A before/after re-run of your assessment tool showing findings closed. This directly closes the loop with the existing work.
- **Effort:** 3–4 weeks.

### 4. Azure landing-zone hardening with IaC and policy as code
- **Gap it fills:**
  - IaC and cloud hardening (#4, #5, #7–#9).
  - Systems Security Analysis T1437 and T1218.
  - CIS and NIST evidence generated from code (#8).
- **Deliverable:**
  - Terraform or Bicep for a small MSP-style landing zone: management groups, Azure Policy initiatives (CIS / NIST 800-53 built-ins), Defender for Cloud, diagnostic settings to Log Analytics, Key Vault, and private endpoints.
  - CI with Checkov or tfsec, plus a policy-compliance export.
- **Evidence it produces:**
  - Pipeline runs and scanner results.
  - A compliance score delta.
  - A control-to-code mapping table reusing your existing framework mappings.
- **Effort:** 3–5 weeks.

### 5. Multi-tenant posture drift monitor (an MSP evolution of the existing tool)
- **Gap it fills:**
  - Trend and drift (IO-WRL-006 T1539, T1541; #4 "drift detection… evidence collection").
  - Software-engineering hygiene (#4 automated testing, CI/CD).
- **Deliverable:**
  - Scheduled runs of the existing assessment across several tenants via GDAP / multi-tenant app.
  - Results stored as versioned JSON.
  - A diff and alert on regressions.
  - A trend dashboard.
  - Pester tests and CI for the module.
- **Evidence it produces:**
  - Test coverage and a CI badge.
  - Sample trend reports.
  - A threat model of the tool itself: least-privilege Graph scopes and secret handling.
- **Effort:** 2–3 weeks.

### 6. Guarded auto-remediation and SOAR playbooks
- **Gap it fills:**
  - SOAR and response automation (#5, #10–#12).
  - Implementing controls (DD-WRL-004 T1161; IO-WRL-006 T1559).
- **Deliverable:**
  - Logic Apps or Azure Functions playbooks triggered by Sentinel incidents or by drift findings, for example:
    - Disable a risky OAuth app
    - Remove a malicious inbox rule
    - Re-enable an MFA CA policy
    - Set DMARC to the intended policy via the DNS provider API
  - Each playbook has approval gates and rollback.
- **Evidence it produces:**
  - Playbook templates (ARM/Bicep).
  - Run histories.
  - A safety design doc covering approvals, scope limits and audit logging.
- **Effort:** 2–4 weeks.

### 7. Vulnerability-management workflow for an MSP client base
- **Gap it fills:**
  - Vulnerability Analysis (PD-WRL-007 T1619, T1620).
  - DD-WRL-004 T1119.
  - Posting #3 (POA&M, CVSS, CIS baseline scans) and #5.
- **Deliverable:**
  - Pull Defender Vulnerability Management (or open-source scanner) findings through APIs.
  - Enrich with CISA KEV and EPSS.
  - Apply a documented prioritisation policy.
  - Generate POA&M-style reports and SLA tracking per client.
- **Evidence it produces:**
  - The prioritisation rules.
  - A sample POA&M.
  - Before/after risk metrics.
  - Mapping to NIST 800-53 RA-5 and SI-2, which reuses your existing mappings.
- **Effort:** 2–3 weeks.

### 8. (Optional) AI-assisted triage, with guardrails
- **Gap it fills:** AI in detection and response (ISC2 2025; postings #4, #6–#8, #10, #12).
- **Deliverable:**
  - An LLM-assisted triage helper that summarises Sentinel incidents and drafts IR notes from project 1 and 2 data.
  - An evaluation set, least-privilege access and a written prompt-injection threat model.
- **Evidence it produces:**
  - Evaluation results, comparing accuracy against a human baseline.
  - A threat model document.
- **Effort:** 2–3 weeks.

### Suggested order ([Inference])
1. Project 3 (Conditional Access), which converts existing findings into implementation.
2. Project 1 (detections) and project 2 (IR), which fill the largest and most frequently requested gap.
3. Project 4 (IaC) and project 5 (drift monitor).
4. Projects 6–8.

The email-security work is best kept as a depth showcase. Folding DMARC/TLS-RPT report ingestion into project 1 (detections) or project 5 (drift monitor) would tie it to detection and monitoring.

---

## 6. Limitations
- Twelve postings form a small, non-random sample, and senior roles dominate it. Only two of the twelve employers are MSP/MSSP.
- Posting timestamps are as the ATS reports them. The Coalfire posting was created in 2024 but was still live on the date of access.
- The NICCS interactive pages could not be rendered. The NICE data comes from the NIST JSON file instead (same version, v2.2.0).
- No first-party SANS or CISA "how to demonstrate skills" guidance was retrieved. The ISC2 figures came through a summarising fetch and should be verified against the page.
