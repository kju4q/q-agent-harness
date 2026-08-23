# Maintaining Hot Memory

Hot memory is the only tier that is always loaded, so it is the only tier
where size is a real cost. Every stale rule you leave in place is a tax on
every request for as long as it sits there.

Left alone, this file grows in one direction. People add rules after a bad
run and nobody ever removes them. The fix is a scheduled review, not
discipline in the moment.

## The failure modes

**Stale.** The rule described how the system worked six months ago. The
agent now follows it into the wrong behavior.

**Redundant.** Two rules say the same thing in different words, or a rule
repeats something already stated in the Never section.

**Derivable.** The rule states something the agent could learn from one
grep. "The API routes live in `src/routes/`" is not worth permanent context.

**Too specific.** The rule only applies to one kind of task. That is a
procedure, and it belongs in `memory/procedural/` where it loads on demand.

**Unenforceable.** "Write clean code" gives the agent nothing to act on.
Either make it concrete or cut it.

## The review

Once a month, run the cleanup prompt below, then act on what it flags. Do
not accept the removals blindly. The agent can only see what is in the file,
not why you added it.

### Cleanup prompt

Paste this into your agent with the hot memory file open:

> Review my hot memory file. Flag anything stale, redundant, or derivable
> from the codebase itself, and propose removals with reasons.

For each flagged rule, pick one:

- **Remove.** It is no longer true, or it was never load-bearing.
- **Demote.** It matters, but only for certain tasks. Move it to a procedure in `memory/procedural/`.
- **Move to semantic.** It is background rather than instruction. Move it to `memory/semantic/`.
- **Keep.** It is still doing work. Leave it and note the review date.

## Size check

If the file is over 2,000 tokens, you are not looking for stale rules any
more, you are choosing what to cut. Rough conversions:

- 2,000 tokens is roughly 1,500 words, or about 250 lines of prose
- `wc -w memory/hot/example-hot-memory.md` gets you close enough

When you have to cut and everything looks useful, cut in this order:
derivable first, then task-specific, then the oldest rule that has not
prevented a real mistake.

## When to add a rule

Add a rule when the agent has made the same mistake twice and the fix is a
single sentence. Once is noise. Twice is a pattern.

If the fix takes more than a sentence, it is a procedure, not a hot rule.

Where repeating lessons come from and how they get promoted is covered in
`COMPACTION.md` at the repo root.
