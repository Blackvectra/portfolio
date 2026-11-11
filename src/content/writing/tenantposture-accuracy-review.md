---
title: "Auditing my own assessment tool for false findings"
date: 2026-11-10
summary: "TenantPosture once reported zero Global Administrators on a tenant that had several. Tracing that one wrong answer turned into a review of every collector, evaluator, and framework citation in the tool, and a rule I now build by: an empty result is not a clean one."
description: "How one wrong answer, zero Global Administrators on a tenant that had several, led to an audit of every check in my Microsoft 365 assessment tool."
status: published
---

TenantPosture is the read-only Microsoft 365 assessment tool I develop and use at work. Its job is to tell someone what their tenant actually enforces. A tool like that has one failure worse than crashing: reporting something confidently that is not true. This is the review that started the day it did exactly that.

Every item below is **Completed** unless it is marked **Proposed**.

## Objective

Find every way a run could report a result the collected data did not support, and either fix it or make the tool say it could not tell.

- **In scope:** the tool itself, across four layers: collection, evaluation, framework mapping, and scoring. The tool had 195 controls at the time; it has 253 now.
- **Out of scope:** any client's security posture. No client data appears here.

## The finding that started it

A run against a real tenant reported **zero Global Administrators**. The tenant had several. About 20 Graph collectors had come back empty in the same run, and the evaluators scored every empty result as a gap.

The cause took three steps to become a wrong answer:

1. The collectors called `Invoke-MgGraphRequest` without pinning `-OutputType`. Newer Microsoft Graph SDK builds return a `PSCustomObject` by default.
2. Reading `@odata.nextLink` on that object throws under `Set-StrictMode -Version Latest` when the property is absent, and it is absent on any single-page response, which is the normal case on a small tenant.
3. Each collector caught the exception and returned empty data. The evaluator read "empty" as "none" and scored it.

So "I could not read the role assignments" became "there are no administrators." Nothing crashed, nothing warned, and the report looked normal.

**Fix:** every Graph call now goes through one thin wrapper that pins the output shape, regardless of which SDK version is installed. At the time that covered all 48 collector call sites. The core of it:

```powershell
$splat = @{
    Uri        = $Uri
    Method     = $Method
    OutputType = $OutputType
}
if ($PSBoundParameters.ContainsKey('Headers')) {
    $splat['Headers'] = $Headers
}

return Invoke-MgGraphRequest @splat
```

`$OutputType` defaults to `HashTable`, a test pins that default, and no collector calls `Invoke-MgGraphRequest` directly. DNS collection also gained a fallback through Graph's verified-domains list, so SPF, DMARC, and DNSSEC still collect when Exchange Online is unavailable.

## What the evaluation audit found

One root cause in collection raised the obvious question: what else reads data wrong? The evaluation audit was AI-assisted. Five agents cross-checked every evaluator's data reads against what each collector actually stores. About 31 controls were producing results that did not depend on the tenant's data, in three classes:

- **A helper that could not see hashtable keys (18 call sites).** The safe-property reader looked at `PSObject.Properties`, which does not expose hashtable keys, so every read of a rebuilt hashtable silently returned the default value. Those reads moved to a dictionary-aware reader.
- **Key and path drift.** Evaluators reading a field under a different name than the collector stored it. The worst case: a guest account holding Global Administrator was reported **Satisfied**, because the evaluator looked for `RoleName` and `UserType = 'Guest'` while the collector stored `RoleDefinitionName` and the guest marker (`#EXT#`) in the user principal name.
- **Controls reading data no collector gathers (16 controls).** These returned the same answer on every tenant, and five of them returned Satisfied: a pass for something nobody checked. All 16 now report "data not collected; not assessed" instead of a verdict.

In total: 13 controls were corrected to read real data, 16 now report not assessed, and 2 gained null guards.

## Framework citations are claims too

A citation tells a reader which requirement a check supports. A wrong one is a false statement in the report, so the mappings got the same treatment.

- **CISA SCuBA:** 26 policy IDs were wrong. They were corrected, and later re-checked against the released ScubaGear 2.0.0 baselines.
- **CIS Controls v8.1:** a new mapping was added to all 195 controls of the time and validated against the 153 published safeguards.
- **HIPAA Security Rule:** a later review removed or replaced 17 citations that did not describe what the control's check examines. Without it, the HIPAA readiness view would have marked a requirement satisfied on a check that had nothing to do with it.

A test suite now checks SCuBA and CIS Controls citations against bundled copies of the source lists, and NIST SP 800-53 references for format, so a wrong citation fails the pull request instead of reaching a report.

## Why "not assessed" has to be visible

Moving a control to not assessed takes it out of the score's denominator. That is correct: a tool failure is not the client's gap. But it creates a new problem. A control that silently stops producing a verdict makes the score go **up**, and nothing in the report says why.

The tool now has an Assessment Scope and Limitations section directly under the score. It names every unscored control and the reason, such as licensing, collection incomplete, no automated check, or no result at all. The counts have to add up to the number of unscored controls, so a control cannot go quiet without being listed.

## How I build it now

- **Empty is not clean.** The rule now is that a collector running several independent queries reports each one's status as collected, failed, or not run, and an evaluator about to pass a control on an empty list checks that status first.
- **Unknown is its own answer.** "Not assessed," with the reason, is never folded into a pass or a fail.
- **Test both directions.** The highest-stakes controls are run against a known-compliant tenant, which must report Satisfied, and a known-vulnerable one, which must report a gap. A control that always fails burns trust; one that always passes is false assurance.

## Limitations

- The fixes are pinned by tests against stubbed services and fixture data shaped like real API responses. Validation against a seeded test tenant, where every expected answer is known in advance, has not been done yet.
- When the review was written, the CMMC and HIPAA citations had not been audited. HIPAA has been since; CMMC citations are checked for domain and level only.
- **Proposed:** adding collection for the 16 controls that now report not assessed is per-control work. Some, such as priority accounts, have it now; the rest are still listed as not assessed rather than guessed.
