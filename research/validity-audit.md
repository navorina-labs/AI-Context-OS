# Validity Audit — AI Context OS (Phase 2 + 3)

**Date:** 2026-06-13 (updated post adversarial audit)  
**Scope:** MailAgent, Django REST, Navorina (Phase 2.1) · Oiloop (Phase 3)  
**Canonical reports:** [PHASE-2-RESULTS.md](../context-os/evaluations/PHASE-2-RESULTS.md) · [PHASE-3-RESULTS.md](../context-os/evaluations/PHASE-3-RESULTS.md)

This document maps **what we can honestly claim** vs threats to internal, construct, and external validity. Use before paper submission or public posts.

---

## 1. Study design (as run)

| Parameter | Actual |
|-----------|--------|
| Design | Within-subjects A/B/C per question |
| Model | gpt-4o-mini (all runs) |
| Judge | LLM-as-judge (accuracy 0–3, completeness, actionability, hallucination) |
| Human raters | Not at scale; Oiloop H4 from `autofill-survey.mjs` decode (masked preference pilot) |
| N | **149** total (45 + 42 + 42 + 20) |
| Projects | 4 codebases, **different question sets per project** |
| Statistics | Descriptive means only — no CI, p-values, or effect sizes |

**Classification:** Exploratory multi-case study, not confirmatory RCT.

---

## 2. Per-project measurement validity

| Threat | MailAgent | Django REST | Navorina | Oiloop |
|--------|-----------|-------------|----------|--------|
| B uses **production router** vs gold labels | ✅ Keyword F1 1.0 | ✅ Keyword F1 0.85 | ✅ Keyword F1 0.87 | ✅ Keyword F1 1.0 |
| Same question bank across projects | ❌ Project-specific | ❌ | ❌ | ❌ |
| Raw run exported to this repo | ✅ run-1781319187610 | ⚠️ **Summary only — unverifiable** | ✅ run-1781143403051 | ✅ run-1781344390027 |
| Cohen's κ (2 human raters) | ❌ | ❌ | ❌ | ❌ |
| Independent expert blind round | ❌ | ❌ | ❌ | ⚠️ Decode only (75%) |

**MailAgent:** Gold run `run-1781075014160` retained as oracle baseline only — do not cite for production routing claims.

**Django REST:** 42/149 questions (28%) — cite as measured summary, not independently reproducible from this repo.

---

## 3. Construct validity (do metrics measure the construct?)

| Metric | Intended construct | Threat |
|--------|-------------------|--------|
| LLM-as-judge accuracy | Factual correctness | Judge bias, same model family; **run-to-run variance** (Oiloop A: 1.20 → 1.00 between runs) |
| Hallucination rate | Fabricated facts | Binary LLM judgment; Oiloop C **30%** > B **25%** in canonical run |
| Masked decode preference 75% (Oiloop) | Human decision usefulness | **Not independent humans** — derived from eval answers via decode |
| Router F1 | Routing quality | Adjudication table published — [routing-adjudication.md](routing-adjudication.md) |
| CCR_tokens | API input minimality | `mean(tokens_A)/mean(tokens_B)` — canonical per [evaluation-framework.md](evaluation-framework.md) |
| CCR_core | Core text vs baseline chars | Harness `ccr_tokens_est_b`; **higher** than CCR_tokens when B includes prompt overhead |

### CCR (dual metric — do not mix)

| Project | CCR_tokens (API) | CCR_core (harness) | Source |
|---------|------------------|--------------------|--------|
| MailAgent | **8.3×** | 12.1× | run-1781319187610 `summary.json` |
| Django REST | **38×** (summary) | — | django-phase-2.1.md; raw run missing |
| Navorina | **13.7×** | 14.6× | run-1781143403051 |
| Oiloop | **80×** | 112× | run-1781344390027 |

---

## 4. Internal validity (causal claims)

| Claim | Supported? | Notes |
|-------|------------|-------|
| Cores reduce API tokens vs full repo | ✅ Strong | CCR_tokens 8–80× across verified runs |
| Cores reduce latency vs full repo | ✅ Strong | Oiloop B ~3.9× faster than A |
| Cores improve accuracy vs full repo (all 4 projects) | ✅ Directional | B ≥ A on all 4; Oiloop margin **+0.05**, N=20, not tested |
| Cores improve accuracy on OSS SaaS | ✅ Directional | +19–24% Django/Navorina; MailAgent +21% keyword |
| Graph beats cores on hallucination | ⚠️ **2/4 only** | True on Django, Navorina; **false** on MailAgent, Oiloop |
| Routing fix improved Oiloop B accuracy | ❌ Not shown | B stayed 1.05; A dropped 1.20→1.00 between runs |
| OL08 content gap | ⚠️ Open | Routing fixed (F1=1); B accuracy still 0 in canonical run — core content patch pending re-run |

