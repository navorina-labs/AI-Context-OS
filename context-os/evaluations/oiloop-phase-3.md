# Oiloop — Phase 3 Results

**Status:** Measured (private codebase validation)  
**Questions:** 20 · **Cores:** 5 · **Model:** gpt-4o-mini  
**Date:** 2026-06-12

---

## A/B/C Results

| Metric | A (full repo) | B (cores) | C (graph) |
|--------|---------------|-----------|-----------|
| **Accuracy** | 1.30 | 1.05 | **1.55** |
| **Completeness** | 1.00 | 0.85 | **1.10** |
| **Actionability** | 3.05 | 2.70 | **3.50** |
| **Mean input tokens** | ~81k | **709** | ~8.3k |
| **Cost (20 Q)** | $0.245 | **$0.0028** | $0.026 |
| **Hallucination** | 20% | 20% | 25% |
| **Latency** | 4.2s | **1.9s** | 4.0s |
| **Compression** | 1× | **114×** | 9.8× |

**Key finding:** First measured project where **B loses accuracy vs A** (−19%). Highly integrated Swift/system codebase — cross-cutting native API questions need multi-module context. **C wins** on accuracy (+19% vs A) at 89% token savings. Expert blind preference for B: **50%** (target ≥60% — not met).

---

## Generalization

| Metric | Value |
|--------|-------|
| Codebase | Oiloop macOS companion (Swift) |
| Questions | 20 (settings, memory, automation, EventKit, JXA, AVCapture) |
| Cores | 5 (`personal`, `workspace`, `communication`, `system-control`, `browsing`) |
| Router F1 (keyword) | **0.950** |
| Core compression | **114×** |
| Expert preference (B vs A, blind) | 50% (5 B · 10 A · 5 equal) |

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
| Exported run (AI-Context-OS) | [experiments/oiloop/runs/run-1781222450776/](../../experiments/oiloop/runs/run-1781222450776/) |
| SUMMARY | [SUMMARY.md](../../experiments/oiloop/runs/run-1781222450776/SUMMARY.md) |
| Experiment scaffold | [experiments/oiloop/](../../experiments/oiloop/) |

---

## Cross-Reference

- Phase 3 summary + Phase 2 comparison: [PHASE-3-RESULTS.md](PHASE-3-RESULTS.md)
- Phase 2 baseline: [PHASE-2-RESULTS.md](PHASE-2-RESULTS.md)
- Applied instance: [applied-instances.md](applied-instances.md)
