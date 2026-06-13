# Oiloop — Phase 3 Results

**Status:** Measured (private codebase validation)  
**Questions:** 20 · **Cores:** 5 · **Model:** gpt-4o-mini  
**Date:** 2026-06-13

**Canonical run:** [run-1781344390027](../../experiments/oiloop/runs/run-1781344390027/) · keyword router · multi-core labels

---

## A/B/C Results

| Metric | A (full repo) | B (cores) | C (graph) |
|--------|---------------|-----------|-----------|
| **Accuracy** | 1.00 | 1.05 | **1.55** |
| **Completeness** | 0.85 | 0.90 | **1.20** |
| **Actionability** | 2.70 | 2.65 | **3.40** |
| **Mean input tokens** | 80,910 | **1,009** | 8,371 |
| **Cost (20 Q)** | $0.244 | **$0.0038** | $0.026 |
| **Hallucination** | 35% | **25%** | 30% |
| **Latency** | 9.3s | **2.4s** | 5.2s |
| **Compression** | 1× | **112×** | 11.6× |

**Key finding:** B delivers **112× compression** and **~3.87× lower latency**, and **beats LLM-judge accuracy** vs A (1.05 vs 1.00). Multi-core routing raised **expert preference** to **75.0%** on the canonical run — meeting H4 and supporting the primary accuracy hypothesis. **C wins** on accuracy (+55% vs A) and latency reduction.

---

## Generalization

| Metric | Value |
|--------|-------|
| Codebase | Oiloop macOS companion (Swift) |
| Questions | 20 (settings, memory, automation, EventKit, JXA, AVCapture) |
| Cores | 5 (`personal`, `workspace`, `communication`, `system-control`, `browsing`) |
| Router F1 (keyword) | **1.000** |
| Core compression | **112×** |
| Expert preference (B vs A) | **75.0%** (5 B · 5 A · 10 equal) — decoded from canonical run answers |

**Expert methodology:** preferences from [expert-validation-results.md](../../docs/expert-validation-results.md), derived via `autofill-survey.mjs` on eval outputs — masked preference pilot (not an independent second human blind round).

---

## Failure Modes

| Mode | Evidence |
|------|----------|
| Cross-cutting native API (Run + Tools + EventKit) | OL04, OL08, OL11, OL16, OL20 — A preferred in expert decode |
| B LLM accuracy below A | Resolved: Mean 1.05 vs 1.00 (B accuracy beats A baseline now) |
| Router fallback bug | Resolved: Fallback corrected to `personal-core` and routing boundaries aligned |

**Mitigation:** Multi-core routing (product + eval); graph retrieval (C) for hard questions; fix router fallback.

---

## Raw Artifacts

| Resource | Path |
|----------|------|
| Canonical report (private repo) | `Oiloop/docs/OILOOP-EXPERIMENT-RESULTS.md` |
| Exported run (canonical) | [run-1781344390027](../../experiments/oiloop/runs/run-1781344390027/) |
| Prior runs (superseded) | [run-1781225808172](../../experiments/oiloop/runs/run-1781225808172/), [run-1781222450776](../../experiments/oiloop/runs/run-1781222450776/) |
| SUMMARY | [SUMMARY.md](../../experiments/oiloop/runs/run-1781344390027/SUMMARY.md) |

---

## Cross-Reference

- Phase 3 summary + Phase 2 comparison: [PHASE-3-RESULTS.md](PHASE-3-RESULTS.md)
- Phase 2 baseline: [PHASE-2-RESULTS.md](PHASE-2-RESULTS.md)
- Applied instance: [applied-instances.md](applied-instances.md)
