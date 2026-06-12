# Task-Specific Agent Setups

The same model can behave very differently depending on the job.

This is why a single generic agent workflow usually underperforms:

- debugging fails when the agent locks onto the first explanation
- research fails when the agent repeats plausible but weak claims
- decision support fails when the agent has no criteria for what "best" means

The fix is not only a better prompt. It is a better task setup.

## 1. Debugging setup

Use this when the agent needs to figure out what is wrong before it changes anything.

### What to give the agent

- a concrete bug report
- logs or traces
- at least one reproducible path
- known constraints or recent changes

### What to ask for

- three plausible hypotheses
- evidence for and against each one
- the smallest check that would rule each hypothesis in or out
- a final recommendation only after the checks complete

### Why this works

Without this structure, the agent often turns the first plausible guess into a fix. That creates noisy diffs, weak reasoning, and longer loops.

See `examples/debug-hypotheses.md`.

## 2. Research setup

Use this when the agent needs to determine what is true, current, or well-supported.

### What to give the agent

- the exact question
- source-quality expectations
- recency requirements
- any domains or sources to prioritize or avoid

### What to ask for

- multiple sources
- a short comparison of where they agree
- a note on where they disagree or remain uncertain
- a clear separation between observed facts and inference

### Why this works

Without source comparison, the agent can produce confident summaries that flatten disagreements or repeat a single weak source.

See `examples/research-source-compare.md`.

## 3. Decision setup

Use this when the agent needs to compare options rather than retrieve facts.

### What to give the agent

- the decision to make
- the available options
- the criteria that matter
- any non-negotiable constraints

### What to ask for

- a rubric
- tradeoffs by option
- a recommendation tied to the rubric
- the biggest risk of the recommended option

### Why this works

Without explicit criteria, the agent tends to optimize for whatever sounds impressive instead of what matches the actual business goal.

See `examples/decision-rubric.md`.

## Minimal pattern

If you remember one thing, use this:

- debugging needs hypotheses
- research needs sources
- decisions need criteria

That is the setup change, not just the prompt change.
