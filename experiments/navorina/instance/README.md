# Context OS — Navorina

Production instance **Context Agent** для Navorina. Цель — загружать минимальный
релевантный decision context вместо всего репозитория.

Framework и CLI находятся в `agents-os/agents/context-agent/`; этот каталог
содержит заполненные cores, routing, eval, graph и drift policy для Navorina.

Это заполненная реализация, а не scaffold или отдельный пользовательский продукт.

## Что такое Context OS

- **Cores** — 4 главных слоя: Business, Product, Technical, Operational
- **Subcores** — 8 доменных ядер: Revenue, Paywall, Billing, Onboarding, Nucleus, Assistant, Release, UI Reliability
- **Router** — какой core читать для какого вопроса
- **Audit** — карта проекта, кандидаты на уборку, риски

## Зачем нужны Core

| Проблема | Решение |
|----------|---------|
| `AGENTS.md` — 140+ строк ops | Subcore только для billing/crypto |
| 236+ Markdown-файлов в `docs/` | INDEX + core ссылается на canonical docs |
| 45 nucleus hubs | `nucleus-core.md` даёт bounded entry points |
| Агент читает устаревший PHASE*_PROGRESS | Router → roadmap + PRD |

## Как AI выбирает контекст

1. Прочитать [`router/question-router.md`](./router/question-router.md)
2. Сопоставить вопрос с [`router/routing-map.json`](./router/routing-map.json)
3. Открыть **primary** core/subcore из `cores/` или `subcores/`
4. По секции **Sources** в core — точечно открыть 1–3 файла кода
5. UI-задачи: дополнительно `docs/agents/AGENT_HUB.md` + `UX_PRINCIPLES.md`

## Структура

```
context-os/
├── README.md              ← вы здесь
├── manifest.json          ← machine index
├── drift-config.json      ← source path → owning cores
├── cores/                 ← 4 главных ядра
├── subcores/              ← 7 доменных ядер
├── router/                ← маршрутизация вопросов
├── graph/                 ← graph config; index generated on demand
├── eval/                  ← question bank и baselines
└── audit/                 ← карта, cleanup, риски
```

## Какие файлы читать первыми

| Ситуация | Файлы |
|----------|-------|
| Любой новый вопрос | `router/question-router.md` |
| Не знаешь scope | `cores/product-core.md` |
| Не знаешь бизнес | `cores/business-core.md` |
| Правка кода | core по router + **Sources** |
| UI в Navorina | + `docs/agents/AGENT_HUB.md` |
| Preview / skeleton / global UI | `subcores/ui-reliability-core.md` + `docs/agents/AGENT_HUB.md` |
| Релиз | `subcores/release-core.md` |

## Как обновлять Core

1. **Не дублировать** длинные спеки — ссылаться на canonical doc в `docs/`
2. После значимых изменений: обновить затронутый core, увеличить его semver и
   обновить `last_updated`
3. Новый домен → новый subcore + запись в `routing-map.json`
4. Cleanup только через `audit/cleanup-candidates.md` — не удалять без проверки
5. При конфликте: **код** > `DESIGN_SYSTEM.md` > planning level 3

Проверки Context Agent:

```sh
npm --prefix agents-os/agents/context-agent run context-os -- doctor --root "$PWD"
npm --prefix agents-os/agents/context-agent run context-os -- check --root "$PWD" --min-score 85
```

## Как использовать в Cursor

### В чате

Укажи core явно в первом сообщении:

```
Use only Revenue Core and answer why revenue dropped.
```

```
Use Billing Core + Technical Core and debug Stripe webhook.
```

```
Use Product Core and explain what Navorina is.
```

```
Use Release Core and prepare release checklist.
```

### В правилах (опционально)

Добавить в `.cursorrules` или rule:

> For context, start from `context-os/router/question-router.md` before reading `AGENTS.md`.

### Связь с существующими правилами

- `product-design-system.mdc` — остаётся для UI (дополняет Product Core)
- `AGENTS.md` — ops detail после выбора core
- `real-project-test/README.md` — redirect stub; архив в `docs/archive/real-project-test/`

## How to ask Cursor

Примеры промптов:

| Задача | Промпт |
|--------|--------|
| Revenue | «Use only Revenue Core and answer why revenue dropped.» |
| Stripe | «Use Billing Core + Technical Core and debug Stripe webhook.» |
| Product | «Use Product Core and explain what Navorina is.» |
| Release | «Use Release Core and prepare release checklist.» |
| FM | «Use Nucleus Core + Technical Core — how does month close work?» |
| Paywall | «Use Paywall Core — why is accept crypto blocked on Plus?» |
| Onboarding | «Use Onboarding Core — what blocks first value?» |
| Cleanup | «Read audit/cleanup-candidates.md — what is safe to archive?» |

## Manifest

См. [`manifest.json`](./manifest.json) для путей всех ядер и audit-файлов.

## Framework

| Репозиторий | Роль |
|-------------|------|
| `agents-os/agents/context-agent/` | Framework, CLI, schemas, templates and evaluations |
| `context-os/` (этот каталог) | Filled cores for Navorina from real code + docs |
| `docs/archive/real-project-test/` | Archived prototype cores |

Pipeline (framework):

```
Question → Router → Context Core → LLM
```

## Sources

- [AI-Context-OS](https://github.com/navorina-labs/AI-Context-OS)
- `docs/archive/real-project-test/`
- `docs/planning/INDEX.md`
- `AGENTS.md`
- `docs/architecture/OVERVIEW.md`
