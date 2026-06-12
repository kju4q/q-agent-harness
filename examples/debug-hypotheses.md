# Example: Debugging With Hypotheses

## Scenario

WorkspaceHub users report that staging environment deletion looks successful in the UI, but the environment remains active after refresh.

## Weak request

"The delete flow is broken. Fix it."

## Better request

"Investigate the staging environment delete flow. Form 3 hypotheses, check the logs, and rule them out one by one before proposing a fix."

## Hypotheses

| Hypothesis | Evidence to check | Result |
| --- | --- | --- |
| UI state updates optimistically before backend confirmation | compare UI event timing with deletion log entries | possible |
| deletion is blocked by approval policy and the UI hides that state | inspect policy logs and approval events | likely |
| backend deletes correctly but cached workspace state rehydrates the old environment | inspect refresh path and cache invalidation logs | possible |

## Useful evidence

- approval log for `environment.delete`
- environment deletion test results
- UI event sequence around delete confirmation
- backend response payload after approval

## Good agent output

- shows all three hypotheses
- points to the evidence used for each one
- explains why one hypothesis is strongest
- changes code only after the evidence narrows the field
