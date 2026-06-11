# MailAgent — Phase 2.1 Results

**Status:** Measured (Phase 1 eval, included in Phase 2 cross-project validation)  
**Questions:** 35 · **Cores:** 6 · **Model:** gpt-4o-mini

---

## A/B/C Results

| Metric | A (full repo) | B (cores) | C (graph) |
|--------|---------------|-----------|-----------|
| **Accuracy** | 1.40 | **1.69** | 1.37 |
| **Mean input tokens** | ~88k | **~2k** | ~21k |
| **Cost** | $0.47 | **$0.015** | $0.12 |
| **Hallucination** | 20% | 20% | **14%** |
| **Latency** | ~10.8s | **~5.4s** | ~11.1s |

**Key finding:** B wins on accuracy and cost with ideal router (F1=1.0) and moderate hallucination (20%). Narrow domain — C does not improve trust enough to justify 11× token overhead vs B.

---

## Generalization

| Metric | Value |
|--------|-------|
| Codebase | ~320k LOC |
| Questions | 35 |
| Cores | 6 |
| Router F1 (semantic) | **1.00** |
| Core compression | **45×** |

---

## Raw Artifacts

| Resource | Path |
|----------|------|
| Published summary | [experiments/mailagent/results.md](../../experiments/mailagent/results.md) |
| Full run | [experiments/mailagent/runs/run-1781075014160/](../../experiments/mailagent/runs/run-1781075014160/) |
| A/B/C comparison | [ABC-COMPARE.md](../../experiments/mailagent/runs/run-1781075014160/ABC-COMPARE.md) |
| Eval harness | [MailAgent/context-os/eval](https://github.com/Alex0nder/MailAgent/tree/main/context-os/eval) |

---

## Cross-Reference

- Summary table: [PHASE-2-RESULTS.md](PHASE-2-RESULTS.md)
