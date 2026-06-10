# Overview

AI Context OS is a research framework for structuring project knowledge into **domain-oriented context cores** and routing questions to the minimal sufficient context before AI reasoning.

---

## System Model

```
Full Project
     ↓
Entity Extraction
     ↓
Context Cores
     ↓
Router
     ↓
AI Agent
```

### Stage 1: Full Project

The complete project artifact set: source code, documentation, configs, tests, logs, infrastructure definitions, and operational runbooks. This is the raw input — not what the AI should receive directly for most questions.

### Stage 2: Entity Extraction

Identify decision-relevant entities from the project:

- Business entities (revenue streams, pricing tiers, customer segments)
- Product entities (features, user flows, value propositions)
- Technical entities (services, APIs, data models, dependencies)
- Operational entities (deployments, monitoring, incidents, SLAs)

Extraction is **decision-centric**, not file-centric. The output is structured facts grouped by domain, not a file index.

### Stage 3: Context Cores

Compress extracted entities into bounded cores:

| Core | Decision Domain |
|------|-----------------|
| Business Core | Revenue, growth, unit economics |
| Product Core | Features, UX, user value |
| Technical Core | Architecture, implementation |
| Operational Core | Deploy, monitor, incident response |

Subcores refine further (e.g., Revenue Core, Billing Core, Onboarding Core).

Each core defines:

- What questions it answers
- What questions it explicitly does not answer
- Minimal sufficient context
- Source references (pointers, not full dumps)

### Stage 4: Router

Given a natural-language question, the Router:

1. Classifies intent (business / product / technical / operational / mixed)
2. Selects one or more Context Cores
3. Optionally composes cores for cross-domain questions
4. Rejects or defers when no core matches

Routing happens **before** LLM invocation. No reasoning on full repository by default.

### Stage 5: AI Agent

The LLM receives only the selected core(s) plus the question. It reasons within bounded responsibility, producing answers that are:

- More focused
- Less hallucination-prone (fewer irrelevant facts to misconnect)
- Cheaper (smaller context)
- Auditable (core selection is logged)

---

## Design Goals

1. **Sufficiency over completeness** — include what is needed to decide, not everything that exists
2. **Explicit boundaries** — every core states what it does not cover
3. **Reproducible routing** — same question → same core selection (given stable rules)
4. **Measurable compression** — track context size reduction vs full repository baseline

---

## What This Is Not

- Not a RAG pipeline over all files
- Not a knowledge graph
- Not an MCP server or API product
- Not automatic — cores are curated artifacts, initially built manually or with guided prompts

---

## Related Documents

- [problem.md](problem.md) — why full context fails
- [hypothesis.md](hypothesis.md) — what we test
- [architecture.md](architecture.md) — core definitions
- [routing.md](routing.md) — router behavior
- [context-cores.md](context-cores.md) — core anatomy
