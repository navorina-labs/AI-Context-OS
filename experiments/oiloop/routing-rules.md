# Oiloop Context Router Rules

This document outlines the score-based routing rules used to map user queries in Oiloop to the appropriate Context Core.

---

## 1. Context Core Routing Map

The router maps incoming query text to five domains:
* `personal` (General context, facts, character, tone presets)
* `workspace` (File operations, loose files, user rules)
* `communication` (Mail, Messages, Slack/Telegram Web APIs)
* `systemControl` (Subprocesses, screenshots, click/type events, reminders)
* `browsing` (Safari/Chrome tabs)

---

## 2. Keyword Weights & Logic

To handle overlap (e.g. "create note" vs "delete reminder"), the router scores each core by assigning points to matching substrings:

### A. Browsing (+2 for High, +1 for Normal)
- **High Weight:** `safari`, `сафари`, `chrome`, `хром`, `browser`, `браузер`, `tab`, `вкладка`, `вкладки`, `url`, `урл`
- **Normal Weight:** `website`, `сайт`, `web page`, `веб-страница`

### B. System Control (+2 for High, +1 for Normal)
- **High Weight:** `screenshot`, `скриншот`, `terminal`, `терминал`, `shell`, `шелл`, `execute`, `выполнить`, `simulate`, `симулировать`, `hotkey`, `горячие клавиши`, `mouse`, `мышь`, `keyboard`, `клавиатура`, `click`, `клик`, `нажатие`, `type`, `напечатать`, `press`, `нажать`
- **Normal Weight:** `command`, `команда`, `команду`, `run`, `запустить`

### C. Communication (+2 for High, +1 for Normal)
- **High Weight:** `telegram`, `телеграм`, `tg`, `тг`, `slack`, `слак`, `inbox`, `инбокс`, `draft`, `черновик`, `letter`, `письмо`, `письма`
- **Normal Weight:** `mail`, `email`, `почта`, `message`, `сообщение`, `сообщения`, `reply`, `ответить`, `ответ`

### D. Workspace (+2 for High, +1 for Normal)
- **High Weight:** `workspace`, `воркспейс`, `organize`, `организовать`, `sort`, `сортировать`, `сортировка`, `archive screenshots`, `move screenshots`, `архивировать скриншоты`, `перенести скриншоты`, `notes`, `заметки`, `note`, `заметка`, `reminder`, `reminders`, `напоминание`, `напоминания`
- **Normal Weight:** `folder`, `папка`, `папки`, `file`, `файл`, `файлы`, `desktop`, `рабочий стол`, `clean`, `очистить`, `create note`, `создать заметку`, `создай заметку`, `remind`, `напомнить`

---

## 3. Score Aggregation & Multi-Core Selection

1. Scores are computed for each category.
2. The maximum score ($M$) is identified.
3. If $M = 0$, the router defaults to `personal`.
4. Otherwise, the router selects the top-scoring core.
5. If the second-highest scoring core has a score $S \ge M - 1$ or $S \ge 2$, it is also included (multi-core routing).
