# Billing Core

## Metadata

| Field | Value |
|---|---|
| id | billing-core |
| version | 2.2.14 |
| parent_core | technical-core |
| project | Navorina |
| last_updated | 2026-10-26 |

## Purpose

Контекст Stripe Checkout, webhooks, subscription state и billing emulator.

## Scope

### In Scope

- Pro/Plus monthly and yearly checkout and price mapping
- Signed webhook→subscription mutation
- Local emulator/file store and billing verification

### Out of Scope

- Feature packaging decisions
- Crypto invoice settlement
- Marketing pricing copy

## Key Entities

| Entity | Description |
|---|---|
| Checkout session | Server-created subscription purchase |
| Stripe webhook | Signed lifecycle input |
| Subscription store | Durable entitlement state |
| Billing emulator | Development-only upgrade path |

## Invariants

- Signature/order validation precedes entitlement mutation.
- Web Billing and the phone plan sheet open Checkout only when `/api/billing/status` says `checkoutEnabled` (phone: `setCheckoutOpen`).
- M3: `STRIPE_MANAGED_PAYMENTS_ENABLED=1` adds `managed_payments[enabled]=true` to new Checkout Sessions (Stripe/Link is merchant of record, prices include tax); runbook `stripe-managed-payments-runbook.md`.
- Pilot members (`pilot_access`, not revoked) have Plus for `PILOT_DAYS` from joining (`pilotPlanGrant`); paid or complimentary Plus wins; checkout sells from `paidTier`.
- Funnel (D1 `funnel_events`, once per owner): `checkout_started` on a new Checkout Session, `subscription_paid` on grant, `subscription_canceled` when a paid plan ends; the weekly report adds paying now and MRR from `PLAN_PRICES`.
- Server owns tier/price mapping; monthly and yearly prices are never
  substituted for one another.
- Emulator events never count as live revenue evidence.
- Retries remain idempotent and user-bound.

## Exclusions

- Secret values and customer data
- Client-only entitlement logic

## Typical Outputs

- Checkout→webhook→tier trace, emulator vs production diagnosis

## Sources

| Type | Reference | Description |
|---|---|---|
| route | cloudflare/worker/src/billing.ts | Checkout, webhook, subscription |
| emulator | docs/setup/LOCAL_BILLING_EMULATOR.md | Local workflow |
