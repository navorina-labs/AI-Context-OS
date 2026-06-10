# Hypothesis

## Primary Hypothesis

**AI systems produce higher-quality answers when context is organized by decision domains rather than by files, folders, or undifferentiated repository dumps.**

Formally:

> H₁: For a fixed question set Q and project P, answers generated via `Router(Q) → ContextCore(s) → LLM` outperform answers generated via `FullRepository(P) → LLM` on accuracy, reasoning quality, and hallucination rate, while using significantly less context.

Null hypothesis:

> H₀: There is no significant difference in answer quality between domain-routed context cores and full repository context.

---

## Supporting Sub-Hypotheses

### H₁a: Domain Boundaries Reduce Hallucination

When context is bounded to a decision domain, the model has fewer irrelevant facts to misconnect. Hallucination rate decreases.

### H₁b: Minimal Context Improves Reasoning Quality

Smaller, focused context improves chain-of-thought quality because each step references decision-relevant facts only.

### H₁c: Routing Latency Is Offset by Context Reduction

Router overhead plus smaller context yields lower total latency than processing full repository context.

### H₁d: Context Cores Generalize Across Projects

The four-core model (Business, Product, Technical, Operational) applies to diverse project types without per-project custom ontology.

### H₁e: GraphRAG Does Not Substitute for Decision Boundaries

Knowledge graphs improve entity retrieval but do not replace explicit decision-domain boundaries. Context cores outperform graph-only approaches on decision-scoped questions.

---

## What We Are NOT Claiming

- Context cores replace full repository access for exploratory tasks ("show me how this codebase works")
- Manual core curation scales indefinitely without tooling (tooling is future work, out of scope for v0)
- One core per question is always sufficient (mixed questions may require core composition)
- Context cores eliminate hallucination entirely

---

## Falsification Criteria

The hypothesis is **rejected** if:

1. Full repository baseline wins on accuracy for >60% of questions in the evaluation set
2. Context compression ratio <2× with no quality gain
3. Hallucination rate is equal or higher with cores vs full repo
4. Mixed-domain questions perform worse with routed cores than with full context

---

## Measurement

See [research/evaluation-framework.md](../research/evaluation-framework.md) and [research/experiment-design.md](../research/experiment-design.md).
