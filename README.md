# q-agent-harness

Agent memory in four tiers.

An agent with one big instruction file has one speed. It reads the same
context on every request, learns nothing between tasks, and performs the
same in month six as it did in week one.

Splitting memory into tiers fixes both halves of that. Only the small
always-on tier costs you context on every request. The rest loads when it
is relevant. And because the tiers are separate, information can move
between them, which is what makes the agent get better over time.

```
                    loaded          size
   ┌──────────────────────────────────────────────┐
   │  1  HOT          every request    small      │  rules and facts
   ├──────────────────────────────────────────────┤
   │  2  EPISODIC     on demand        grows      │  what happened
   ├──────────────────────────────────────────────┤
   │  3  SEMANTIC     when relevant    grows      │  how the system works
   ├──────────────────────────────────────────────┤
   │  4  PROCEDURAL   when it matches  stable     │  how to do the task
   └──────────────────────────────────────────────┘

        episodic ──► procedural ──► hot
             lessons become steps become rules
```

## The four tiers

### Tier 1: Hot

[`memory/hot/`](memory/hot/)

The rules the agent applies without being told. Always write tests first.
Never run migrations against production. This is the only tier loaded on
every single request, so it has a size budget: under 2,000 tokens. In Claude
Code, this file is your `CLAUDE.md`.

Everything here costs context on tasks that will never need it. That is why
it stays small, and why [`MAINTENANCE.md`](memory/hot/MAINTENANCE.md) exists.

### Tier 2: Episodic

[`memory/episodic/`](memory/episodic/)

A log of completed tasks. Four fields per entry: task, approach, result,
lesson. Written when the task ends, while you still remember what went
wrong.

One entry is worth little. The value appears when the same lesson shows up
three times, because that repetition is the signal that something should
move up a tier.

### Tier 3: Semantic

[`memory/semantic/`](memory/semantic/)

How the system works and why it was built that way. How components connect,
what the business rules are, which decisions were made and what they ruled
out.

The test for what belongs here: could a new engineer work it out from the
code in ten minutes? If yes, leave it out. If it would take a week, or a
conversation with someone who has left, write it down.

### Tier 4: Procedural

[`memory/procedural/`](memory/procedural/)

Proven workflows. Each one has a version, a validation date, when to use it,
numbered steps, and what done looks like. Four are included: legacy code
review, requirements to tasks, a debugging checklist, and feature
implementation.

If you write Claude Code skills, you are already writing this tier. A skill
is a procedure loaded on demand when the task matches.

## Compaction

[`COMPACTION.md`](COMPACTION.md)

The tiers are storage. Compaction is the part that makes them a system.

Lessons that repeat become procedures. Rules that go stale get removed.
Semantic notes about components that no longer exist get archived. There is
a manual promotion prompt and a monthly review ritual that takes about
thirty minutes.

Without this step you have four folders that only grow, and an agent that
accumulates instead of improving.

## Quickstart

Three moves, spread out. Do not try to build all four tiers in one sitting.

**Today: start with hot memory.** Copy
[`memory/hot/HOT-MEMORY-template.md`](memory/hot/HOT-MEMORY-template.md)
to your repo as `CLAUDE.md`. Fill in the always, never, and commands
sections with what you already know. Ten rules is plenty. See
[`example-hot-memory.md`](memory/hot/example-hot-memory.md) for a filled
version.

**This week: add the task log.** Copy
[`TASK-LOG-template.md`](memory/episodic/TASK-LOG-template.md) and write one
entry per task as you finish it. Four fields, two minutes. Most entries will
have a blank lesson, which is fine. See
[`example-task-log.md`](memory/episodic/example-task-log.md).

**This month: promote your first procedure.** Once the log has ten or so
entries, run the promotion prompt from [`COMPACTION.md`](COMPACTION.md).
Find one lesson that has repeated three times and write it up using the
format in
[`PROCEDURES-README.md`](memory/procedural/PROCEDURES-README.md).

Semantic memory can wait. Write it the first time you have to explain the
same architectural decision twice.

## Scripts

[`scripts/`](scripts/)

- [`scripts/log-task`](scripts/log-task): appends an entry to `memory/episodic/task-log.md`, stamping the date for you. Pass `--task`, `--approach`, `--result`, and `--lesson`, or run it bare and answer the prompts. Creates the log from the template on first use.
- [`scripts/hotmem`](scripts/hotmem): `init` scaffolds a hot memory file from the template, `check` estimates its token count against the 2,000 budget, and `clean` asks the claude CLI to propose removals without touching the file.

Run either with `--help` for usage.

## Also in this repo

The harness material this repo started from. Memory is one part of a harness;
these cover the rest.

- [AGENTS.md](AGENTS.md) and [templates/AGENTS-template.md](templates/AGENTS-template.md): a starter instruction file and a copy-paste template
- [docs/starter-checklist.md](docs/starter-checklist.md): a practical harness checklist
- [docs/task-setups.md](docs/task-setups.md): how the setup should change for debugging, research, and decisions
- [docs/repo-structure.md](docs/repo-structure.md): sample repo layout and why it matters
- [docs/product.md](docs/product.md), [docs/architecture.md](docs/architecture.md), [docs/operations.md](docs/operations.md): example context for the `WorkspaceHub` sample app
- [docs/approval-policy.md](docs/approval-policy.md) and [docs/architecture-boundaries.md](docs/architecture-boundaries.md): examples of guardrails and structural boundaries
- [examples/](examples/) and [tests/](tests/): small examples that make validation, approval, and task-specific setups visible
- [content-agent-loop](content-agent-loop): an autonomous content loop built on the same principles
- [demo/](demo/): dashboard, log, and script assets for showing feedback loops
