# Validity Audit — AI Context OS (Phase 2 + 3)

**Date:** 2026-06-13 (updated)  
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
| Raw run exported to this repo | ✅ run-1781319187610 | ⚠️ Summary only | ✅ run-1781143403051 | ✅ run-1781344390027 |
| Cohen's κ (2 human raters) | ❌ | ❌ | ❌ | ❌ |
| Independent expert blind round | ❌ | ❌ | ❌ | ⚠️ Decode only (75%) |

**MailAgent:** Gold run `run-1781075014160` retained as oracle baseline only — do not cite for production routing claims.

---

## 3. Construct validity (do metrics measure the construct?)

| Metric | Intended construct | Threat |
|--------|-------------------|--------|
| LLM-as-judge accuracy | Factual correctness | Judge bias, same model family; **run-to-run variance** (Oiloop A: 1.20 → 1.00 between runs) |
| Hallucination rate | Fabricated facts | Binary LLM judgment; Oiloop C **30%** > B **25%** in canonical run |
| Expert preference 75% (Oiloop) | Human decision usefulness | **Not independent humans** — derived from eval answers via decode |
| Router F1 | Routing quality | Adjudication table published — [routing-adjudication.md](routing-adjudication.md) |
| CCR / compression | Minimality | Measured; MailAgent 12× (multi-core B), Oiloop 112× |

---

## 4. Internal validity (causal claims)

| Claim | Supported? | Notes |
|-------|------------|-------|
| Cores reduce tokens vs full repo | ✅ Strong | 12–112× across projects |
| Cores reduce latency vs full repo | ✅ Strong | Oiloop B ~3.9× faster than A |
| Cores improve accuracy vs full repo (all 4 projects) | ✅ Directional | B ≥ A on all 4; Oiloop margin **+0.05** only |
| Cores improve accuracy on OSS SaaS | ✅ Directional | +19–24% Django/Navorina; MailAgent +21% keyword |
| Graph beats cores on hallucination | ⚠️ Mixed | True on Django/Navorina; **false on Oiloop** (C 30% vs B 25%) |
| Routing fix improved Oiloop B accuracy | ❌ Not shown | B stayed 1.05; A dropped 1.20→1.00 between runs |
| OL08 content gap | ⚠️ Open | Routing fixed; `workspace-core` lacked `FilePreviewSheet` (patched 2026-06-13) |

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

- All **4 projects**: B mean accuracy **≥** A (Oiloop +5%, thin margin).
- Routed cores achieve **12–112×** input compression vs full-repo baselines.
- **Graph retrieval (C)** is production default on **3/4** projects (Django, Navorina, Oiloop).
- **MailAgent** default **B** — narrow domain, keyword F1=1.0.
- Routing adjudication published for ops vs tech boundaries.
- Primary H₁ met on all projects **descriptively** — not statistically confirmed.

### Do not publish without qualification

- "Statistically significant" / "fully validated"
- "Double-blind expert study" (use **masked preference decode**)
- Gold-run MailAgent numbers (45×, B 1.69) as production routing
- "C always lower hallucination than B" (Oiloop exception)
- "Routing fix improved B accuracy" (A baseline moved, B unchanged)
- Statistical significance (not computed)

---

## 7. Remaining before Phase 4 paper

| Priority | Action | Status |
|----------|--------|--------|
| P0 | MailAgent keyword re-run | ✅ run-1781319187610 |
| P0 | Oiloop re-run after routing fix | ✅ run-1781344390027 |
| P0 | Routing adjudication table | ✅ routing-adjudication.md |
| P1 | Sync PHASE-2/3 + validity docs | ✅ this file |
| P1 | `workspace-core` FilePreviewSheet content | ✅ 2026-06-13 |
| P2 | Oiloop 10-Q human blind pilot | ❌ |
| P2 | Bootstrap CI on paired deltas | ❌ |
| P2 | Paper Results + Limitations draft | ❌ |

---

## 8. Cross-reference

- Expert decode: [expert-validation-results.md](../docs/expert-validation-results.md)
- Superseded Oiloop runs: [run-1781225808172/SUPERSEDED.md](../experiments/oiloop/runs/run-1781225808172/SUPERSEDED.md), [run-1781222450776/SUPERSEDED.md](../experiments/oiloop/runs/run-1781222450776/SUPERSEDED.md)
- Master run index: [experiments/README.md](../experiments/README.md)
- Go/no-go: [CRITICAL-REVIEW.md](CRITICAL-REVIEW.md)
