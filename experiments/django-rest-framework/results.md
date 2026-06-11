# Django REST Framework Phase 2.1 — Published Results

---

## Evaluation Results (42 questions)

| Strategy | Accuracy | Cost | Hallucination Rate |
|---|---|---|---|
| **A (Full Repository)** | 1.35 | $0.52 | 18% |
| **B (Routed Cores)** | **1.68** | **$0.012** | 22% |
| **C (Graph Retrieval)** | 1.40 | $0.14 | **11%** |

---

## Key Metrics

- **Router F1 Score:** 0.72 (keyword) | 0.85 (semantic)
- **Core Compression Ratio (CCR):** 38x

---

## Effort & Resource Allocation

- **Audit Hours:** 16 hours
- **Core Writing Hours:** 24 hours

---

## Failure Modes & Insights

> [!WARNING]
> - **Cross-cutting questions:** Some queries required information from 2 cores simultaneously, suggesting a need for multi-core routing or dynamic prompt merge.
> - **Non-obvious domain boundaries:** Defining clear separation lines between cores is challenging in highly integrated frameworks.
