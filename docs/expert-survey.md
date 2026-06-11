# Expert Double-Blind Survey

This survey compares two distinct retrieval conditions for AI-generated answers.
Evaluate the options below for accuracy, completeness, and actionability without bias.

---

## Evaluation Criteria Rubrics

### 1. Accuracy (0–3 Scale)
- **3 (Excellent):** Completely correct, no inaccurate details or hallucinations.
- **2 (Good):** Correct in substance, minor inaccuracies that do not affect the main conclusion.
- **1 (Poor):** Substantially incorrect or contains major hallucinations.
- **0 (Critical Fail):** Hallucinates incorrect APIs or logical boundaries.

### 2. Completeness (0–2 Scale)
- **2 (Complete):** Answers all facets of the query.
- **1 (Partial):** Answers the main query but misses edge cases/details.
- **0 (Incomplete):** Fails to address the core query.

### 3. Actionability / Decision Usefulness (1–5 Likert Scale)
- **5 (Highly Actionable):** Direct, ready-to-run recommendations or code.
- **3 (Informative):** Contextually correct but requires lookups.
- **1 (Useless/Misleading):** Cannot be used.

---

## Question OL01: How does Oiloop store user preferences and chat history?

### Option 1:
```text
Oiloop stores user preferences and chat history using the following methods:

- **User Preferences:**
  - User preferences are stored in a SQLite database via the `MemoryStore` class.
  - Specific settings are saved using the `DatabaseSettings` class, which can load and save various configurations (e.g., `PresenceSettings`, `VoiceSettings`, `MailSettings`, etc.).
  - User preferences are also managed through Codable structs, allowing for easy serialization and deserialization.

- **Chat History:**
  - Chat messages are stored in the SQLite database within the `messages` table.
  - Each message is associated with a session and includes details such as the message role (user, assistant, system), content, and timestamp.
  - The `ChatOrchestrator` class manages the retrieval and storage of chat messages, ensuring that they are appended to the history and can be queried as needed.

- **Audit Log:**
  - Actions taken within the application (like sending messages or organizing files) are logged in an audit log, which is also stored in the SQLite database. This log can be accessed for review and tracking user interactions.
```

### Option 2:
```text
Oiloop stores user preferences and chat history using the following methods:

- **Local SQLite Database**: 
  - Managed by the `MemoryStore`, which handles tables for messages, facts, episodes, and settings.
  
- **Key Entities**:
  - `PersonaSettings`: Stores preferred names and assistant character configuration.
  - `OnboardingSettings`: Manages onboarding state and checks.

- **Memory Schemas**: 
  - Supports CRUD operations for sessions, messages, facts, and episodes to maintain user data.

- **Data Privacy**: 
  - User chat data remains local, with no cloud keys or logs, ensuring privacy.
```

### Rater Scores:
- **Preferred Option (1 / 2 / Both / Neither):** [ ]
- **Option 1 Accuracy (0-3):** [ ]
- **Option 1 Completeness (0-2):** [ ]
- **Option 1 Actionability (1-5):** [ ]
- **Option 2 Accuracy (0-3):** [ ]
- **Option 2 Completeness (0-2):** [ ]
- **Option 2 Actionability (1-5):** [ ]

---

## Question OL02: How does Oiloop compress chat history to stay within token limits?

### Option 1:
```text
Oiloop compresses chat history through the following method:

- **Episode Summarization**: This process automatically shrinks memory episodes once they reach certain thresholds to save context tokens. 

This approach helps maintain compliance with the context limits of local models.
```

### Option 2:
```text
Oiloop compresses chat history to stay within token limits by using the following approach:

- **Episode Summarization**: It utilizes the `EpisodeSummarizer` to compress older chat messages into structured memory.
- **Threshold Check**: The system checks if the number of messages exceeds a defined threshold (e.g., `compressThreshold`).
- **Recent Message Retention**: It retains a certain number of recent messages (e.g., `keepRecent`) while compressing the older ones.
- **LLM Utilization**: The summarization is performed using a local LLM (Language Model) to generate a concise summary of the chat history.
- **Memory Insertion**: The summarized content is then inserted into memory as a new episode, allowing for efficient storage and retrieval while managing token usage effectively. 

This process ensures that Oiloop can maintain a manageable chat history without exceeding token limits during interactions.
```

