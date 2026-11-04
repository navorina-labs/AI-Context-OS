# Canonical and Stale Documentation Map

**Last reviewed:** 2026-08-15

## Canonical hierarchy

| Decision | Canonical source | Secondary/history |
|---|---|---|
| Current shipped product | `docs/planning/CURRENT_PRODUCT_HANDOFF.md` | Weekly notes and release snapshots |
| Current priorities | `docs/planning/roadmap/2026-CURRENT-YEAR-PLAN.md` | `docs/planning/NAVORINA_ROADMAP_TIMELINE.md` compatibility pointer and `archive-legacy-2026-06/` |
| Product scope/non-goals | `docs/planning/PRD_NAVORINA.md` | Archived ideas and legacy monoliths |
| Planning navigation | `docs/planning/README.md`, `docs/planning/INDEX.md` | Individual legacy phase documents |
| Runtime architecture | `docs/architecture/OVERVIEW.md` + code | Historical architecture notes |
| AgentsOS boundary | `docs/architecture/AGENTS_OS_WORKSPACE.md` | Standalone pre-migration repository |
| Design tokens/components | `Navorina/css/variables.css` + `docs/design-system/` | `docs/reference/css/VARIABLES.md` |
| Paywall enforcement | `server/paywall/index.js` | Marketing copy and archived tier notes |
| Local setup | `docs/setup/START_HERE.md` | Narrow troubleshooting notes |
| Release | `docs/planning/operations/release-checklist.md` | Legacy when-ready checklists |
| Agent context | `context-os/CANON.md` → router → selected core | Archived prototype cores |

## Deliberate compatibility layers

| Path | Status | Rule |
|---|---|---|
| `docs/planning/NAVORINA_ROADMAP_TIMELINE.md` | Compatibility pointer | Do not add current planning content |
| `docs/planning/archive-legacy-2026-06/` | Read-only history | Use only when current docs explicitly link to legacy phase detail |
| `docs/archive/real-project-test/` | Archived Context OS prototype | Never route new questions here |
| `docs/archive/optimization/` | Historical debugging | Never treat as current runbook |
| `archive/research/project-universe-research/` | Archived research prototype | Not product or Context Agent runtime |

## Resolved stale signals

- Root `package.json` now positions Navorina as Crypto / Fin Hub.
- Root README no longer presents the repository as an offline-first voice
  assistant.
- `server/paywall.js` has been removed; `server/paywall/index.js` is canonical.
- Universe research has one tracked canonical archive location.
- AgentsOS reusable agents and Navorina product agents now have an explicit
  ownership boundary.

## Still requires periodic review

| Cluster | Risk | Owner/check |
|---|---|---|
| 236+ Markdown files under `docs/` | Agents may select a legacy document | Planning index + Context Agent router/drift |
| Firebase/Supabase/local storage docs | Mixed-era persistence guidance | Technical Core + architecture docs |
| Voice/offline model guides | Feature-level guidance may outlive current runtime | Assistant Core; never use for product positioning |
| Benchmark screenshots | Large context and repository weight | Load only from explicit benchmark task |
| AGENTS/ops shards/setup docs | Operational facts can be copied three times | Keep AGENTS as router/index; detailed truth in ops/runbooks |

## Review rule

Before creating a new product or operations document:

1. identify the decision owner in this table;
2. update the canonical source when the decision already belongs there;
3. use a new file only for a bounded domain with a named owner;
4. add a pointer from the relevant index/core;
5. add a drift pattern when code should force the document/core to change.

## Sources

| Type | Reference | Description |
|---|---|---|
| canon | context-os/CANON.md | Context and source hierarchy |
| planning | docs/planning/README.md | Planning architecture |
| cleanup | context-os/audit/cleanup-candidates.md | Retention/removal decisions |
| architecture | docs/architecture/OVERVIEW.md | Runtime source hierarchy |
