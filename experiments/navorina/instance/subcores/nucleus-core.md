# Nucleus Core

## Metadata

| Field | Value |
|---|---|
| id | nucleus-core |
| version | 2.2.121 |
| parent_core | product-core |
| project | Navorina |
| last_updated | 2026-10-28 |

## Purpose

Контекст Financial Mirror, Nucleus domain pages, ledger, invoicing, payments и month close.

## Scope

### In Scope

- Financial Mirror persistence, hub modules
- Payments, invoices/quotes, crypto collections, accounting and Insights
- Reconciliation, month lock, snapshot, accountant pack

### Out of Scope

- Stripe subscriptions
- Standalone Assistant stack
- Aggregate release orchestration

## Key Entities

| Entity | Description |
|---|---|
| Ledger | User-scoped transactions; inbox groups by purchase |
| Invoice | Lifecycle; Viewed annotates Sent; one reminder per slot; template |
| Month close | Reconcile→snapshot→brief→lock→export |
| Crypto evidence | Provider/chain-observed payment and balance state |

## Invariants

- Mutations are user-scoped and durable before UI success; unresolved
  entitlement renders empty/loading, not paid data.
- Partial payment never closes an invoice; only drafts are edited or deleted (sent ones are voided).
- Only standalone manual transactions are deleted; clients and items archive, never delete.
- Month-close partial failure is visible and retryable.
- Crypto truth is provider/chain evidence, not synthetic balance.
- Modern domain pages are canonical; legacy shell is regression-only.

## Exclusions

- Legacy prototypes and generated output
- Subscription/customer billing state

## Typical Outputs

- Page→hub→API→ledger journey trace
- Integrity/retry analysis
- Month-close or invoice acceptance criteria

## Sources

| Type | Reference | Description |
|---|---|---|
| truth | docs/planning/CURRENT_PRODUCT_HANDOFF.md | Current journeys |
| roadmap | docs/planning/roadmap/2026-CURRENT-YEAR-PLAN.md | Operability state |
| persistence | docs/architecture/DATA_STORAGE_AND_FLOW.md | Workspace contract |
| client | Navorina/src/utils/financial-mirror.ts | FM core |
