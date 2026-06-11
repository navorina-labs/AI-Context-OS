# Experiment: Navorina (Phase 2.1)

Third project in AI Context OS cross-project validation.

**Live instance:** [Navorina](https://github.com/Alex0nder/Navorina) → `context-os/eval/`

**Published results:** [results.md](./results.md)

---

## Subject

**Navorina** — multi-module prod app (~270k LOC): nucleus/FM, paywall/billing, crypto payments, AI assistant.

---

## Status (2026-06-11)

| Milestone | Status |
|-----------|--------|
| Question bank (42 Q + gold) | ✅ |
| Harness | ✅ Adapted from MailAgent |
| Router keyword F1 | ✅ **0.784** |
| Router semantic F1 | ⏳ pending |
| A/B/C LLM eval | ✅ [run-1781143403051](./runs/run-1781143403051/) |
| Results published | ✅ [results.md](./results.md) |

---

## Headline (run-1781143403051)

| | A | B | C |
|---|---|---|---|
| Accuracy | 1.00 | **1.19** | 0.93 |
| Cost | $0.18 | **$0.015** | $0.08 |
| Hallucination | 24% | 19% | **7%** |
| Compression | — | **14×** | — |

---

## Runs

| Run | Questions | Conditions | Notes |
|-----|-----------|------------|-------|
| **[run-1781143403051](./runs/run-1781143403051/)** | **42** | **A, B, C** | Primary result |

---

## Cross-Reference

- [PHASE-2-RESULTS.md](../../context-os/evaluations/PHASE-2-RESULTS.md)
- [navorina-phase-2.1.md](../../context-os/evaluations/navorina-phase-2.1.md)
