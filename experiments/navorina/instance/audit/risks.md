# Current Risks

**Last reviewed:** 2026-08-15

Риски ниже описывают текущее состояние, а не исторический phase backlog.

## Business

| Risk | Evidence | Impact |
|---|---|---|
| Live subscription cutover remains | Stripe account/readiness contracts exist; production webhook, entitlement and revenue/refund QA remain | Implemented billing does not yet prove recurring production revenue |
| Crypto and fiat rails need controlled pilots | Direct-chain and provider-neutral contracts are implemented; live adapters/pilots remain gated | Core money journeys cannot be marketed as generally live |
| GTM evidence is behind product operability | Founder cohorts and retention gates remain in current-year sequence | Risk of building breadth without proving repeated value |
| Provider/compliance dependency | Fiat and crypto availability depends on written eligibility, adapters and approvals | Timeline and geographic scope remain externally constrained |

## Product

| Risk | Evidence | Impact |
|---|---|---|
| Two product shells | Dashboard and Nucleus share capabilities but still have shell-specific adapters and remaining duplicate paths | Behavior and copy can drift |
| Large Nucleus surface | 45 `nucleus-*-hub.ts` modules plus modern entry adapters | High cognitive load and inconsistent state handling |
| Legacy regression surface remains locally | `nucleus-legacy-regression.html` is localhost-only pending final persistence evidence | Old behavior can be mistaken for current product truth |
| i18n mirrors can drift | EN/RU/ES pages and copy contracts are not uniformly generated | Broken or inconsistent localized journeys |
| Live-readiness language | Code, emulator, demo, pilot and production are separate states | Users/operators may infer availability that is not proven |

## Technical

| Risk | Evidence | Impact |
|---|---|---|
| Multiple persistence layers | Firestore, Supabase, local stores and localStorage have different responsibilities | Isolation, restore and split-brain defects |
| Compiled output is tracked | `Navorina/dist-ts/` coexists with TypeScript source | Stale client code if compile/build drift gates are skipped |
| Money-rail complexity | Idempotency, reservations, migrations, reconciliation, webhooks and emergency controls cross domains | Small contract drift can create financial inconsistency |
| AgentsOS migration is still active | Workspace source and root CI were added recently; standalone checkout is retained temporarily | Duplicate ownership or release assumptions |

## Operational

| Risk | Evidence | Impact |
|---|---|---|
| External credentials and approvals | Stripe, Push, Xero, crypto and fiat providers have separate readiness gates | Partial configuration can look like a complete release |
| Demo/production confusion | Both environments are deployed, but demo is simulated and intentionally blocks live egress | Wrong environment may be used as live evidence |
| Long aggregate verification | Full product, integrations, E2E and agent checks are independent and expensive | Developers may run an incomplete subset |
| Documentation volume | 236+ Markdown files remain despite canonical routing | Stale documents can still override current evidence if routing is bypassed |
| Context drift enforcement was previously absent | Context Agent found old routing schema and no drift config before 2026-08-15 migration | Future source changes need CI enforcement to keep cores trustworthy |

## Priority order

1. Complete controlled crypto/fiat pilots without weakening fail-closed gates.
2. Complete Stripe production webhook, entitlement and revenue/refund evidence.
3. Preserve identity/data isolation across every persistence adapter.
4. Finish AgentsOS migration verification.
5. Enforce Context Agent check, lifecycle and drift in root CI.

## Sources

| Type | Reference | Description |
|---|---|---|
| product truth | docs/planning/CURRENT_PRODUCT_HANDOFF.md | Shipped state and open evidence |
| roadmap | docs/planning/roadmap/2026-CURRENT-YEAR-PLAN.md | Current sequence and live boundaries |
| architecture | docs/architecture/OVERVIEW.md | Runtime contracts |
| agents | docs/architecture/AGENTS_OS_WORKSPACE.md | Workspace migration status |
| release | docs/planning/operations/release-checklist.md | Operational gates |
