# Project Knowledge (Tier 3)

Filled example for **Ledgerline**, a fictional invoicing API for small
agencies.

---

## System map

Three deployed components and one database.

- **`api`** is a Node and TypeScript HTTP service. It owns everything a client sees: invoices, line items, agencies, auth. It is the only component that accepts writes from the outside world.
- **`worker`** handles anything slow or external: PDF rendering, email delivery, and all Stripe calls. It has no HTTP surface except a health check.
- **`ledger-events`** is a Postgres-backed job queue. `api` writes jobs, `worker` consumes them.
- **Postgres** is shared by `api` and `worker`. Both connect directly.

`api` communicates with `worker` through the event queue, not direct HTTP
calls. This is deliberate: Stripe operations must survive an `api` restart
mid-request, and a queued job does while an in-flight HTTP call does not.

Deliberately not connected: nothing calls Stripe except `worker`. If you
find a Stripe import in `api`, it is a bug.

## Data ownership

- **Invoices, line items, agencies**: owned by `api`. `worker` reads them and writes only status fields (`sent_at`, `pdf_url`, `stripe_status`).
- **Stripe state**: Stripe is the source of truth. Our `stripe_status` column is a cache and can be stale by up to a few minutes. Never make a billing decision from our copy. Re-read from Stripe.
- **Tax rates**: owned by `agency_tax_rates`, which is append-only with a `valid_from` date. An invoice resolves its rate at issue time and stores the resolved value. Changing a rate never changes an issued invoice.

## Business rules

- Invoice totals are stored in cents as integers. There is no float currency anywhere. This is because agency invoices are reconciled against bank transfers, and a half-cent rounding difference triggers a manual reconciliation that costs a person an hour.
- An issued invoice is immutable. Corrections are made by issuing a credit note that references the original. This is a legal requirement in the markets Ledgerline operates in, not a design preference.
- Invoice numbers are sequential per agency with no gaps. A gap is treated as a missing invoice by auditors. This is why numbers are assigned at issue time inside a transaction, and not at draft creation.
- A draft invoice can be deleted. An issued one cannot, ever, by anyone, including support.
- Stripe webhooks arrive out of order and can arrive more than once. Every handler is idempotent on `stripe_event_id`, which has a unique index.

The immutability rule looks like an inconvenience and gets challenged
roughly twice a year. It is not negotiable.

## Architectural decisions

### Queue instead of direct HTTP between `api` and `worker`

- **Decided:** `api` and `worker` communicate only through the `ledger-events` queue.
- **Date:** 2025-03
- **Because:** Stripe charge creation must not be lost if `api` restarts or a deploy lands mid-request. A queued job is retried, an in-flight HTTP call is not.
- **Rejected:** Direct HTTP with a retry wrapper. It moves the durability problem into memory, which does not survive the restart that caused the problem.
- **Consequence:** Nothing in the system is synchronously "charged". The UI has to show a pending state, and tests have to drain the queue rather than await a response.

### Postgres as the queue instead of Redis or SQS

- **Decided:** The job queue is a Postgres table with `SELECT FOR UPDATE SKIP LOCKED`.
- **Date:** 2025-03
- **Because:** Job state and invoice state can then be written in one transaction. With an external queue, a crash between the invoice write and the job publish leaves an invoice with no job.
- **Rejected:** SQS. Cheaper to operate, but the two-write problem needs an outbox pattern to solve, which is more machinery than the queue itself.
- **Consequence:** Throughput is capped by the database. Fine at current volume, around 40k jobs a day. Revisit past roughly 500k.

### Shared database between `api` and `worker`

- **Decided:** One Postgres instance, both services connect directly.
- **Date:** 2025-01
- **Because:** Two engineers, one product. Separate databases would have meant building a sync path before there was a reason for one.
- **Rejected:** Database per service. Correct at a larger size, premature at this one.
- **Consequence:** This is the biggest coupling in the system. A schema change breaks both services, so migrations deploy before code, and code tolerates both the old and the new shape for one release.

## Known problems

- The PDF renderer holds roughly 200MB per render and is not pooled. Two concurrent renders on the same worker instance can hit the memory limit. Workaround: `worker` concurrency is pinned to 1 for the `render_pdf` job type. Do not copy this single-concurrency pattern to other job types.
- `agency_tax_rates` has no UI. Rates are inserted by hand in staging and promoted with a migration. This is known and unpleasant.
- Auth tokens expire after 15 minutes and `worker` refreshes reactively on a 401 rather than pre-emptively. This produces one predictable failed request per token cycle in the logs. It is expected, not a bug.

## Glossary

- **Issue**: to finalize a draft invoice. Assigns the invoice number, locks the record, and queues delivery. Distinct from "send", which is only the email.
- **Credit note**: a negative invoice that references an original. The only legal way to correct an issued invoice.
- **Agency**: our customer. The agency's customers are called **clients**, never "users". A user is a person with a login.
- **Reconciliation**: matching a bank transfer to one or more invoices. Manual today.

---

Last reviewed: 2026-08-23. Next review: 2026-11-23.
