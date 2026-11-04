# Paywall Core

## Metadata

| Field | Value |
|---|---|
| id | paywall-core |
| version | 2.2.18 |
| parent_core | business-core |
| project | Navorina |
| last_updated | 2026-10-26 |

## Purpose

Контекст tier→feature access, upgrade surfaces и server entitlement enforcement.

## Scope

### In Scope

- Free/Plus/Pro and legacy tier normalization
- Server checks, workspace tier context and upgrade prompts
- Packaging consistency tests

### Out of Scope

- Stripe event processing
- AI usage counters
- Crypto settlement

## Key Entities

| Entity | Description |
|---|---|
| Feature matrix | Executable tier policy |
| Upgrade prompt | Client conversion surface |

## Invariants

- Worker `plan-entitlements.ts` / `plan-limits.ts` are executable truth; disabled UI is not security.
- Free / Pro / Plus names, stored tiers and prices have one tested mapping; legacy aliases → Plus.
- Copy sells only what is live; the rest says "soon" (`docs/product/PLANS.md`).
- Plus sells "API and webhooks" (live, B4); `/api/v1` checks Plus on every call.
- Plus sells "Team of 5 with roles" (live, Team 4a/4b; Company and Nonprofit workspaces); USDC and payouts still say "soon".

## Exclusions

- Marketing claims without matrix support
- Secrets and generated output

## Typical Outputs

- Tier/feature, gating or packaging-mismatch review

## Sources

| Type | Reference | Description |
|---|---|---|
| policy | cloudflare/worker/src/plan-entitlements.ts | Server gate |
| plans | docs/product/PLANS.md | Packaging and copy |
