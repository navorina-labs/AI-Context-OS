# Context OS Framework (CLI)

Turn the research into a **scaffold + validate + route** toolkit for any repository.

## Install / run

From this monorepo:

```bash
npm run context-os -- init --name myapp --profile saas --cursor-rule
```

After publish:

```bash
npx context-os init --name myapp --profile saas
```

## Packages

| Package | Path | Role |
|---------|------|------|
| `context-os` | [packages/cli](cli) | CLI: `init`, `route`, `validate`, `eval route` |
| `@context-os/schemas` | [packages/schemas](schemas) | JSON Schema for cores and routing |

## Commands

### `context-os init`

Creates `context-os/` with cores, router, manifest, maintenance docs.

| Profile | Contents |
|---------|----------|
| `minimal` | 4 cores (business, product, technical, operational) |
| `saas` | 4 cores + 4 subcores (revenue, paywall, billing, onboarding) |

### `context-os route "<question>"`

Keyword router (same algorithm as Oiloop prod eval). Example:

```bash
context-os route "How do we deploy?" --root .
# Cores: operational-core
```

### `context-os validate`

Checks manifest paths, core files exist, routing-map non-empty.

### `context-os stats "<question>"`

Sum character count of routed core `.md` files (~tokens ÷ 4). No API key.

### `context-os cursor-rule`

Install `.cursor/rules/context-os.mdc` on an existing repo (no scaffold overwrite).

```bash
context-os cursor-rule --target ~/Projects/MyApp
context-os cursor-rule --variant oiloop --force
```

### `context-os eval route`

Routing F1 on `questions.json` — **no LLM, no API key**.

```bash
cp context-os/eval/questions.stub.json context-os/eval/questions.json
# edit expected_cores
context-os eval route --questions context-os/eval/questions.json
```

Full A/B/C accuracy eval (conditions A/B/C, judge, CCR) remains in **Oiloop** `context-os/eval/` — port planned as `@context-os/eval` later.

## Reference instances

| Project | Path |
|---------|------|
| Navorina (Cursor) | [experiments/navorina/instance](../experiments/navorina/instance) |
| Oiloop (runtime) | Oiloop repo: `ContextRouter`, `ContextCoreLoader` |
| MailAgent | [experiments/mailagent](../experiments/mailagent) |

## Research → product path

1. **Now:** CLI scaffold + routing validation
2. **Next:** `@context-os/eval` — portable `run-eval.mjs` subset
3. **Later:** drift CI (PR → suggest core updates)

See [research/SYNTHESIS.md](../research/SYNTHESIS.md) for measured results.
