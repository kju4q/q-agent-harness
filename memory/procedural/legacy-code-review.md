# Procedure: Legacy Code Review

**Version:** v1.0
**Last validated:** 2026-08-23

## When to use

Use this when you need to understand code that nobody on the team wrote,
before changing it. Specifically:

- The code has no tests, or tests that do not describe intent
- The original author is gone or does not remember
- You have been asked to "just add one small thing" to a file over 500 lines
- A bug report points into code you have never opened

Do not use this for reviewing a teammate's pull request. That is a
different job with a different goal.

The purpose here is not to judge the code. It is to build enough of a model
that your change does not break something invisible.

## Steps

1. **Find the boundaries before reading the middle.** List what calls into this
   code and what it calls out to. Grep for the module name and the exported
   function names across the repo. You are looking for the blast radius, not
   the logic.

2. **Read the tests first, if any exist.** Tests are the only part of legacy
   code that states intent rather than implementation. If there are no tests,
   note that. It changes how much you can safely assume.

3. **Read the git history for the file, not the file.** `git log --follow -p`
   on the specific file. Commit messages and the shape of past changes tell
   you which parts are volatile and which have been stable for years. Stable
   code that nobody touches is usually load-bearing.

4. **Identify the weird parts and write them down without fixing them.** Every
   legacy file has code that looks wrong. Some of it is wrong. Some of it is a
   bug fix whose reason was never written down. List each one with a question
   mark next to it. Do not clean any of it up yet.

5. **Resolve the weird parts against history and docs.** For each item on that
   list, run `git log -S '<the odd line>'` to find the commit that introduced
   it. Read that commit message. Check `memory/semantic/` for a matching
   business rule. Usually two or three turn out to be deliberate.

6. **Write down what you learned before you change anything.** Add the
   confirmed findings to `memory/semantic/`, especially anything in the
   "Known problems" or "Business rules" sections. This is the step people
   skip, and it is the reason the next person repeats this whole procedure.

7. **Characterize the current behavior with a test.** Write a test that passes
   against the code as it is today, including the behavior you think is wrong.
   You are not testing correctness, you are pinning down current behavior so
   you can tell whether your change moved something you did not intend to move.

8. **Now make the change.** Small, and separate from any cleanup. Cleanup goes
   in its own commit so a revert does not undo both.

## What done looks like

- You can name every caller of the code you are about to change.
- Every item on your "looks wrong" list is resolved into either "deliberate, here is why" or "actually wrong, filed separately".
- At least one characterization test passes against the unmodified code.
- `memory/semantic/` has a new entry that would let the next person skip steps 3 through 5.
- Your behavior change and any cleanup are in separate commits.

You are not done because you understand the file. You are done when the
understanding is written somewhere other than your head.
