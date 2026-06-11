# Phase 2 Results: Cross-Project Validation

**Status:** All 3 projects measured (MailAgent, Django REST, Navorina)  
**Date:** 2026-06-11  
**Protocol:** A/B/C within-subjects · gpt-4o-mini · LLM-as-judge

---

## Executive Summary

AI Context OS was tested on **3 projects** (119 questions total: 35 + 42 + 42).

**Hypothesis supported:** context cores (B) outperform full-repo context (A) on accuracy and cost across all three projects.

**Tradeoff:** B is cheapest and most accurate, but hallucination runs **19–23%** vs **7–14%** for graph retrieval (C). For production codegen/ops on complex codebases, **C is the default** when trust matters more than peak accuracy.

| Variant | Role |
|---------|------|
| **A** | Full repo baseline — dominated on cost; never default |
| **B** | Routed cores — fast lane; narrow domains with F1 ≥ 0.95 |
| **C** | Graph retrieval — production default when hallucination matters |

---

## Table 1: Cross-Project Results

| Project | Codebase | Qs | Cores | A_acc | B_acc | C_acc | A_cost | B_cost | C_cost | B_hall | C_hall | Router F1 | Compression | Key finding |
|---------|----------|----|-------|-------|-------|-------|--------|--------|--------|--------|--------|-----------|-------------|-------------|
| **MailAgent** | 320k | 35 | 6 | 1.40 | **1.69** | 1.37 | $0.47 | **$0.015** | $0.12 | 20% | 14% | 1.00 | 45× | B wins on accuracy/cost |
| **Django REST** | ~1.2M | 42 | 5 | 1.35 | **1.68** | 1.40 | $0.52 | **$0.012** | $0.14 | 22% | **11%** | 0.85 | 38× | C preferred (halluc risk) |
| **Navorina** | ~270k | 42 | 11 | 1.00 | **1.19** | 0.93 | $0.18 | **$0.015** | $0.08 | 19% | **7%** | 0.78 | 14× | C wins on trust; B on accuracy |

**Legend:** A = full repo · B = routed context cores (gold cores in eval) · C = Hermes-style graph retrieval

**Django REST:** measured in private workspace [Oiloop](applied-instances.md#oiloop-private); canonical report [django-phase-2.1.md](django-phase-2.1.md). Raw run not exported.

**Navorina:** [run-1781143403051](../../experiments/navorina/runs/run-1781143403051/) · commit `413acd41`

---

## Compression (Input Tokens)

| Project | A tokens (mean) | B tokens (mean) | Ratio A/B | Notes |
|---------|-----------------|-----------------|-----------|-------|
| MailAgent | ~88k | ~2k | **45×** | measured |
| Django REST | ~76k | ~2k | **38×** | measured (Oiloop workspace) |
| Navorina | ~27.6k | ~2.0k | **14×** | measured; doc sprawl caps CCR vs MailAgent |

---

## Router Quality

| Project | Keyword F1 | Semantic F1 | Notes |
|---------|------------|-------------|-------|
| MailAgent | — | **1.00** | Single narrow domain |
| Django REST | 0.72 | **0.85** | Cross-cutting questions hurt keyword |
| Navorina | **0.784** | pending | NV29/NV42 worst failures; semantic not yet measured |

Router F1 correlates with B accuracy ceiling. Semantic routing is load-bearing on multi-module projects.

---

## Key Findings (4 Patterns)

### 1. B always wins on accuracy vs A

+19–24% mean accuracy (B vs A) across all three projects. Cost 12–45× lower than A.

### 2. B's tradeoff is hallucination

19–23% hallucination (B) vs 7–14% (C). Navorina: C at **7%** — lowest across all projects.

### 3. C is the production default on complex codebases

Accuracy loss vs B (Navorina: 1.19 → 0.93), but ~50–65% fewer hallucinations. Django REST and Navorina land here.

### 4. Compression varies with A baseline sprawl

MailAgent 45× · Django 38× · Navorina **14×** — legacy doc bundle (AGENTS.md + PRD + Roadmap + DS) inflates A baseline.

---

## Recommendations by Project Profile

| Profile | Default | Why |
|---------|---------|-----|
| Narrow domain, clear boundaries (MailAgent) | **B** | Router F1=1.0; 20% halluc tolerable for read-only Q&A |
| Medium OSS, cross-cutting questions (Django REST) | **C** | B +24% accuracy but 22% halluc vs 11% for C |
| Multi-module prod, 11 cores (Navorina) | **C** | C halluc **7%** vs B 19%; B still +19% accuracy vs A |

### Decision Matrix

```
                B better          C better
              ─────────        ─────────
MailAgent        ●
Django REST                      ●
Navorina                         ●
```

| Variant | When to use |
|---------|-------------|
| **B** | Narrow domain, router F1 ≥ 0.95, read-only Q&A |
| **C** | Prod codegen/ops, B hallucination > 15%, cross-cutting questions |
| **A** | Never default — dominated on cost |

---

## Failure Modes (Observed)

| Mode | Projects | Evidence |
|------|----------|----------|
| Cross-cutting questions need 2+ cores | Django REST, Navorina | NV42 F1=0.571; DRF keyword F1=0.72 |
| C accuracy drop on sparse graph | Navorina | C_acc 0.93 vs B 1.19 |
| Keyword router misses paywall/assistant | Navorina | NV29 F1=0 |
| Legacy doc sprawl inflates A baseline | Navorina | CCR 14× vs MailAgent 45× |
| Non-obvious domain boundaries | Django REST, Navorina | 11 cores, crypto/paywall/nucleus overlap |

---

## Limitations

- **LLM-as-judge** for accuracy and hallucination (not blind human raters).
- **B uses gold `expected_cores`** in eval — production keyword router scores lower.
- **C** = static graph index + keyword/BFS (not live CodeGraph MCP).
- **Django REST** eval conducted in private Oiloop workspace — summary published here; raw run not exported.
- Judge tokens not included in cost estimates.

---

## Per-Project Reports

| Project | Report | Raw run |
|---------|--------|---------|
| MailAgent | [mailagent-phase-2.1.md](mailagent-phase-2.1.md) | [run-1781075014160](../../experiments/mailagent/runs/run-1781075014160/) |
| Django REST | [django-phase-2.1.md](django-phase-2.1.md) | summary (Oiloop workspace) |
| Navorina | [navorina-phase-2.1.md](navorina-phase-2.1.md) | [run-1781143403051](../../experiments/navorina/runs/run-1781143403051/) |

---

## Next Steps

1. **Navorina** — measure semantic router F1; patch NV29 routing.
2. **Phase 3** — private codebase validation with domain experts.
3. **Applied instances** — formal eval of Oiloop product cores (see [applied-instances.md](applied-instances.md)).
4. **Publication** — blog post + arXiv preprint from this report.

---

## Applied Instances (Private)

Products using Context OS patterns in production — not open-source.

| Project | Role | Doc |
|---------|------|-----|
| **Oiloop** | DRF eval workspace + live macOS companion cores | [applied-instances.md](applied-instances.md) |

---

## Appendix

- Methodology: [research/evaluation-framework.md](../../research/evaluation-framework.md)
- MailAgent harness: [MailAgent/context-os/eval](https://github.com/Alex0nder/MailAgent/tree/main/context-os/eval)
- Navorina harness: [Navorina/context-os/eval](https://github.com/Alex0nder/Navorina/tree/main/context-os/eval)
