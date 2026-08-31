# Verification loops: how a harness checks its own work

In 2026, reliability is less about the model and more about the harness
around it. Newer models bake self-critique into their reasoning, which means
self-evaluation now happens inside the agent, using the same model that
produced the work. Verification has to come from outside the model to be
worth anything.

Four loops follow, ordered from weakest to strongest.

## At a glance

| Loop | What it is | Strength | Where I use it |
| --- | --- | --- | --- |
| Self-critique | The agent reviews its own output against the goal before proceeding | Weakest, same model checks itself | The critique gate at the bottom of a taste file ([taste-starter](https://github.com/kju4q/taste-starter)) |
| Tests | The agent runs tests and proceeds only when they pass | Strong, deterministic | Every script in [`scripts/`](scripts/) was run end to end before it was committed |
| Golden examples | The agent compares output against known-good references | Strong, the reference never drifts | The [lookout fixtures](https://github.com/kju4q/ai-weekend-builds/tree/main/vol-4/03-lookout): baseline, real change, noise |
| External review | A separate agent evaluates the work before acceptance | Strongest for judgment, different context, no stake | The verify-and-review prompt that ends every project in [ai-weekend-builds vol-4](https://github.com/kju4q/ai-weekend-builds/tree/main/vol-4) |

## 1. Self-critique

The agent reviews its own output against the goal before moving on.

**When to use it.** As the first pass on anything with rules that are easy to
state and easy to violate: tone, format, banned constructions, house style.
It is cheap, it runs on every output, and it catches the obvious misses before
they reach you.

**Its honest limit.** The same model that wrote the work is grading it. It
shares every blind spot with the thing it is checking, so a mistake the model
cannot see while writing is a mistake it cannot see while reviewing. Newer
models already do this internally as part of reasoning, which makes an
explicit critique step less additive than it used to be. Treat it as a first
draft of doubt, not a gate.

```
Before presenting any output, review it against every rule in this file. If it violates a rule, fix it before showing me. If unsure whether something violates a rule, flag it and ask.
```

Used as the critique gate at the bottom of a taste file. See
[taste-starter](https://github.com/kju4q/taste-starter).

## 2. Tests

The agent runs tests and proceeds only when they pass.

**When to use it.** Any time correctness is checkable by a machine. This is
the loop that turns "it should work" into a fact, and it is the cheapest
verification you will ever add relative to what it catches.

**Its honest limit.** Tests only check what they cover. A green suite says the
assertions passed, not that the change is right, and a test written after the
fix has never been seen to fail. The failure mode specific to agents is worse
than the usual one: an agent can report a command as working without having
run it. The prompt below exists because of that.

```
Run every documented command for real before committing. Show the actual output. If anything fails, fix it before committing. Do not claim a command works unless you ran it.
```

Every script in [`scripts/`](scripts/) was run end to end before it was
committed.

## 3. Golden examples

The agent compares output against known-good references.

**When to use it.** When correctness is a judgment call that a test cannot
express, but you can point at examples of right and wrong. Detection and
classification work fits this well: keep a case that should trigger, a case
that should not, and a case that looks like it should but should not.

**Its honest limit.** The references cover the cases you thought of. Anything
outside them passes silently. The strength is that a reference does not drift:
unlike a model's sense of what good looks like, a fixture is the same next
month as it was today.

```
Before the check ships, it must classify all reference cases correctly: the baseline (no change), the real change (detected and reported), and the noise case (ignored or flagged as noise). Show the run against each reference.
```

This is the shape of the lookout fixtures: baseline, real change, noise. See
[03-lookout](https://github.com/kju4q/ai-weekend-builds/tree/main/vol-4/03-lookout).

## 4. External review

A separate agent evaluates the work before acceptance.

**When to use it.** At the end, on anything where the question is judgment
rather than pass or fail. Does the documentation match the code, would a new
contributor get stuck, is anything committed that should not be.

**Its honest limit.** It costs a full second pass, and a reviewer with no
context can flag things that are deliberate. That same lack of context is the
point: a different context and no stake in the work is what makes the review
worth having. Scope it to confirmed problems so it reports findings rather
than opinions.

```
Follow the README from a clean environment. Run the documented commands. Compare every claim in the documentation against what the code actually does. Check that secrets and generated files are ignored by git. Fix only confirmed problems. Report what could not be tested.
```

This is the verify-and-review prompt that ends every project in
[ai-weekend-builds vol-4](https://github.com/kju4q/ai-weekend-builds/tree/main/vol-4).

## The order of trust

People usually start with self-critique, because it is one prompt and it goes
at the bottom of a file you already have.

Working harnesses put it last. Tests and golden examples are the gate, because
they are deterministic and they do not share the model's blind spots. External
review is the judge, because it brings a different context and has no stake in
the work. Self-critique is the first draft of doubt: useful for catching the
obvious, never the thing you rely on.

Two rules follow from that ordering. Natural-language critiques should
interpret the outputs of deterministic checks rather than replace them. And a
loop should stop when the required checks pass, not when the model feels
confident.

See the May 2026 survey [Code as Agent Harness](https://arxiv.org/abs/2605.18747).

## Where this fits

The memory tiers make a harness that remembers. That is
[`memory/`](memory/) and, for how other systems build the same thing,
[HARNESSES.md](HARNESSES.md).

Verification makes a harness that knows when it is wrong. A harness with
memory and no verification gets more confident over time without getting more
correct.

The working example in this repo is [`scripts/`](scripts/). Every command in
those three scripts was run for real before the commit, including the failure
paths, and two bugs turned up that way that reading the code did not catch.
