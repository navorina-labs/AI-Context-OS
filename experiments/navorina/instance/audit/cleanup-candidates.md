# Cleanup Registry

**Last reviewed:** 2026-08-15

Удаление выполняется только после определения canonical source, проверки
tracked inventory и подтверждения, что target не является runtime dependency.

## Выполнено

| Pass | Результат |
|---|---|
| 2026-06 pass 1 | Удалён legacy `server/paywall.js`; prototypes cores перенесены в `docs/archive/real-project-test/`; agent workflow сведён к Context OS + AGENTS/Agent Hub boundaries |
| 2026-06 pass 2 | Planning level-3 перенесён в archive; root package metadata сменена с voice assistant на Navorina Crypto / Fin Hub |
| 2026-07 pass 3 | Design snapshots, legacy ideas, backup fragments и Universe research перенесены в canonical archive locations |
| 2026-08 pass 4 | Project map обновлён для AgentsOS; root README очищен от legacy voice positioning; cores мигрированы на Context Agent metadata/quality contract; добавлены drift и graph configs |

## Намеренно остаётся

| Путь | Решение | Контроль |
|---|---|---|
| `Navorina/dist-ts/` | Keep: compiled client artifacts подключаются текущими страницами | Build drift gates обязаны подтверждать соответствие `src/` |
| `Navorina/experiments/gamified-dashboard-2d/` | Quarantine: tracked experiment вне PRD scope | Не включать в production navigation/build без отдельного product decision |
| `docs/planning/cryptopay-screenshots/` | Keep: evidence для benchmark docs | Не загружать по умолчанию через router |
| `docs/planning/runey-screenshots/` | Keep: evidence для benchmark docs | Не загружать по умолчанию через router |
| `archive/`, `docs/archive/` | Keep: исторические evidence и rollback/reference material | Не считать current source of truth |
| `docs/planning/NAVORINA_ROADMAP_TIMELINE.md` | Keep only as compatibility pointer | Current plan — `docs/planning/roadmap/2026-CURRENT-YEAR-PLAN.md` |

## Локальные/generated targets

| Target | Статус | Причина |
|---|---|---|
| root `project-universe-research/` | Trashed 2026-08-15 | Неканонические `node_modules`, `dist`, `.DS_Store`; source остаётся tracked в `archive/research/project-universe-research/` |
| root `prototypes/` | Trashed 2026-08-15 | Содержал только пустое дерево каталогов |
| `build/`, `build-demo/`, `test-results/`, `tmp/`, `outputs/` | Regenerable | Удалять только как локальную cleanup-операцию, не как source migration |

## Не удалять автоматически

- любой tracked source без replacement map;
- `.env`, keys, runtime stores и user data только потому, что они ignored;
- current handoff/roadmap при наличии старого документа с похожим названием;
- generated artifacts, если production page прямо подключает их и build gate ещё
  не подтверждён.

## Verification

```sh
npm run context-os:validate
npm --prefix agents-os/agents/context-agent run context-os -- doctor --root "$PWD"
npm --prefix agents-os/agents/context-agent run context-os -- check --root "$PWD" --min-score 85
```

## Sources

| Type | Reference | Description |
|---|---|---|
| project map | context-os/audit/project-map.md | Canonical project/module classification |
| planning | docs/planning/INDEX.md | Canonical and legacy planning layers |
| architecture | docs/architecture/AGENTS_OS_WORKSPACE.md | Agent workspace boundaries |
| inventory | .gitignore | Generated and local path policy |
