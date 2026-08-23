# Task Log (Tier 2)

Filled example for **Ledgerline**, the fictional invoicing API used across
these examples. Four entries, oldest first, the order `scripts/log-task`
writes them in.

---

## Entries

```
date: 2026-04-02
task: Speed up the monthly invoice export, which was timing out at 30s
approach: Assumed the bottleneck was the PDF renderer and spent time profiling
  it. It was not. The actual cost was an N+1 query loading line items one
  invoice at a time. Fixed with a single joined query.
result: Export dropped from 31s to 2.4s.
lesson: Profile before optimizing. The slow part was not the part that looked
  slow, and the assumption cost more time than the fix did.
```

```
date: 2026-05-19
task: Add per-agency tax rates to invoice totals
approach: Started by adding a tax_rate column to invoices. Halfway through,
  found that docs/architecture.md says rates belong to the agency, not the
  invoice, because historical invoices must keep the rate they were issued
  under. Reverted and added an agency_tax_rates table with a valid_from date.
result: Worked, but cost roughly a day to the wrong start.
lesson: Read the architecture notes before designing a schema change, not
  after the first migration is written. The reason a rule exists is usually
  a requirement nobody restated in the ticket.
```

```
date: 2026-06-11
task: Fix the login timeout bug
approach: Added retry logic with exponential backoff around the auth call.
result: Worked after the third attempt. The first two retried too fast and hit
  the same cold-start window that caused the original timeout.
lesson: Always test timeout scenarios with simulated network delays. A retry
  that fires before the dependency has recovered just spends the retry budget.
```

```
date: 2026-07-28
task: Stop duplicate invoices when Stripe retries a webhook
approach: First tried deduplicating on invoice number, which was wrong because
  retries can arrive before the invoice number is assigned. Switched to a unique
  index on stripe_event_id and an upsert in the handler.
result: Worked. The unique index caught 14 duplicate rows that were already in
  staging, which had to be cleaned up before the migration would apply.
lesson: Check for existing bad data before adding a uniqueness constraint. The
  migration fails on rows that predate the rule, and that failure looks like a
  code bug when it is really a data problem.
```
