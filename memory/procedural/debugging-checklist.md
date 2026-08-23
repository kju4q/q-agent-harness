# Procedure: Debugging Checklist

**Version:** v1.0
**Last validated:** 2026-08-23

## When to use

Use this when something is broken and you do not yet know why.

Stop using it the moment you know the cause. From that point you are
implementing a fix, which is a different procedure.

The failure this exists to prevent: changing code before you can reproduce
the problem. A fix applied to a bug you cannot reproduce cannot be
confirmed, and half the time it fixes nothing while appearing to work.

## Steps

1. **Reproduce it before touching anything.** Get to a command or a sequence
   of clicks that fails reliably. If it fails intermittently, run it enough
   times to learn the rate. "Fails about one time in five" is a fact worth
   having.

2. **If you cannot reproduce it, gather instead of guessing.** Exact error
   text, timestamp, environment, the user or account it happened to, and what
   changed recently. Stop here and go get more information rather than
   proceeding on a theory.

3. **Write down what you expected and what happened.** Two lines. This forces
   the vague sense that something is wrong into a specific claim, and
   sometimes the claim turns out to be the bug.

4. **Check what changed.** `git log` since the last known good state. Recent
   deploys, config changes, dependency bumps, upstream provider incidents.
   Most bugs are recent changes, and this step is cheap.

5. **Bisect the surface, not the code.** Narrow down where the failure lives
   before reading any implementation. Is it the request or the response? The
   read or the write? Before the queue or after? Each answer halves the search
   space and costs one experiment.

6. **Form one hypothesis and state how it would be falsified.** Write it as
   "if X is the cause, then Y must be true". Then check Y. A hypothesis you
   cannot disprove is not a hypothesis, it is a hunch.

7. **Test one thing at a time.** Change one variable, observe, revert. Two
   changes at once and you no longer know which one moved the result.

8. **When a hypothesis fails, write down what it ruled out.** Failed
   hypotheses are the actual progress. Without a record you will re-test the
   same theory an hour later.

9. **Measure before optimizing anything.** If the symptom is slowness, profile
   it. The slow part is regularly not the part that looks slow.

10. **Confirm the cause by making the bug appear and disappear on demand.** You
    understand it when you can switch it on and off. Anything less and you are
    guessing about a correlation.

11. **Write a failing test, then fix it.** The test must fail against the
    unfixed code. A test written after the fix, that has never been seen to
    fail, proves nothing.

12. **Log it in `memory/episodic/`.** Task, approach including what you tried
    first, result including attempt count, and the lesson. The abandoned
    approaches are the valuable part.

## What done looks like

- The bug can be reproduced on demand and switched off by the fix.
- A test exists that failed before the fix and passes after.
- The cause is named specifically. "A race between the webhook handler and the invoice write" and not "a timing issue".
- Failed hypotheses are written down.
- An episodic entry exists, including the approaches that did not work.

If you cannot explain why the bug happened, you have suppressed a symptom
rather than fixed a cause. Say so plainly rather than closing the ticket.
