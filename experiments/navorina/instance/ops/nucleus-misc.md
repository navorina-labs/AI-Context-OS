# Nucleus misc (contact, journal, Magic Inbox OCR, handles)

## Contact page

- Публично: `Navorina/contact.html` — статика, `mailto:` (support / partnerships).
- Settings → **Help & support** (K7) — ссылка на contact + docs.
- Черновик формы + API: `Navorina/contact-form.html` (`noindex`), `POST /api/financial-mirror/contact`, `server/routes/contact.js`, `npm run test:contact-route`.

## Trade journal (N6–N7)

- Hub: `nucleus-trade-journal-hub.ts`, сессии: `nucleus-trading-session-memory.ts`, UI Insights → Journal.
- Тесты: `npm run test:nucleus-trading-session`, `npm run test:nucleus-trade-journal-summary`; e2e: `e2e/nucleus-trade-journal.spec.ts`.

## Magic Inbox server OCR (J6)

- API: `POST /api/financial-mirror/ai/magic-inbox-receipt-hints` (лимит `magic_inbox_receipt_ocr`, все тарифы).
- Клиент: при слабом Tesseract OCR → vision fallback (`nucleus-magic-inbox-pdf.ts`).
- Тесты: `npm --prefix server run test:magic-inbox-receipt-hints`.

## Handles and Magic Inbox addresses (0055)

- Handle: `cloudflare/worker/src/handles.ts`, `GET|PUT /api/nucleus/handle` (`?check=` live check). Unique by case and look-alike skeleton; reserved words; change once per 30 days, old handle held 90 days. Assistant profile follows it.
- Address `handle.secret@in.navorina.ai`; legacy `inbox-<token>@` works until New address (`POST /api/nucleus/inbox/address/rotate`).
- Untrusted or unauthenticated senders → held (`held_at`), Accept/Delete on `/inbox.html`; trusted senders `/api/nucleus/inbox/senders` (`magic-inbox-sender.ts`).
- UI: onboarding step `handle` (outside `STEPS`), Settings → Profile card `profile-handle-entry.ts`. Runbook: `docs/planning/operations/integrations/magic-inbox-runbook.md`.
- Mobile app (`mobile.html`): Profile shows `@handle` (sheet with live check, suggestion chips, 30-day lock), the inbox address with copy, New address (asks first) and Trusted senders; held receipts on Money offer Accept / Delete. DS canon `products/design-system/modules/mobile-inbox.js` + `mobile-receipts.js`, live backend in `Navorina/js/mobile-app-entry.js` (`useInboxBackend`).
- Tests: `cloudflare/worker/test/handles-integration.test.mjs`, `Navorina/scripts/profile-handle.test.mjs`, `Navorina/scripts/mobile-handle.test.mjs`, `e2e/mobile-handle.spec.ts`.
