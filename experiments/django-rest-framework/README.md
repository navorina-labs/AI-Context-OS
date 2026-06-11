# Experiment: Django REST Framework (Phase 2.1)

Replication experiment of AI Context OS on a popular open-source Web framework.

---

## Subject

**Django REST Framework (DRF)** — A powerful and flexible toolkit for building Web APIs in Django.

---

## Goals

1. Generalize domain-oriented context cores approach to a framework codebase.
2. Run A/B/C evaluations to compare Full Repository baseline, Context OS routed cores, and Hermes-style graph retrieval.
3. Validate routing F1 scores (keyword vs semantic).
4. Measure compression and efficiency metrics (CCR, cost, latency, hallucination).

---

## Configuration

- **Number of questions:** 42
- **Number of cores:** 5
- **Core compression:** 38x

---

## Status

| Milestone | Status |
|-----------|--------|
| Cores drafted | ✅ 5 Cores |
| Routing validated | ✅ Router F1: 0.72 (keyword) \| 0.85 (semantic) |
| A/B/C experiment | ✅ Completed |
| Results published | ✅ [results.md](./results.md) |
| Raw run exported | ⏳ Not yet — summary in `results.md` only |

---

## Headline

| | A | B | C |
|---|---|---|---|
| Accuracy | 1.35 | **1.68** | 1.40 |
| Cost | $0.52 | **$0.012** | $0.14 |
| Hallucination | 18% | 22% | **11%** |
| Compression | — | **38×** | — |
