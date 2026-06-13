# Top 20 Repository Issues — Resolved & Open Split

This document tracks the harsh audit of the AI Context OS framework, splitting identified issues into resolved achievements and open work items.

**Original Audit Date:** 2026-06-10  
**Updated:** 2026-06-12 (Post Phase 2+3 Evaluations)  
**Cross-Reference:** [research/CRITICAL-REVIEW.md](../research/CRITICAL-REVIEW.md)

---

## Part 1: Resolved Issues

The following issues identified during the initial audit have been successfully resolved by implementing executable evaluations, adding actual codebase runs, and aligning theory and codebase structures.

### Issue 1: Zero experimental evidence for the primary hypothesis (RESOLVED)
* **Status:** Resolved. A/B/C evaluations have been conducted across four codebases (MailAgent, Django REST Framework, Navorina, Oiloop) covering 139 questions. Raw runs are published in `experiments/` and `runs/` directories.
* **Original Description:** The repository proposes H₁ (cores outperform full repository) across accuracy, reasoning quality, hallucination, latency, and CCR. There are no results.md, no raw scores, no gold answers, no filled cores, and no A/B runs for any subject.

### Issue 3: `minimal-context-principle.md` claims Phase 1 already validated CCR ≥ 5× (RESOLVED)
* **Status:** Resolved. The documentation in `minimal-context-principle.md` was updated to accurately state that CCR of 14–83× was measured empirically in Phase 2–3 evaluations.
* **Original Description:** Line: `CCR ≥ 5× (hypothesis; empirically validated in Phase 1)`. `experiments/mailagent/README.md` shows every milestone as Not started. This is a false empirical claim inside a theory document.

### Issue 4: MailAgent experiment directory contains no experiment (RESOLVED)
* **Status:** Resolved. MailAgent has been fully integrated as the Phase 1 subject, populated with actual cores, routing maps, questions, and raw run records.
* **Original Description:** Phase 1 subject is MailAgent. The directory has only a protocol README. Missing: linked repo URL, `cores/`, `routing-rules.md`, `gold-answers.md`, `questions.md`, `results.md`, project map.

### Issue 5: Question bank is SaaS/monetization-biased and unroutable for Phase 1 subject (RESOLVED)
* **Status:** Resolved. The question bank has been split and custom-targeted. Each of the four evaluated projects now has a tailored set of questions in its respective `questions.json` (such as the 45 MailAgent-specific questions).
* **Original Description:** 125 questions assume Stripe, MRR, ARR, paywall, churn, trials. MailAgent README rates Business domain as Medium and billing subcores as conditional ("if monetized").

### Issue 7: Router exists only as keyword lists — not executable or testable (RESOLVED)
* **Status:** Resolved. Implemented executable routing scripts `route-eval.mjs` and semantic embedding builders `build-router-embeddings.mjs` to calculate routing accuracy and F1 scores against gold labels.
* **Original Description:** Routing is documented as keyword matching with priorities. No reference algorithm, no script, no worked routing log for all 125 questions, no confidence scoring implementation.

### Issue 11: GraphRAG / H₁e comparison claimed without baseline experiment (RESOLVED)
* **Status:** Resolved. Condition C (Hermes-style Graph Retrieval) has been fully integrated and evaluated across all four subject codebases, providing concrete comparative data on accuracy and hallucination rates.
* **Original Description:** `hypothesis.md` H₁e: "Context cores outperform graph-only approaches." `evaluation-framework.md` lists Condition C (GraphRAG) as optional. No GraphRAG construction guide, no subject graph, no questions isolated for graph-appropriate retrieval.

### Issue 12: No gold answers, rater instructions, or reproducible scoring package (RESOLVED)
* **Status:** Resolved. Gold bullets are integrated into the question datasets (`questions.json`). The test runner outputs reproducible metric files (`paired.csv`, `summary.json`, `SUMMARY.md`) for every evaluation.
* **Original Description:** `experiment-design.md` requires gold standards per question. `papers/future-paper-outline.md` Appendix D: "Rater instructions" — file does not exist. `metrics.md` shows example CSV row but no template file in repo.

### Issue 14: Core templates are empty — no reference core to validate size or sufficiency (RESOLVED)
* **Status:** Resolved. Populated actual reference cores are deployed in both the MailAgent (`context-os/cores/`) and Oiloop (`Resources/cores/`) codebases, proving real-world sizes and token counts.
* **Original Description:** All cores in `context-os/cores/` and `subcores/` are unfilled templates with `{PLACEHOLDER}` values. Prompts set token targets (3000–4000) but no example exists.

