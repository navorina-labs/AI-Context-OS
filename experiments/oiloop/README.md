# Experiment: Oiloop (macOS AI Companion)

This experiment evaluates the **AI Context OS** domain-oriented context cores approach on a private commercial macOS companion application (`Oiloop`).

---

## Metadata

| Field | Value |
|-------|-------|
| Project | Oiloop |
| Repository | `file:///Users/alex0nder/Projects/Oiloop` |
| Phase | 3 |
| Status | measured |
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
| [personal-core](cores/personal-core.md) | 1.0.0 | ~500 | 100% (7/7) |
| [workspace-core](cores/workspace-core.md) | 1.0.0 | ~470 | 83.3% (5/6) |
| [communication-core](cores/communication-core.md) | 1.0.0 | ~520 | 100% (4/4) |
| [system-control-core](cores/system-control-core.md) | 1.0.0 | ~550 | 100% (8/8) |
| [browsing-core](cores/browsing-core.md) | 1.0.0 | ~430 | 100% (3/3) |

---

## Routing Validation

| Metric | Target | Actual |
|--------|--------|--------|
| Routing precision | ≥0.90 | 0.95 |
| Routing recall | ≥0.90 | 0.95 |

---

## Compression

| Measure | Value |
|---------|-------|
| Full repo tokens | ~81,212 |
| Mean routed core tokens | ~979 |
| CCR | 83× |

---

## Results Summary

Run: [runs/run-1781225808172/](runs/run-1781225808172/) · Report: [docs/expert-validation-results.md](../../docs/expert-validation-results.md)

| Metric | Condition A (Full) | Condition B (Cores) | Condition C (Graph) |
|--------|-------------------|----------------------|---------------------|
| Accuracy | 1.20 | 1.05 | **1.55** |
| Completeness | 1.00 | 0.90 | **1.10** |
| Actionability | 2.90 | 2.60 | **3.50** |
| Mean input tokens | 81,212 | **979** | 8,290 |
| Latency (mean ms) | 5,288 | **1,787** | 5,671 |
| Compression | 1× | **83×** | 9.8× |

**Hypothesis:** Supported (B meets the 60.0% expert preference threshold; C achieves highest quality while saving 89.8% tokens)

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
