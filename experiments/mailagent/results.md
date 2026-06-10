# MailAgent Phase 1 — Published Results

**Entry point for agents.** Source harness: [MailAgent `context-os/eval`](https://github.com/Alex0nder/MailAgent/tree/main/context-os/eval).

---

## MailAgent Phase 1 eval (35 questions, gpt-4o-mini)

| Condition | Strategy | Mean input tokens | Accuracy | Halluc. | Latency |
|-----------|----------|-------------------|----------|---------|---------|
| **A** | Full repo baseline | ~88k | 1.40 | 20% | ~10.8s |
| **B** | Context OS routed cores | ~2k | **1.69** | 23% | **~5.4s** |
| **C** | Hermes-style graph retrieval | ~21k | 1.37 | **14%** | ~11.1s |

**Cost (answer phase):** A=$0.47 · **B=$0.015** · C=$0.12

**Headline**

- **B** wins on accuracy + tokens (~45× CCR vs A, ~97% cheaper).
- **C** lowest hallucination (14%) but **11× more tokens than B**; accuracy ≈ A.
- **Hypothesis** (domain cores beat full repo on scoped questions): **supported** (`hypothesis_supported: true` in summary).

---

## Links

| What | URL |
|------|-----|
| This summary | https://github.com/Alex0nder/AI-Context-OS/blob/main/experiments/mailagent/results.md |
| Full run (35 Q, A/B/C) | https://github.com/Alex0nder/AI-Context-OS/tree/main/experiments/mailagent/runs/run-1781075014160 |
| A/B/C comparison | https://github.com/Alex0nder/AI-Context-OS/blob/main/experiments/mailagent/runs/run-1781075014160/ABC-COMPARE.md |
| Metrics | https://github.com/Alex0nder/AI-Context-OS/blob/main/experiments/mailagent/runs/run-1781075014160/summary.json |
| Tokens & cost | https://github.com/Alex0nder/AI-Context-OS/blob/main/experiments/mailagent/runs/run-1781075014160/tokens-summary.json |
| Eval harness | https://github.com/Alex0nder/MailAgent/tree/main/context-os/eval |

---

## Runs in this repo

| Run | Questions | Conditions | Notes |
|-----|-----------|------------|-------|
| [run-1781074375223](runs/run-1781074375223/) | 10 (pilot) | A, B | B +0.40 accuracy vs A |
| **[run-1781075014160](runs/run-1781075014160/)** | **35 (full)** | **A, B, C** | Primary result; see `ABC-COMPARE.md` |

---

## Limitations (from ABC-COMPARE)

- **C** = static graph index + keyword/BFS retrieval (not live CodeGraph MCP).
- **B** uses gold `expected_cores` (ideal router, not production keyword router).
- Judge tokens not included in cost estimates.

---

## Reproduce

```bash
git clone https://github.com/Alex0nder/MailAgent.git
cd MailAgent
npm run eval:context-os:graph-build
npm run eval:context-os
npm run eval:context-os:aggregate -- context-os/eval/results/run-<id>
npm run eval:context-os:export -- context-os/eval/results/run-<id>
```

---

## Status (2026-06-10)

| Milestone | Status |
|-----------|--------|
| Project map | Done (MailAgent `context-os/audit/`) |
| Cores drafted | Done (4 + 8 subcores) |
| Routing validated | Partial (keyword F1 ~0.55; eval B uses gold cores) |
| Gold answers | Done (`questions.json`, 35 Q) |
| A/B/C experiment | Done ([run-1781075014160](runs/run-1781075014160/)) |
| Results published | Done (this file) |
