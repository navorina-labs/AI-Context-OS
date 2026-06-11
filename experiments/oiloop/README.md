# Experiment: Oiloop (macOS AI Companion)

This experiment evaluates the **AI Context OS** domain-oriented context cores approach on a private commercial macOS companion application (`Oiloop`).

---

## Metadata

| Field | Value |
|-------|-------|
| Project | Oiloop |
| Repository | `file:///Users/alex0nder/Projects/Oiloop` |
| Phase | 3 |
| Status | cores-built |
| Start date | 2026-06-12 |
| Model used | `gpt-4o-mini` |

---

## Hypothesis (Subject-Specific)

- **Domain-Oriented Context Cores (Condition B)** will yield equivalent or higher accuracy compared to the **Full Repository snap (Condition A)** while achieving a Context Compression Ratio (CCR) of $\ge 5\times$ and reducing local model latency by $\ge 40\%$.
- System/automation-related queries will route cleanly to `system-control-core`, preventing accidental trigger tag hallucinations in other contexts.

---

## Cores Built

| Core | Version | Tokens | Validation pass rate |
|------|---------|--------|----------------------|
| [personal-core](cores/personal-core.md) | 1.0.0 | ~800 | |
| [workspace-core](cores/workspace-core.md) | 1.0.0 | ~900 | |
| [communication-core](cores/communication-core.md) | 1.0.0 | ~1000 | |
| [system-control-core](cores/system-control-core.md) | 1.0.0 | ~950 | |
| [browsing-core](cores/browsing-core.md) | 1.0.0 | ~750 | |

---

## Routing Validation

| Metric | Target | Actual |
|--------|--------|--------|
| Routing precision | ≥0.90 | |
| Routing recall | ≥0.90 | |

---

## Compression

| Measure | Value |
|---------|-------|
| Full repo tokens | ~84,000 |
| All cores tokens | ~4,400 |
| CCR | ~19× |

---

## Results Summary

(To be filled after experiment)

| Metric | Condition A (Full) | Condition B (Cores) | Δ |
|--------|-------------------|----------------------|---|
| Accuracy | | | |
| Hallucination rate | | | |
| Reasoning quality | | | |
| Latency p95 | | | |

**Hypothesis:** Planned

---

## Files Structure

```
experiments/oiloop/
├── README.md
├── hypothesis.md
├── routing-rules.md
└── cores/
    ├── personal-core.md
    ├── workspace-core.md
    ├── communication-core.md
    ├── system-control-core.md
    └── browsing-core.md
```
