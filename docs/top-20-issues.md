# Top 20 Repository Issues

Harsh audit of AI Context OS as it exists today. No new concepts. No architecture extensions. Only gaps, contradictions, and unearned claims found by reading every file in the repository.

**Audit date:** 2026-06-10  
**Superseded in part by:** [research/CRITICAL-REVIEW.md](../research/CRITICAL-REVIEW.md) (2026-06-12) — Issues #1, #4 largely resolved after Phase 2+3 runs. Use CRITICAL-REVIEW for current go/no-go; this file remains the original gap catalog.

**Method:** Full-file review of 46 content files across `docs/`, `theory/`, `research/`, `context-os/`, `experiments/`, `examples/`, `prompts/`, `schemas/`, `papers/`.

---

## Issue 1: Zero experimental evidence for the primary hypothesis

**Description:** The repository proposes H₁ (cores outperform full repository) across accuracy, reasoning quality, hallucination, latency, and CCR. There are no `results.md`, no raw scores, no gold answers, no filled cores, and no A/B runs for any subject.

**Why this is a problem:** The entire project reads like a concluded framework, but the central claim is untested. A reviewer would classify this as proposal + methodology, not research.

**Severity:** 10

**How to fix:** Run Phase 1 on MailAgent (or another connected repo). Publish `experiments/mailagent/results.md` with blind-rated scores, routing logs, token counts, and statistical tests. Until then, mark all quality claims as *proposed*, not *observed*.

---

## Issue 2: `overview.md` states outcomes as facts, not hypotheses

**Description:** Stage 5 ("AI Agent") lists bullet outcomes without qualification: "More focused", "Less hallucination-prone", "Cheaper", "Auditable". These are predictions, not measured results.

**Why this is a problem:** Contradicts `hypothesis.md` and `comparison-with-graphs.md`, which correctly label similar claims as hypothesis. A reader landing on `overview.md` will assume validation already happened.

**Severity:** 9

**How to fix:** Rewrite Stage 5 bullets as conditional: "Expected if H₁ holds: …" Link to `experiments/*/results.md` or state "not yet measured".

---

## Issue 3: `minimal-context-principle.md` claims Phase 1 already validated CCR ≥ 5×

**Description:** Line: `CCR ≥ 5× (hypothesis; empirically validated in Phase 1)`.

**Why this is a problem:** `experiments/mailagent/README.md` shows every milestone as **Not started**. This is a false empirical claim inside a theory document.

**Severity:** 9

**How to fix:** Remove "empirically validated in Phase 1". Replace with: "Target; to be measured in Phase 1 per `research/evaluation-framework.md`."

---

## Issue 4: MailAgent experiment directory contains no experiment

**Description:** Phase 1 subject is MailAgent. The directory has only a protocol README. Missing: linked repo URL, `cores/`, `routing-rules.md`, `gold-answers.md`, `questions.md`, `results.md`, project map.

**Why this is a problem:** Roadmap exit criteria (≥80% accuracy, CCR ≥5×, lower hallucination) are stated as phase goals but imply a runnable experiment exists. It does not.

**Severity:** 9

**How to fix:** Either connect MailAgent and produce artifacts, or downgrade MailAgent to "candidate subject" and remove Phase 1 exit criteria from roadmap until a subject is wired.

---

## Issue 5: Question bank is SaaS/monetization-biased and unroutable for Phase 1 subject

**Description:** 125 questions assume Stripe, MRR, ARR, paywall, churn, trials. MailAgent README rates Business domain as **Medium** and billing subcores as conditional ("if monetized").

**Why this is a problem:** At least 25 Business questions and many Mixed questions cannot be routed to meaningful cores on a non-monetized agent project. Routing evaluation will fail or force fake cores.

**Severity:** 8

**How to fix:** Split `research/questions.md` into `questions-generic.md` and `questions-saas.md`. Add `experiments/mailagent/questions.md` with MailAgent-specific gold routes. Do not score MailAgent against Stripe/MRR items.

---

## Issue 6: Contradictory routing for "How to deploy?"

**Description:**
- `docs/routing.md`: Technical Core + Operational Core
- `context-os/router/routing-examples.md` (single-core table): `operational-core` only
- Same file (composed table): technical + operational when "needs arch context"
- `routing-rules.md` R-OPS-001: operational only

**Why this is a problem:** Gold routing labels cannot be consistent. Raters will disagree on correct core for O01/O25 and any deploy question. Routing precision target (≥90%) is unachievable with conflicting ground truth.

**Severity:** 8

**How to fix:** Pick one rule: deploy-only → Operational; deploy-with-architecture → Operational + Technical. Update all four files to match. Add O01/O25 explicit labels in `research/questions.md`.

---

## Issue 7: Router exists only as keyword lists — not executable or testable

**Description:** Routing is documented as keyword matching with priorities. No reference algorithm, no script, no worked routing log for all 125 questions, no confidence scoring implementation.

**Why this is a problem:** `experiment-design.md` requires routing accuracy ≥90% **before** the main experiment. There is no way to run the router. Manual keyword matching will not reproduce across raters.

