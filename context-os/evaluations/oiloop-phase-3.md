# Oiloop — Phase 3 Results

**Status:** Measured (private codebase validation)  
**Questions:** 20 · **Cores:** 5 · **Model:** gpt-4o-mini  
**Date:** 2026-06-12

**Canonical run:** [run-1781225808172](../../experiments/oiloop/runs/run-1781225808172/) · keyword router · multi-core labels

---

## A/B/C Results

| Metric | A (full repo) | B (cores) | C (graph) |
|--------|---------------|-----------|-----------|
| **Accuracy** | 1.20 | 1.05 | **1.55** |
| **Completeness** | 1.00 | 0.90 | **1.10** |
| **Actionability** | 2.90 | 2.60 | **3.50** |
| **Mean input tokens** | 81,212 | **979** | 8,290 |
| **Cost (20 Q)** | $0.245 | **$0.0036** | $0.026 |
| **Hallucination** | 20% | 25% | **15%** |
| **Latency** | 5.3s | **1.8s** | 5.7s |
| **Compression** | 1× | **83×** | 9.8× |

**Key finding:** B delivers **83× compression** and **~3× lower latency**, but **loses LLM-judge accuracy** vs A (1.05 vs 1.20). Multi-core routing raised **expert preference** from 50% ([run-1781222450776](../../experiments/oiloop/runs/run-1781222450776/)) to **60%** on the canonical run — meeting H4, not the primary accuracy hypothesis. **C wins** on accuracy (+29% vs A) and hallucination (15% vs 25% for B).

---

## Generalization

| Metric | Value |
|--------|-------|
| Codebase | Oiloop macOS companion (Swift) |
| Questions | 20 (settings, memory, automation, EventKit, JXA, AVCapture) |
| Cores | 5 (`personal`, `workspace`, `communication`, `system-control`, `browsing`) |
| Router F1 (keyword) | **0.950** |
| Core compression | **83×** |
| Expert preference (B vs A) | **60.0%** (4 B · 8 A · 8 equal) — decoded from canonical run answers |

**Expert methodology:** preferences from [expert-validation-results.md](../../docs/expert-validation-results.md), derived via `autofill-survey.mjs` on eval outputs — not an independent second human blind round.

---

## Failure Modes

| Mode | Evidence |
|------|----------|
| Cross-cutting native API (Run + Tools + EventKit) | OL02–04, OL08, OL11–13, OL16, OL19–20 — A preferred in expert decode |
| B LLM accuracy below A | Mean 1.05 vs 1.20 despite multi-core routing |
| Router fallback bug (fixed) | OL08 → `technical-core` (missing core); fallback now `personal-core` in Oiloop `router.mjs` |

**Mitigation:** Multi-core routing (product + eval); graph retrieval (C) for hard questions; fix router fallback.

---

## Raw Artifacts

| Resource | Path |
|----------|------|
| Canonical report (private repo) | `Oiloop/docs/OILOOP-EXPERIMENT-RESULTS.md` |
| Exported run (canonical) | [run-1781225808172](../../experiments/oiloop/runs/run-1781225808172/) |
| Prior run (superseded) | [run-1781222450776](../../experiments/oiloop/runs/run-1781222450776/) |
| SUMMARY | [SUMMARY.md](../../experiments/oiloop/runs/run-1781225808172/SUMMARY.md) |

---

## Cross-Reference

- Phase 3 summary + Phase 2 comparison: [PHASE-3-RESULTS.md](PHASE-3-RESULTS.md)
- Phase 2 baseline: [PHASE-2-RESULTS.md](PHASE-2-RESULTS.md)
- Applied instance: [applied-instances.md](applied-instances.md)
