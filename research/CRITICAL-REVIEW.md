# Critical Review — Go/No-Go (Phase 4 Paper)

**Date:** 2026-06-13 (updated)  
**Detail:** [validity-audit.md](validity-audit.md)

---

## Verdict

| Output | Status | Recommendation |
|--------|--------|----------------|
| **Twitter / blog** | ✅ GO | Use updated `phase-3-twitter-card` (149 Q, B≥A on 4/4) |
| **Methods + replication repo** | ✅ GO | All 4 projects keyword-router canonical runs |
| **arXiv methods preprint** | ⚠️ GO with caveats | LLM judge, decode expert, no stats |
| **Conference empirical paper** | ⛔ NO-GO | Need human raters + bootstrap CI |

**One-line:** Credible **exploratory** multi-case study — H₁ holds descriptively on 4/4 projects; Oiloop margin is thin (+0.05).

---

## Resolved since 2026-06-12

| Issue | Status |
|-------|--------|
| MailAgent gold cores in eval B | ✅ `run-1781319187610` keyword F1=1.0 |
| Oiloop OL08 routing bug | ✅ F1=1.0; re-run `run-1781344390027` |
| Routing gold-label conflicts | ✅ `routing-adjudication.md` |
| `minimal-context-principle.md` false claim | ✅ fixed |
| Paper abstract overclaim | ✅ rewritten (partial → check body) |
| Cores eval ≠ production (Oiloop) | ✅ files identical; router aligned |

## Still open

| Issue | Severity |
|-------|----------|
| LLM-as-judge only | **9** |
| Expert 75% = decode, not humans | **8** |
| No statistical tests | **7** |
| Oiloop B +0.05 margin; A baseline variance | **7** |
| OL08 B accuracy still 0 until core content fix + re-run | **6** |
| `PHASE-2-RESULTS` / twitter assets sync | ✅ in progress this commit |

---

## Canonical runs (2026-06-13)

| Project | Run | Router | B vs A |
|---------|-----|--------|--------|
| MailAgent | run-1781319187610 | keyword F1=1.0 | +21% |
| Django REST | summary only | keyword F1=0.85 | +24% |
| Navorina | run-1781143403051 | keyword F1=0.87 | +19% |
| Oiloop | run-1781344390027 | keyword F1=1.0 | +5% |

---

## Next work

1. Re-export twitter PNGs from updated HTML
2. Optional: re-run Oiloop pilot after `workspace-core` FilePreviewSheet patch
3. Human blind pilot 10 Q (Oiloop)
4. Fill paper Results + Limitations from PHASE-2/3 + validity-audit §6

---

## Safe paper title angle

> *Domain-Oriented Context Cores: Compression and Routing Across Four Codebases — When Graph Retrieval Must Default*

Lead with **4-project table + decision matrix**, not universal victory.
