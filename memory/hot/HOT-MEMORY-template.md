# Hot Memory (Tier 1)

Keep this file small. Target under 2,000 tokens.

This is the only memory tier that is always loaded. Every rule here costs
context on every single request, so it has to earn its place. If a rule is
only needed for one kind of task, it belongs in a procedure (Tier 4), not
here.

**In Claude Code, this file IS your `CLAUDE.md`.** Write it here, then copy
it to `CLAUDE.md` at your repo root, or keep `CLAUDE.md` as the live copy
and treat this template as the shape you fill in.

## What belongs in hot memory

- Rules the agent must apply without being reminded
- Facts that are true across the whole project
- Constraints that are expensive to discover by reading code

## What does not belong here

- Anything derivable from the codebase in one grep
- Task-specific steps (put those in `memory/procedural/`)
- Background on why a decision was made (put that in `memory/semantic/`)
- One-off notes from a single task (put those in `memory/episodic/`)

---

## Project

One or two lines. What this codebase is, and who uses it.

## Always

Rules the agent applies every time, with no exceptions.

- Always write tests before implementing new features.
- Always use the existing database schema instead of creating new tables.
- Always run the test suite before saying a change is done.

## Never

Hard boundaries. These are the actions that cause real damage.

- Never run migrations against production.
- Never commit directly to the main branch.
- Never add a dependency without checking whether the repo already has one that does the job.

## Commands

The three or four commands the agent needs most. Exact invocations, not descriptions.

- Install: `<command>`
- Test: `<command>`
- Lint: `<command>`
- Run locally: `<command>`

## Key facts

Things that are true about this system and slow to rediscover.

- The API and the worker share one database. Schema changes affect both.
- Auth tokens expire after 15 minutes. Any long-running job needs a refresh.

## Escalate

When to stop and ask instead of proceeding.

- Anything that deletes user data
- Anything that changes billing behavior
- Anything the rules above do not cover

---

Review this file monthly. See `MAINTENANCE.md` in this folder.
