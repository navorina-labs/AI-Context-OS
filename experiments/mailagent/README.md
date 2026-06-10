# Experiment: MailAgent (Phase 1)

First controlled experiment for AI Context OS hypothesis validation.

---

## Subject

**MailAgent** — an email automation / AI agent project used as the Phase 1 research subject.

> Note: This directory contains the experiment **protocol and placeholders**. Cores are built when the actual MailAgent repository is connected. No product code lives here.

---

## Goals

1. Build four primary cores + billing/onboarding subcores for MailAgent
2. Achieve routing accuracy ≥ 90% on [research/questions.md](../../research/questions.md) subset
3. Run A/B: full MailAgent repo vs routed cores
4. Measure accuracy, hallucination, CCR, latency
5. Document failures for hypothesis refinement

---

## Expected Domains

| Domain | Relevance | Notes |
|--------|-----------|-------|
| Business | Medium | If monetized; otherwise focus on usage metrics |
| Product | High | Email workflows, agent behavior, user tasks |
| Technical | High | Agent architecture, email providers, parsing |
| Operational | High | Deploy, monitoring, email deliverability |

---

## MailAgent-Specific Questions (add to gold set)

| ID | Question | Expected Core |
|----|----------|---------------|
| MA01 | How does the agent process incoming email? | technical-core |
| MA02 | What email providers are supported? | technical-core, product-core |
| MA03 | Why are emails not being sent? | operational-core, technical-core |
| MA04 | How do users configure automation rules? | product-core, onboarding-core |
| MA05 | What is the agent's decision flow? | product-core, technical-core |

---

## Status

| Milestone | Status |
|-----------|--------|
| Project map | Not started |
| Cores drafted | Not started |
| Routing validated | Not started |
| Gold answers | Not started |
| A/B experiment run | Not started |
| Results published | Not started |

---

## Next Steps

1. Link MailAgent repository URL in project map
2. Run [prompts/build-context-os.md](../../prompts/build-context-os.md)
3. Add MailAgent-specific questions to `gold-answers.md`
4. Execute [research/experiment-design.md](../../research/experiment-design.md)

---

## Results

See `results.md` (create after experiment completes).
