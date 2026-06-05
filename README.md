# q-agent-harness

Starter kit for building an agent harness that helps AI agents write, test, fix, and ship software more reliably.

This repo is built around three ideas:

1. A map
2. Guardrails
3. Feedback loops

If an agent cannot find the right context, it guesses.
If an agent has no boundaries, it makes risky moves.
If an agent cannot see what broke, it cannot improve its own work.

## What is harness engineering?

Harness engineering is the work of building the environment around an AI agent so it can do useful software work on purpose.

That environment usually includes:

- repo docs and architecture notes
- agent instructions
- tool permissions and approval points
- coding and schema boundaries
- tests and UI validation
- logs, metrics, and traces

The goal is not to write the perfect prompt. The goal is to make good behavior easier for the agent than bad behavior.

## The 3-part framework

### 1. Map

Give the agent a clear model of the system:

- what the product does
- how the repo is organized
- where business rules live
- how modules are allowed to depend on each other
- where to find important scripts, tests, and docs

See [docs/repo-structure.md](docs/repo-structure.md).

### 2. Guardrails

Make risky behavior harder:

- validate schemas at boundaries
- enforce linting and type checks
- document approved tools and commands
- require human approval for destructive actions
- keep architecture and dependency directions explicit

See [docs/starter-checklist.md](docs/starter-checklist.md).

### 3. Feedback loops

Let the agent see whether its work actually worked:

- unit and integration tests
- UI checks
- logs
- metrics
- traces
- review loops

The faster an agent can observe failure, the faster it can recover.

## What is in this repo?

- [AGENTS.md](AGENTS.md): a starter instruction file for agent-facing repositories
- [templates/AGENTS-template.md](templates/AGENTS-template.md): a copy-paste template
- [docs/starter-checklist.md](docs/starter-checklist.md): practical harness checklist
- [docs/repo-structure.md](docs/repo-structure.md): sample repo layout and why it matters
- [docs/product.md](docs/product.md), [docs/architecture.md](docs/architecture.md), [docs/operations.md](docs/operations.md): starter templates for the most useful repo-local context

## How to use this starter kit

1. Copy the `AGENTS.md` template into your repo.
2. Create a small `docs/` directory that explains your system.
3. Add basic guardrails for validation, boundaries, and approvals.
4. Tighten your feedback loops so the agent can detect and fix problems faster.