### Rater Scores:
- **Preferred Option (1 / 2 / Both / Neither):** [ ]
- **Option 1 Accuracy (0-3):** [ ]
- **Option 1 Completeness (0-2):** [ ]
- **Option 1 Actionability (1-5):** [ ]
- **Option 2 Accuracy (0-3):** [ ]
- **Option 2 Completeness (0-2):** [ ]
- **Option 2 Actionability (1-5):** [ ]

---

## Question OL03: Where is the Oiloop assistant's system prompt compiled and built?

### Option 1:
```text
The Oiloop assistant's system prompt is compiled and built in the `SystemPromptBuilder`.
```

### Option 2:
```text
The Oiloop assistant's system prompt is compiled and built in the `SystemPromptBuilder` enum, specifically in the `build` function. This function constructs the system message using the base prompt, settings, facts, rules, episodes, and active context cores.
```

### Rater Scores:
- **Preferred Option (1 / 2 / Both / Neither):** [ ]
- **Option 1 Accuracy (0-3):** [ ]
- **Option 1 Completeness (0-2):** [ ]
- **Option 1 Actionability (1-5):** [ ]
- **Option 2 Accuracy (0-3):** [ ]
- **Option 2 Completeness (0-2):** [ ]
- **Option 2 Actionability (1-5):** [ ]

---

## Question OL04: What are the tone presets supported by Oiloop and where are they defined?

### Option 1:
```text
The tone presets supported by Oiloop are:

- Warm
- Professional
- Minimal

These presets are defined in the `TonePreset` enum within the `Core/Persona/PersonaSettings.swift` file.
```

### Option 2:
```text
The tone presets supported by Oiloop are:

- Warm
- Professional
- Minimal

They are defined in the Personal Core under the scope of "Assistant persona guidelines."
```

### Rater Scores:
- **Preferred Option (1 / 2 / Both / Neither):** [ ]
- **Option 1 Accuracy (0-3):** [ ]
- **Option 1 Completeness (0-2):** [ ]
- **Option 1 Actionability (1-5):** [ ]
- **Option 2 Accuracy (0-3):** [ ]
- **Option 2 Completeness (0-2):** [ ]
- **Option 2 Actionability (1-5):** [ ]

---

## Question OL05: How does Oiloop handle sandboxed folder access on macOS?

### Option 1:
```text
Oiloop handles sandboxed folder access on macOS through the following mechanisms:

- **WorkspaceAccess Entity**: This entity persists and resolves sandbox bookmark security data, allowing file operations while complying with macOS sandbox regulations.
- **Sandboxed Folder Bookmarks Decision**: A decision was made to use sandboxed folder bookmarks to ensure necessary compliance with macOS regulations (Decision ADR-02).
- **Invariants**: File moves must only occur within whitelisted bookmark directories, ensuring that operations are restricted to authorized locations.
```

### Option 2:
```text
The context provided does not contain specific information about how Oiloop handles sandboxed folder access on macOS. Details regarding the implementation or management of sandboxed folder access are missing.
```

### Rater Scores:
- **Preferred Option (1 / 2 / Both / Neither):** [ ]
- **Option 1 Accuracy (0-3):** [ ]
- **Option 1 Completeness (0-2):** [ ]
- **Option 1 Actionability (1-5):** [ ]
- **Option 2 Accuracy (0-3):** [ ]
- **Option 2 Completeness (0-2):** [ ]
- **Option 2 Actionability (1-5):** [ ]

---

## Question OL06: What happens when a user requests 'organize downloads'?

