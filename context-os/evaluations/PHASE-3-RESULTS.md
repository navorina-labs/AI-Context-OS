# Phase 3 Results: Private Codebase Validation (Oiloop)

**Status:** Measured (1 private project, 20 questions)  
**Date:** 2026-06-13 (post adversarial audit)  
**Protocol:** A/B/C within-subjects · gpt-4o-mini · LLM-as-judge + masked decode preference (A vs B)

**Canonical run:** [run-1781354424217](../../experiments/oiloop/runs/run-1781354424217/) (keyword router, multi-core `expected_cores`).  
**Pilot (2026-06-17):** [run-1781658621476](../../experiments/oiloop/runs/run-1781658621476/) — 10 Q (OL01–OL10), expanded cores; B 2.10 / C 2.40 vs A 0.50.  
Superseded: [run-1781344390027](../../experiments/oiloop/runs/run-1781344390027/) (old canonical, B acc 1.05, OL08 bug); [run-1781225808172](../../experiments/oiloop/runs/run-1781225808172/) (routing bug on OL08); [run-1781222450776](../../experiments/oiloop/runs/run-1781222450776/) (single-core gold labels).

---

## Executive Summary

Phase 3 validates Context OS on **Oiloop** — a private, highly integrated macOS Swift companion (5 product cores, ~80.9k mean API input tokens for full-repo baseline).

**Primary hypothesis (B accuracy ≥ A):** Met **descriptively** — B 1.20 vs A 1.00 (`hypothesis_supported: true`). Margin **+0.20** on N=20 is not statistically tested. B accuracy improved from 1.05 to 1.20 after resolving the OL08 content gap.

**H4 (masked decode preference B ≥ 60%):** Met — 75.0% B-preferred-or-equal from decode pipeline ([expert-validation-results.md](../../docs/expert-validation-results.md)). **Not** independent human raters.

**Efficiency:** **CCR_tokens 78×** (80,910 → 1,044 mean input tokens); **CCR_core 109×** (harness baseline/core chars). **2.13×** lower latency (B vs A).

**Production default for Oiloop: C (graph retrieval)** — best accuracy (+55% vs A).

| Variant | Role on Oiloop |
|---------|----------------|
| **A** | Full repo — never default |
| **B** | Fast/cheap lane; +0.20 accuracy vs A |
| **C** | **Production default** — best accuracy |

---

## Oiloop Run Stability (critical)

| Run | Date | A_acc | B_acc | Δ B vs A | hypothesis | OL08 B acc | Notes |
|-----|------|-------|-------|----------|------------|------------|-------|
| run-1781225808172 | superseded | **1.20** | 1.05 | −0.15 | **false** | 0 | OL08 routing bug |
| run-1781344390027 | superseded | **1.00** | 1.05 | +0.05 | **true** | 0 | B unchanged; OL08 bug |
| **run-1781354424217** | **canonical** | **1.00** | **1.20** | **+0.20** | **true** | **3** | OL08 fixed, canonical re-run |

**Interpretation:** OL08 content fix successfully resolved the FilePreviewSheet content gap, elevating B accuracy of OL08 from 0 to 3, and overall B accuracy from 1.05 to 1.20.

---

## Table 1: Oiloop A/B/C

| Metric | A (full repo) | B (cores) | C (graph) | Δ B vs A | Δ C vs A |
|--------|---------------|-----------|-----------|----------|----------|
| **Accuracy (0–3)** | 1.00 | **1.20** | **1.55** | **+0.20 (+20.0%)** | **+0.55 (+55.0%)** |
| **Completeness (0–2)** | 0.85 | **0.90** | **1.20** | +0.05 | +0.35 |
| **Actionability (1–5)** | 2.70 | **2.65** | **3.40** | −0.05 | +0.70 |
| **Input tokens (mean)** | 80,910 | **1,044** | **8,399** | **−98.71%** | **−89.62%** |
| **CCR_tokens** | 1× | **78×** | 9.6× | | |
| **CCR_core** | 1× | **109×** | 11.6× | | |
| **Hallucination rate** | 20% | **20%** | **15%** | 0 pp | −5 pp |
| **Latency (mean ms)** | 3,920 | **1,840** | **4,294** | −53.1% | +9.5% |
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
| **Oiloop** | **3** | **20** | 1.00 | **1.20** | **1.55** | **+20%** | 1.00 | **78×** | **109×** | **C** |

