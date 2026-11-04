# UI Reliability Core

## Metadata

| Field | Value |
|---|---|
| id | ui-reliability-core |
| version | 1.1.70 |
| parent_core | product-core |
| project | Navorina |
| last_updated | 2026-10-26 |

## Purpose

Контекст глобальных UI-контрактов, landing/mobile previews, skeleton lifecycle,
iOS embedded WebViews и доказательства визуального результата.

## Scope

### In Scope

- Tables, islands, filters and other shared UI primitives
- Landing iframe previews and dedicated mobile mockups
- Skeleton ownership, ready/replay state and animation isolation
- Responsive, theme and embedded-browser verification
- UI asset cache chains from source to public domain

### Out of Scope

- Product prioritization
- Financial API and durable data semantics
- Provider credentials

## Key Entities

| Entity | Description |
|---|---|
| Shared primitive | Table, island, filter or control owned by the design system |
| Consumer inventory | Every canonical route that renders a shared primitive |
| Preview | Landing iframe or dedicated mobile mockup with its own ready lifecycle |
| Loading owner | The single layer that renders the skeleton for a surface |
| Production evidence | Rendered proof from the public target at the deployed revision |

## Invariants

- “Everywhere” requires a complete canonical consumer inventory and a shared owner.
- Table and island content inset is `24px` on every side unless a compact variant is documented.
- Pagination is visible only when `totalRows > 10`, including filtered and empty states.
- One layer owns loading; parent and child do not render competing skeletons.
- Ready state never waits for timers, animation frames, transitions or storytelling.
- Preview animation may fail without hiding the usable interface.
- Section previews replay on the same document from a neutral state; only the first load shows a skeleton.
- Mobile previews use the dedicated phone application and support both themes.
- Every choice and confirmation in the phone is one bottom sheet (`openAppSheet` in `mobile-kit.js`): it replaces an open one, Escape and the scrim close it, and a step inside it closes it before opening a screen.
- A file from the phone (Reports month pack) goes to the system share sheet (`shareFile` in `mobile-kit.js`); without one it downloads.
- Dashboard Upcoming and the phone's Money card read one route (`/api/nucleus/upcoming`, worded by `shared/finance/upcoming.mjs`) and render one DS card (`products/design-system/shared/upcoming-card.js`); empty and error are the inline zero (one line), and loading is that line when the card was empty last time on this device.
- Zero states are three kinds of `products/design-system/shared/zero-state.css` (owner, 2026-10-26): island `.nv-zero` (compact: 96×64 figure, title, one line, one action), inline `.nv-zero--inline` / `--card` / `--match` (one line under the card head, no figure, head link `[data-nv-island-link]` hidden), page `.nv-zero-page` (not found and error: title, one line, one action, one left column). Guard: `Navorina/scripts/zero-card-canon.test.mjs`, e2e `e2e/local/dashboard-order.spec.ts`.
- Dashboard order (DS Home → Dashboard, 2026-10-22): main Balance → Needs attention → Upcoming → Recent activity; aside Accounts → Runway → Get started; the month row under both, so one column (and the phone's Money tab) reads main → aside → month. Needs attention reads `/api/nucleus/attention` (`shared/finance/attention.mjs`) with the Upcoming card rows, hides when empty, and owns overdue invoices (Upcoming leaves them out). No quick-actions grid, no first-value hero; first paint keeps every island in place (welcome bones only for the welcome shape, attention and Get started at their last height).
- K8 hidden sections: owner pages never hide demo blocks under CSS. A block is built on Worker data with a DS card (Income health: `products/design-system/shared/income-health.js` from `/api/nucleus/income-sources`) or deleted with its markup, CSS and legacy script; the first paint is the loading card, never sample numbers.
- K8 Taxes: the tax calendar (`products/design-system/shared/tax-calendar.js`) reads `/api/nucleus/tax-obligations`, keeps its rows on the card so ‹ › never refetch, and drives the table filters; loading keeps six weeks of bones and no month name.
- K8 Budget: Budget health (`products/design-system/shared/budget-health.js`) takes totals from the `/api/nucleus/budgets` summaries (each expense once, even when budgets overlap) and names over-limit budgets from the rows.
- K8 Insights: the owner page is stats, the currency table, Spending, Subscriptions and the digest card; there is no hidden demo view left to show in demo mode.
- K8 Accounting: the landing preview (`landing-accounting-preview.html` → `accounting.html`) renders the sample answer through the live code; in sample mode the month close is a static DS view and nothing calls the API.
- K8 Operations: the owner page is the stats row and Activity at full width; the hidden ledger, queue, reconciliation health and actions card are deleted.
- K8 Invoicing: the landing preview (`landing-invoicing-preview.html`) renders sample invoices through the live module; its walkthrough uses the live status filter, and the Accounting walkthrough clicks Close month on the DS card in sample mode.
- A production claim requires evidence from the public target, not only source or build output.
- Asset cache versions are content hashes stamped by the build (`scripts/content-hash-assets.cjs`); sources never carry `?v=` and nobody bumps import chains by hand.

## Required Codex skills

| Trigger | Skill |
|---|---|
| Shared/global UI, tables, islands, spacing | `$navorina-ui-parity` |
| Preview, iframe, mockup, skeleton, iOS/WebView | `$navorina-preview-reliability` |
| Push, publish, cache mismatch, production proof | `$navorina-production-proof` |

Load all applicable skills when one task crosses these boundaries.

## Exclusions

- Visual redesigns without a shared-primitive owner
- Page-local overrides that bypass the design system
- Backend, ledger and provider behaviour

## Typical Outputs

- UI acceptance contract and route inventory
- Shared primitive change with regression test
- Preview lifecycle diagnosis and failure-mode test
- Production evidence separating build, push, deploy and rendered verification

## Sources

| Type | Reference | Description |
|---|---|---|
| incident | docs/agents/retrospectives/2026-10-14-ui-preview-reliability.md | Failure analysis and prevention rules |
| workflow | docs/agents/AGENT_HUB.md | UI execution order |
| design | docs/design-system/UX_PRINCIPLES.md | Product interaction canon |
| release | context-os/subcores/release-core.md | Release evidence boundary |
| runtime | Navorina/js/mobile-app-entry.js | Mobile preview entry and ready lifecycle |
| shell | Navorina/js/landing-preview-responsive.js | Landing preview selection and responsive ownership |
| runtime | Navorina/js/landing-preview-demo.js | Cursor stories, neutral restore and in-place replay |
| tests | Navorina/scripts/mobile-product.test.mjs | Mobile preview structural contract |
| build | scripts/content-hash-assets.cjs | Content-hash `?v=` for every local asset reference in build/ |

