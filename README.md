# AI Context OS

**Research project: domain-oriented context cores for AI reasoning.**

AI Context OS is an open-source research framework for testing whether AI systems perform better with **domain-oriented context cores** (bounded decision contexts) than with full repository dumps or knowledge graphs.

This is not a product. There is no SaaS, UI, API, or runtime engine here — only theory, schemas, experiments, and evaluation methodology.

---

## Why This Project Exists

Modern AI coding assistants receive entire repositories: documentation, source code, tests, configs, logs, and infrastructure definitions. The assumption is that more context improves answers.

We challenge that assumption.

The bottleneck is not context window size. It is **lack of responsibility boundaries**. A question like "Revenue dropped last week" does not require CSS, Docker configs, or unit tests — yet full-repository approaches often include them anyway.

AI Context OS proposes a different pipeline:

```
Question
  ↓
Router
  ↓
Context Core
  ↓
LLM
```

Instead of:

```
Full Repository
  ↓
LLM
```

---

## Hypothesis Under Test

**AI answers better when context is split by decision domains, not by files or folders.**

A Context Core is a minimal, self-contained slice of project knowledge scoped to a specific class of decisions (revenue, billing, onboarding, deployment, etc.). A Router selects the right core(s) before the model reasons.

---

## Why Full Repository Is Not Always Effective

| Issue | Effect |
|-------|--------|
| Irrelevant code pollutes attention | Model cites wrong files, invents connections |
| Conflicting signals across domains | Business metrics mixed with implementation details |
| No decision boundary | Cannot distinguish "what to build" from "how to deploy" |
| Context dilution | Important facts buried in noise |
| Higher cost and latency | Larger prompts without proportional quality gain |

Full repository context works for broad exploration. It fails when the question has a narrow decision scope.

---

## Why Graph ≠ Context

Knowledge graphs and GraphRAG organize **entities and relationships**. Context cores organize **decision responsibility**.

| Knowledge Graph | Context Core |
|-----------------|--------------|
| Nodes: entities, facts | Units: decision domains |
| Edges: semantic links | Boundaries: what is in / out of scope |
| Retrieval: traverse graph | Retrieval: route by question intent |
| Optimizes connectivity | Optimizes sufficiency |

Graphs answer "what is related to X?" Context cores answer "what do I need to decide about X?"

See [docs/comparison-with-graphs.md](docs/comparison-with-graphs.md) for a detailed comparison.

---

## Core Concepts

### Context Core

A **Context Core** is a curated, compressed representation of everything needed to reason about a specific decision domain:

- Purpose and scope
- Key entities and invariants
- Decision history and constraints
- Typical sources (not full files)
- Explicit exclusions

Templates live in [context-os/cores/](context-os/cores/) and [context-os/subcores/](context-os/subcores/).

### Router

The **Router** maps a natural-language question to one or more Context Cores before invoking the LLM. Routing is intent-based, not file-based.

See [docs/routing.md](docs/routing.md) and [context-os/router/](context-os/router/).

### Minimal Context

The **Minimal Context Principle** states: use the smallest context that is sufficient for the decision at hand. Measure sufficiency by answer quality, not by coverage of the repository.

See [theory/minimal-context-principle.md](theory/minimal-context-principle.md).

---

## Repository Structure

```
ai-context-os/
├── docs/              # Problem, hypothesis, architecture, routing
├── theory/            # Theoretical foundations
├── experiments/       # Controlled experiment designs
├── examples/          # Reference implementations (documentation only)
├── prompts/           # Prompts for building cores manually
├── schemas/           # JSON schemas for cores and routing
├── context-os/        # Templates, router rules, audit tools
├── research/          # Questions, metrics, evaluation framework
└── papers/            # Future publication outline
```

---

## Planned Experiments

| Phase | Subject | Goal |
|-------|---------|------|
| 1 | [MailAgent](experiments/mailagent/) | First controlled A/B: full repo vs context cores |
| 2 | 2–3 open-source SaaS projects | Cross-project generalization |
| 3 | Private project validation | Real-world decision quality |
| 4 | Paper | Formal publication of results |
| 5 | Open-source release | Community replication |

See [docs/research-roadmap.md](docs/research-roadmap.md) and [research/experiment-design.md](research/experiment-design.md).

---

## Getting Started

1. Read [docs/overview.md](docs/overview.md) for the system model.
2. Read [docs/hypothesis.md](docs/hypothesis.md) and [docs/principles.md](docs/principles.md).
3. Study [context-os/cores/](context-os/cores/) templates.
4. Run experiment design from [research/experiment-design.md](research/experiment-design.md).
5. Use [research/questions.md](research/questions.md) as the evaluation question bank.

---

## License

MIT — see [LICENSE](LICENSE).

---

## Contributing

This is a research repository. Contributions should extend theory, experiment design, evaluation methodology, or documented examples — not product features.
