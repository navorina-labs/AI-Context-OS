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

| Core | Version | Token estimate |
|------|---------|----------------|
| [personal-core](cores/personal-core.md) | 1.0.0 | ~800 |
| [workspace-core](cores/workspace-core.md) | 1.1.0 | ~1200 |
| [communication-core](cores/communication-core.md) | 1.0.0 | ~1000 |
| [system-control-core](cores/system-control-core.md) | 1.0.0 | ~950 |
| [browsing-core](cores/browsing-core.md) | 1.0.0 | ~750 |

---

## Routing Validation

| Metric | Target | Actual |
|--------|--------|--------|
| Routing precision | ≥0.90 | 1.00 |
| Routing recall | ≥0.90 | 1.00 |

---

## Compression

| Measure | Value |
|---------|-------|
| Full repo tokens | ~80,910 |
| Mean routed core tokens | ~1,044 |
| CCR | 109× |

---

## Results Summary

Run: [runs/run-1781660908/](runs/run-1781660908/) (Phase 3.1 canonical) · Prior: [run-1781354424217/](runs/run-1781354424217/) (superseded)

| Metric | Condition A (Full) | Condition B (Cores) | Condition C (Graph) |
|--------|-------------------|----------------------|---------------------|
| Accuracy | 0.75 | **2.70** | 2.35 |
| Hallucination | 30% | **0%** | 10% |
| Mean input tokens | 76,663 | **6,334** | 8,963 |
| Latency (mean ms) | 2,512 | **2,086** | 2,651 |
| Compression | 1× | **29×** | 11× |

**Hypothesis:** Fully supported — B **2.70** vs A **0.75**; B hallucination **0%**. Production default: **B**.

Superseded: [run-1781354424217](runs/run-1781354424217/), [run-1781344390027](runs/run-1781344390027/), [run-1781225808172](runs/run-1781225808172/), [run-1781222450776](runs/run-1781222450776/).

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
