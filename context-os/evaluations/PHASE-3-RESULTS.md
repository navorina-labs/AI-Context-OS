# Phase 3 Results: Private Codebase Validation (Oiloop)

**Status:** Measured (1 private project, 20 questions)  
**Date:** 2026-06-12  
**Protocol:** A/B/C within-subjects · gpt-4o-mini · LLM-as-judge + expert preference decode (A vs B)

**Canonical run:** [run-1781225808172](../../experiments/oiloop/runs/run-1781225808172/) (keyword router, multi-core `expected_cores`).  
Superseded: [run-1781222450776](../../experiments/oiloop/runs/run-1781222450776/) (single-core gold labels, 709-token B mean).

---

## Executive Summary

Phase 3 validates Context OS on **Oiloop** — a private, highly integrated macOS Swift companion (5 product cores, ~81k mean input tokens for full-repo baseline).

**Hypothesis partially supported:**
- **Primary (B accuracy ≥ A):** **Not met** — B 1.05 vs A 1.20 (`hypothesis_supported: false` in `summary.json`).
- **H4 (expert preference B ≥ 60%):** **Met** — 60.0% after multi-core eval + preference re-decode from [run-1781225808172](../../experiments/oiloop/runs/run-1781225808172/) (see [expert-validation-results.md](../../docs/expert-validation-results.md)).
- **Efficiency:** B achieves **83× compression**, **98.5% cost savings**, and **2.96× lower latency**.

**Production default for Oiloop: C (graph retrieval)** — best accuracy (+29% vs A), lowest hallucination (15%), 89% token savings.

| Variant | Role on Oiloop |
|---------|----------------|
| **A** | Full repo — never default |
| **B** | Fast/cheap lane; loses on LLM accuracy vs A |
| **C** | **Production default** — accuracy + trust balance |

---

## Table 1: Oiloop A/B/C

| Metric | A (full repo) | B (cores) | C (graph) | Δ B vs A | Δ C vs A |
|--------|---------------|-----------|-----------|----------|----------|
| **Accuracy (0–3)** | 1.20 | 1.05 | **1.55** | −0.15 (−12.5%) | **+0.35 (+29.2%)** |
| **Completeness (0–2)** | 1.00 | 0.90 | **1.10** | −0.10 | +0.10 |
| **Actionability (1–5)** | 2.90 | 2.60 | **3.50** | −0.30 | **+0.60** |
| **Input tokens (mean)** | 81,212 | **979** | 8,290 | **−98.8%** | −89.8% |
| **Hallucination rate** | 20% | **25%** | **15%** | +5 pp | −5 pp |
| **Latency (mean ms)** | 5,288 | **1,787** | 5,671 | **−66.2%** | +7.2% |
| **Compression** | 1× | **83×** | 9.8× | | |
| **Router F1 (keyword)** | — | **0.950** | — | | |

**Legend:** A = full repo · B = keyword-routed cores (up to 2) · C = Hermes-style graph retrieval

---

## Phase 2 vs Phase 3 Comparison

Phase 2 measured 3 OSS projects (119 Q). Phase 3 adds the first **private, native-system** codebase.

### Cross-Project Table (Phase 2 + Oiloop)

| Project | Phase | Qs | Cores | A_acc | B_acc | C_acc | B vs A | Router F1 | Compression | Default |
|---------|-------|----|-------|-------|-------|-------|--------|-----------|-------------|---------|
| MailAgent | 2 | 35 | 6 | 1.40 | **1.69** | 1.37 | **+21%** | 1.00 | 45× | **B** |
| Django REST | 2 | 42 | 5 | 1.35 | **1.68** | 1.40 | **+24%** | 0.85 | 38× | **C** |
| Navorina | 2 | 42 | 11 | 1.00 | **1.19** | 0.93 | **+19%** | 0.87 | 14× | **C** |
| **Oiloop** | **3** | **20** | **5** | 1.20 | 1.05 | **1.55** | **−12.5%** | **0.95** | **83×** | **C** |

### What Changed in Phase 3

| Pattern | Phase 2 (OSS) | Phase 3 (Oiloop) |
|---------|---------------|------------------|
| B accuracy vs A | B wins +19–24% on all 3 projects | **B loses −12.5%** — first counterexample |
| Why B fails when it fails | Hallucination 19–23%; accuracy still beats A | Cross-cutting Swift/system APIs; single eval miss on OL08 (`technical-core` fallback bug, fixed) |
| C vs B hallucination | C lower (7–14% vs 19–23%) | C **lower** (15% vs 25%) — same pattern |
| Expert validation | LLM-as-judge only | Preference decode: 50% → **60%** after multi-core run (not a new human blind round) |
| Compression ceiling | 14–45× | **83×** (multi-core B mean ~979 tokens) |

### Decision Matrix (Updated)

```
                B better          C better
              ─────────        ─────────
MailAgent        ●
Django REST                      ●
Navorina                         ●
Oiloop                           ●
```

**Rule refinement:** High router F1 (≥0.95) does **not** guarantee B beats A on LLM-judge accuracy. Integrated system codebases need **C** or **multi-core B + graph fallback**.

---

## Expert Preference (A vs B)

Decoded from [expert-validation-results.md](../../docs/expert-validation-results.md) after [run-1781225808172](../../experiments/oiloop/runs/run-1781225808172/):

| Outcome | Count |
|---------|-------|
| B preferred | 4 |
| A preferred | 8 |
| Equal | 8 |

**B preferred or equal: 60.0%** — meets Phase 3 exit criterion (H4).  
**Methodology note:** preferences re-derived from eval answers via `autofill-survey.mjs`; not an independent second human blind round.

Prior run [run-1781222450776](../../experiments/oiloop/runs/run-1781222450776/): **50%** (5 B · 10 A · 5 equal).

---

## Key Findings

1. **Integrated system codebases invert the B-accuracy pattern** — Phase 2 generalization does not hold on Oiloop.
2. **Multi-core routing helps preference, not LLM accuracy** — expert 50% → 60%, but B accuracy stayed 1.05.
3. **Graph retrieval wins on quality** — C best accuracy (1.55) and lowest hallucination (15%).
4. **Router fallback matters** — OL08 routed to non-existent `technical-core` (0 tokens context); fixed to `personal-core` in Oiloop `router.mjs`.

---

## Recommendations

| Profile | Default | Why |
|---------|---------|-----|
| Oiloop (integrated Swift/system) | **C** | +29% accuracy vs A; 15% hallucination |
| Fast lane (Ollama, background) | **B multi-core** | 83× compression, 1.8s latency |
| Any full-repo dump | **Never A** | Cost and latency dominated |

---

## Limitations

- N = 20 questions (smaller than Phase 2 projects).
- B uses production keyword router in canonical run; prior run used tighter single-core labels.
- Expert 60% from decode pipeline, not fresh blind human ratings.
- Private codebase — raw artifacts in [experiments/oiloop/](../../experiments/oiloop/).

---

## Per-Project Report

| Project | Report | Raw run |
|---------|--------|---------|
| Oiloop | [oiloop-phase-3.md](oiloop-phase-3.md) | [run-1781225808172](../../experiments/oiloop/runs/run-1781225808172/) |

---

## Cross-Reference

- Phase 2: [PHASE-2-RESULTS.md](PHASE-2-RESULTS.md)
- Applied instance: [applied-instances.md](applied-instances.md)
- Methodology: [research/evaluation-framework.md](../../research/evaluation-framework.md)