### Oiloop run stability (critical)

| Run | A_acc | B_acc | Δ B vs A | hypothesis_supported | Notes |
|-----|-------|-------|----------|-------------------|-------|
| run-1781225808172 (superseded) | **1.20** | 1.05 | −0.15 | **false** | OL08 routing bug |
| run-1781344390027 (canonical) | **1.00** | 1.05 | +0.05 | true | B **unchanged**; H₁ flip = A variance |

**Interpretation:** Canonical Oiloop B≥A claim is **descriptively true** but **fragile** — same B score fails or passes depending on A baseline (likely LLM judge / run variance). Do not attribute improvement to routing fix.

---

## 5. External validity (generalization)

| Dimension | Generalizable to | Not generalizable to |
|-----------|------------------|----------------------|
| Codebase type | OSS SaaS + one macOS companion | Other native stacks without core maintenance |
| Model | gpt-4o-mini at eval date | Other models, local quant models |
| Task | Scoped decision questions in eval bank | Open-ended codegen, refactors, multi-file edits |
| Production Oiloop | Fast routing + `Resources/cores/*.md` in `.fast` mode | Hybrid/deep → graph path |
| Eval vs prod router | MailAgent/Navorina/Django: keyword `routing-map.json` | Oiloop prod uses `ContextRouter.swift` (aligned after 2026-06-13) |

---

## 6. Honest claim ledger

### Safe to publish

- All **4 projects**: B mean accuracy **≥** A descriptively (Oiloop +0.05, thin margin, N=20).
- Routed cores achieve **CCR_tokens 8–80×** (verified runs); **CCR_core up to 112×** on Oiloop — label metric explicitly.
- **Graph retrieval (C)** is production default on **3/4** projects (Django, Navorina, Oiloop).
- **MailAgent** default **B** — narrow domain, keyword F1=1.0 (per-question routing in `run-meta.json`).
- Routing adjudication published for ops vs tech boundaries.
- Primary H₁ met on all projects **descriptively** — not statistically confirmed.

### Do not publish without qualification

- "Statistically significant" / "fully validated" / "hypothesis fully supported"
- "Double-blind expert study" (use **masked decode preference**)
- Gold-run MailAgent numbers (45×, B 1.69) as production routing
- "C always lower hallucination than B" (false on MailAgent, Oiloop)
- "Routing fix improved B accuracy" (A baseline moved, B unchanged)
- Single "compression" number without CCR_tokens vs CCR_core
- Django numbers as independently reproducible (raw run not exported)

---

## 7. Remaining before Phase 4 paper

| Priority | Action | Status |
|----------|--------|--------|
| P0 | MailAgent keyword re-run | ✅ run-1781319187610 |
| P0 | Oiloop re-run after routing fix | ✅ run-1781344390027 |
| P0 | Routing adjudication table | ✅ routing-adjudication.md |
| P0 | Dual CCR labels in reports + twitter | ✅ 2026-06-13 |
| P0 | Oiloop run-stability table | ✅ this file + PHASE-3 |
| P1 | `workspace-core` FilePreviewSheet + Oiloop re-run | ⚠️ patch done; re-run pending |
| P1 | Export Django raw run | ❌ |
| P2 | Oiloop 10-Q human blind pilot | ❌ |
| P2 | Bootstrap CI on paired deltas | ❌ |
| P2 | Paper Results + Limitations draft | ❌ |

---

## 8. Cross-reference

- Expert decode: [expert-validation-results.md](../docs/expert-validation-results.md)
- Superseded Oiloop runs: [run-1781225808172/SUPERSEDED.md](../experiments/oiloop/runs/run-1781225808172/SUPERSEDED.md), [run-1781222450776/SUPERSEDED.md](../experiments/oiloop/runs/run-1781222450776/SUPERSEDED.md)
- Master run index: [experiments/README.md](../experiments/README.md)
- Go/no-go: [CRITICAL-REVIEW.md](CRITICAL-REVIEW.md)
