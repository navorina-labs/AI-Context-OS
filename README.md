# AI Context OS

**Research project: domain-oriented context cores for AI reasoning.**

AI Context OS is an open-source research framework for testing whether AI systems perform better with **domain-oriented context cores** (bounded decision contexts) than with full repository dumps or knowledge graphs.

This is not a product. There is no SaaS, UI, API, or runtime engine here — only theory, schemas, experiments, and evaluation methodology.

**New here?** Start with [How to use this repository](#how-to-use-this-repository) — a 15-minute path to the measured results (no need to read every folder).

**Research closed?** See [research/SYNTHESIS.md](research/SYNTHESIS.md) — final conclusions and production decision matrix.

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

## Results

- **[Phase 2 cross-project report](context-os/evaluations/PHASE-2-RESULTS.md)** — 3 OSS projects (129 questions, A/B/C). B ≥ A on accuracy; **8–38×** fewer API input tokens vs full repo; C preferred on hallucination for 2/3 projects.
- **[Phase 3 private codebase report](context-os/evaluations/PHASE-3-RESULTS.md)** — Oiloop macOS app (20 questions). B **+0.20** vs A after content fix; **78×** fewer API tokens; C best accuracy. Masked decode preference 75% (not independent human raters).
- **One-page summary:** [phase-3-twitter-card.png](context-os/evaluations/phase-3-twitter-card.png) — all 4 projects, 149 questions.
- **Honest limitations:** [research/validity-audit.md](research/validity-audit.md)

---

## How to use this repository

This repo is **research output**, not an app. You do not need to read every file in `context-os/` in order.

### Read the results (~15 minutes)

| Step | File | Why |
|------|------|-----|
| 0 | [research/SYNTHESIS.md](../../research/SYNTHESIS.md) | **Final conclusions** — decision matrix, limitations, practice phase |
| 1 | [context-os/evaluations/PHASE-2-RESULTS.md](context-os/evaluations/PHASE-2-RESULTS.md) | Main table — 3 OSS projects, when **B** (routed cores) vs **C** (graph) |
| 2 | [context-os/evaluations/PHASE-3-RESULTS.md](context-os/evaluations/PHASE-3-RESULTS.md) | Private integrated codebase (Oiloop) |
| 3 | [context-os/evaluations/phase-3-twitter-card.png](context-os/evaluations/phase-3-twitter-card.png) | Visual summary — 149 questions, 4 codebases |
| 4 | [research/validity-audit.md](research/validity-audit.md) | What we can and cannot claim (LLM-as-judge, sample sizes) |
| 5 | [experiments/README.md](experiments/README.md) → `runs/run-*/summary.json` | Raw numbers if you want to verify |

**Skip on first pass:** `papers/`, `prompts/`, per-instance core markdown, JSON schemas — those are for replication, not for understanding the findings.

### Decision cheat sheet

| Your situation | Default |
|----------------|---------|
| Narrow domain, cost/latency matter | **B** — keyword-routed domain cores |
| Cross-cutting deps, hallucination risk | **C** — graph retrieval |
| Dump entire repo into the prompt | **A** — baseline only; not recommended for production |

Variants: **A** = full repo · **B** = routed cores · **C** = Hermes-style graph retrieval.

### Use with an AI coding assistant

Clone the repo, then paste:

```
Read in order:
1. context-os/evaluations/PHASE-2-RESULTS.md
2. context-os/evaluations/PHASE-3-RESULTS.md
3. research/validity-audit.md

Then answer: for a codebase like [yours], should we use A (full repo),
B (routed cores), or C (graph retrieval)? Cite table rows only.
Do not invent metrics not in those files.
```

### Replicate on your codebase

See [Getting started (replication)](#getting-started-replication) below and [experiments/README.md](experiments/README.md).

---

## Planned Experiments

| Phase | Subject | Goal | Status |
|-------|---------|------|--------|
| 1 | [MailAgent](experiments/mailagent/) | First controlled A/B: full repo vs context cores | Done |
| 2 | MailAgent, Django REST, Navorina | Cross-project generalization | ✅ [Results](context-os/evaluations/PHASE-2-RESULTS.md) |
| 3 | Private project validation | Real-world decision quality | ✅ [Results](context-os/evaluations/PHASE-3-RESULTS.md) |
| 4 | Paper | Formal publication of results | ✅ [Draft](papers/paper-draft.md) |
| 5 | Open-source release | Community replication | In progress |

See [docs/research-roadmap.md](docs/research-roadmap.md) and [research/experiment-design.md](research/experiment-design.md).

---

## Getting started (replication)

To run your own A/B/C eval — not required to understand the published results.

1. Read [docs/overview.md](docs/overview.md) for the system model.
2. Read [docs/hypothesis.md](docs/hypothesis.md) and [docs/principles.md](docs/principles.md).
3. Study [context-os/cores/](context-os/cores/) templates.
4. Copy [experiments/template/](experiments/template/) and follow [experiments/README.md](experiments/README.md).
5. Run per [research/evaluation-framework.md](research/evaluation-framework.md).
6. Use [research/questions.md](research/questions.md) as the evaluation question bank.

---

## License

MIT — see [LICENSE](LICENSE).

---

## Contributing

This is a research repository. Contributions should extend theory, experiment design, evaluation methodology, or documented examples — not product features.