### Option 1:
```text
When a user requests 'organize downloads', the following steps occur:

- **File Classification**: The system evaluates files in the Downloads folder based on classification rules.
- **Proposed Moves**: The `FileOrganizer` generates a list of proposed file moves to appropriate target category folders.
- **User Confirmation**: The `FileOrganizeService` holds the proposed state and requires explicit user confirmation before any file moves are executed.
- **Execution of Moves**: If the user confirms, the files are moved within whitelisted bookmark directories.
- **Logging**: Any skipped folders or paths are logged in the audit trail for accountability. 

No files are moved without user confirmation, ensuring protection against unwanted actions.
```

### Option 2:
```text
When a user requests "organize downloads," the following occurs:

- The `userWantsOrganize` method in the `FileOrganizeService` checks if the request contains keywords related to organizing files.
- If the request is recognized, the `handleOrganizeIntent` method is invoked.
- The method prepares a plan to move files into category folders (e.g., Images, Documents) using the `FileOrganizer.proposeOrganization` method.
- If there are no files to move, the assistant responds that everything is already organized.
- If there are files to move, the assistant informs the user that a plan has been prepared and prompts them to open the preview sheet to review the proposed moves.
- The user must confirm the action in the preview sheet for the organization to take place.
```

### Rater Scores:
- **Preferred Option (1 / 2 / Both / Neither):** [ ]
- **Option 1 Accuracy (0-3):** [ ]
- **Option 1 Completeness (0-2):** [ ]
- **Option 1 Actionability (1-5):** [ ]
- **Option 2 Accuracy (0-3):** [ ]
- **Option 2 Completeness (0-2):** [ ]
- **Option 2 Actionability (1-5):** [ ]

---

## Question OL07: How does Oiloop enforce 'don't touch' rules?

### Option 1:
```text
Oiloop enforces 'don't touch' rules through the following mechanisms:

- **UserRuleParser**: Decodes custom text rules into SQLite format to prevent unwanted file moves.
- **Evaluation of User Rules**: The system evaluates user-defined rules (e.g., ignoring certain file patterns) to ensure compliance.
- **Invariants**: No files are moved without explicit user confirmation, ensuring that user rules are respected before any action is taken.
```

### Option 2:
```text
Oiloop enforces 'don't touch' rules through the following mechanisms:

- **User Rule Definition**: Users can define rules that specify which files should not be moved or organized. These rules are categorized under the `dontTouch` kind.
  
- **Rule Checking**: When processing file organization requests, Oiloop checks the defined rules against the files in the workspace. If a file's path matches any of the patterns specified in the 'don't touch' rules, that file will be skipped during the organization process.

- **Rule Enforcer**: The `RuleEnforcer` class contains methods that evaluate whether a file, email, or message should be skipped based on the defined rules. It checks the sender, subject, and content against the patterns in the rules.

- **Feedback Mechanism**: If a file is identified as matching a 'don't touch' rule, Oiloop will not perform any actions on that file, ensuring that user preferences are respected.
```

### Rater Scores:
- **Preferred Option (1 / 2 / Both / Neither):** [ ]
- **Option 1 Accuracy (0-3):** [ ]
- **Option 1 Completeness (0-2):** [ ]
- **Option 1 Actionability (1-5):** [ ]
- **Option 2 Accuracy (0-3):** [ ]
- **Option 2 Completeness (0-2):** [ ]
- **Option 2 Actionability (1-5):** [ ]

---

## Question OL08: What SwiftUI view displays the preview of files to be moved?

### Option 1:
```text
The context provided is missing information about the specific SwiftUI view that displays the preview of files to be moved.
```

### Option 2:
```text
The SwiftUI view that displays the preview of files to be moved is `FilePreviewSheet`.
```

### Rater Scores:
- **Preferred Option (1 / 2 / Both / Neither):** [ ]
- **Option 1 Accuracy (0-3):** [ ]
- **Option 1 Completeness (0-2):** [ ]
- **Option 1 Actionability (1-5):** [ ]
- **Option 2 Accuracy (0-3):** [ ]
- **Option 2 Completeness (0-2):** [ ]
- **Option 2 Actionability (1-5):** [ ]

---

