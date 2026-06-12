# Applied Instances (Private)

Products and workspaces where AI Context OS patterns are applied in production. **Not open-source** — documented here for research provenance only.

---

## Oiloop (private)

**Type:** macOS AI companion (local + cloud LLM)  
**Visibility:** Private repository — not published  
**Role in research:** DRF Phase 2.1 eval workspace · live Context Cores implementation

### Research contribution

Django REST Framework Phase 2.1 A/B/C evaluation was authored and stored in the private Oiloop repo (`docs/DJANGO-REST-FRAMEWORK-RESULTS.md`). Canonical copy for the public research repo:

- [django-phase-2.1.md](django-phase-2.1.md)
- [experiments/django-rest-framework/results.md](../../experiments/django-rest-framework/results.md)

### Product implementation (Stage 11)

Oiloop ships domain-oriented context cores in the chat orchestrator:

| Core | Domain |
|------|--------|
| `personal` | General dialogue (default) |
| `workspace` | Files, folders, notes, desktop |
| `communication` | Mail, messages, drafts |
| `systemControl` | Terminal, hotkeys, automation |
| `browsing` | Safari, tabs, URLs |

**Router:** score-based keyword routing (`ContextRouter.swift`), English + Russian triggers.  
**UI:** Settings toggle `contextCoreRoutingEnabled`, capsule badge in chat header.  
**Observed:** scoped prompts **40–60% smaller** when a specific core is selected (internal measurement, not formal A/B).

### Relationship to Phase 2 eval subjects

| | DRF eval (Oiloop workspace) | Oiloop product cores |
|--|----------------------------|----------------------|
| Purpose | Validate hypothesis on OSS codebase | Reduce tokens + hallucination for companion |
| Cores | 5 (Serializers, Views, Auth, Routing, Config) | 5 (personal, workspace, communication, systemControl, browsing) |
| Eval | Formal A/B/C, 42 questions | Formal A/B/C, **20 questions** (Phase 3) |
| Default strategy | **C** (graph) for codegen safety | **C** (graph) — Phase 3 measured; B loses accuracy on cross-cutting system Qs |

---

### Phase 3 eval (Oiloop product codebase)

| Metric | A | B | C |
|--------|---|---|---|
| Accuracy | 1.20 | 1.05 | **1.55** |
| Input tokens | 81,212 | **979** | 8,290 |
| Compression | 1× | **83×** | 9.8× |
| Router F1 | — | **0.950** | — |

- Report: [oiloop-phase-3.md](oiloop-phase-3.md) · summary: [PHASE-3-RESULTS.md](PHASE-3-RESULTS.md)
- Raw run: [experiments/oiloop/runs/run-1781225808172/](../../experiments/oiloop/runs/run-1781225808172/)
- Canonical (private): `Oiloop/docs/OILOOP-EXPERIMENT-RESULTS.md`

---

## Cross-Reference

- Phase 2 summary: [PHASE-2-RESULTS.md](PHASE-2-RESULTS.md)
- Phase 3 summary: [PHASE-3-RESULTS.md](PHASE-3-RESULTS.md)
- DRF results: [django-phase-2.1.md](django-phase-2.1.md)
