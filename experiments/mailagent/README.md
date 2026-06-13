# Experiment: MailAgent (Phase 1)

First controlled experiment for AI Context OS hypothesis validation.

**Live instance:** [Alex0nder/MailAgent](https://github.com/Alex0nder/MailAgent) → `context-os/`

**Published results:** [results.md](./results.md)

---

## Subject

**MailAgent** — temporary inboxes for AI agent signup QA (OTP, magic links, MCP).

---

## Goals

1. Build four primary cores + eight subcores
2. Run A/B/C on the same question bank
3. Measure accuracy, hallucination, CCR, latency, token cost
4. Compare Context OS vs full repo vs Hermes-style graph

---

## Runs

| Run | N | Conditions | Link |
|-----|---|------------|------|
| run-1781074375223 | 10 | A, B | [runs/run-1781074375223](./runs/run-1781074375223/) |
| run-1781075014160 | 35 | A, B, C | [runs/run-1781075014160](./runs/run-1781075014160/) |
| run-1781300479278 | 45 | A, B, C | [runs/run-1781300479278](./runs/run-1781300479278/) |
| **run-1781319187610** | **45** | **A, B, C** | [runs/run-1781319187610](./runs/run-1781319187610/) |

---

## Status (2026-06-10)

| Milestone | Status |
|-----------|--------|
| Project map | ✅ MailAgent `context-os/audit/` |
| Cores drafted | ✅ 4 + 8 subcores |
| Routing validated | ⚠️ Keyword F1 ~0.55; eval B uses gold cores |
| Gold answers | ✅ 35 questions in MailAgent `eval/questions.json` |
| A/B experiment | ✅ run-1781075014160 |
| A/B/C + graph | ✅ run-1781075014160 |
| Results published | ✅ [results.md](./results.md) |

---

## Import new run from MailAgent

```bash
cd MailAgent
npm run eval:context-os:export -- context-os/eval/results/run-<id>

cp -R context-os/eval/export/run-<id> \
  ../AI-Context-OS/experiments/mailagent/runs/
```
