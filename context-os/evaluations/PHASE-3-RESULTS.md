# Phase 3 Results: Private Codebase Validation (Oiloop)

**Status:** Measured (1 private project, 20 questions)  
**Date:** 2026-06-13 (post adversarial audit)  
**Protocol:** A/B/C within-subjects · gpt-4o-mini · LLM-as-judge + masked decode preference (A vs B)

**Canonical run:** [run-1781344390027](../../experiments/oiloop/runs/run-1781344390027/) (keyword router, multi-core `expected_cores`).  
Superseded: [run-1781225808172](../../experiments/oiloop/runs/run-1781225808172/) (routing bug on OL08); [run-1781222450776](../../experiments/oiloop/runs/run-1781222450776/) (single-core gold labels).

---

## Executive Summary

Phase 3 validates Context OS on **Oiloop** — a private, highly integrated macOS Swift companion (5 product cores, ~80.9k mean API input tokens for full-repo baseline).

**Primary hypothesis (B accuracy ≥ A):** Met **descriptively** — B 1.05 vs A 1.00 (`hypothesis_supported: true`). Margin **+0.05** on N=20 is not statistically tested. **Fragile:** prior run had A=1.20, B=1.05 (hypothesis false) — B unchanged between runs.

**H4 (masked decode preference B ≥ 60%):** Met — 75.0% B-preferred-or-equal from decode pipeline ([expert-validation-results.md](../../docs/expert-validation-results.md)). **Not** independent human raters.

**Efficiency:** **CCR_tokens 80×** (80,910 → 1,009 mean input tokens); **CCR_core 112×** (harness baseline/core chars). **3.87×** lower latency (B vs A).

**Production default for Oiloop: C (graph retrieval)** — best accuracy (+55% vs A).

| Variant | Role on Oiloop |
|---------|----------------|
| **A** | Full repo — never default |
| **B** | Fast/cheap lane; +0.05 accuracy vs A (thin margin) |
| **C** | **Production default** — best accuracy |

---

## Oiloop Run Stability (critical)

| Run | Date | A_acc | B_acc | Δ B vs A | hypothesis | OL08 B acc | Notes |
|-----|------|-------|-------|----------|------------|------------|-------|
| run-1781225808172 | superseded | **1.20** | 1.05 | −0.15 | **false** | 0 | OL08 routing bug |
| **run-1781344390027** | **canonical** | **1.00** | **1.05** | **+0.05** | **true** | **0** | B unchanged; A dropped −17% |

**Interpretation:** Do not claim routing fix improved B. Canonical H₁ pass is entirely explained by **A baseline variance** (LLM judge / run non-determinism). `workspace-core` FilePreviewSheet patch (2026-06-13) was **after** this run — OL08 B still accuracy 0; re-run pending.

---

## Table 1: Oiloop A/B/C

| Metric | A (full repo) | B (cores) | C (graph) | Δ B vs A | Δ C vs A |
|--------|---------------|-----------|-----------|----------|----------|
| **Accuracy (0–3)** | 1.00 | 1.05 | **1.55** | +0.05 (+5.0%) | **+0.55 (+55.0%)** |
| **Completeness (0–2)** | 0.85 | 0.90 | **1.20** | +0.05 | +0.35 |
| **Actionability (1–5)** | 2.70 | 2.65 | **3.40** | −0.05 | +0.70 |
| **Input tokens (mean)** | 80,910 | **1,009** | 8,371 | −98.8% | −89.7% |
| **CCR_tokens** | 1× | **80×** | 9.7× | | |
| **CCR_core** | 1× | **112×** | 11.6× | | |
| **Hallucination rate** | 35% | **25%** | **30%** | −10 pp | −5 pp |
| **Latency (mean ms)** | 9,305 | **2,402** | 5,240 | −74.2% | −43.7% |
| **Router F1 (keyword)** | — | **1.000** | — | | |

**Legend:** A = full repo · B = keyword-routed cores (up to 2) · C = Hermes-style graph retrieval

---

## Phase 2 vs Phase 3 Comparison

