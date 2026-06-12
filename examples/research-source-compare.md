# Example: Research With Source Comparison

## Scenario

The team wants to know whether agent products should default to network-off execution for risky enterprise workflows.

## Weak request

"Research best practices for agent security."

## Better request

"Compare recent primary sources on agent security defaults. Bring back at least 3 credible sources, summarize where they agree, and call out any meaningful disagreement."

## What the agent should return

| Source | Main claim | Agreement with others | Open question |
| --- | --- | --- | --- |
| vendor documentation | risky actions need explicit boundaries and approvals | high | how strict should defaults be |
| security engineering post | network access should be narrow and inspectable | high | how to balance usability |
| enterprise implementation note | teams need visible execution logs and approval modes | medium | what users will tolerate in UX |

## Good agent output

- cites the exact sources used
- separates facts from interpretation
- does not hide disagreement behind a smooth summary
- notes what still needs human judgment
