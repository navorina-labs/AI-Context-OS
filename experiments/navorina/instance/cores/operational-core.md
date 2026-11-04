# Operational Core

## Metadata

| Field | Value |
|---|---|
| id | operational-core |
| version | 2.2.118 |
| parent_core | null |
| project | Navorina |
| last_updated | 2026-10-28 |

## Purpose

Определяет поддерживаемые dev, emulator, verification, environment и
independent AgentsOS workflows.

## Scope

### In Scope

- `npm run dev`, emulators и local verification
- Integration pilots, readiness checks, E2E и release inputs
- Demo sandbox isolation и Ops surfaces
- AgentsOS install/verify boundary

### Out of Scope

- Product feature scope
- Domain implementation details
- Billing policy

## Key Entities

| Entity | Description |
|---|---|
| Dev emulators | Billing, Resend, Push и money-rail substitutes |
| Integration pilot | Evidence without general live availability |
| Demo sandbox | Isolated simulated environment |
| Readiness gate | Exact environment/capability verification |
| AgentsOS verify | Independent reusable-agent checks |

## Invariants

- Emulator, sandbox, pilot и production — разные evidence states.
- Production money rails fail closed without exact readiness and approvals.
- Demo не получает production data, credentials или live-rail egress.
- Secrets не коммитятся и не выводятся; ротация через `scripts/rotate-secret.sh`.
- Disposable-список обновляется `node scripts/update-disposable-domains.mjs` (pinned commit, PR); откат sign-up hook — выключить hook в Supabase.
- AgentsOS не добавляется в root dependency graph автоматически.

## Current Verification Snapshot

- `npm run pre:release` is the canonical local aggregate gate: AI baseline,
  unit/integration pilot, core operability and current release E2E.
- Release browser coverage contains 24 current customer journeys; heavy
  passkey payment scenarios are serialized and use explicit external fixtures.
- Product routes at <=800px redirect to `Navorina/mobile.html`; e2e that assert the
  narrow web layout pass `desktop=1`.
- Production builds verify referenced assets, including the tracked Labs motion
  videos; ignored local media does not satisfy the build contract.
- Live Stripe purchases/refunds, production delivery, Xero authorization and
  money rails remain manual HOLD evidence even when local gates are green.
- Provider keys go in only by the owner's hidden-input `scripts/put-*-secrets.sh`.
- Carabaas sandbox: `node scripts/carabaas-sandbox.mjs keygen`, then `setup` (key in `~/.navorina/carabaas`, subscribes `incoming` + `outgoing`, canary secret `CARABAAS_CREDENTIALS` with `treasury`), `address --network tron-shasta`, `send` (one testnet order; demo quorum 0/0, no cosigner). E2E: `e2e/local/treasury.spec.ts` (personas `treasury` operator, `treasurynone`).
- Preview/canary auth uses its own Supabase project
  (`scripts/apply-preview-supabase-secrets.mjs`); `cloudflare-preview-auth-isolation`
  and the readiness gate fail if preview points at production again.
- Auth emails: `scripts/apply-auth-email-templates.mjs` (dry run, preview by default; `--production` explicit).
- Email previews: `node scripts/build-email-templates.mjs` rewrites the DS Emails section and Supabase templates; `--check` runs in the Worker and DS tests.
- Onboarding-writes UI verify drafts the invoice in the editor drawer.
- Release E2E includes the segmentation onboarding (`e2e/onboarding-segmentation.spec.ts`).

## Exclusions

- Secret values
- Generated output/local data
- Product roadmap decisions

## Typical Outputs

- Minimal dev/emulator workflow
- Environment-specific verification checklist
- Readiness-gap diagnosis
- Narrow AgentsOS install/test sequence

## Sources

| Type | Reference | Description |
|---|---|---|
| setup | docs/setup/START_HERE.md | Supported local entry |
| emulators | docs/setup/LOCAL_DEV_EMULATORS.md | No-key workflow |
| release | docs/planning/operations/release-checklist.md | Release gate |
| integrations | docs/planning/operations/integrations/integrations-index.md | Readiness map |
| agents | docs/architecture/AGENTS_OS_WORKSPACE.md | Agent operations boundary |