### Cross-Project Table (Phase 2 + Oiloop) — 149 Q

| Project | Phase | Qs | A_acc | B_acc | C_acc | B vs A | Router F1 | CCR_tokens | CCR_core | Default |
|---------|-------|----|-------|-------|-------|--------|-----------|------------|----------|---------|
| MailAgent | 2 | 45 | 1.38 | **1.67** | 1.24 | +21% | 1.00 | 8.3× | 12.1× | **B** |
| Django REST | 2 | 42 | 1.35 | **1.68** | 1.40 | +24% | 0.85 | 38×† | — | **C** |
| Navorina | 2 | 42 | 1.00 | **1.19** | 0.93 | +19% | 0.87 | 13.7× | 14.6× | **C** |
| **Oiloop** | **3** | **20** | 1.00 | 1.05 | **1.55** | +5% | 1.00 | **80×** | 112× | **C** |

† Django summary only.

### What Changed in Phase 3

| Pattern | Phase 2 (OSS) | Phase 3 (Oiloop) |
|---------|---------------|------------------|
| B accuracy vs A | B wins +19–24% | B wins +5% (thin; A unstable between runs) |
| C vs B hallucination | C lower on Django, Navorina | C **higher** (30% vs 25%) — exception |
| Decode preference | — | 75% B-or-equal (masked decode, not humans) |
| CCR_tokens | 8–38× | **80×** |
| CCR_core | 12–15× | **112×** |

### Decision Matrix (Updated)

```
                B better          C better
              ─────────        ─────────
MailAgent        ●
Django REST                      ●
Navorina                         ●
Oiloop                           ●
```

---

## Masked Decode Preference (A vs B)

Decoded from [expert-validation-results.md](../../docs/expert-validation-results.md) after [run-1781344390027](../../experiments/oiloop/runs/run-1781344390027/):

| Outcome | Count |
|---------|-------|
| B preferred | 5 |
| A preferred | 5 |
| Equal | 10 |

**B preferred or equal: 75.0%** — meets Phase 3 exit criterion (H4).

**Methodology (required disclosure):** Preferences derived by `autofill-survey.mjs` decode on **existing eval answers** — masked preference pilot, **not** fresh blind human ratings. Do not describe as "expert study" or "5 experts preferred B."

---

## Key Findings

1. **B ≥ A descriptively (+0.05)** with **80× CCR_tokens** and **3.9×** latency savings — margin fragile across runs.
2. **Graph retrieval (C) wins on quality (+55% accuracy vs A)** — production default despite C halluc > B.
3. **Routing fixed** (keyword F1=1.0) — OL08 still B accuracy 0 until core content + re-run.
4. **C vs B hallucination** does not hold on Oiloop (30% vs 25%).

---

## Recommendations

| Profile | Default | Why |
|---------|---------|-----|
| Oiloop (integrated Swift/system) | **C** | +55% accuracy vs A |
| Fast lane (Ollama, background) | **B multi-core** | 80× CCR_tokens, 2.4s latency |
| Any full-repo dump | **Never A** | Cost and latency dominated |

---

## Limitations

- N = 20 questions; +0.05 B vs A not significance-tested.
- A baseline moved 1.20 → 1.00 between Oiloop runs while B stayed 1.05.
- Masked decode 75% ≠ human expert validation.
- OL08: routing correct, core content gap (FilePreviewSheet) — patch not in canonical run.
- Private codebase — raw artifacts in [experiments/oiloop/](../../experiments/oiloop/).

---

## Per-Project Report

| Project | Report | Raw run |
|---------|--------|---------|
| Oiloop | [oiloop-phase-3.md](oiloop-phase-3.md) | [run-1781344390027](../../experiments/oiloop/runs/run-1781344390027/) |

---

## Cross-Reference

- Phase 2: [PHASE-2-RESULTS.md](PHASE-2-RESULTS.md)
- Validity: [research/validity-audit.md](../../research/validity-audit.md)
- Applied instance: [applied-instances.md](applied-instances.md)
- Methodology: [research/evaluation-framework.md](../../research/evaluation-framework.md)
