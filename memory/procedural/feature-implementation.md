# Procedure: Feature Implementation

**Version:** v1.0
**Last validated:** 2026-08-23

## When to use

Use this once you have a task list where each item is independently
verifiable, and you are building one of those items.

If you do not have that list yet, run `requirements-to-tasks.md` first.

This procedure assumes the decisions are made. If you find yourself making
an architectural choice halfway through, that is a signal the task was not
broken down far enough. Stop and go back.

## Steps

1. **Read the constraints before writing anything.** `memory/hot/` for the
   always and never rules. `memory/semantic/` for the business rules and
   decisions that touch this area. Ten minutes here regularly saves a day of
   the wrong design.

2. **Find the closest existing pattern in the codebase.** Something similar
   has almost certainly been built. Match it. A feature that looks like the
   code around it is reviewable. A feature with a novel structure needs its
   novelty justified.

3. **Write the test first.** From the verification step you already wrote in
   the task list. Run it. Watch it fail for the right reason, which means the
   assertion failed and not the import. A test that errors before it asserts
   is not yet a test.

4. **Write the smallest thing that passes.** Not the general version. Not the
   configurable version. The specific one. Generality added before a second
   caller exists is usually the wrong generality.

5. **Handle the boundary cases the domain requires, not every case you can
   imagine.** Empty input, the maximum size mentioned in the requirement, and
   whatever `memory/semantic/` says is a real edge case in this system. Skip
   the hypothetical ones.

6. **Validate at the boundary.** Anything crossing into your code from
   outside, whether an HTTP request, a queue payload, or a third-party
   response, gets validated where it arrives. Do not let an unvalidated shape
   travel inward.

7. **Run the full check suite, not just your test.** Your feature can pass in
   isolation and still break something two modules away. This is the step that
   catches the shared-database class of problem.

8. **Reread your own diff before asking for review.** Look for debug output,
   commented-out code, a variable name that made sense an hour ago, and any
   file you touched for reasons unrelated to this task.

9. **Split unrelated changes into separate commits.** If you fixed a typo and
   improved a helper while you were in there, those are their own commits. A
   revert should be able to undo the feature without undoing the cleanup.

10. **Update the docs that are now wrong.** If you changed a documented
    behavior, a command, or a schema, the doc is now a lie. Fix it in the same
    pull request.

11. **Log it in `memory/episodic/`** if anything surprised you. If the task
    went exactly as planned, the entry can have a blank lesson, or you can skip
    it. Not every task teaches something.

## What done looks like

- The test you wrote first fails against the pre-change code and passes now.
- The full check suite passes, not just the new test.
- The change follows an existing pattern, or the departure is explained in the pull request.
- All external input is validated where it enters.
- No unrelated changes in the feature commit.
- Docs describing changed behavior are updated in the same pull request.
- No debug output, no commented-out code.

Done means verified, not written. If you cannot point at the thing that
proves it works, it is not done.
