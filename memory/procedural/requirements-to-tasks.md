# Procedure: Requirements to Tasks

**Version:** v1.0
**Last validated:** 2026-08-23

## When to use

Use this when you have been handed something that describes an outcome but
not a change: a feature request, a paragraph from a stakeholder, a ticket
that says "users should be able to export their data".

Do not use this when the task is already a single concrete change. Breaking
down "fix this typo" wastes everyone's time.

The output is a task list where each item can be built and verified on its
own. The most common failure is a list that looks like a plan but hides an
unanswered question in item four.

## Steps

1. **Restate the requirement in one sentence, as an outcome.** "An agency can
   download all their invoices as a CSV." If you cannot write that sentence,
   you do not have a requirement yet, you have a topic. Go back and ask.

2. **List the questions the requirement does not answer.** Every requirement
   has them. Which invoices, all or filtered? What happens with 50,000 rows?
   Does this need auth beyond the normal session? Write them all down before
   answering any.

3. **Split the questions into blocking and non-blocking.** Blocking means
   different answers produce different architectures. Non-blocking means you
   can pick a sensible default and note it. Most questions are non-blocking
   once you look at them directly.

4. **Get the blocking questions answered before continuing.** Ask them
   together, in one message, with your recommended answer for each. A list of
   questions with recommendations gets answered. A list of bare questions sits
   for two days.

5. **Check `memory/semantic/` for rules that constrain the design.** This is
   where a requirement meets the business rules it did not know about.
   Invoice immutability, data ownership, and existing decisions all narrow the
   solution space before you write anything.

6. **Write the task list, working backward from verification.** For each task,
   write how you would prove it works first, then what to build. A task whose
   verification you cannot describe is too vague to start.

7. **Check each task against three tests.** Independently verifiable: it can be
   proven done without the other tasks being finished. Single-concern: it
   touches one layer or one behavior. Half-day sized: bigger than that and it
   is hiding a decision you have not made yet.

8. **Order by risk, not by layer.** Put the task that could invalidate the
   plan first. If the CSV export needs streaming to survive 50,000 rows, find
   that out on day one, not after the UI is built.

9. **Record the defaults you chose.** Every non-blocking question from step 3
   got an answer from you rather than from the stakeholder. Write those in the
   plan where a reviewer can see them and object.

## What done looks like

- One sentence stating the outcome, agreed with whoever asked.
- Zero unanswered blocking questions.
- Every task has a written verification step.
- No task is larger than about half a day.
- The riskiest task is first.
- The defaults you chose are written down and visible, not implied.

If the list has a task called "implement the feature", you are not done
splitting.
