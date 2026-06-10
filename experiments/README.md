# Experiments

Controlled experiments comparing Full Repository vs Context Core routing.

---

## Structure

```
experiments/
├── README.md          # This file
├── template/          # Blank experiment scaffold
└── mailagent/         # Phase 1 subject
```

Each experiment directory contains:

| File | Purpose |
|------|---------|
| `README.md` | Experiment protocol and status |
| `hypothesis.md` | Subject-specific hypotheses |
| `cores/` | Filled core artifacts |
| `routing-rules.md` | Project-specific routing |
| `gold-answers.md` | Reference answers per question |
| `results.md` | Scores and analysis (after run) |

---

## Running an Experiment

1. Copy `template/` to `experiments/{your-project}/`
2. Build cores using [prompts/build-context-os.md](../prompts/build-context-os.md)
3. Write gold answers for question subset
4. Validate routing (≥90% accuracy)
5. Run A/B per [research/experiment-design.md](../research/experiment-design.md)
6. Score per [research/evaluation-framework.md](../research/evaluation-framework.md)
7. Publish results in `results.md`

---

## Phase Plan

| Phase | Subject | Status |
|-------|---------|--------|
| 1 | MailAgent | Planned |
| 2 | OSS SaaS #1–3 | Not started |
| 3 | Private project | Not started |

See [docs/research-roadmap.md](../docs/research-roadmap.md).

---

## No Code

Experiments are **documentation and methodology only**. No experiment runner, API, or automation engine in this repository.
