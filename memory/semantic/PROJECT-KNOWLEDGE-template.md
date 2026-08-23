# Project Knowledge (Tier 3)

Semantic memory. What is true about this system and why.

This is the tier that answers "why is it built like this". Hot memory tells
the agent what to do. This tells it what it is working inside. Loaded when
a task touches the area, not on every request.

The test for whether something belongs here: could a new engineer figure it
out by reading the code in under ten minutes? If yes, leave it out. If it
would take them a week, or a conversation with someone who has since left,
write it down.

---

## System map

How the parts connect. Name each component, say what it owns, and say how
it talks to the others. Be specific about the mechanism, because the
mechanism is what constrains future changes.

- The payment service communicates with the inventory service through an event bus, not direct API calls.
- `<component>` owns `<data>`. Nothing else writes to it.
- `<component>` reads from `<component>` over `<protocol>`.

Say what is deliberately not connected, too. "The reporting database is a
read replica and no service writes to it" prevents a whole class of bad
suggestions.

## Data ownership

Which component is the source of truth for which data. Where the same
concept exists in two places, say which one wins and how they stay in sync.

## Business rules

Rules that come from the domain, not from the code. These are the ones an
agent cannot infer, because the code only shows the current implementation
and not the requirement behind it.

- `<rule>`, because `<domain reason>`.
- Edge case: `<case>` is handled as `<behavior>` because `<reason>`.

Include the rules that look wrong at first glance. Those are the ones
someone will try to "fix".

## Architectural decisions

One entry per decision that would otherwise get re-litigated. Each entry
needs the decision, the reason, and what it rules out.

### `<Decision>`

- **Decided:** `<what was chosen>`
- **Date:** `<when>`
- **Because:** `<the constraint or requirement that forced it>`
- **Rejected:** `<the obvious alternative, and why it lost>`
- **Consequence:** `<what this makes hard, so nobody is surprised later>`

The `Rejected` line matters most. Without it, the obvious alternative gets
proposed again every few months.

## Known problems

Things that are wrong and known to be wrong. Saying so stops an agent from
treating a workaround as a pattern to copy.

- `<problem>`. Workaround: `<what we do instead>`. Do not copy this pattern into new code.

## Glossary

Domain terms that do not mean what they usually mean.

- **`<term>`**: `<definition specific to this project>`

---

Review quarterly. Archive anything that describes a component that no
longer exists. See `COMPACTION.md` at the repo root.
