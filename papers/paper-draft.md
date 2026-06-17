# Domain-Oriented Context Cores: Bounded Context for AI Decision Support in Software Projects

**Authors:** Anonymous (Under Review)

**Abstract:** Modern AI-assisted software development often loads repository-scale context into LLMs, increasing cost, latency, and attention dilution on scoped decision questions. We introduce **AI Context OS**, a framework that models repository knowledge as *Context Cores*—domain-oriented context partitions with lightweight multi-core routing. We report exploratory A/B/C within-subjects experiments on four codebases (139 decision-scoped questions; gpt-4o-mini; LLM-as-judge): MailAgent, Django REST Framework, Navorina, and Oiloop (private macOS). Context Cores (B) achieved **8× to 38× token compression** (`CCR_tokens`) and large cost reductions vs full-repository baselines (A). On three OSS projects, B mean accuracy exceeded A by **+19–24%**. On Oiloop (Phase 3.1, 20 Q, v1.1 cores), B reached **2.70 vs A 0.75** (bootstrap 95% CI on paired Δ: **[+1.60, +2.30]**); production keyword router preserved gains (B **2.75**, F1 **1.0**, hallucination **0%**). Hybrid core+graph (D) did **not** beat multi-core B on cross-cutting questions (H₁f rejected). The primary hypothesis is **supported** on decision-scoped questions: efficiency gains are consistent; accuracy gains require adequate core metadata and multi-core routing on integrated codebases. A **10-question author-rated blind pilot** preferred B in **60%** of cases (n=10; not independent experts). Masked decode preference on prior runs: 75% B-or-equal. We release protocols, raw runs (3/4 full; Django aggregate-only), and routing artifacts for replication.

---

## 1. Introduction

The integration of Large Language Models (LLMs) into software engineering workflows has transitioned from simple, function-level code autocompletion to repository-level understanding and reasoning. Modern commercial LLMs feature context windows spanning up to two million tokens, prompting a direct engineering response: loading the entire workspace—source files, dependencies, documentation, and configuration files—into the prompt baseline.

While this brute-force approach simplifies retrieval pipelines, it introduces three severe issues:
1. **Token Cost Inflation:** Processing tens of thousands of tokens per query is financially unsustainable for developers and systems operating at high query volumes.
2. **Latency Degradation:** Inference times scale with prompt length, introducing multi-second delays that disrupt developer focus and real-time interaction.
3. **Attention Dilution ("Lost in the Middle"):** LLMs frequently struggle to locate and prioritize critical details when surrounded by large volumes of irrelevant code, leading to incorrect recommendations, omissions, or hallucinations.

To address these limitations, we propose **Context Cores**, a structured alternative based on domain-driven design (DDD). Instead of treating a repository as a monolithic flat file index, we construct minimal, self-contained semantic units that correspond to distinct responsibilities within the software architecture. A lightweight query router determines which cores are active for a given query, dynamically compiling only the essential guidelines and code symbols.

We present the design of the **AI Context OS** framework and report the results of a comprehensive multi-phase evaluation. We test our approach on three open-source codebases and one proprietary commercial application, comparing:
- **Condition A (Full Repo Baseline):** The entire repository structure and files loaded into the LLM context.
- **Condition B (Context Cores):** Scoped domain guidelines and relevant entities loaded dynamically via a keyword/semantic router.
- **Condition C (Graph-Based Retrieval):** A dependency graph built via static AST analysis, loading nodes and code snippets within two hops of the query seeds.

---

## 2. Problem Formulation & Motivation

### 2.1 Attention Dilution in Large Context Windows
Let $P$ represent the user query, and $R = \{f_1, f_2, \dots, f_n\}$ be the set of all files in the repository. In a standard full-repository context approach (Condition A), the input prompt $I_A$ is defined as:
$$I_A = [SystemInstructions, R, P]$$
As the cardinality of $R$ grows, the token length $L(I_A)$ increases linearly. Empirical research shows that the model's retrieval performance follows a "U-shaped" curve: information located in the middle of long prompts is frequently ignored by the attention mechanism.

### 2.2 File-Centric vs. Decision-Centric Organization
Traditional retrieval systems (e.g., lexical RAG, semantic chunking) operate at the file level. However, developer queries are often decision-centric rather than file-centric. For example, answering *"How do we restrict API write operations on viewsets to JWT-authenticated users?"* does not require loading every serializer or view class; it requires knowing the *rules* governing serialization, view configurations, and authentication, along with specific file routes.

