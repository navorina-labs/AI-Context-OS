# Validity Audit — AI Context OS (Phase 2 + 3)

**Date:** 2026-06-12  
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
| Human raters | Not at scale; Oiloop H4 from `autofill-survey.mjs` decode |
| N | 139 total (35 + 42 + 42 + 20) |
| Projects | 4 codebases, **different question sets per project** |
| Statistics | Descriptive means only — no CI, p-values, or effect sizes |

**Classification:** Exploratory multi-case study, not confirmatory RCT.

---

## 2. Per-project measurement validity

| Threat | MailAgent | Django REST | Navorina | Oiloop |
|--------|-----------|-------------|----------|--------|
| B uses **production router** vs gold labels | ⚠️ Gold cores in eval B | ✅ Keyword router F1 0.85 | ✅ Keyword F1 0.87 | ✅ Keyword F1 0.95 |
| Same question bank across projects | ❌ Project-specific | ❌ | ❌ | ❌ |
| Raw run exported to this repo | ✅ run-1781075014160 | ⚠️ Summary only | ✅ run-1781143403051 | ✅ run-1781225808172 |
| Cohen's κ (2 human raters) | ❌ | ❌ | ❌ | ❌ |
| Independent expert blind round | ❌ | ❌ | ❌ | ⚠️ Decode only |

**MailAgent caveat:** B accuracy (1.69) may be **optimistic** vs real routing (keyword F1 ~0.55 in README). Do not compare MailAgent routing claims to Django/Oiloop without relabeling.

---

## 3. Construct validity (do metrics measure the construct?)

| Metric | Intended construct | Threat |
|--------|-------------------|--------|
| LLM-as-judge accuracy | Factual correctness | Judge bias, same model family, no human calibration at N=139 |
| Hallucination rate | Fabricated facts | Binary LLM judgment; no human audit sample |
| Expert preference 60% (Oiloop) | Human decision usefulness | **Not independent humans** — derived from eval answers via decode |
| Router F1 | Routing quality | Gold labels disputed on ambiguous questions (deploy, ops vs tech) |
| CCR / compression | Minimality | Measured; valid for token counts. Does not prove answer quality |

---

## 4. Internal validity (causal claims)

| Claim | Supported? | Notes |
|-------|------------|-------|
| Cores reduce tokens vs full repo | ✅ Strong | 14–83× across projects |
| Cores reduce latency vs full repo | ✅ Strong | Especially B on Oiloop (~3×) |
| Cores improve accuracy vs full repo (universal) | ❌ **Rejected** | Oiloop B 1.05 vs A 1.20 |
| Cores improve accuracy on OSS SaaS | ✅ Directional | +19–24% on 3 projects; no significance test |
| Graph beats cores on hallucination | ✅ Directional | C_hall lower on all 4; B_hall 19–25% |
| Multi-core fixes cross-cutting accuracy | ❌ Not shown | Expert 50%→60%, B accuracy unchanged 1.05 |
| Router fallback bug biased Oiloop | ⚠️ Partial | OL08 → empty core; fixed post-run (`personal-core`) |

---

## 5. External validity (generalization)

| Dimension | Generalizable to | Not generalizable to |
|-----------|------------------|----------------------|
| Codebase type | OSS web/SaaS with docs sprawl | Tightly integrated native/system code (Oiloop counterexample) |
| Model | gpt-4o-mini at eval date | Other models, local quant models |
| Task | Scoped decision questions in eval bank | Open-ended codegen, refactors, multi-file edits |
| Production Oiloop | Fast routing + `Resources/cores/*.md` injected in `.fast` mode | Eval uses `experiments/oiloop/cores/` — content may differ |
| Maintenance cost | Not measured | "<40h per project" remains roadmap claim |

**Oiloop product note:** `ContextCoreLoader` + `SystemPromptBuilder` **do** inject cores when `contextRoutingMode == .fast`. Hybrid mode sends codebase queries to graph (C-like), not cores — eval B ≠ all production paths.

---

## 6. Honest claim ledger

### Safe to publish

- Routed cores achieve **14–83×** input compression vs full-repo baselines on measured projects.
- On **3 OSS projects** (119 Q), B mean accuracy **exceeds** A by **+19–24%** (LLM-as-judge).
- **Oiloop** (20 Q) is the **first counterexample**: B accuracy **below** A (−12.5%).
- **Graph retrieval (C)** yields **lower hallucination** than B on all four projects in this study.
- **Production-style default:** B for MailAgent-style narrow domains; **C** when trust/integration complexity dominates (3/4 projects).
- Primary hypothesis H₁ is **partially supported**, not universally supported.

### Do not publish without qualification

- "Hypothesis fully supported" / "validation passed"
- "Double-blind expert study" (decode pipeline ≠ fresh blind humans)
- "114× compression" (superseded run; canonical Oiloop B = **83×**)
- "Multi-core routing solves cross-cutting questions"
- "Validated in production" without specifying fast vs hybrid routing mode
- Statistical significance (not computed)

---

## 7. Priority fixes before Phase 4 paper

| Priority | Action | Effort |
|----------|--------|--------|
| P0 | Rewrite `papers/paper-draft.md` abstract + H₁ results (partial support) | 2h |
| P0 | Remove false "empirically validated" in `theory/minimal-context-principle.md` | 5m |
| P1 | Refresh `docs/top-20-issues.md` → resolved/open split (see CRITICAL-REVIEW.md) | 2h |
| P1 | MailAgent re-run with **keyword router** B (not gold cores) | 1 day |
| P1 | Oiloop: 10-question human blind pilot (A vs B) | 2–4h |
| P2 | Unified routing gold-label adjudication table | 4h |
| P2 | Publish anonymized question JSON + scoring rubric | 1 day |

---

## 8. Cross-reference

- Expert decode methodology: [expert-validation-results.md](../docs/expert-validation-results.md)
- Superseded Oiloop run: [SUPERSEDED.md](../experiments/oiloop/runs/run-1781222450776/SUPERSEDED.md)
- Master run index: [experiments/README.md](../experiments/README.md)
- Go/no-go summary: [CRITICAL-REVIEW.md](CRITICAL-REVIEW.md)
