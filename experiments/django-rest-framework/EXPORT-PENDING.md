# Django REST Framework — Raw Run Export (pending)

**Status:** Summary published; raw eval artifacts not found in this repo or Oiloop `context-os/eval/results/`.

## Published summary

| Metric | A | B | C |
|--------|---|---|---|
| Accuracy | 1.35 | 1.68 | 1.40 |
| Hallucination | 18% | 22% | 11% |
| CCR | 1× | 38× | 4.2× |
| Router F1 (keyword) | — | 0.72 | — |

Source: [results.md](../results.md) · [django-phase-2.1.md](../../context-os/evaluations/django-phase-2.1.md)

## To export (when raw run is located)

1. Copy from eval workspace: `summary.json`, `paired.csv`, `results.json`, `SUMMARY.md`, `run-meta.json`
2. Place under `experiments/django-rest-framework/runs/run-<id>/`
3. Run bootstrap CI:

```bash
node research/bootstrap-ci.mjs experiments/django-rest-framework/runs/run-<id>/paired.csv
```

4. Update [CRITICAL-REVIEW.md](../../research/CRITICAL-REVIEW.md) — mark Django raw run resolved.

## Search locations tried (2026-06-17)

- `AI-Context-OS/experiments/django-rest-framework/` — summary only
- `Oiloop/context-os/eval/results/` — Oiloop runs only, no DRF project tag

If the DRF eval ran in a separate checkout, re-run or locate `paired.csv` and export using the same manifest pattern as [run-1781660908](../../oiloop/runs/run-1781660908/manifest.json).
