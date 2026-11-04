# Business Core

## Metadata

| Field | Value |
|---|---|
| id | business-core |
| version | 2.2.161 |
| parent_core | null |
| project | Navorina |
| last_updated | 2026-10-28 |

## Purpose

Определяет позиционирование, коммерческие границы, приоритеты и критерии
keep/archive/remove для Navorina.

## Scope

### In Scope

- Crypto / Fin Hub и оси Receive, Send, Account, Deliver
- Персоны, jobs-to-be-done, retention и revenue logic
- Free/Plus/Pro packaging и unit economics
- Live-readiness как бизнес-зависимость

### Out of Scope

- API/webhook implementation
- UI tokens и layout
- Release command chains

## Key Entities

| Entity | Description |
|---|---|
| Navorina | Финансовый command center для freelancers и малых команд |
| Nucleus | Financial Mirror workspace |
| Plus / Pro | Платные product packages |
| Money rails | «Окно и пульт»: Navorina показывает деньги и готовит действия, деньги у пользователя или лицензированного сервиса; этапы 0–4 в `docs/planning/strategy/MONEY_MODEL_AND_STAGES_2026-10-20.md` |
| Business plan | Схема этапов, три слоя дохода, расходы, сценарии 50/200/1000 и решения владельца: `docs/planning/strategy/BUSINESS_PLAN_2026-10.md` |
| Custody (Carabaas) | later: sandbox и казна Navorina; деньги клиентов — no-go (держатель кошигнера = кастодиан, managed-варианта нет; `carabaas-runbook.md` §4a). Sandbox €0 хватает; Starter €99 не нужен, Base только на Business €499, для своей казны дешевле Safe на Base (§12) |
| Founder cohort | Основная retention/GTM evidence loop |

## Invariants

- Navorina не является банком, custody wallet или универсальным чат-продуктом; USDC wallet signed (EIP-191).
- Code/emulator не равен live revenue rail без production evidence.
- Packaging и server entitlement matrix описывают одну коммерческую границу.
- Инициатива усиливает одну из четырёх осей или retention.
- Защита регистрации (disposable/MX) не требует платных провайдеров; бот-слой — Turnstile (ключи владельца).
- Provider/API costs совместимы с unit economics тарифа.

## Current Packaging Snapshot

- Free $0 (manual product), Pro $29/$23 (no limits, imports, reports, AI), Plus $99/$79
  (API and webhooks, team of 5; USDC and payouts "soon"). Production checkout on since 2026-10-23, Stripe Tax off.
  Source: `docs/product/PLANS.md`. Gaps against the business model: `docs/planning/strategy/BUSINESS_PLAN_2026-10.md` (M1–M10).
- Preview testing never touches production customer accounts.

## Exclusions

- Generated output и local runtime data
- Архивные инициативы вне current-year plan
- Pixel-level product decisions

## Typical Outputs

- Scope verdict, revenue/retention impact, приоритет по осям, keep/archive/remove

## Sources

| Type | Reference | Description |
|---|---|---|
| truth | docs/planning/CURRENT_PRODUCT_HANDOFF.md | Shipped state and live boundaries |
| scope | docs/planning/PRD_NAVORINA.md | Personas, metrics, and non-goals |
| roadmap | docs/planning/roadmap/2026-CURRENT-YEAR-PLAN.md | Current priorities |
| roadmap | docs/planning/NEXT_NO_KEYS_2026-10-21.md | Next batch with no third-party keys, ranked, in parallel chunks |
| packaging | server/paywall/index.js | Executable feature matrix |
| operations | docs/planning/operations/integrations/integrations-index.md | External readiness |
