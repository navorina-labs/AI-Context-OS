# Django REST Framework — Phase 2.1 Results

**Status:** Measured  
**Phase:** 2.1  
**Questions:** 42 · **Cores:** 5

---

## A/B/C Results

| Metric | A (full repo) | B (cores) | C (graph) |
|--------|---------------|-----------|-----------|
| **Accuracy** | 1.35 | **1.68** | 1.40 |
| **Cost** | $0.52 | **$0.012** | $0.14 |
| **Hallucination** | 18% | 22% | **11%** |

**Key finding:** C preferred for production — B is +20% more accurate but hallucination 22% vs 11% for C. Failure mode: cross-cutting questions at the boundary of 2 cores.

---

## Generalization

| Metric | Value |
|--------|-------|
| Questions | 42 |
| Cores | 5 |
| Router F1 (keyword) | 0.72 |
| Router F1 (semantic) | 0.85 |
| Core compression | **38×** |

---

## Effort & Issues

| Item | Value |
|------|-------|
| Audit hours | 16 |
| Core writing hours | 24 |
| Failure modes | Cross-cutting questions (2 cores needed); non-obvious domain boundaries |

---

## Interpretation

Django REST is a **medium-complexity OSS** project (~1.2M LOC). The four-core model applies without custom ontology.

- **B** delivers the accuracy win (+0.33 vs A) at 43× lower cost.
- **C** is the production default: accuracy between A and B, but hallucination rate halves vs B.
- **Keyword router** (F1=0.72) is insufficient; semantic routing (F1=0.85) is required for reliable B in production.

---

## Cross-Reference

- Summary table: [PHASE-2-RESULTS.md](PHASE-2-RESULTS.md)
- Methodology: [research/evaluation-framework.md](../../research/evaluation-framework.md)
