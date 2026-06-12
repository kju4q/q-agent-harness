# Agent Harness Starter Checklist

Use this checklist to make a repo easier for agents to work in.

## 1. Map

- Add a short `AGENTS.md` at the repo root.
- Create `docs/architecture.md` with module boundaries and allowed dependency directions.
- Create `docs/product.md` with the product goals, main workflows, and core terms.
- Write down where key scripts, tests, and operational commands live.
- Keep active plans in-repo instead of only in chat or docs tools.

## 2. Guardrails

- Validate request and response shapes at system boundaries.
- Enforce linting, formatting, and type checking in CI.
- Add architecture rules if certain layers should not import each other.
- Define which actions need human approval.
- Document approved commands for setup, test, build, and deploy.
- Keep dangerous credentials or production actions behind explicit gates.

## 3. Feedback loops

- Add unit tests for business rules.
- Add integration tests for important workflows.
- Add UI checks for core product flows when applicable.
- Make logs readable and structured.
- Track at least basic metrics for failures, latency, or success rate.
- Capture traces for multi-step or tool-heavy workflows when possible.

## 4. Runtime harness basics

You do not need a complex platform on day one, but you should think about:

- tool permissions
- approval flows
- session state or memory
- usage or budget limits
- event logging
- traceability across agent actions

## 5. Task-specific harness

Do not use the same setup for every task.

- For debugging, ask the agent to form competing hypotheses and check evidence before changing code.
- For research, ask the agent to bring back sources, compare them, and surface disagreements.
- For decisions, give the agent a rubric with explicit criteria and tradeoffs.

See `docs/task-setups.md` and the example files in `examples/`.

## 6. Good first upgrades

If your current setup is messy, start here:

1. Create a root `AGENTS.md`.
2. Add `docs/architecture.md`.
3. Add one approval rule for destructive actions.
4. Add one reliable verification command.
5. Make logs easier to understand.

## 7. Anti-patterns

- One giant instruction file that tries to explain everything.
- Important knowledge living only in chat, Slack, or someone's head.
- Letting the agent call risky tools without explicit policy.
- Expecting the model to "just be careful."
- No clear way for the agent to tell whether a fix worked.
