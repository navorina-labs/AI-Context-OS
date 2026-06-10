# MailAgent Phase 1 — Published Results

Source: [MailAgent](https://github.com/Alex0nder/MailAgent) `context-os/` eval harness.

## Runs

| Run | Questions | Conditions | Summary |
|-----|-----------|------------|---------|
| [run-1781074375223](runs/run-1781074375223/) | 10 (pilot) | A, B | B accuracy +0.40 vs A; hypothesis yes |
| **[run-1781075014160](runs/run-1781075014160/)** | **35 (full)** | **A, B, C** | **B wins accuracy + tokens; see ABC-COMPARE.md** |

## Full run (35 Q) — headline

| Condition | Strategy | Accuracy | Input tokens (mean) | Cost (answers) |
|-----------|----------|----------|---------------------|----------------|
| A | Full repo | 1.40 | 87 755 | $0.47 |
| **B** | **Context OS cores** | **1.69** | **1 929** | **$0.015** |
| C | Hermes-style graph | 1.37 | 21 048 | $0.12 |

- **Hypothesis (B vs A):** supported — higher accuracy, ~45× fewer input tokens, ~97% cheaper.
- **Graph (C):** ~4× compression vs A, but worse quality-per-token than B; lowest hallucination rate (14%).

Details: `runs/run-1781075014160/ABC-COMPARE.md`, `SUMMARY.md`, `TOKENS.md`.

## Reproduce

```bash
git clone https://github.com/Alex0nder/MailAgent.git
cd MailAgent
npm run eval:context-os:graph-build
npm run eval:context-os
npm run eval:context-os:aggregate -- context-os/eval/results/run-<id>
npm run eval:context-os:export -- context-os/eval/results/run-<id>
```

## Status (2026-06-10)

| Milestone | Status |
|-----------|--------|
| Project map | Done (MailAgent `context-os/audit/`) |
| Cores drafted | Done (4 + 8 subcores) |
| Routing validated | Partial (keyword F1 ~0.55; eval uses gold cores) |
| Gold answers | Done (`questions.json`, 35 Q) |
| A/B experiment | Done (run-1781075014160) |
| A/B/C + graph baseline | Done (run-1781075014160) |
| Results published | Done (this file) |
