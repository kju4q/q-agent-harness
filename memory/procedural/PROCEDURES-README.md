# Procedural Memory (Tier 4)

Procedures are the how-to layer. Hot memory says what the rules are.
Semantic memory says how the system works. Procedural memory says what to
do, step by step, for a specific kind of task.

This is the tier where an agent stops improvising a workflow every time and
starts running one that has already been proven to work.

## What makes a procedure

A procedure is not notes. It has four parts, and the four parts are what
make it reusable:

**A version and a validation date.** `v1.0, last validated: 2026-08-23`.
Procedures rot. The date tells you whether these steps have been run
against the current system or against the one from a year ago. Bump the
version when the steps change, and update the date every time you actually
follow the procedure end to end and it worked.

**When to use.** Including when not to use. A procedure applied to the
wrong task is worse than no procedure, because it looks authoritative. The
"do not use this for" line is doing real work.

**Steps.** Ordered, specific, and written so someone can follow them
without knowing why. Save the reasoning for a sentence under the step that
needs it. Steps that say "carefully consider" are not steps.

**What done looks like.** Observable conditions, not a feeling. "A test
exists that failed before the fix" is checkable. "The code is clean" is
not. Without this section a procedure has no ending, and an agent will
either stop early or keep going.

## Procedures in this folder

- [`legacy-code-review.md`](legacy-code-review.md): understanding unfamiliar code before changing it
- [`requirements-to-tasks.md`](requirements-to-tasks.md): turning a vague request into independently verifiable tasks
- [`debugging-checklist.md`](debugging-checklist.md): finding a cause instead of suppressing a symptom
- [`feature-implementation.md`](feature-implementation.md): building one task from a broken-down list

## Skills are procedural memory

If you use Claude Code skills, you are already writing this tier. A skill
is a procedure the agent loads on demand when the task matches, which is
exactly what a Tier 4 file is. The format differs, the function does not.

The same is true of slash commands, saved prompts, and the runbook someone
on your team keeps in a personal note. All procedural memory, just stored
in places where it cannot be versioned or reviewed.

A worked example of procedures written as skills:
[github.com/kju4q/q-claude-skills](https://github.com/kju4q/q-claude-skills).

The advantage of keeping them in the repo as files: they get reviewed in
pull requests, they have history, and a procedure that stops working can be
traced to the change that broke it.

## Where procedures come from

You do not write these up front. You write them when a lesson in
`memory/episodic/` has appeared three times and the fix is longer than one
sentence.

One occurrence is noise. Two is a pattern. Three means you are going to
keep paying for it, and it is time to write the steps down.

The promotion path from episodic lessons to procedures is in
[`COMPACTION.md`](../../COMPACTION.md) at the repo root.

## Keeping them honest

A procedure nobody follows is worse than nothing, because it makes the
system look more rigorous than it is.

Every time you follow one end to end, update the validation date. If you
skipped a step because it no longer applies, edit the procedure and bump
the version. If you find yourself skipping the same step every time, delete
it.

If a procedure has not been validated in six months, either run it or
archive it.
