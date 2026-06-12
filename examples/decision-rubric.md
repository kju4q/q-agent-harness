# Example: Decisions Need A Rubric

## Scenario

WorkspaceHub needs to choose the next feature to ship for workspace admins:

- approval inbox
- environment health timeline
- bulk member permissions editor

## Weak request

"Which feature should we build next?"

## Better request

"Score these three feature options using impact, implementation risk, speed to ship, and support burden. Recommend one and explain the main tradeoff."

## Rubric

| Criteria | Weight |
| --- | --- |
| impact on admins | 40% |
| speed to ship | 25% |
| implementation risk | 20% |
| support burden | 15% |

## Example scoring

| Option | Impact | Speed | Risk | Support burden | Notes |
| --- | --- | --- | --- | --- | --- |
| approval inbox | high | medium | medium | medium | aligns with existing approval policy |
| environment health timeline | medium | low | high | medium | strong demo value but heavier backend work |
| bulk member permissions editor | high | medium | high | high | valuable but easy to misuse |

## Good agent output

- uses the rubric instead of vibes
- makes tradeoffs explicit
- recommends one option for a reason
- names the biggest downside of the recommendation
