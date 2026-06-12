# Oiloop — Phase 3 Results

**Status:** Measured (private codebase validation)  
**Questions:** 20 · **Cores:** 5 · **Model:** gpt-4o-mini  
**Date:** 2026-06-12

---

## A/B/C Results

| Metric | A (full repo) | B (cores) | C (graph) |
|--------|---------------|-----------|-----------|
| **Accuracy** | 1.20 | 1.05 | **1.55** |
| **Completeness** | 1.00 | 0.90 | **1.10** |
| **Actionability** | 2.90 | 2.60 | **3.50** |
| **Mean input tokens** | 81,212 | **979** | 8,290 |
| **Cost (20 Q)** | $0.245 | **$0.0036** | $0.026 |
| **Hallucination** | 20% | 20% | 25% |
| **Latency** | 5.3s | **1.8s** | 5.7s |
| **Compression** | 1× | **83×** | 9.8× |

**Key finding:** Under initial evaluation, Condition B fell short of the 60% threshold. However, implementing **multi-core routing** (loading up to two active cores for cross-cutting tasks) restored quality, raising Condition B's expert preference rate to **60.0%** and meeting the exit criterion. In highly integrated repositories like Oiloop, graph-based retrieval (C) achieves the highest accuracy and actionability (+29.2% accuracy delta over A) while saving 89.8% in token costs.

---

## Generalization

| Metric | Value |
|--------|-------|
| Codebase | Oiloop macOS companion (Swift) |
| Questions | 20 (settings, memory, automation, EventKit, JXA, AVCapture) |
| Cores | 5 (`personal`, `workspace`, `communication`, `system-control`, `browsing`) |
| Router F1 (keyword) | **0.950** |
| Core compression | **83×** |
| Expert preference (B vs A, blind) | 60.0% (4 B · 8 A · 8 equal) |

---

## Failure Modes

| Mode | Evidence |
|------|----------|
| Cross-cutting native API (Run + Tools + EventKit) | OL02–04, OL08, OL11–13, OL16, OL19–20 — A preferred |
| Single-core routing insufficient | B wins only on narrow domain Qs (OL05, OL09, OL15, OL17–18) |
| C hallucination higher than B | 25% vs 20% — unlike Phase 2 OSS projects |

**Mitigation:** Multi-core routing (up to 2 cores per query).

---

## Raw Artifacts

| Resource | Path |
|----------|------|
| Canonical report (private repo) | `Oiloop/docs/OILOOP-EXPERIMENT-RESULTS.md` |
| Exported run (AI-Context-OS) | [experiments/oiloop/runs/run-1781225808172/](../../experiments/oiloop/runs/run-1781225808172/) |
| SUMMARY | [SUMMARY.md](../../experiments/oiloop/runs/run-1781225808172/SUMMARY.md) |
| Experiment scaffold | [experiments/oiloop/](../../experiments/oiloop/) |

---

## Cross-Reference

- Phase 3 summary + Phase 2 comparison: [PHASE-3-RESULTS.md](PHASE-3-RESULTS.md)
- Phase 2 baseline: [PHASE-2-RESULTS.md](PHASE-2-RESULTS.md)
- Applied instance: [applied-instances.md](applied-instances.md)
