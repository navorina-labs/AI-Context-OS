# Experiments

Controlled experiments comparing Full Repository vs Context Core routing.

---

## Structure

```
experiments/
├── README.md              # This file
├── template/              # Blank experiment scaffold
├── mailagent/             # Phase 1 — measured + raw runs
├── django-rest-framework/ # Phase 2.1 — measured (summary only)
├── navorina/              # Phase 2.1 — measured + raw runs
└── oiloop/                # Phase 3 — measured + raw runs (private codebase)
```

---

## Phase 2.1 & 3 Results (summary)

| Project | Qs | B_acc | B_hall | C_hall | CCR | Raw run |
|---------|-----|-------|--------|--------|-----|---------|
| [MailAgent](mailagent/) | 35 | 1.69 | 20% | 14% | 45× | [run-1781075014160](mailagent/runs/run-1781075014160/) |
| [Django REST](django-rest-framework/) | 42 | 1.68 | 22% | 11% | 38× | summary ([Oiloop workspace](../context-os/evaluations/applied-instances.md)) |
| [Navorina](navorina/) | 42 | 1.19 | 19% | **7%** | 14× | [run-1781143403051](navorina/runs/run-1781143403051/) |
| [Oiloop](oiloop/) | 20 | 1.05 | 25% | **15%** | **83×** | [run-1781225808172](oiloop/runs/run-1781225808172/) |

Full reports: [context-os/evaluations/PHASE-2-RESULTS.md](../context-os/evaluations/PHASE-2-RESULTS.md), [context-os/evaluations/PHASE-3-RESULTS.md](../context-os/evaluations/PHASE-3-RESULTS.md)

---

## Running an Experiment

1. Copy `template/` to `experiments/{your-project}/`
2. Build cores using [prompts/build-context-os.md](../prompts/build-context-os.md)
3. Adapt eval harness from [MailAgent/context-os/eval](https://github.com/Alex0nder/MailAgent/tree/main/context-os/eval)
4. Run A/B/C per [research/evaluation-framework.md](../research/evaluation-framework.md)
5. Export run → `experiments/{project}/runs/run-<id>/`
6. Publish `results.md`

---

## Phase Plan

| Phase | Subject | Status |
|-------|---------|--------|
| 1 | MailAgent | ✅ Published |
| 2.1 | Django REST, Navorina | ✅ Published |
| 3 | Oiloop (Private validation) | ✅ Published |

See [docs/research-roadmap.md](../docs/research-roadmap.md).