**Severity:** 8

**How to fix:** Document a manual routing procedure (decision tree) OR add a minimal deterministic router script (out of scope per original charter — then downgrade routing accuracy claims to "manual adjudication only" and remove automation targets).

---

## Issue 8: Full Repository baseline (Condition A) is undefined when repo exceeds context window

**Description:** `experiment-design.md` Step 3: if repo exceeds window, use "RAG over all files or truncation" and document method.

**Why this is a problem:** Condition A becomes a moving target. Cores may beat a weak RAG baseline, not full repository. The comparison no longer tests the stated problem ("full repo dump").

**Severity:** 8

**How to fix:** Freeze Condition A protocol per subject: e.g., "all files in repo, truncated by X strategy, documented file list". Publish baseline construction script or checklist. Same window budget for A and B where possible.

---

## Issue 9: Roadmap Phase 5 "Open-source release" contradicts current repo state

**Description:** `docs/research-roadmap.md` Phase 5 goal: "Publish complete research repository". Repository is already on GitHub. Phase 5 exit criteria include "external replication" — zero.

**Why this is a problem:** Timeline and phase model are stale on day one. Misleading for contributors and paper reviewers.

**Severity:** 7

**How to fix:** Mark Phase 5 as partially complete (repo published). Redefine Phase 5 as "replication package" (gold labels, rater guide, results dataset). Update README planned experiments table.

---

## Issue 10: Massive duplication across `docs/`, `theory/`, and `principles.md`

**Description:** Same ideas repeated with slight wording changes:
- Minimal Context: `principles.md` §1 + `theory/minimal-context-principle.md`
- Domain boundaries: `principles.md` §2 + `theory/context-boundaries.md`
- Decision-centric: `principles.md` §3 + `theory/decision-centric-context.md`
- Architecture: `docs/architecture.md` + four `context-os/cores/*.template.md` scope sections
- Routing: `docs/routing.md` + `routing-rules.md` + `routing-examples.md`
- Metrics: `research/metrics.md` + `research/evaluation-framework.md`

**Why this is a problem:** Drift risk. Issue 6 (routing) is a direct symptom. Maintenance cost scales with file count; no single source of truth.

**Severity:** 7

**How to fix:** Designate canonical files (e.g., `research/evaluation-framework.md` for metrics). Other files link and do not restate. Run a dedup pass.

---

## Issue 11: GraphRAG / H₁e comparison claimed without baseline experiment

**Description:** `hypothesis.md` H₁e: "Context cores outperform graph-only approaches." `evaluation-framework.md` lists Condition C (GraphRAG) as optional. No GraphRAG construction guide, no subject graph, no questions isolated for graph-appropriate retrieval.

**Why this is a problem:** Sub-hypothesis is untestable with current artifacts. `comparison-with-graphs.md` matrix scores GraphRAG vs Context OS without data.

**Severity:** 7

**How to fix:** Mark H₁e as deferred. Remove comparative superiority rows from `comparison-with-graphs.md` matrix or label entire table "theoretical, not measured". Add GraphRAG baseline to Phase 2 only if resourced.

---

## Issue 12: No gold answers, rater instructions, or reproducible scoring package

**Description:** `experiment-design.md` requires gold standards per question. `papers/future-paper-outline.md` Appendix D: "Rater instructions" — file does not exist. `metrics.md` shows example CSV row but no template file in repo.

**Why this is a problem:** Two raters and Cohen's κ ≥ 0.7 cannot be reproduced. Evaluation framework is specification only.

**Severity:** 7

**How to fix:** Add `research/rater-instructions.md`, `research/scoring-rubric.md`, `research/data/results-template.csv`, and per-subject `gold-answers.md`.

---

## Issue 13: Billing Core has unresolved dual parent (Business vs Technical)

**Description:**
- `docs/architecture.md`: Billing Core parent "Business / Technical"
- `billing-core.template.md` metadata: `parent_core: business-core` only
- `context-cores.md` hierarchy: shared boundary with implementation side under Technical
- Routing sends billing questions to `billing-core` without frame disambiguation

**Why this is a problem:** Same question ("Stripe webhook broken") needs business frame vs implementation frame. One core template cannot serve both without duplication or leakage.

**Severity:** 7

**How to fix:** Split into `billing-business-core` and `billing-technical-core`, OR add explicit `frame` field in core metadata and routing rules (business vs technical keyword paths). Align schema, templates, and routing.

---

## Issue 14: Core templates are empty — no reference core to validate size or sufficiency

**Description:** All cores in `context-os/cores/` and `subcores/` are unfilled templates with `{PLACEHOLDER}` values. Prompts set token targets (3000–4000) but no filled example exists.

**Why this is a problem:** Cannot assess "too large" or "too small" cores. Quality criteria in `context-cores.md` (<10% of repo tokens) is untestable. CCR cannot be computed.

**Severity:** 7

**How to fix:** Add one fully worked reference core in `examples/` (redacted open-source project) with measured `token_estimate` and positive/negative question pass list.