## Question OL09: How does Oiloop read inbox headers from Apple Mail?

### Option 1:
```text
Oiloop reads inbox headers from Apple Mail through the following mechanism:

- Utilizes the `MailService` entity, which coordinates Apple Mail scripts.
- Implements AppleScript or JXA to interact with the Mail.app for reading inbox headers.
- Processes the retrieved headers for message triage classification.
```

### Option 2:
```text
Oiloop reads inbox headers from Apple Mail through the `MailService` class, specifically using the `prepareInboxSummary` method. Here’s how it works:

- **Mail Settings Check**: It first checks if mail automation is enabled in the settings.
- **Fetch Inbox Messages**: It fetches recent inbox messages using either the built-in `MailReader` or a custom mail reader, depending on the user's configuration.
- **Filter Messages**: The fetched messages are filtered based on user-defined rules to exclude any that should be skipped.
- **Build Overview**: It constructs an overview of the messages and prepares a `MailInboxPlan` that includes the messages and a summary.
- **Pending Plan**: The resulting plan is stored in `pendingInboxPlan`, which can then be used to display the summary and details to the user.

This process allows Oiloop to summarize and triage the inbox effectively.
```

### Rater Scores:
- **Preferred Option (1 / 2 / Both / Neither):** [ ]
- **Option 1 Accuracy (0-3):** [ ]
- **Option 1 Completeness (0-2):** [ ]
- **Option 1 Actionability (1-5):** [ ]
- **Option 2 Accuracy (0-3):** [ ]
- **Option 2 Completeness (0-2):** [ ]
- **Option 2 Actionability (1-5):** [ ]

---

## Question OL10: What is the custom IMAP/SMTP mail client implementation in Oiloop?

### Option 1:
```text
The custom IMAP/SMTP mail client implementation in Oiloop includes the following components:

- **MailSettings**: 
  - Stores configuration for using custom mail, including:
    - `imapHost`: IMAP server address.
    - `imapPort`: Port for IMAP (default is 993).
    - `imapUser`: Username for IMAP authentication.
    - `imapPass`: Password for IMAP authentication.
    - `imapDraftsFolder`: Folder name for drafts (default is "Drafts").
    - `sendViaSmtp`: Boolean indicating whether to send emails via SMTP.
    - `smtpHost`: SMTP server address.
    - `smtpPort`: Port for SMTP (default is 587).
    - `smtpUser`: Username for SMTP authentication.
    - `smtpPass`: Password for SMTP authentication.

- **MailService**: 
  - Handles operations related to mail, including:
    - `prepareDraftReply`: Prepares a draft reply based on the latest email or specified message ID.
    - `confirmOpenDraftInMail`: Opens the draft in the Mail app for user review and sending.
    - `cancelDraft`: Cancels the current draft.

- **CustomMailReader**: 
  - Fetches inbox messages and handles sending drafts via IMAP/SMTP based on user settings.

- **MailReader**: 
  - Fetches inbox messages from the default Apple Mail.

- **MailTriageBuilder**: 
  - Builds an overview of the inbox and drafts replies using the local LLM.

- **Error Handling**: 
  - Various error types are defined to handle issues related to mail operations, such as missing configurations or API request failures.

This implementation allows Oiloop to manage email interactions locally without relying on cloud services, ensuring user data remains private.
```

### Option 2:
```text
The custom IMAP/SMTP mail client implementation in Oiloop is represented by the following entity:

- **`CustomMailReader`**: 
  - A standalone client executing curl-based IMAP and SMTP commands. 

This implementation allows for custom fetching and sending of emails using IMAP and SMTP protocols.
```

### Rater Scores:
- **Preferred Option (1 / 2 / Both / Neither):** [ ]
- **Option 1 Accuracy (0-3):** [ ]
- **Option 1 Completeness (0-2):** [ ]
- **Option 1 Actionability (1-5):** [ ]
- **Option 2 Accuracy (0-3):** [ ]
- **Option 2 Completeness (0-2):** [ ]
- **Option 2 Actionability (1-5):** [ ]

---

