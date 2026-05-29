# AGENTS.md

This file is the front door for agents working in this repository.

It should stay short. Use it as a map, not as an encyclopedia.

## Mission

Build and maintain reliable software while preserving repository clarity, architectural boundaries, and safe operating rules.

## How to work here

1. Read the relevant docs before making changes.
2. Prefer small, reviewable changes over large rewrites.
3. Follow the documented architecture instead of inventing new structure during implementation.
4. Validate work with tests, checks, or direct product verification whenever possible.
5. Escalate when an action is destructive, ambiguous, or requires judgment beyond the written rules.

## Start here

- Product overview: `docs/product.md`
- Architecture: `docs/architecture.md`
- Repo structure: `docs/repo-structure.md`
- Active plans: `docs/plans/`
- Operational rules: `docs/operations.md`

## Non-negotiables

- Do not guess data shapes at boundaries. Validate them.
- Do not bypass architecture rules for convenience.
- Do not run destructive actions without approval.
- Do not introduce new dependencies without a reason.
- Do not leave changes unverified when verification is possible.

## Preferred workflow

1. Understand the task.
2. Find the relevant docs and code.
3. Make the smallest coherent change.
4. Run checks.
5. Summarize what changed and any remaining risks.

## If information is missing

If the repository does not contain enough context to complete the task safely, stop guessing and surface what is missing:

- missing documentation
- missing architecture rule
- missing tool or permission
- missing test or observability signal

When possible, add the missing context back into the repository so future runs can use it.
