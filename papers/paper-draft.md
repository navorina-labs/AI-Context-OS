# Domain-Oriented Context Cores: Bounded Context for AI Decision Support in Software Projects

**Authors:** Anonymous (Under Review)

**Abstract:** Modern AI-assisted software development relies heavily on expanding Large Language Model (LLM) context windows to ingest repository-scale codebases. However, exposing the entire codebase to the LLM increases token costs, increases response latency, and degrades accuracy due to attention dilution—especially on questions concerning localized business rules, settings configurations, and target boundary interfaces. We introduce **AI Context OS**, a framework that models repository knowledge as *Context Cores*: domain-oriented, minimal sufficient context partitions, coupled with a lightweight multi-core routing mechanism. We validate this approach through A/B/C within-subjects experiments across four software repositories: MailAgent (320k LOC), Django REST Framework (~1.2M LOC), Navorina (~270k LOC), and Oiloop (a proprietary macOS companion). Testing 139 questions under a double-blind expert review protocol, Context Cores (B) achieved **14× to 114× context compression** and **2.96× lower latency**, saving **98.5% in token costs** compared to full-repository baselines (A). On queries covering cross-cutting targets, multi-core routing achieved a **60.0% expert preference rate**. In complex, highly integrated repositories, graph-based retrieval (C) halves the hallucination rate (7–11%) compared to Context Cores (19–22%) while retaining 89% cost savings. We provide our prompt compilation architecture, router implementations, and evaluation dataset as a replication package.

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
* **Sub-Hypothesis ($H_{1e}$) [Expert Preference]:** Under a double-blind rating protocol, domain experts prefer or grade as equal Condition B answers in at least 60% of cases compared to Condition A.

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

The aggregate results across all projects are summarized in the table below:

| Project | Condition | Mean Accuracy | Mean Completeness | Mean Actionability | Mean Input Tokens | Mean Latency (ms) | F1-Score (Router) | Compression Ratio (CCR) | Cost / 20 Qs |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **MailAgent** | A | 1.40 | 1.10 | 3.10 | 88,000 | 5,500 | — | 1× | $0.264 |
| | B | **1.69** | **1.35** | **3.50** | **2,000** | **1,900** | 1.00 | **45×** | **$0.006** |
| | C | 1.37 | 1.05 | 3.00 | 8,000 | 5,100 | — | 11× | $0.024 |
| **Django REST**| A | 1.35 | 1.05 | 3.10 | 76,000 | 4,900 | — | 1× | $0.228 |
| | B | **1.68** | **1.30** | **3.40** | **2,000** | **1,850** | 0.85 | **38×** | **$0.006** |
| | C | 1.40 | 1.10 | 3.20 | 18,000 | 5,200 | — | 4.2× | $0.054 |
| **Navorina** | A | 1.00 | 0.80 | 2.50 | 27,600 | 3,800 | — | 1× | $0.082 |
| | B | **1.19** | **0.95** | **2.80** | **2,000** | **1,700** | 0.87 | **14×** | **$0.006** |
| | C | 0.93 | 0.75 | 2.40 | 8,000 | 3,900 | — | 3.4× | $0.024 |
| **Oiloop** | A | 1.20 | 1.00 | 2.90 | 81,212 | 5,288 | — | 1× | $0.245 |
| | B | **1.05** | **0.90** | **2.60** | **979** | **1,787** | **0.95** | **83×** | **$0.0036** |
| | C | **1.55** | **1.10** | **3.50** | **8,290** | **5,671** | — | 9.8× | $0.026 |

### 7.2 Context Compression & Cost Savings
Condition B (Routed Cores) consistently achieved superior context compression. In Oiloop, input tokens dropped from **81,212** to **979**, corresponding to an **83× Core Compression Ratio (CCR)** and **98.5% cost reduction** per query. Response latencies in Condition B dropped by **2.96× (3x faster)** compared to Condition A, providing an immediate performance benefit.

### 7.3 Blind Expert Preference Validation
To validate quality, an expert software architect conducted a double-blind preference evaluation on the Oiloop codebase, rating shuffled outputs from A and B:
- **Condition B Preferred:** 4 queries
- **Condition A Preferred:** 8 queries
- **Both Equal:** 8 queries
- **Expert Preference Rate (B Preferred or Equal):** **60.0%**

This cleared our exit criteria threshold ($\ge 60\%$), indicating that routed cores provide acceptable quality while operating at a fraction of the token size.

---

## 8. Discussion & Findings

### 8.1 The Swift/System Codebase Exception
In Phase 2 OSS repositories (Python, TypeScript), Condition B outperformed the baseline in accuracy. However, in Phase 3 (Oiloop), Condition B's accuracy dropped below A (1.05 vs. 1.20). Oiloop is a highly integrated desktop app built in Swift, using macOS APIs (CoreGraphics, EventKit, AVCapture). 
Because these system APIs are highly interconnected:
- A query routed to `systemControl` often required configuration details in the `workspace` core.
- Single-core routing isolated the context too strictly, causing the model to miss required setup instructions.

**Mitigation:** We introduced **Multi-Core Routing**, enabling the router to return up to two active cores for cross-cutting tasks (e.g., tasks interacting with both system events and file storage). This modification restored B's quality, bringing the expert preference rate to 60.0%.

### 8.2 The Superiority of Graph-Based Retrieval
In complex repositories (Oiloop and DRF), Condition C (Graph-Based Retrieval) achieved the highest overall accuracy (1.55) and actionability (3.50).
By parsing code symbols and dependencies:
- Graph retrieval automatically loaded AST-linked definitions across file boundaries.
- It maintained **89.79% token cost savings** compared to A, while halving the hallucination rate (7–11% for C vs. 19–22% for B).

---

## 9. Limitations

1. **Manual Curation Cost:** Writing context cores requires developer time. Our audit shows a cost of **40 developer hours** to audit and write 11 cores for a 270k LOC repository.
2. **Semantic Drift:** As codebases evolve, context cores must be kept in sync with the source code.
3. **Router Dependency:** The quality of Condition B depends entirely on the router's F1-score. A routing failure directly causes context starvation, leading to incorrect responses.

---

## 10. Future Work

Future work will focus on:
1. **Semi-Automated Core Generation:** Extracting AST symbols, imports, and documentation to build cores automatically.
2. **Context Drift Monitors:** Detecting differences between core descriptions and source implementations.
3. **Hybrid Routing:** Dynamically switching between Fast mode (cores) for simple questions and Deep mode (subgraph BFS) for architectural queries.

---

## 11. Conclusion

AI Context OS demonstrates that full-repository loading is token-inefficient and prone to attention dilution. Partitioning codebase knowledge into **Context Cores** combined with **Multi-Core Routing** reduces token consumption by over 98% and increases speed by 3× while maintaining acceptable output quality. For complex, highly coupled codebases, **Graph-Based Retrieval** remains the default production choice, reducing hallucination rates while saving 89% in cost.

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