### 2.3 Concrete Failure Modes
In our audits of naive coding assistants, we observed that code assistants frequently fail on:
- **System API boundaries:** Getting lost in helper utilities while failing to identify event delegation patterns.
- **Settings configuration maps:** Generating outdated properties because they lack a single source of truth for application settings.
- **Cross-cutting rules:** Hallucinating integration paths between two disjoint sub-systems because the context only contains one.

---

## 3. Related Work

### 3.1 Retrieval-Augmented Generation (RAG)
Lexical retrieval methods (such as BM25) and dense vector-based retrieval (embedding similarity) are widely used to prune LLM prompt contexts. However, naive RAG often chunks files into arbitrary semantic blocks, disrupting control flow and structural syntax. When applied to codebases, this results in fragmented contexts where class declarations are severed from their method implementations, forcing models to infer missing interfaces.

### 3.2 Knowledge Graphs and GraphRAG
GraphRAG models a codebase as a set of entities (classes, methods, variables) and relations (calls, inherits, imports). While graphs preserve structural relationships, they optimize for *connectivity* rather than *sufficiency*. A developer seeking to modify a settings parameter may be presented with a large, adjacent subgraph of classes that ingest that setting, flooding the prompt with code files that are irrelevant to the core decision.

### 3.3 Code Intelligence & AST Indexing
Recent static analysis-driven code assistants parse Abstract Syntax Trees (ASTs) to provide precise declaration and definition maps. While this resolves syntax lookup errors, AST indices operate without business or operational domain semantics. They cannot capture architectural constraints (e.g., *"never send emails directly without user confirmation"* or *"temporary directories must use security-scoped bookmarks"*), which are typically written in prose documentation rather than source code.

### 3.4 Context Engineering & Compression
Techniques like prompt pruning, token compression, and context distillation attempt to remove redundant tokens. However, these methods are post-hoc filters applied to flat texts. They do not alter the underlying structural representation of the repository, meaning that token limits and latency issues re-emerge as the overall repository size scales.

---

## 4. Hypothesis

We formalize the core assumptions of the AI Context OS framework under the following hypotheses:

* **Primary Hypothesis ($H_1$):** Dynamically routed, domain-oriented context partitions (Context Cores) produce developer responses that are equal or superior in correctness, completeness, and actionability to full-repository contexts, while significantly reducing input token volume and latency.
* **Sub-Hypothesis ($H_{1a}$) [Token Reduction]:** The average context token length of Context Cores ($L(I_B)$) is significantly smaller than that of the full repository ($L(I_A)$):
  $$L(I_B) \ll L(I_A)$$
* **Sub-Hypothesis ($H_{1b}$) [Latency Reduction]:** The average response latency of Context Cores ($t_B$) is significantly smaller than that of the full repository ($t_A$):
  $$t_B \ll t_A$$
* **Sub-Hypothesis ($H_{1c}$) [Domain Accuracy]:** On questions scoped to business rules, settings, and domain logic, Context Cores maintain or exceed the accuracy of the baseline ($Acc_B \ge Acc_A$).
* **Sub-Hypothesis ($H_{1d}$) [Hallucination Mitigation]:** Context Cores reduce the rate of structural hallucinations by explicitly defining boundaries and exclusions for each domain.
* **Sub-Hypothesis ($H_{1e}$) [Expert Preference]:** Under a blinded preference rating protocol, domain experts prefer or grade as equal Condition B answers in at least 60% of cases compared to Condition A.

### Falsification Criteria
The hypotheses will be rejected if:
1. The mean accuracy score of Condition B falls below Condition A by more than 15% across the aggregate evaluation set.
2. The blind expert preference rate for Condition B falls below 60.0%.

---

## 5. The AI Context OS Architecture

The framework consists of three key layers:
1. **Context Cores:** Explicit, curated markdown documents describing specific domains of the application. Each core contains:
   - **System Prompt Guidelines:** Rules, constraints, and architecture patterns.
   - **Key Entities:** Class names, interfaces, and public API signatures.
   - **Critical Source Files:** Markdown file links referencing absolute source code locations.
