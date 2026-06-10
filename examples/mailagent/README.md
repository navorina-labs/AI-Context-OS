# Example: MailAgent Context OS

Documentation-only example showing how Context OS artifacts would look for MailAgent.

**This is not a working implementation.** It illustrates structure for experiment Phase 1.

---

## Example Routing

```
"Emails are bouncing"
  → operational-core (deliverability, monitoring)
  → technical-core (SMTP/provider config summary)

"How do I set up my first automation?"
  → onboarding-core
  → product-core
```

---

## Example Core Snippet (Product — illustrative)

```markdown
## Purpose
Support decisions about what MailAgent does and how users accomplish email automation tasks.

## In Scope
- Agent reads inbox, classifies, drafts/sends replies per rules
- User configures triggers via natural language or rule builder
- Supported providers: Gmail, Outlook (OAuth)

## Out of Scope
- SMTP infrastructure details → operational-core
- LLM prompt internals → technical-core

## Invariants
- All outbound email requires user-approved send or auto-send policy
- Agent never deletes mail without explicit rule
```

---

## Where Full Artifacts Go

When MailAgent is connected:

```
experiments/mailagent/cores/
experiments/mailagent/routing-rules.md
experiments/mailagent/gold-answers.md
```

Use templates from [context-os/](../../context-os/) and prompts from [prompts/](../../prompts/).
