# Technical Core

## Metadata

| Field | Value |
|---|---|
| id | technical-core |
| version | 2.3.188 |
| parent_core | null |
| project | Navorina |
| last_updated | 2026-10-28 |

## Purpose

Маршрутизирует вопросы об архитектуре, API, auth, persistence и границах кода.

## Scope

### In Scope

- `Navorina/` frontend, Worker/D1 API и `server/` adapters
- Supabase identity, D1 product data и local stores
- Paywall, AI limits, idempotency, routes, integrations
- Граница product agents и `agents-os/`

### Out of Scope

- Priorities, UI composition, release sequence

## Key Entities

| Entity | Description |
|---|---|
| Product API | Worker composition root and domain handlers |
| Supabase identity | Authenticated product identity |
| Cloudflare D1 | Canonical migrated product store |
| Compatibility API | Legacy Express adapters, unmigrated |
| Financial Mirror | Client/server workspace contract |
| Paywall | Free/Pro/Plus entitlements |
| AgentsOS | Reusable packages outside the product |

## Invariants

- Domain routers владеют endpoints; composition root не поглощает бизнес-логику.
- Money mutations имеют idempotency, durable status и fail-closed adapters.
- Client ID не заменяет verified Supabase identity for sensitive mutations.
- A capability has one owner; Worker and Express do not silently dual-write.
- `dist-ts/` соответствует TypeScript source через compiled/build gates.
- `src/` targets `lib: ES2020` (no `.at()`); fixed drawers size in `%`, not `100vw`.
- Reusable agents не импортируют product code; finance behavior остаётся в Navorina.
- Landing autoplay mutates each reused iframe once (no replays, DOM growth, detached frames).
- Emails: `shared/email`, `img/email`.
- Tools handoff: dashboard → Nucleus API.
- Public API v1 `/api/v1/*`: workspace keys (SHA-256 only), webhooks queued by D1 triggers (0083), HMAC-signed, cron retries.
- Carabaas sandbox: `cloudflare/worker/src/carabaas.ts` (RS256 self-signed JWT, Ed25519 Standard Webhooks: `incoming` → one received row per deposit, `outgoing` → one sent row per order keyed `order:<orderId>`, impossible moves skipped, not 409); flags (`enabled`, `treasury`) live in the `CARABAAS_CREDENTIALS` secret, always off in production. `GET /api/ops/carabaas/treasury` (operators) feeds the Accounts Treasury island: DS `shared/treasury.{js,css,d.ts}` → `Navorina/js/ds/treasury.js` via `sync-ds-invoice-document.mjs`, entry `src/utils/accounts-treasury-entry.ts` (shown only when `/api/health` says carabaas ready).
- Sign-up email policy is server-side: Supabase Before User Created hook → Worker `/api/auth/hooks/before-user-created` (Standard Webhooks, vendored CC0 disposable list in `cloudflare/worker/src/data/`, DoH MX check that fails open).
- Public pages in six languages (SEO wave 3): `/ka/`, `/kk/`, `/uz/` landing, hub, tax calculator (static generators) and rates (Worker `public-rates-locales.ts`); DS `shared/public-locale.js` holds languages, dates, numbers and hreflang; the bar has the language switcher; `Navorina/scripts/locales.test.mjs` keeps hreflang reciprocal and equal to the sitemap. Review sheet: `docs/product/2026-10-locales-review.md`.
- Public pages: build `scripts/public-head.cjs` adds base style, OG/Twitter, theme-color; decorative auth copy is CSS `data-text` (Safari Reader skips it).

## Exclusions

- Secrets, runtime data, builds, dependencies, vendor claims

## Typical Outputs

- Entry→route→service→client
- Root cause and impact map
- Navorina vs AgentsOS placement

## Sources

| Type | Reference | Description |
|---|---|---|
| architecture | docs/architecture/OVERVIEW.md | Runtime topology |
| data | docs/architecture/DATA_STORAGE_AND_FLOW.md | Persistence paths |
| execution | docs/planning/IMPLEMENTATION_ORDER.md | Release gates |
| agents | docs/architecture/AGENTS_OS_WORKSPACE.md | Workspace boundary |
| setup | docs/setup/START_HERE.md | Developer entry |
| runtime | cloudflare/worker/src/index.ts | Canonical migrated API composition root |
| landing lifecycle | products/design-system/docs/handoff/2026-10-14-landing-preview-lifecycle.md | Preview lifecycle |
