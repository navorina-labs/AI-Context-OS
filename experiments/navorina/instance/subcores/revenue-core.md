# Revenue Core

## Metadata

| Field | Value |
|---|---|
| id | revenue-core |
| version | 2.2.18 |
| parent_core | business-core |
| project | Navorina |
| last_updated | 2026-10-26 |

## Purpose

Контекст revenue drivers, subscription conversion, churn и monetization dependencies.

## Scope

### In Scope

- Plus/Pro revenue-bearing features
- Subscribe→paid→retained funnel
- Product usage signals, AI/provider costs and live gaps

### Out of Scope

- Webhook implementation
- Pixel-level pricing UI
- Full product map

## Key Entities

| Entity | Description |
|---|---|
| MRR | Live recurring subscription revenue |
| Upgrade | Free→paid entitlement transition |
| Retention | Repeated value after activation |
| Paid feature | Tier-bound capability with measurable adoption |

## Invariants

- Revenue separates payment state, entitlement, refund, churn and usage.
- Emulator/test transactions are excluded from live MRR.
- Paid proposals name tier, signal, expected effect and delivery cost.
- Removal cannot cross revenue/retention dependency without evidence.

## Current Monetization Snapshot

- Conversion path is registration → explicit Free/compare choice → Plans →
  Billing review → Stripe Checkout → signed webhook entitlement.
- Pro monetizes connected data and recurring intelligence; Plus monetizes
  operational execution, team workflows, invoice/payment rails and handoff.
- Yearly pricing is $23/month equivalent for Pro and $79/month equivalent for
  Plus; checkout and receipts retain the yearly billing interval.
- Test/emulator activation proves workflow behavior but never counts as MRR or
  controlled live-payment evidence.

## Exclusions

- Speculative revenue without product evidence
- Secrets and generated data

## Typical Outputs

- Revenue-driver/leakage analysis; Tier monetization assessment; Evidence-backed churn hypothesis

## Sources

| Type | Reference | Description |
|---|---|---|
| scope | docs/planning/PRD_NAVORINA.md | Metrics and boundaries |
| roadmap | docs/planning/roadmap/2026-CURRENT-YEAR-PLAN.md | Monetization state |
| tracking | docs/tracking/EVENT_TRACKING_SETUP.md | Events |
| packaging | server/paywall/index.js | Paid feature matrix |
| plan | docs/planning/strategy/BUSINESS_PLAN_2026-10.md | Revenue layers, costs, 50/200/1000 scenarios, break-even |