---

## Issue 15: Terminology inconsistency for cores and routes

**Description:** Mixed forms across files:
- `Revenue Core` vs `revenue-core` vs `Business Core (Revenue)`
- `Product Core` vs `product-core`
- MailAgent questions use lowercase `technical-core`; research bank uses Title Case

**Why this is a problem:** Gold routing labels and schema `id` pattern (`^[a-z][a-z0-9-]*$`) diverge from prose in docs. Automated validation and human rating will mismatch.

**Severity:** 6

**How to fix:** One convention: `id` = kebab-case; display name = Title Case in parentheses once. Global find-replace in `research/questions.md` and routing docs.

---

## Issue 16: "Entity Extraction" pipeline stage is undefined

**Description:** `overview.md` Stage 2: Entity Extraction → Context Cores. No procedure, prompt, schema, or example output. `prompts/build-context-os.md` mentions it in passing only.

**Why this is a problem:** System model has five stages; stage 2 is a black box. Reproducibility stops at "manual, guided by templates."

**Severity:** 6

**How to fix:** Add `research/entity-extraction.md` with inputs, outputs, and one annotated example — or remove Stage 2 from overview and state cores are built directly from artifacts.

---

## Issue 17: `examples/mailagent/` contains fictional core content without experimental watermark

**Description:** Example shows concrete invariants ("Gmail, Outlook OAuth", "Agent never deletes mail") with no source repo, no "illustrative only" binding on each fact.

**Why this is a problem:** Readers may treat examples as MailAgent validation. Conflicts with `experiments/mailagent/README.md` ("Not started").

**Severity:** 6

**How to fix:** Banner every example fact as `[ILLUSTRATIVE — NOT VALIDATED]`. Move fictional snippet under `experiments/mailagent/` as `draft-illustration.md`, not `examples/`.

---

## Issue 18: Statistical plan mismatches measurement scales

**Description:** Accuracy (0–3), Reasoning (1–5), Completeness (0–2) are ordinal. `evaluation-framework.md` prescribes paired **t-test** on accuracy. Hallucination is binary per answer but compared across conditions with McNemar — OK — yet multiple primary endpoints without multiplicity correction beyond one Bonferroni mention.

**Why this is a problem:** t-test on ordinal Likert scores is methodologically weak. Power analysis cites Cohen's d = 0.3 for n=100 but does not account for 5 domain strata × 7 metrics.

**Severity:** 6

**How to fix:** Pre-register primary endpoint (e.g., accuracy only). Use Wilcoxon signed-rank for ordinal scales. Document secondary endpoints as exploratory. Add multiplicity correction table.

---

## Issue 19: JSON schemas are orphaned — no validator, fake `$id`, optional fields drift from templates

**Description:** `schemas/core.schema.json` uses `$id: https://ai-context-os.dev/...` (domain does not exist). `decision_history` is optional in schema but present in all markdown templates. No CI validation, no example JSON instance.

**Why this is a problem:** Schema cannot be authoritative if nothing enforces it. Templates and schema will diverge on first edit.

**Severity:** 5

**How to fix:** Add one valid `examples/core.example.json`. Run `ajv` or similar in CI. Align required fields with templates. Use GitHub-based `$id` or relative path.

---

## Issue 20: Operational vs Technical boundary overlaps make routing ambiguous

**Description:** Overlapping questions with different expected cores:
- T04 "What database?" → Technical; O19 "DB migrations in prod" → Operational + Technical
- O16 "Cloud provider?" → Operational; T02 "Tech stack" → Technical (cloud is stack)
- O17 "Secrets management" → Operational; T23 "Security measures" → Technical
- T22 "Logging" vs O11 "Access production logs" — ops vs tech

**Why this is a problem:** Keyword router cannot disambiguate. Multiple valid routes → gold label disputes → inflated routing "errors" or arbitrary choices.

**Severity:** 7

**How to fix:** Publish boundary decision table (ops vs tech) in `docs/routing.md`. Tag ambiguous questions in `research/questions.md` as `routing: ambiguous` with adjudication rules. Narrow keyword lists.

---

## Honorable mentions (not in top 20, but real)

| Gap | Note |
|-----|------|
| `problem.md` attention-dilution argument | Stated as mechanism, no citation to LLM context literature |
| `principles.md` "lossless for decision facts" | Unverifiable; compression is always lossy |
| `context-cores.md` "<10% repo tokens" | Arbitrary threshold, no derivation |
| README "Contributing" | No `CONTRIBUTING.md`, no issue templates |
| Falsification criteria vs success criteria | `hypothesis.md` >60% rule vs p<0.05 — not explicitly reconciled |

---

## Priority fix order

1. Issues 1, 3, 4 — stop claiming validation without data  
2. Issues 6, 7, 13, 20 — make routing ground truth consistent  
3. Issues 5, 8, 12 — make experiment actually runnable  
4. Issues 10, 15, 16 — reduce duplication and ambiguity  
5. Issues 2, 9, 17 — align narrative with repository state  
