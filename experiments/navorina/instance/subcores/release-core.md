# Release Core

## Metadata

| Field | Value |
|---|---|
| id | release-core |
| version | 2.3.105 |
| parent_core | operational-core |
| project | Navorina |
| last_updated | 2026-10-28 |

## Purpose

Контекст release gates, smoke/E2E, integration pilots и environment evidence.

## Scope

### In Scope

- `pre:release`, `ci:local:*` and domain verification
- Integration/live readiness checks
- Navorina and changed AgentsOS CI boundaries

### Out of Scope

- Product prioritization
- Feature implementation
- Secret values

## Key Entities

| Entity | Description |
|---|---|
| Release gate | Aggregate automated and manual evidence |
| Integration pilot | Bounded non-general-availability proof |
| Live check | Target-environment readiness proof |
| Regression suite | Narrow evidence for changed boundaries |

## Invariants

- Emulator/demo success never certifies a live integration.
- Evidence matches target revision, environment and migrations.
- Production money actions cannot synthesize success.
- Agent packages run independent checks and releases.
- Auth email changes ship Pages first, then Supabase templates, then email rate limit.
- D1 migrations 0049 and 0051–0054 apply before the Worker reading them.

## Current Gate

- The 2026-10-08 local gate is green: 7/7 required AI agents, 20/20 golden
  cases, 18/18 core contracts, 7/7 core browser journeys and 24/24 release E2E.
- Nucleus CI runs the current release journeys; triage a red `nucleus-smoke` to the end of the job.
- Before every merge: `npm run e2e:local` (13 browser scenarios on the real Worker + local D1, stand
  `scripts/e2e-local/stand.mjs`, no outside network). Required while GitHub Actions is off.
- A green PR is deployable code evidence only. Production deployment and live
  provider/money mutations require separate operator authorization and proof.
- For web UI, edited, tested, pushed and deployed are separate states. Public
  readiness requires the immutable deployment and custom domain to serve the
  same revision and asset-version chain.
- Embedded/mobile preview releases also require `ui-reliability-core` and
  `$navorina-production-proof`.
- `npm run check:cloudflare-production-readiness` no longer reports
  `production-auth-isolation` once the preview Supabase project is live.
  Releases that touch `generate-cloudflare-pages-config.cjs` compare the
  production `config.js` (Supabase host, key hash, auth redirect) before deploy.
- Production Pages deploy is `npm run deploy:cloudflare-pages:production` from the
  repo root; a plain `build:cloudflare` is the preview target and must never reach
  `navorina-production` (2026-10-17 incident).
- Email template changes: re-run `node scripts/build-email-templates.mjs` (DS Emails section + Supabase templates) before the PR; images the emails use must be live on navorina.ai before the Worker sends them.
- Sign-up hook rollout: `SUPABASE_AUTH_HOOK_SECRET` on the Worker first, then enable the Supabase hook; roll back by disabling the hook (`signup-protection-runbook.md`).
- Start every release with `node scripts/release-preflight.mjs <target>` (rollback points).

## Exclusions

- Archived release plans
- Provider credentials/customer data

## Typical Outputs

- Release checklist
- Failed-gate triage
- Code→emulator→pilot→production gap

## Sources

| Type | Reference | Description |
|---|---|---|
| checklist | docs/planning/operations/release-checklist.md | Canonical gate |
| secrets | docs/planning/operations/secrets-and-kill-switch-runbook.md | Kill switches |
| crypto | docs/planning/operations/integrations/crypto-provider-runbook.md | BVNK/Cryptopay keys, KYB |
| cryptopay | docs/planning/operations/integrations/cryptopay-runbook.md | Cryptopay sandbox on canary: keys, callback URL, E2E, no payouts, refunds by email (payer_email), GET signing check script, payouts via infra/egress-relay (static IP) |
| carabaas | docs/planning/operations/integrations/carabaas-runbook.md | Carabaas sandbox keys, go/no-go, sales questions, outgoing orders, TRON, treasury view, Starter recommendation (§9–§13) |
| integrations | docs/planning/operations/integrations/integrations-index.md | Live sequence |
| e2e | e2e/README.md | Browser verification |
| scripts | package.json | Aggregate commands |
| incident | docs/agents/retrospectives/2026-10-14-ui-preview-reliability.md | UI release evidence failure and prevention |
