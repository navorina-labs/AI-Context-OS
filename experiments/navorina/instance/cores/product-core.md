# Product Core

## Metadata

| Field | Value |
|---|---|
| id | product-core |
| version | 2.2.168 |
| parent_core | null |
| project | Navorina |
| last_updated | 2026-10-28 |

## Purpose

Определяет, что входит в Navorina, для кого строится продукт и какие
пользовательские journeys являются каноническими.

## Scope

### In Scope

- Main Dashboard, Nucleus, Assistant и public/account surfaces
- Payments, Invoicing, Accounting, Insights, Time и Settings
- Product UX boundaries, onboarding и module ownership
- EN/RU/ES product mirrors

### Out of Scope

- Billing/webhook internals
- CI и production secrets
- Full database schema

## Key Entities

| Entity | Description |
|---|---|
| Main Dashboard | Balance/history и быстрые money actions |
| Nucleus | Domain workspace вокруг Financial Mirror |
| Assistant | Chat, Sphere, voice и financial context |
| Financial Mirror | Ledger, snapshots и workspace state |
| Tools | Generators и calculators вне core workspace |

## Invariants

- Это один продукт; Nucleus, Assistant и domain pages не отдельные проекты.
- Dashboard и Nucleus используют общие capability/use-case contracts.
- Money UI не показывает success без server capability и durable lifecycle.
- Navorina не хранит private keys и не заявляет custody.
- Carabaas (MPC-кастоди) — только sandbox и казна Navorina; кастодиальных кошельков пользователей нет до лицензии.
- Регистрация с временных и несуществующих почтовых доменов блокируется на сервере (Supabase hook), не только в браузере.
- `agents-os/` не входит в product runtime; finance agents остаются в `server/agents/`.

## Current Product Snapshot

- Canonical customer plans are Free, Pro and Plus. Plans compares packages;
  Billing owns checkout review, subscription status and return navigation.
- Account Security: password, email sign-in links (`docs/auth/AUTH_EMAIL_FLOW.md`), passkeys, global sign-out; no 2FA,
  recovery-code or device-history claims.
- Empty and loading states fail closed: a lower tier never flashes paid metrics
  or populated workspace data before entitlement resolution.
- Settings, Help Center and integration surfaces expose only implemented
  customer actions; operator diagnostics and fictional defaults are excluded.
- Team is a Plus access-planning surface, not a live invitation system: saved
  drafts do not create identities, grant access, send email or add paid seats.

## Exclusions

- Archived prototypes и experiments
- Generated builds/dependencies
- Полные server implementation details

## Typical Outputs

- Module/journey map
- Feature scope recommendation
- UI brief с canonical entry point
- Product vs module vs experiment classification

## Sources

| Type | Reference | Description |
|---|---|---|
| truth | docs/planning/CURRENT_PRODUCT_HANDOFF.md | Current journeys |
| scope | docs/planning/PRD_NAVORINA.md | Modules and non-goals |
| roadmap | docs/planning/roadmap/2026-CURRENT-YEAR-PLAN.md | Current status |
| roadmap | docs/planning/NEXT_NO_KEYS_2026-10-21.md | Next batch with no third-party keys, ranked, in parallel chunks |
| architecture | docs/architecture/OVERVIEW.md | Runtime boundaries |
| design | docs/design-system/UX_PRINCIPLES.md | UX invariants |
