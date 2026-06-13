# Critical Review — Go/No-Go (Phase 4 Paper)

**Date:** 2026-06-12  
**Reviewer stance:** Harsh internal audit after Phase 2 + 3 measurement  
**Detail:** [validity-audit.md](validity-audit.md)

---

## Verdict

| Output | Status | Recommendation |
|--------|--------|----------------|
| **Twitter / blog post** | ✅ GO | Use Phase 3 assets; "partially supported" framing |
| **Methods + replication repo** | ✅ GO | Raw runs, protocols, honest limitations |
| **arXiv empirical paper (current draft)** | ⛔ NO-GO | Abstract overclaims; fix before submission |
| **Conference empirical paper** | ⛔ NO-GO | Need human raters + MailAgent router re-run + stats |

**One-line:** Credible **exploratory** result with a real counterexample — not yet a confirmatory paper.

---

## What changed since `top-20-issues.md` (2026-06-10)

### Resolved or substantially improved

| Old issue | Current state |
|-----------|---------------|
| #1 Zero experimental evidence | **Closed** — 4 projects, 139 Q, raw runs in `experiments/` |
| #4 MailAgent no experiment | **Closed** — run-1781075014160 published |
| Phase 1 false CCR claim | **Open** — text still in `minimal-context-principle.md` (fix pending) |
| No results.md | **Closed** — PHASE-2/3-RESULTS + per-project reports |

### Still open (top risks)

| Issue | Severity | Notes |
|-------|----------|-------|
| LLM-as-judge only | **9** | Framework promises 2 raters + κ ≥ 0.7 — not done |
| MailAgent B uses gold cores | **8** | Inflates B vs real routing |
| Expert "double-blind" wording | **8** | Oiloop 60% = decode, not new humans |
| Routing gold-label conflicts | **7** | Deploy / ops-vs-tech ambiguity |
| `paper-draft.md` abstract | **9** | 114×, double-blind, implies universal H₁ win |
| `repository-health-score.md` | **6** | Scores from pre-measurement era |
| No statistical tests | **7** | Means only; N small per project |
| Question bank not cross-project comparable | **6** | Different Q per codebase by design |

---

## Phase exit criteria vs actual

| Phase | Criterion | Met? |
|-------|-----------|------|
| 2 | B wins on ≥2/3 OSS | ✅ 3/3 on LLM accuracy |
| 2 | CCR ≥5× | ✅ 14–45× |
| 3 | Expert preference ≥60% | ⚠️ 60% arithmetically; methodology weak |
| 3 | No regression on critical ops Q | ⚠️ Not separately scored |
| H₁ primary (B ≥ A aggregate) | — | ❌ Oiloop breaks pattern |
| Falsification (>15% B below A) | — | Oiloop −12.5% on 20 Q only — borderline on aggregate |

---

## Recommended next work (ordered)

### Week 1 — credibility (no new eval)

1. ✅ `research/validity-audit.md` + this file
2. Fix `minimal-context-principle.md` false validation line
3. Rewrite `papers/paper-draft.md` abstract (honest partial H₁)
4. Addendum on `docs/repository-health-score.md` pointing here
5. Sync private `Oiloop/docs/OILOOP-EXPERIMENT-RESULTS.md` with canonical run

### Week 2 — close biggest validity gaps

6. **MailAgent:** re-run B with keyword router (not gold cores)
7. **Oiloop:** 10-question human blind pilot (A vs B)
8. **Routing:** publish ops-vs-tech adjudication table

### Week 3 — Phase 4 draft

9. Fill Results from PHASE-2/3-RESULTS (tables only, no new claims)
10. Limitations section copy from validity-audit §4–5
11. Open-source anonymized `questions.json` per project

---

## Oiloop product vs eval (corrected)

Earlier notes said cores are not injected in production. **Current code:**

- `ContextCoreLoader.loadCore` reads `Resources/cores/*.md`
- `SystemPromptBuilder.build` injects active cores in **`.fast`** routing mode
- **`.hybrid` / `.deep`** uses `GraphContextLoader` for codebase queries (C-like path)

**Remaining gap:** eval harness uses `experiments/oiloop/cores/` in AI-Context-OS repo; production uses Oiloop bundle cores — keep in sync on re-run.

---

## Safe paper title angle (when ready)

> *Domain-Oriented Context Cores: When Minimal Context Wins, and When Graph Retrieval Must Default*

Lead with **counterexample + decision matrix**, not universal victory.
