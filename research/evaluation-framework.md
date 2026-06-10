# Evaluation Framework

Methodology for comparing Context Core-based answers against Full Repository baseline.

---

## Evaluation Goal

Determine whether routed Context Cores produce better answers than full repository context for decision-scoped questions.

---

## Experimental Conditions

| Condition | Description |
|-----------|-------------|
| **A: Full Repository** | Question + maximum feasible repo context |
| **B: Context Core** | Question + routed core(s) only |
| **C: GraphRAG** (optional) | Question + graph-retrieved subgraph |
| **D: Hybrid** (optional) | Core + small graph supplement |

Primary comparison: **A vs B**.

---

## Metrics

### 1. Accuracy

**Definition:** Factual correctness of the answer against gold-standard reference.

**Scale:** 0–3 per question

| Score | Meaning |
|-------|---------|
| 0 | Incorrect or misleading |
| 1 | Partially correct, major gaps |
| 2 | Mostly correct, minor gaps |
| 3 | Fully correct |

**Aggregation:** Mean accuracy per domain, overall mean.

**Raters:** Two independent raters; Cohen's kappa ≥ 0.7 required.

---

### 2. Latency

**Definition:** End-to-end time from question submission to complete answer.

**Components:**

- Routing time (B only)
- Context assembly time
- LLM inference time
- Total wall-clock

**Report:** p50, p95, mean per condition.

---

### 3. Context Size

**Definition:** Input tokens sent to the LLM (excluding system prompt overhead).

**Measure:**

- Condition A: total repo context tokens
- Condition B: routed core tokens
- **Context Compression Ratio (CCR):** A_tokens / B_tokens

---

### 4. Reasoning Quality

**Definition:** Quality of the reasoning chain, independent of final answer correctness.

**Scale:** 1–5 rubric

| Score | Meaning |
|-------|---------|
| 1 | No reasoning; assertion only |
| 2 | Flawed logic or irrelevant steps |
| 3 | Adequate but shallow |
| 4 | Clear, relevant, well-structured |
| 5 | Excellent; considers alternatives |

**Criteria:**

- Steps reference decision-relevant facts only
- Causal claims are supported
- Alternatives considered when appropriate
- No irrelevant file citations

---

### 5. Hallucination Rate

**Definition:** Proportion of answers containing fabricated facts not supported by context or ground truth.

**Types tracked:**

| Type | Example |
|------|---------|
| Fabricated fact | "MRR is $50K" (actual: $32K) |
| False citation | References file that doesn't exist |
| False connection | Links unrelated events causally |
| Overconfident speculation | States hypothesis as fact |

**Score:** Binary per answer (hallucination present: yes/no). Report rate per condition.

---

### 6. Answer Completeness

**Definition:** Does the answer address all parts of the question?

**Scale:** 0–2

| Score | Meaning |
|-------|---------|
| 0 | Does not address question |
| 1 | Addresses main point, misses sub-parts |
| 2 | Fully addresses all parts |

---

### 7. Context Compression Ratio (CCR)

**Definition:** `tokens(Full Repository) / tokens(Context Core)`

**Target (hypothesis):** CCR ≥ 5× for scoped questions with no accuracy loss.

**Report:** Mean, median, per-domain breakdown.

---

## Secondary Metrics

| Metric | Description |
|--------|-------------|
| Routing accuracy | Correct core selected (B only) |
| Deferral accuracy | Correctly refuses out-of-scope |
| Expert preference | Blind A/B preference rate |
| Cost per answer | Token cost × price |
| Maintenance cost | Hours to update cores per month |

---

## Scoring Protocol

1. Freeze question set from [questions.md](questions.md)
2. Freeze model and temperature across conditions
3. Run each question in both A and B (randomized order)
4. Blind raters to condition
5. Record all metrics in spreadsheet template
6. Statistical test: paired t-test or Wilcoxon on accuracy per question
7. Report effect size (Cohen's d)

---

## Success Criteria (Hypothesis Supported)

- Accuracy(B) > Accuracy(A) with p < 0.05, OR
- Accuracy(B) ≥ Accuracy(A) with CCR ≥ 5× and Hallucination(B) < Hallucination(A) with p < 0.05
- Reasoning quality(B) > Reasoning quality(A)
- Latency(B) < Latency(A) at p95

---

## Failure Criteria (Hypothesis Rejected)

- Accuracy(A) > Accuracy(B) for >60% of questions
- No significant difference with CCR < 2×
- Hallucination(B) ≥ Hallucination(A)

---

## Reporting

Results published in:

- Experiment README per subject (e.g., `experiments/mailagent/results.md`)
- Paper results section
- Open dataset: questions + scores (no proprietary code)

See [experiment-design.md](experiment-design.md) and [metrics.md](metrics.md).
