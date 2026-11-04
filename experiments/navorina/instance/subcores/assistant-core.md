# Assistant Core

## Metadata

| Field | Value |
|---|---|
| id | assistant-core |
| version | 2.2.1 |
| parent_core | product-core |
| project | Navorina |
| last_updated | 2026-10-18 |

## Purpose

Контекст Assistant chat, Sphere/voice, financial prompts, structured memory и AI quotas.

## Scope

### In Scope

- `Navorina/assistant.html`, `Navorina/src/core/chat.ts`, React components и voice utilities
- Product financial agents, prompts и structured-memory RAG
- Tier gating, monthly usage limits и graceful degradation

### Out of Scope

- Non-chat Nucleus UI
- Stripe lifecycle
- Money-rail implementation

## Key Entities

| Entity | Description |
|---|---|
| Assistant | Chat and voice surface |
| Product agents | Financial verdicts, briefs, explanations and OCR hints |
| AI limits | Tier/month usage enforcement |
| Structured memory | User-scoped RAG context |

## Invariants

- Server enforces entitlement and quota; client visibility grants nothing.
- Financial answers do not invent balances, transactions or provider state.
- Memory is identity-bound and never crosses users.
- Unavailable model/voice/quota produces an explicit recoverable state.

## Current Entitlement Snapshot

- Free receives one monthly brief; Pro and Plus receive up to 100 AI briefs per
  month under the canonical plan catalog.
- Pro adds financial verdict, portfolio risk, money-leak, periodic review,
  trade review and transaction explanation capabilities.
- Plus additionally enables tax, batch categorization and crypto reconciliation
  briefs. Unknown or exhausted capabilities fail closed on the server.
- The customer UI must not expose internal agent diagnostics or imply model,
  voice or memory availability before the corresponding contract resolves.

## Exclusions

- Legacy offline setup as product truth
- Provider secrets and generated output

## Typical Outputs

- Chat/agent request trace
- Quota or entitlement diagnosis
- Prompt/memory boundary review

## Sources

| Type | Reference | Description |
|---|---|---|
| architecture | docs/planning/AGENTS_ARCHITECTURE.md | Product agents |
| client | Navorina/src/core/chat.ts | Chat engine |
| limits | server/ai-limits.js | Quota policy |
| agents | server/agents | Financial agents |
