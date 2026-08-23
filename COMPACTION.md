# Compaction

Compaction is how information moves between memory tiers.

Without it you have four folders that only grow. The task log fills with
entries nobody rereads, hot memory fills with rules that stopped being true,
and the agent performs exactly as well in month six as it did in week one.

The tiers are storage. Compaction is the part that makes them a system.

## The direction things move

```
  episodic  ──────►  procedural      a lesson that repeats becomes steps
  episodic  ──────►  hot             a lesson that is one sentence becomes a rule
  episodic  ──────►  semantic        a discovery about the system becomes knowledge
  semantic  ──────►  archive         a note about a component that no longer exists
  hot       ──────►  procedural      a rule that only applies to one task type
  hot       ──────►  removed         a rule that is stale, redundant, or derivable
```

Most movement starts in episodic memory, because that is the only tier
written from experience rather than from intention.

## Episodic to procedural

The main path.

When the same lesson shows up in three separate task log entries, and the
fix takes more than one sentence to state, it is a procedure.

Three entries about profiling before optimizing, about checking existing
data before adding a constraint, and about reading architecture notes before
designing a schema change all point at the same thing: a missing
investigation step. That becomes a numbered step in
`memory/procedural/debugging-checklist.md` or a new procedure file.

Write it with the four required parts: version, when to use, steps, and
what done looks like. See
[`memory/procedural/PROCEDURES-README.md`](memory/procedural/PROCEDURES-README.md).

## Episodic to hot

The narrow path.

Same trigger, three repetitions, but the fix fits in one sentence and
applies to every task rather than one kind of task.

"Never log a full invoice payload" is a hot rule. "How to review legacy
code" is not, no matter how often it comes up, because it is nine steps
long and only applies when you are reading unfamiliar code.

Be strict here. Hot memory is loaded on every request, so every promotion
into it costs you on tasks that will never need it. When in doubt, it is a
procedure.

## Episodic to semantic

When a task teaches you something about how the system works rather than
about how to work, it belongs in `memory/semantic/`.

Finding out that Stripe webhooks arrive out of order is not a lesson about
your process. It is a fact about the system that anyone touching that area
needs. Move it to the business rules or known problems section.

## Semantic to archive

Semantic notes go stale quietly. Nothing fails, the description just stops
matching reality.

Archive a note when the component it describes no longer exists, or when a
decision has been reversed. Archive rather than delete, because the reason a
past decision was made is still useful when someone proposes it again.

Move it to a dated section at the bottom of the file, or to
`memory/semantic/archive/`, with the date and the reason it stopped being
true.

## Hot to procedural, or out

Hot memory is the only tier with a size budget, so it is the only one where
removal is forced rather than optional.

A hot rule leaves when it is stale, redundant with another rule, derivable
from one grep of the codebase, or specific to a single kind of task. The
first three get removed. The fourth gets demoted to a procedure.

The cleanup process and its prompt are in
[`memory/hot/MAINTENANCE.md`](memory/hot/MAINTENANCE.md).

## The manual promotion prompt

Run this against your task log whenever it has grown by ten entries or so:

> Read my episodic log, find lessons that repeat, and propose which should
> become procedures or hot-memory rules.

Then judge each proposal yourself. The agent can see repetition, which is
the hard part, but it cannot tell the difference between a lesson that
repeated three times because it matters and one that repeated because you
worked on the same subsystem three weeks running.

For each proposal, decide:

- **Procedure**, if the fix is a sequence of steps for one kind of task
- **Hot rule**, if the fix is one sentence that applies to everything
- **Semantic note**, if it is a fact about the system rather than about your process
- **Nothing**, if the repetition was an accident of what you happened to be working on

## The monthly review

Thirty minutes, once a month. The whole system depends on this actually
happening, which is why it is short.

**1. Prune hot memory.** Run the cleanup prompt from
[`memory/hot/MAINTENANCE.md`](memory/hot/MAINTENANCE.md). Remove, demote, or
keep each flagged rule. Check the file is still under 2,000 tokens. Update
the review date at the bottom.

**2. Archive stale semantic notes.** Read
[`memory/semantic/`](memory/semantic/) with one question: does this still
describe the system as it is today? Anything describing a component that no
longer exists gets archived with the date and reason.

**3. Promote repeating lessons.** Run the manual promotion prompt above
against [`memory/episodic/`](memory/episodic/). Write at most one new
procedure per month. More than that and you are writing procedures nobody
will follow.

**4. Validate one procedure.** Pick the one with the oldest validation date,
follow it on a real task, and either update the date or fix the steps and
bump the version. A procedure that has not been run in six months is a
guess.

## Why this is the part that matters

An agent with memory but no compaction has a filing cabinet. It accumulates,
it does not improve.

The improvement comes from the movement. A mistake happens once and lands in
the task log. It happens twice and it is a pattern. It happens a third time
and it becomes a procedure, and from then on the agent runs the steps that
prevent it instead of rediscovering the problem.

That is the difference between an agent that has been running for six months
and one that has been running for six months and learned something. Without
compaction those are the same agent.

## Coming in a later phase

A compact script in `scripts/` will automate the promotion step: read the
task log, cluster lessons by similarity, and surface the repeating ones as
candidates with a suggested target tier.

It will propose, not promote. The judgment about whether a repetition is
signal or an accident of your recent work stays with you. The script only
removes the part that is genuinely mechanical, which is noticing that three
entries months apart are saying the same thing.