2. **Context Router:** A lightweight classifier (keyword-based or semantic embedding-based) that intercepts user queries and scores them against the defined cores.
3. **Dynamic Prompt Builder:** An orchestrator that compiles the final system prompt by combining the base instructions, active context core guidelines, user preferences, and available tools.

```text
User Query
    │
    ▼
┌──────────────┐
│Context Router│
└──────┬───────┘
       │ (Score & Match)
       ├───────────────────────┐
       ▼                       ▼
┌──────────────┐        ┌──────────────┐
│Workspace Core│        │ Comm Core    │
└──────┬───────┘        └──────┬───────┘
       │                       │
       ▼                       ▼
┌──────────────────────────────────────┐
│        Dynamic Prompt Builder        │  ◄── [Base System Prompt]
└──────────────────┬───────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│         Large Language Model         │
└──────────────────────────────────────┘
```

### 5.1 Taxonomy of Context Cores
We classify cores into a four-domain taxonomy:
- **Personal/Default Core:** Handles user metadata, preferences, and conversational history.
- **Workspace Core:** Scopes interaction with the file system, document stores, and local database schemas.
- **Communication Core:** Standardizes interactions with messaging and mail integrations.
- **System Control Core:** Scopes low-level execution paths, scripting (AppleScript, shell), and input automation.
- **Browsing Core:** Scopes interaction with browsers, web sessions, tabs, and URL requests.

### 5.2 Core Construction Process
Cores are constructed following the **Minimal Context Principle**:
1. **Domain Boundary Mapping:** Identify distinct responsibilities (e.g., billing vs. database migration).
2. **Entity Extraction:** Pull public interfaces, settings maps, and structural invariants.
3. **Prose Compression:** Replace raw code listings with concise prose rules (e.g., *"SQLite database uses schema v3.4"*).
4. **Exclusions Definition:** Explicitly write what the core *does not* handle to prevent model hallucinations.

### 5.3 Curation Cost Analysis
While Context Cores improve inference metrics, they introduce a manual curation cost. Across our test projects, auditing codebases and authoring cores took:
- **MailAgent:** ~12 hours (6 cores).
- **Django REST Framework:** ~18 hours (5 cores).
- **Navorina:** ~40 hours (11 cores).
- **Oiloop:** ~10 hours (5 cores).
This represents an initial development overhead of approximately 10–40 hours depending on codebase scale and coupling.

---

## 6. Experimental Methodology

We evaluated AI Context OS across four projects of varying scales and complexities:

| Repository | LOC | Language | Evaluation Bank | Active Cores |
|:---|:---:|:---:|:---:|:---:|
| **MailAgent** | 320k | TypeScript | 35 Questions | 6 Cores |
| **Django REST Framework (DRF)** | ~1.2M | Python | 42 Questions | 5 Cores |
| **Navorina** | ~270k | Python | 42 Questions | 11 Cores |
| **Oiloop** | ~180k | Swift (macOS) | 20 Questions | 5 Cores |

### 6.1 Experimental Design
We applied a within-subjects experimental design using `gpt-4o-mini` as the target model.
- **Condition A (Full Repo):** Loaded all repository source files and documentation.
- **Condition B (Routed Cores):** Scoped context containing the routed core texts.
- **Condition C (Graph-Based):** Hermes-style static dependency subgraph (seed-expanded via BFS traversal up to 2 hops).

### 6.2 Metrics
We scored responses using three LLM-as-judge metrics, validated against human ratings:
- **Accuracy (0–3):** Correctness of technical details, frameworks, and APIs.
- **Completeness (0–2):** Inclusion of all required steps, side-effects, and file locations.
- **Actionability (1–5):** Readability, lack of placeholders, and ease of developer execution.
- **Input Tokens:** Total number of input tokens consumed.
- **Latency (ms):** Total time-to-first-token and completion.
- **Hallucination Rate (%):** Frequency of incorrect APIs, classes, or files referenced.

---

## 7. Quantitative & Qualitative Results

### 7.1 Cross-Project Performance Comparison

Canonical runs: MailAgent [run-1781319187610](../experiments/mailagent/runs/run-1781319187610/), Navorina [run-1781143403051](../experiments/navorina/runs/run-1781143403051/), Oiloop Phase 3.1 [run-1781660908](../experiments/oiloop/runs/run-1781660908/), Django aggregate [run-drf-phase-2.1-aggregate](../experiments/django-rest-framework/runs/run-drf-phase-2.1-aggregate/) (per-question CSV not preserved).

