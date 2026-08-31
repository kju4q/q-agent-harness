# The tiers in the wild: how real harnesses implement memory

The four tiers in this repo are a model. Hot memory for the rules the agent
always loads, episodic for what happened, semantic for how the system works,
procedural for how to do the task. It is a way of thinking about the problem,
not a standard anyone implements.

Real harnesses each build a different slice of it. None of the three below
ships four folders named after the tiers. What they do share is the harder
part: every one of them spends real effort deciding what to leave out.

That is the organizing idea. Serious harnesses converge on curation over
accumulation. The interesting engineering is not in what gets stored, it is
in what gets dropped, bounded, or rewritten.

Three examples follow, with what to steal from each.

## At a glance

| Harness | Core mechanism | Key steal | Maps to our tiers |
| --- | --- | --- | --- |
| Claude Code | One small `CLAUDE.md` as an index, plus background rewriting | Memory is an index, not an archive | Hot plus compaction |
| Hermes | Hard caps on `MEMORY.md` (around 2,200 chars) and `USER.md`, session search for everything else | Bounded memory is a feature | Hot plus episodic |
| Grok Bot | Persistent cloud machine that never resets | A system that never forgets because it never shuts down | Persistence dissolving the tiers |

The sections below expand each row.

## Claude Code

Memory centers on `CLAUDE.md`, loaded at session start.

The design choice worth noticing: it works as an index rather than a store.
`CLAUDE.md` can import other files, and those load only when they are needed.
The always-loaded file stays small because most of what it knows about lives
somewhere else, referenced rather than included.

Background consolidation processes rewrite and clean memory over time, so the
file does not only grow.

### How it maps

`CLAUDE.md` is hot memory. That is this repo's
[`memory/hot/`](memory/hot/), managed by [`scripts/hotmem`](scripts/hotmem).
The imports point toward semantic memory, this repo's
[`memory/semantic/`](memory/semantic/), loaded when the task touches that
area rather than on every request. Skills are procedural memory, this repo's
[`memory/procedural/`](memory/procedural/).

The background rewriting is compaction. Same job as
[`COMPACTION.md`](COMPACTION.md) and [`scripts/compact`](scripts/compact),
run automatically instead of monthly with your approval.

**Steal this:** memory is an index, not an archive. The always-loaded file
should mostly tell the agent where to look.

Source: [code.claude.com/docs/en/memory](https://code.claude.com/docs/en/memory)

## Hermes Agent (Nous Research)

Two bounded files are always in context, both injected into the system prompt
at session start:

- `MEMORY.md`, capped at around 2,200 characters, the agent's curated notes
- `USER.md`, around 1,375 characters, what it knows about the user

The cap is the design. When the file is full, the agent has to prune something
to add something. Curation is not a discipline it is asked to maintain, it is a
constraint it cannot route around.

Everything else lives in session search. All past conversations are stored in
SQLite with full-text search and recalled on demand, so the bounded files do
not have to carry history.

External memory providers, eight plugins, can run alongside the built-in files.
They never replace them. Background review can fork the agent after a turn to
save memories and skills.

### How it maps

`MEMORY.md` and `USER.md` are hot memory with a hard budget. This repo's
2,000 token budget and `hotmem check` are the same idea, enforced by a number
you can run rather than by a character limit in the harness itself.

Session search is episodic memory on demand: this repo's
[`memory/episodic/`](memory/episodic/), written by
[`scripts/log-task`](scripts/log-task). Same shape, a searchable record of
what happened that is not loaded until something needs it.

Saved skills are procedural, this repo's
[`memory/procedural/`](memory/procedural/).

**Steal this:** bounded memory is a feature. The limit is the curation. A
budget nobody enforces is a preference, and preferences lose to convenience.

Source: [hermes-agent.nousresearch.com/docs/user-guide/features/memory](https://hermes-agent.nousresearch.com/docs/user-guide/features/memory)

## Grok Bot (xAI)

A different answer to the same problem: persistence instead of memory files.

Bots run on a persistent cloud computer that does not reset between tasks.
State, files, and browser sessions survive. Nothing has to be written into a
curated file to still be there next time, because the machine never went away.

All of one user's bots share one cloud computer, so isolation is per user
rather than per bot, while each bot keeps its own memory, role, and context.

Launched in beta August 2026.

### How it maps

The persistent machine dissolves the boundary between hot and episodic memory.
There is no promotion step because there is no gap to promote across. State
simply persists instead of being summarized into files that reload later.

The closest analog here is an episodic archive that keeps every version,
[`memory/episodic/`](memory/episodic/) with nothing pruned. Persistence as
memory.

**Steal this:** sometimes the fix is not better memory files. It is a system
that never forgets because it never shuts down. Worth asking before you build
a promotion pipeline: could the state just stay where it is?

Source: [docs.x.ai/grok-bot/overview](https://docs.x.ai/grok-bot/overview)

## What they agree on

Three different architectures. One conclusion.

Claude Code keeps the always-loaded file small and rewrites it in the
background. Hermes puts a hard cap on it and makes the agent prune to add.
Grok Bot sidesteps the file entirely by never shutting the machine down. None
of them accumulates.

Memory that works is curated, not accumulated. Each of these systems spends
real effort on deciding what to forget, and that effort is the product, not
overhead on top of it.

This repo's version of that effort is [`COMPACTION.md`](COMPACTION.md) and
[`scripts/compact`](scripts/compact): lessons that repeat get promoted into
rules or procedures, stale rules get pruned, and you approve each move. It is
the manual version of what Claude Code does in the background and what Hermes
enforces with a character limit.

To build your own, start with the tiers in [`memory/`](memory/). Each folder
has a template and a filled example. The
[quickstart in the README](README.md#how-to-use-this-starter-kit) has the order
to do it in.
