# Critical Review — Go/No-Go (Phase 4 Paper)

**Date:** 2026-06-13 (post adversarial audit)  
**Detail:** [validity-audit.md](validity-audit.md)

---

## Verdict

| Output | Status | Recommendation |
|--------|--------|----------------|
| **Twitter / blog** | ✅ GO | Use `phase-3-twitter-card` with **CCR_tokens** (8–80×), not CCR_core alone |
| **Methods + replication repo** | ⚠️ GO with gaps | 3/4 raw runs; Django summary only |
| **arXiv methods preprint** | ⚠️ GO with caveats | LLM judge, decode preference, no stats, Oiloop A variance |
| **Conference empirical paper** | ⛔ NO-GO | Need human raters + bootstrap CI + Django raw run |

**One-line:** Credible **exploratory** multi-case study — H₁ holds descriptively on 4/4; Oiloop +0.05 is fragile (A baseline drift between runs).

---

## Resolved since 2026-06-12

| Issue | Status |
|-------|--------|
| MailAgent gold cores in eval B | ✅ `run-1781319187610` keyword F1=1.0 (`run-meta.json`) |
| Oiloop OL08 routing bug | ✅ F1=1.0; re-run `run-1781344390027` |
| Routing gold-label conflicts | ✅ `routing-adjudication.md` |
| CCR metric conflation (12× vs 8.3×) | ✅ dual metric: CCR_tokens + CCR_core |
| Expert section mislabeled | ✅ renamed masked decode preference |
| Oiloop run-stability documented | ✅ validity-audit §4 + PHASE-3 |
| PHASE-2/3 + twitter assets sync | ✅ 2026-06-13 |

## Still open

| Issue | Severity |
|-------|----------|
| LLM-as-judge only | **9** |
| Masked decode 75% ≠ human study | **8** |
| No statistical tests | **7** |
| Oiloop A 1.20→1.00 between runs; B unchanged | **8** |
| Django raw run missing (28% of N) | **7** |
| OL08 B accuracy 0 — core content + re-run | **6** |

---

## Canonical runs (2026-06-13)

| Project | Run | Router | B vs A | CCR_tokens |
|---------|-----|--------|--------|------------|
| MailAgent | run-1781319187610 | keyword F1=1.0 | +21% | 8.3× |
| Django REST | summary only | keyword F1=0.85 | +24% | 38× |
| Navorina | run-1781143403051 | keyword F1=0.87 | +19% | 13.7× |
| Oiloop | run-1781344390027 | keyword F1=1.0 | +5% | 80× |

---

## Next work

1. Re-run Oiloop after `workspace-core` FilePreviewSheet patch (OL08 check)
2. Export Django `summary.json` + `paired.csv` to this repo
3. Human blind pilot 10 Q (Oiloop)
4. Bootstrap CI on paired deltas
5. Fill paper Results + Limitations from PHASE-2/3 + validity-audit §6

---

## Safe paper title angle

> *Domain-Oriented Context Cores: Compression and Routing Across Four Codebases — When Graph Retrieval Must Default*

Lead with **4-project table + decision matrix + limitations**, not universal victory.
