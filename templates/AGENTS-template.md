# AGENTS.md Template

Copy this into the root of your repo and customize the paths.

```md
# AGENTS.md

This file is the front door for agents working in this repository.

## Mission

Describe the product mission and the standard of correctness here.

## Start here

- Product overview: `docs/product.md`
- Architecture: `docs/architecture.md`
- Repo structure: `docs/repo-structure.md`
- Operations: `docs/operations.md`
- Active plans: `docs/plans/`

## Working rules

1. Read the relevant docs before changing code.
2. Prefer small, reviewable changes.
3. Follow the documented architecture.
4. Validate work before finishing.
5. Escalate ambiguous or destructive actions.

## Non-negotiables

- Validate data at boundaries.
- Do not bypass architecture rules.
- Do not run destructive actions without approval.
- Do not add dependencies casually.
- Do not leave changes unverified when verification is possible.

## Expected workflow

1. Understand the task.
2. Read the relevant docs and code.
3. Make the smallest coherent change.
4. Run checks.
5. Summarize changes and risks.

## If something is missing

If you cannot complete work safely because context or tooling is missing, surface the gap clearly and, when appropriate, add the missing knowledge back into the repository.
```
