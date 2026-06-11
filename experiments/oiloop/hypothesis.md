# Oiloop Context OS Hypothesis

This document defines the evaluation hypotheses for Phase 3 (Private Project Validation) of the AI-Context-OS framework using the **Oiloop** repository.

---

## 1. Primary Hypothesis

> Scoping the LLM context to domain-specific Context Cores (Condition B) does not reduce answer accuracy compared to the full repository baseline (Condition A), while achieving a Context Compression Ratio (CCR) of $\ge 5\times$ and reducing prompt processing latency on local LLMs.

---

## 2. Secondary Hypotheses

### H1: Accidental XML Tag Hallucinations
By stripping the XML capability tags and instruction schemas (e.g., `<shell>`, `<screenshot>`, `<move_files>`) from non-system cores, we predict a **100% reduction** in accidental tool calling hallucinations on general chat and settings queries.

### H2: Local Model Speed-Up (Inference Latency)
When using local LLMs (e.g., `llama3.2:3b` via Ollama), Condition B will achieve a prompt-processing (time-to-first-token) latency reduction of **$\ge 40\%$** because the prompt length shrinks from ~2,000 tokens to under 1,000 tokens.

### H3: Score-Based Routing Precision
A lightweight, score-based regex/keyword router (as implemented in `ContextRouter.swift`) with weights for overlapping keywords will route user queries to the correct context core with an F1 score of **$\ge 0.85$**, without introducing measurable execution overhead.

### H4: Expert Preference in Double-Blind Evaluations
In a randomized, blind evaluation, software engineers and domain experts will prefer the focused answers of Condition B in **$\ge 60\%$** of scoped questions because the model avoids irrelevant context details ("attention dilution").
