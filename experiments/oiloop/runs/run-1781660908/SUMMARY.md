# Context OS Eval Summary

- Results: `context-os/eval/results/run-phase31-1781660908`
- Paired questions: **20**
- Conditions: **A, B, C**
- Cores: **workspace-core v1.1.0** + fixed gold (OL05/OL07)
- Router: gold (F1 = 1.0)

## A / B / C comparison

| Metric | A (full repo) | B (Context OS) | C (Hermes graph) |
|--------|---------------|----------------|------------------|
| Mean accuracy (0–3) | 0.750 | **2.700** | 2.350 |
| Hallucination rate | 30.0% | **0.0%** | 10.0% |
| Mean latency (ms) | 2511.600 | **2086.300** | 2650.750 |
| Mean input tokens | 76662.700 | **6333.750** | 8962.650 |
| Mean context chars | 400000.000 | 21176.600 | 38746.550 |
| CCR vs A (chars) | 1× | **29.146×** | 11.030× |

**Best accuracy:** B · **Lowest tokens:** B

**Hypothesis B vs A (heuristic):** YES

See `paired.csv`, `summary.json`, and `ABC-COMPARE.md`.
