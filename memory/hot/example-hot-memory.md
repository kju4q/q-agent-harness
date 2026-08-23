# Hot Memory (Tier 1)

Filled example for a fictional project called **Ledgerline**, a small
invoicing API. This is what the template looks like when it is real.

Current size: roughly 600 tokens. Well under the 2,000 budget.

---

## Project

Ledgerline is an invoicing API for small agencies. Node and TypeScript,
Postgres, deployed to Fly.io. Two services: `api` and `worker`.

## Always

- Always write tests before implementing new features. A feature branch with no new test does not get merged.
- Always use the existing database schema instead of creating new tables. Extend `invoices` or `line_items` first, and only propose a new table if neither fits.
- Always run `pnpm verify` before reporting a change as done.
- Always use the `Money` type for currency. Never a raw number.
- Always write migrations as reversible. Every `up` needs a matching `down`.

## Never

- Never run migrations against production. Staging only, then a human promotes.
- Never commit directly to `main`. Branch, then open a PR.
- Never log a full invoice payload. It contains client billing addresses.
- Never call the Stripe API directly from `api`. It goes through `worker`.

## Commands

- Install: `pnpm install --frozen-lockfile`
- Test: `pnpm test`
- Lint and typecheck: `pnpm verify`
- Run locally: `pnpm dev` (starts `api` on 3000, `worker` on 3001)
- Migrate staging: `pnpm db:migrate --env staging`

## Key facts

- `api` and `worker` share one Postgres database. A schema change breaks both if only one is updated.
- Stripe webhooks arrive out of order. Every handler has to be idempotent on `event.id`.
- Invoice totals are stored in cents as integers. There is no float currency anywhere in the codebase.
- The staging database is reset every Sunday at 03:00 UTC. Do not rely on staging data persisting.
- Auth tokens expire after 15 minutes. The worker refreshes on 401 rather than pre-emptively.

## Escalate

- Anything that deletes or rewrites invoice records
- Anything that changes how totals or tax are calculated
- Anything touching the Stripe webhook signature check
- Any schema change that drops a column

---

Last reviewed: 2026-08-23. Next review: 2026-09-23.
