# Workspace Core (Oiloop)

## Metadata

| Field | Value |
|-------|-------|
| id | workspace-core |
| version | 1.0.0 |
| parent_core | null |
| project | Oiloop |
| last_updated | 2026-06-12 |
| token_estimate | 900 |

---

## Purpose

Responsible for file organization, loose files cleanup, directory auditing, security-scoped bookmarks, and enforcing user rules (such as "don't touch invoices").

---

## Scope

### In Scope

- File classification rules and target category folders
- Proposing and executing file move operations (Downloads, Desktop, etc.)
- Resolving security-scoped folder bookmarks (`URL.startAccessingSecurityScopedResource`)
- Evaluating user rules (e.g. ignoring certain file patterns)
- Confirm/Cancel visual previews for folder organization

### Out of Scope

- System automation commands (Terminal shell, simulation) → System Control Core
- Mail/Messages triage → Communication Core
- Browser tab listing → Browsing Core

---

## Key Entities

| Entity | Description |
|--------|-------------|
| `FileOrganizer` | Handles path calculations, duplicate checks, and generating layout proposals. |
| `WorkspaceAccess` | Persists and resolves sandbox bookmark security data. |
| `FileOrganizeService` | Holds proposed state and coordinates confirmations. |
| `UserRuleParser` | Decodes custom text rules into SQLite format to prevent unwanted file moves. |

---

## Invariants

- File moves must only occur within whitelisted bookmark directories.
- No files are ever moved without explicit user confirmation.
- Skipped folders / paths must be logged in the audit trail.

---

## Decision History (ADRs)

| Date | Decision | Rationale | ADR |
|------|----------|-----------|-----|
| 2026-05-20 | Sandboxed folder bookmarks | Necessary to allow file operations while complying with macOS sandbox regulations. | ADR-02 |
| 2026-06-05 | Dry-run propose-before-move | Protects user files from accidental or unwanted LLM-proposed actions. | ADR-03 |

---

## Sources

| Type | Reference | Description |
|------|-----------|-------------|
| File | [FileOrganizer.swift](file:///Users/alex0nder/Projects/Oiloop/Tools/FileTools/FileOrganizer.swift) | Main sorting logic |
| File | [WorkspaceAccess.swift](file:///Users/alex0nder/Projects/Oiloop/Tools/FileTools/WorkspaceAccess.swift) | macOS sandbox bookmark resolver |
| File | [FileOrganizeService.swift](file:///Users/alex0nder/Projects/Oiloop/Core/Orchestrator/FileOrganizeService.swift) | In-memory plan tracker |

---

## Exclusions

- Local file explorer UI styles.
- Generic file-system helpers.

---

## Typical Outputs

- Proposed moves list (`file_a -> folder_b`).
- Validation reports of rules matching user files.
- Sandbox access audit logs.
