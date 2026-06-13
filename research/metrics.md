# Metrics Reference

Quick reference for all metrics used in AI Context OS evaluation.

---

## Primary Metrics

| Metric | Symbol | Formula / Scale | Target (hypothesis) |
|--------|--------|-----------------|---------------------|
| Accuracy | Acc | 0–3 mean | B > A |
| Latency | Lat | ms, p50/p95 | B < A |
| Context Size | CS | input tokens | B << A |
| Reasoning Quality | RQ | 1–5 mean | B > A |
| Hallucination Rate | HR | % answers with hallucination | B < A |
| Answer Completeness | AC | 0–2 mean | B ≥ A |
| Context Compression Ratio (API) | CCR_tokens | mean(tokens_in_A) / mean(tokens_in_B) | ≥ 5× |
| Core-char compression (harness) | CCR_core | mean(baseline_chars / context_chars_B) | informational only |

---

## Routing Metrics (Condition B only)

| Metric | Formula | Target |
|--------|---------|--------|
| Routing Precision | correct_cores / selected_cores | ≥ 0.90 |
| Routing Recall | found_cores / required_cores | ≥ 0.90 |
| Routing F1 | 2 × P × R / (P + R) | ≥ 0.90 |
| Deferral Accuracy | correct_defers / total_defers | ≥ 0.85 |

---

## Cost Metrics

| Metric | Formula |
|--------|---------|
| Cost per answer | input_tokens × input_price + output_tokens × output_price |
| Cost reduction | 1 - cost(B) / cost(A) |

---

## Maintenance Metrics

| Metric | Description |
|--------|-------------|
| Core build time | Hours to create initial cores |
| Core update time | Hours per monthly audit |
| Core drift rate | % cores outdated after 30 days |
| Staleness incidents | Answers wrong due to stale core |

---

## Aggregation

Report per:

- Overall
- Domain (business, product, technical, operational, mixed)
- Subject project (MailAgent, SaaS #1, etc.)
- Question difficulty (easy/medium/hard — expert-labeled)

---

## Data Collection Template

```csv
question_id,domain,condition,accuracy,reasoning_quality,hallucination,completeness,input_tokens,output_tokens,latency_ms,routing_cores,routing_correct,rater_id
Q001,business,A,2,4,0,2,180000,450,12400,,,rater_1
Q001,business,B,3,5,0,2,4200,380,2100,revenue_core,true,rater_1
```

---

## Statistical Tests

| Comparison | Test |
|------------|------|
| Accuracy A vs B | Paired t-test or Wilcoxon signed-rank |
| Hallucination rate | McNemar's test |
| Latency | Paired t-test on log-transformed values |
| Effect size | Cohen's d for accuracy difference |

Significance level: α = 0.05. Correct for multiple comparisons (Bonferroni) across domains.
