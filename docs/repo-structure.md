# Sample Repo Structure

This is a simple structure that helps agents find what matters quickly.

```text
.
├── AGENTS.md
├── README.md
├── app/
├── packages/
├── scripts/
├── tests/
├── templates/
└── docs/
    ├── architecture.md
    ├── product.md
    ├── operations.md
    ├── repo-structure.md
    └── plans/
        ├── active/
        └── completed/
```

## Why this helps

### `AGENTS.md`

This is the first map the agent reads. It should point to the real sources of truth.

### `docs/architecture.md`

Explain how the system is divided, where logic belongs, and what import directions are allowed.

### `docs/product.md`

Explain what the software is trying to do and the workflows that matter most.

### `docs/operations.md`

Document how to run the app, test it, build it, and debug it.

### `docs/plans/`

Keep active and completed plans in the repo so agents can reason about ongoing work without relying on external context.

### `tests/`

Make verification discoverable. The easier it is to find the right test, the more likely the agent is to run it.

### `scripts/`

If you have important workflow commands, keep them named clearly and documented.

## Design rule

The repo should answer these questions quickly:

1. What is this system?
2. Where does this kind of logic belong?
3. What rules am I not allowed to break?
4. How do I verify my change?

If those answers are easy to find, your agent has a much better chance of succeeding.
