# Context OS — обслуживание

Когда обновлять cores, ops и router после изменений в репозитории.

## Матрица «код → документ»

| Изменение | Обновить |
|-----------|----------|
| `server/paywall/**` | `subcores/paywall-core.md`, при API — `ops/stripe-billing.md` |
| `server/routes/stripe-billing.js` | `billing-core`, `ops/stripe-billing.md` |
| Crypto payments routes / CP UI | `nucleus-core`, `ops/crypto-payments.md` |
| Resend / digest / invoice email | `ops/delivery.md` |
| Web Push / VAPID | `ops/delivery.md` |
| Xero accounting routes | `nucleus-core`, `ops/xero.md` |
| Новый `nucleus-*-hub.ts` | `nucleus-core` Key files |
| npm smoke / `pre:release` / CI | `release-core`, `ops/dev-and-release.md` |
| PRD / roadmap фаза | `product-core`, `business-core` |
| Новая интеграция | subcore + новый `ops/*.md` + `routing-map.json` |
| UI shell (Bold v3, mobile) | `product-core` Key docs |
| Global UI contract / preview / skeleton / iframe | `ui-reliability-core`, при incident — retrospective |
| `agents-os/**` boundary or command | `technical-core`, `operational-core` |

## Чеклист перед merge (context-os)

- [ ] Затронутый домен: обновлён соответствующий core?
- [ ] У core увеличен `version` и обновлён `last_updated`?
- [ ] Ops (API/smoke/env): обновлён `context-os/ops/` shard?
- [ ] Новый маршрут вопроса: запись в `router/routing-map.json`?
- [ ] `npm run context-os:validate` — зелёный
- [ ] Context Agent `doctor` и `check --min-score 85` — зелёные?
- [ ] `drift check --base <ref> --strict` — зелёный для PR?
- [ ] Для Condition C: локально пересобран on-demand graph командой
  `node context-os/eval/build-graph-index.mjs` (generated index не коммитить)

## Периодически

| Частота | Действие |
|---------|----------|
| Каждый PR в `context-os/**` | CI: local validation + Context Agent check + routing eval + drift |
| Перед major release | `npm run eval:context-os:pilot` или full eval |
| После canon/cores pass | `npm run context-os:sync-framework` → AI-Context-OS `experiments/navorina/instance/` |
| После крупного рефактора docs | `audit/duplicate-or-stale-docs.md` |

## Не дублировать

- Длинные спеки остаются в `docs/planning/` — core **ссылается**, не копирует
- Ops-детали — только в `context-os/ops/`, не в cores и не в AGENT_HUB
- UI workflow — только в AGENT_HUB §2

## Sources

- [`CANON.md`](./CANON.md)
- [`audit/cleanup-candidates.md`](./audit/cleanup-candidates.md)
- [`../agents-os/agents/context-agent/docs/core-lifecycle.md`](../agents-os/agents/context-agent/docs/core-lifecycle.md)
