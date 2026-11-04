# Onboarding Core

## Metadata

| Field | Value |
|---|---|
| id | onboarding-core |
| version | 2.3.115 |
| parent_core | product-core |
| project | Navorina |
| last_updated | 2026-10-28 |

## Purpose

Контекст signup, first value, onboarding checklist/wizard и guest→auth workspace merge.

## Scope

### In Scope

- Auth/signup and fresh-user workspace readiness
- Income→expense→snapshot→invoice activation path
- Guest data merge and recovery states

### Out of Scope

- Full ledger schema
- Post-activation plan conversion
- Developer onboarding

## Key Entities

| Entity | Description |
|---|---|
| Guest workspace | Pre-auth user data |
| Verified identity | Active production Supabase user |
| Workspace profile | Owner-scoped onboarding record persisted in D1 |
| First value | Useful workspace outcome based on real user data |
| Checklist | Activation path; it must reflect durable backend state |

## Invariants

- Merge targets only the currently verified identity.
- Workspace readiness belongs to the active user, not stale prior state.
- First value does not require every integration.
- Failure preserves recoverable input and never reports premature success.
- Authenticated workspace basics are persisted by the owner-scoped Cloudflare
  onboarding contract before the first Dashboard visit.
- A returning owner restores the existing workspace profile instead of seeing
  a repeated fake setup or browser-only state.
- Subscription activation is not part of onboarding while the core product is
  still being completed.
- Confirm link or 8-digit code signs in without the password again; expired links offer a resend.
- The email confirmation link signs in on any device via `auth-confirm.html`.
- K7: the sign-in email changes with Supabase's own `updateUser({ email })` and the session (secure change: a link to each address); `email_change` lands on `profile.html?email=changed` and the Worker's `GET /api/profile/email` moves Navorina's copies of the address.
- Sign-up shows the email policy message from the pre-check and from the Supabase hook (403 → `NV_SIGNUP_EMAIL_REJECTED`); Google/Apple sign-ins skip the domain checks.
- Setup asks 5–7 skippable chip questions, saves each step (D1 0054) and picks the first Dashboard step.

## Exclusions

- Live provider onboarding
- Paid conversion and generated data

## Typical Outputs

- First-value blocker analysis
- Merge safety review
- Activation acceptance criteria

## Sources

| Type | Reference | Description |
|---|---|---|
| truth | docs/planning/CURRENT_PRODUCT_HANDOFF.md | Auth/merge behavior |
| setup | docs/setup/START_HERE.md | Supported entry |
| client | Navorina/src/utils/nucleus-onboarding-checklist.ts | Checklist |
| client | Navorina/src/utils/cloudflare-preview-guidance.ts | Production workspace setup form |
| api | cloudflare/worker/src/workspace-onboarding.ts | Owner-scoped workspace profile contract |
| schema | cloudflare/worker/migrations/d1/0015_workspace_onboarding.sql | Durable workspace profile table |
| tests | cloudflare/worker/test/workspace-onboarding-integration.test.mjs | Persistence, validation, auth and owner isolation |
| e2e | e2e/nucleus-guest-workspace-merge.spec.ts | Merge journey |