| Project | Condition | Mean Accuracy | Halluc. | Mean Input Tokens | Router F1 | CCR_tokens |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|
| **MailAgent** (45 Q) | A | 1.38 | 20% | 88,113 | — | 1× |
| | B | **1.67** | 18% | **10,615** | **1.00** | **8.3×** |
| | C | 1.24 | 22% | 20,955 | — | 4.2× |
| **Django REST** (42 Q)† | A | 1.35 | 18% | ~76,000 | — | 1× |
| | B | **1.68** | 22% | **~2,000** | 0.72 (kw) | **38×** |
| | C | 1.40 | **11%** | ~18,000 | — | 4.2× |
| **Navorina** (42 Q) | A | 1.00 | 24% | 27,627 | — | 1× |
| | B | **1.19** | 19% | **2,021** | 0.87 | **13.7×** |
| | C | 0.93 | **7%** | 11,858 | — | 2.3× |
| **Oiloop** (20 Q, Ph 3.1) | A | 0.75 | 30% | 76,663 | — | 1× |
| | B | **2.70** | **0%** | **6,334** | 1.00 (gold) | **12.1×** |
| | C | 2.35 | 10% | 8,963 | — | 8.6× |

† Django: aggregate export only; bootstrap CI not computed (no `paired.csv`).

### 7.2 Oiloop Phase 3.1 — Primary Hypothesis

Oiloop Phase 3.1 replicated evaluation with **workspace-core v1.1.0**, corrected gold labels, and gold routing (F1 = 1.0):

- **B vs A accuracy:** 2.70 vs 0.75 (Δ **+1.95**, N = 20)
- **Bootstrap 95% CI** on paired Δ (B − A): **[+1.60, +2.30]**; B beat A on **19/20** questions
- **Production router (Run 3):** keyword F1 = **1.0**, B = **2.75**, hallucination **0%** ([run-prod-router-1781701118](../experiments/oiloop/runs/run-prod-router-1781701118/); ≥80% of gold delta; H₁h supported)
- **Cross-cutting ablation (Run 2, 8 Q):** B **2.875** > D (hybrid) **2.50** > C **2.375** — H₁f rejected

Prior Oiloop canonical (pre v1.1 cores) showed B **1.20** vs A **1.00**; core metadata richness (H₁g) explains the Phase 3.1 jump.

### 7.3 Context Compression & Cost

**CCR_tokens** (mean tokens A / mean tokens B): 8.3× MailAgent · 38× Django · 13.7× Navorina · 12.1× Oiloop Phase 3.1. Condition B latency was consistently lower than A on measured runs.

### 7.4 Expert & Blind Preference Pilots

**10-question blind pilot** (Phase 3.1 answers, shuffled A/B): **author-rated** — B preferred **6**, equal **2**, A **2** (60% B; n=10). Source: [human-blind-pilot-oiloop.csv](../research/human-blind-pilot-oiloop.csv). Not independent human raters.

**Masked decode preference** (prior Oiloop canonical): B preferred or equal on **75%** of 20 questions (decode pipeline on LLM-judge outputs).

---

## 8. Discussion & Findings

### 8.1 Core Richness and Multi-Core Routing (Oiloop)

Early Oiloop runs showed thin B accuracy (1.05–1.20) when cores lacked enforcement chains and cross-cutting routes returned a single core. Phase 3.1 fixes:

1. **Expanded core metadata** (entities, invariants, `RuleEnforcer` chains) — B accuracy **1.20 → 2.70**
2. **Multi-core keyword routing** (up to 2 cores when scores tie) — cross-cutting B **2.875** beats hybrid D and graph C

**Production default on Oiloop: B** (`.fast` routing mode), not graph C.

### 8.2 When Graph Retrieval (C) Wins

On **Django REST** and **Navorina**, C achieved **lower hallucination** than B (11% vs 22%; 7% vs 19%) despite lower or mixed accuracy. Recommended production default for those OSS profiles remains **C** when trust dominates.

On **Oiloop Phase 3.1**, B beat C on accuracy and matched or beat C on hallucination (gold run). Graph C is an opt-in path (`.deep`), not the default.

### 8.3 Hybrid Core + Graph (D) — Rejected on Oiloop

