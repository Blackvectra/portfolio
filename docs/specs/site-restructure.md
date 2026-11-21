# Spec: site restructure

Implements decisions 2, 7 and 1 of [ADR 0001](../decisions/0001-portfolio-direction.md).

## Tickets

1. **Capability areas.** Add a required `area` field to `Project` in
   `src/data/projects.ts`, using a closed union of the five areas.
   `/projects/` renders one section per non-empty area, in a fixed order,
   with an h2 per area and h3 per project. Anchors (`#<id>`) keep working.
2. **Hide planned work.** Pages show only `in-progress` and `published`
   projects. The `planned` status stays in the type so backlog items can be
   drafted in data without appearing on the site. Blocked by: none.
3. **Merge the DMARC card.** Fold `dmarc-enforcement-methodology` into
   `email-security-build`: the staged rollout and report-reading notes become
   built items, unpublished parts become limitations, and the DMARC notes
   link becomes an extra link. Update About page links. Keep the old anchor
   working by pointing it at the email card's anchor. Blocked by: 1.
4. **Case-study kind for writing.** Add an optional `kind` (`'article' |
   'case-study'`, default `'article'`) to the writing collection schema.
   Writing index and post pages show a "Sanitized case study" label for
   case studies. Update `case-study-template.md` to set the kind and list
   the evidence rules from the ADR. Blocked by: none.

## Acceptance

- `npm run check`, `npm run build` and `npm run check:inline` pass.
- `/projects/` shows Email Security and Assessment Tooling groups only.
- `/projects/#dmarc-enforcement-methodology` still lands on the email card.
- No visible change to NextLayerSec placement (already footer and About only).