---

## Part 2: Open Issues

The following issues remain open or partially addressed, and represent the focus of upcoming research phases.

### Issue 2: `overview.md` states outcomes as facts, not hypotheses
* **Status:** Open.
* **Description:** Stage 5 ("AI Agent") lists bullet outcomes without qualification: "More focused", "Less hallucination-prone", "Cheaper", "Auditable". These are predictions, not measured results.
* **How to fix:** Rewrite Stage 5 bullets as conditional: "Expected if H₁ holds: …" Link to `experiments/*/results.md` or state "not yet measured".

### Issue 6: Contradictory routing for "How to deploy?"
* **Status:** Open.
* **Description:** Gold routing labels can be conflicting across different files:
  - `docs/routing.md`: Technical Core + Operational Core
  - `context-os/router/routing-examples.md`: `operational-core` only
  - `routing-rules.md` R-OPS-001: operational only
* **How to fix:** Pick one rule (e.g. deploy-only → Operational; deploy-with-architecture → Operational + Technical). Update the files to match.

### Issue 8: Full Repository baseline (Condition A) is undefined when repo exceeds context window
* **Status:** Partially Resolved. Baseline configurations are frozen per subject (e.g., `baseline-manifest.json` for MailAgent), but a general standard remains to be defined.
* **Description:** Condition A becomes a moving target. Cores may beat a weak RAG baseline, not the full repository.
* **How to fix:** Freeze Condition A protocol per subject: e.g., "all files in repo, truncated by X strategy, documented file list".

### Issue 9: Roadmap Phase 5 "Open-source release" contradicts current repo state
* **Status:** Open.
* **Description:** `docs/research-roadmap.md` Phase 5 goal: "Publish complete research repository". The repository is already public, but exit criteria like "external replication" have not been met.
* **How to fix:** Mark Phase 5 as partially complete. Redefine Phase 5 as "replication package release".

### Issue 10: Massive duplication across `docs/`, `theory/`, and `principles.md`
* **Status:** Open.
* **Description:** Widespread duplication across architectural, minimal context, and routing files poses drift risks.
* **How to fix:** Designate canonical files. Link other files instead of restating principles. Run a dedup pass.

### Issue 13: Billing Core has unresolved dual parent (Business vs Technical)
* **Status:** Open.
* **Description:** Same billing questions require business context vs technical context. The current core template does not resolve this dual parent boundary.
* **How to fix:** Split into `billing-business-core` and `billing-technical-core`, or add an explicit `frame` field in core metadata.

### Issue 15: Terminology inconsistency for cores and routes
* **Status:** Open.
* **Description:** Mixed casing formats (Revenue Core vs revenue-core vs Business Core (Revenue)) cause mismatches in automated evaluations.
* **How to fix:** Adopt a single convention: `id` = kebab-case, display name = Title Case.

### Issue 16: "Entity Extraction" pipeline stage is undefined
* **Status:** Open.
* **Description:** Stage 2 (Entity Extraction) is a black box in the system model. No concrete schema or prompt is defined.
* **How to fix:** Add a document detailing inputs, outputs, and one annotated example of entity extraction.

### Issue 17: `examples/mailagent/` contains fictional core content without experimental watermark
* **Status:** Open.
* **Description:** Illustrative examples of invariants are not explicitly watermarked, potentially confusing readers with validated findings.
* **How to fix:** Banner illustrative facts as `[ILLUSTRATIVE — NOT VALIDATED]`.

### Issue 18: Statistical plan mismatches measurement scales
* **Status:** Open.
* **Description:** Evaluated dimensions are ordinal (0-3, 1-5), but t-tests are prescribed. Multiple primary endpoints lack multiplicity correction.
* **How to fix:** Use Wilcoxon signed-rank for ordinal scales. Document secondary endpoints as exploratory.

### Issue 19: JSON schemas are orphaned — no validator, fake `$id`, optional fields drift from templates
* **Status:** Open.
* **Description:** Schemas are not enforced by CI, and mock domains are used in `$id` fields.
* **How to fix:** Add a schema validation step in CI and align schemas with template markdown files.

### Issue 20: Operational vs Technical boundary overlaps make routing ambiguous
* **Status:** Open.
* **Description:** Technical stack vs operational setup overlaps make manual and keyword routing ambiguous.
* **How to fix:** Publish a boundary decision table (ops vs tech) and tag ambiguous questions with adjudication rules.