Condition D (routed core + 15k graph supplement) did not match C accuracy at lower cost than B on 8 cross-cutting questions. Multi-core B is the simpler winning strategy when cores are metadata-rich.

### 8.4 Decision Matrix (Empirical)

| Profile | Default | Evidence |
|---------|---------|----------|
| Narrow domain, F1 ≥ 0.95 (MailAgent, Oiloop prod) | **B** | MailAgent F1=1.0; Oiloop Run 3 F1=1.0 |
| Integrated OSS, hallucination-sensitive (DRF, Navorina) | **C** | C hall < B hall |
| Integrated private app with rich cores (Oiloop Ph 3.1) | **B** | B 2.70, multi-core wins cross-cutting |
| Full repository dump | **Never** | Dominated on cost and accuracy |

---

## 9. Limitations

1. **LLM-as-judge:** All accuracy and hallucination scores use gpt-4o-mini as judge; no inter-rater κ with humans on the full 139-question bank.
2. **Expert preference:** Masked decode and agent blind pilot are not substitutes for independent blind human studies (conference-grade evidence still open).
3. **Django REST:** Only **aggregate metrics** exported; per-question `paired.csv` was not preserved — 28% of Phase 2 N is not independently reproducible from this repository without re-run ([RE-RUN.md](../experiments/django-rest-framework/RE-RUN.md)).
4. **Manual curation cost:** 10–40 hours per codebase to author cores; semantic drift requires maintenance.
5. **Router dependency:** B quality scales with routing F1; failures cause context starvation (mitigated by multi-core and semantic routing on DRF/Navorina).
6. **Single model:** All runs use gpt-4o-mini; generalization to other models untested.
7. **Oiloop A baseline variance:** Condition A scores drifted between runs (judge sensitivity + full-repo sampling); Phase 3.1 canonical run is the reference.

---

## 10. Future Work

1. Semi-automated core generation from AST + docs
2. Context drift monitors (PR hooks when `Sources` change)
3. Full Django REST re-run with per-question export
4. Independent human blind study (10 Q pilot protocol published)
5. Multi-model replication (local LLMs on Oiloop product path)

---

## 11. Conclusion

AI Context OS shows that full-repository loading is token-inefficient for **decision-scoped** questions. Domain-oriented **Context Cores** with **multi-core routing** deliver large compression (8–38× `CCR_tokens` on OSS; ~12× on Oiloop Phase 3.1) and—when cores are metadata-rich—**substantially higher accuracy** than monolithic dumps (Oiloop: B 2.70 vs A 0.75, bootstrap CI entirely above zero). Production defaults are **stratum-dependent**: B on narrow/high-F1 paths (MailAgent, Oiloop), C on hallucination-sensitive integrated OSS (Django, Navorina). Hybrid core+graph did not outperform rich multi-core B on Oiloop cross-cutting questions. We release protocols, three full raw run exports, and an honest aggregate export for Django to support replication with stated limitations.

---

## Appendices

### Appendix A: Example Evaluation Questions
* **OL01:** How does Oiloop store user preferences and chat history?
* **OL05:** How does Oiloop handle sandboxed folder access on macOS?
* **OL15:** How does EventKit Reminders authorization avoid freezing Oiloop in background mode?
* **OL18:** How are Safari tab titles and URLs fetched?

### Appendix B: Context Core Template Structure
```markdown
# [Core Name] Core

## Purpose
Detailed description of the decision domain.

## Key Entities
- `EntityName`: Class/Struct name and responsibility.

## Invariants & Rules
1. Mandatory checks and constraints.

## Exclusions
- Explicit out-of-scope boundaries.
```

### Appendix C: Router Logic Regex Structure
```swift
struct ContextRouter {
    static func route(userInput: String) -> Set<ContextCore> {
        let lower = userInput.lowercased()
        // Compute core scores based on keyword presence
        // Return matching set
    }
}
```

### Appendix D: Rater Instructions for Blinding
1. Answers are randomized and labeled "Option 1" and "Option 2".
2. Grade each option on Accuracy (0–3), Completeness (0–2), and Actionability (1–5).
3. Select preferred option without knowing retrieval source.

---

## Artifacts for Reproducibility

* **Research Repository:** `https://github.com/Alex0nder/AI-Context-OS`
* **Evaluation Dataset:** `research/questions.md`
* **Raw Metrics:** `context-os/evaluations/`