† Django summary only.

### What Changed in Phase 3

| Pattern | Phase 2 (OSS) | Phase 3 (Oiloop) |
|---------|---------------|------------------|
| B accuracy vs A | B wins +19–24% | B wins +20% (robust; resolved OL08 content gap) |
| C vs B hallucination | C lower on Django, Navorina | C lower (15% vs 20%) |
| Decode preference | — | 75% B-or-equal (masked decode, not humans) |
| CCR_tokens | 8–38× | **78×** |
| CCR_core | 12–15× | **109×** |

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

Decoded from [expert-validation-results.md](../../docs/expert-validation-results.md) after [run-1781354424217](../../experiments/oiloop/runs/run-1781354424217/):

| Outcome | Count |
|---------|-------|
| B preferred | 5 |
| A preferred | 5 |
| Equal | 10 |

**B preferred or equal: 75.0%** — meets Phase 3 exit criterion (H4).

**Methodology (required disclosure):** Preferences derived by `autofill-survey.mjs` decode on **existing eval answers** — masked preference pilot, **not** fresh blind human ratings. Do not describe as "expert study" or "5 experts preferred B."

---

## Key Findings

1. **B ≥ A descriptively (+0.20)** with **78× CCR_tokens** and **2.13×** latency savings.
2. **Graph retrieval (C) wins on quality (+55% accuracy vs A)** — production default.
3. **Routing fixed** (keyword F1=1.0) and **OL08 content fixed** (B accuracy went from 0 to 3).
4. **C vs B hallucination** holds on Oiloop (15% vs 20%).

---

## Recommendations

| Profile | Default | Why |
|---------|---------|-----|
| Oiloop (integrated Swift/system) | **C** | +55% accuracy vs A |
| Fast lane (Ollama, background) | **B multi-core** | 78× CCR_tokens, 1.8s latency |
| Any full-repo dump | **Never A** | Cost and latency dominated |

---

## Limitations

- N = 20 questions; +0.20 B vs A not significance-tested.
- Masked decode 75% ≠ human expert validation.
- Private codebase — raw artifacts in [experiments/oiloop/](../../experiments/oiloop/).

---

## Pilot Re-validation (2026-06-17)

Expanded Context Core metadata re-run on OL01–OL10. Full-repo baseline (A) collapsed to **0.50** mean accuracy at 400k chars; B and C both exceed **2.0**.

| Metric | A | B | C | Δ B vs A |
|--------|---|---|---|----------|
| Accuracy | 0.50 | **2.10** | **2.40** | **+1.60** |
| Input tokens | 76,663 | **6,629** | 8,850 | −91.4% |
| CCR (chars) | 1× | **31.7×** | 11.2× | |
| Hallucination | 20% | 30% | 20% | |

Artifacts: [run-1781658621476](../../experiments/oiloop/runs/run-1781658621476/) · [ABC-COMPARE.md](../../experiments/oiloop/runs/run-1781658621476/ABC-COMPARE.md). Canonical 20Q benchmark unchanged.

---

## Per-Project Report

| Project | Report | Raw run | Pilot |
|---------|--------|---------|-------|
| Oiloop | [oiloop-phase-3.md](oiloop-phase-3.md) | [run-1781354424217](../../experiments/oiloop/runs/run-1781354424217/) | [run-1781658621476](../../experiments/oiloop/runs/run-1781658621476/) |

**Next eval:** Phase 3.1 — [run-oiloop-phase-3.1-eval.md](../../prompts/run-oiloop-phase-3.1-eval.md) · core fixes: [core-fixes-OL05-OL07.md](core-fixes-OL05-OL07.md)

---

## Cross-Reference

- Phase 2: [PHASE-2-RESULTS.md](PHASE-2-RESULTS.md)
- Validity: [research/validity-audit.md](../../research/validity-audit.md)
- Applied instance: [applied-instances.md](applied-instances.md)
- Methodology: [research/evaluation-framework.md](../../research/evaluation-framework.md)
- Phase 3.1 protocol: [prompts/run-oiloop-phase-3.1-eval.md](../../prompts/run-oiloop-phase-3.1-eval.md)
- Core fixes (OL05/OL07): [core-fixes-OL05-OL07.md](../../experiments/oiloop/core-fixes-OL05-OL07.md)
- Hypothesis v2: [docs/hypothesis.md](../../docs/hypothesis.md)
