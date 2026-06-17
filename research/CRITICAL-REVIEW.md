# Critical Review — Go/No-Go (Phase 4 Paper)

**Date:** 2026-06-17 (post Phase 3.1 closure)  
**Detail:** [validity-audit.md](validity-audit.md)

---

## Verdict

| Output | Status | Recommendation |
|--------|--------|----------------|
| **Twitter / blog** | ✅ GO | Phase 3.1: B 2.70 vs A 0.75; prod router F1=1.0 |
| **Methods + replication repo** | ⚠️ GO with gaps | 3/4 raw runs; Django summary only |
| **arXiv methods preprint** | ⚠️ GO with caveats | LLM judge; bootstrap CI added; human pilot pending |
| **Conference empirical paper** | ⛔ NO-GO | Need human raters + Django raw run |

**One-line:** H₁ holds strongly on Oiloop Phase 3.1 (B 2.70 vs A 0.75, Δ +1.95); prior +0.05 fragility superseded by v1.1 cores + gold fix.

---

## Resolved since 2026-06-12

| Issue | Status |
|-------|--------|
| MailAgent gold cores in eval B | ✅ `run-1781319187610` keyword F1=1.0 |
| Oiloop OL08 routing bug | ✅ F1=1.0; content fix in v1.1 cores |
| Routing gold-label conflicts | ✅ `routing-adjudication.md` |
| CCR metric conflation | ✅ dual metric: CCR_tokens + CCR_core |
| Expert section mislabeled | ✅ renamed masked decode preference |
| Oiloop run-stability (A drift) | ✅ Phase 3.1 canonical run-1781660908 |
| Phase 3.1 replication | ✅ B 2.70, H₁g/H₁h supported, H₁f rejected |
| Bootstrap CI | ✅ `research/bootstrap-ci.mjs` on paired deltas |
| Production default decision | ✅ B (keyword, multi-core) — not C/D |

## Still open

| Issue | Severity |
|-------|----------|
| LLM-as-judge only | **9** |
| Masked decode 75% ≠ human study | **8** — protocol: [human-blind-pilot-oiloop.md](../prompts/human-blind-pilot-oiloop.md) |
| Django raw run missing (28% of N) | **7** |
| OL06 prod hallucination (5%) | **3** — core metadata, not routing |

---

## Canonical runs (2026-06-17)

| Project | Run | Router | B acc | Δ B vs A | CCR_tokens |
|---------|-----|--------|-------|----------|------------|
| MailAgent | run-1781319187610 | keyword F1=1.0 | — | +21% | 8.3× |
| Django REST | summary only | keyword F1=0.85 | — | +24% | 38× |
| Navorina | run-1781143403051 | keyword F1=0.87 | — | +19% | 13.7× |
| **Oiloop** | **run-1781660908** | gold F1=1.0 | **2.70** | **+1.95** | **~12×** |
| Oiloop prod | run-prod-router-1781664681 | keyword F1=1.0 | 2.55 | — | ~12× |

---

## Next work

1. ~~Re-run Oiloop Phase 3.1~~ ✅ run-1781660908
2. ~~Bootstrap CI on paired deltas~~ ✅ `research/bootstrap-ci.mjs`
3. Export Django `summary.json` + `paired.csv` to this repo
4. Human blind pilot 10 Q (Oiloop) — [protocol](../prompts/human-blind-pilot-oiloop.md)
5. Fill paper Results + Limitations from PHASE-2/3 + validity-audit §6

---

## Safe paper title angle

> *Domain-Oriented Context Cores: Compression and Routing Across Four Codebases — When Graph Retrieval Must Default*

Lead with **4-project table + decision matrix + limitations**, not universal victory.
