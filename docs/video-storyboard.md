# Harness Engineering Video Storyboard

Use this storyboard to record a short-form video around the script:

> Software engineering is turning into harness engineering.

The structure below is designed for a video under 60 seconds.

## Production rule

Every line of the voiceover should be matched with one clear visual proof.

Do not talk over random code. Show the exact thing the sentence is about.

## Timeline

### 0:00 - 0:04

Voice:

`Software engineering is turning into harness engineering.`

Show:

- clean editor or terminal with a blinking cursor
- big on-screen text: `Harness Engineering`

Goal:

Open with a strong concept, not a busy screen.

### 0:04 - 0:10

Voice:

`So what is harness engineering?`

`It’s the work of building the environment an AI agent needs to write, test, fix, and ship software reliably.`

Show:

- repo root in Finder or editor
- highlight [README.md](/Users/qendresahoti/Downloads/q-agent-harness/README.md)
- scroll briefly over the section that explains the three-part framework

Goal:

Make the idea feel like a system, not just a phrase.

### 0:10 - 0:18

Voice:

`And really, it comes down to three things: a map, guardrails, and feedback loops.`

Show:

- a simple 3-card slide or text layout:
  - `Map`
  - `Guardrails`
  - `Feedback Loops`

Goal:

Introduce the framework early so people know where the video is going.

### 0:18 - 0:26

Voice:

`OpenAI described building a product with zero manually written code.`

`Not because engineers disappeared, but because their job changed.`

Show:

- article headline screenshot
- quick cut to a repo view with lots of files
- then quick cut back to your own repo structure in [docs/repo-structure.md](/Users/qendresahoti/Downloads/q-agent-harness/docs/repo-structure.md)

Goal:

Use the article as proof, then move back into your own framework quickly.

### 0:26 - 0:34

Voice:

`The new job is not just writing functions.`

`It’s building the system the agent can work inside.`

Show:

- [AGENTS.md](/Users/qendresahoti/Downloads/q-agent-harness/AGENTS.md)
- [docs/architecture.md](/Users/qendresahoti/Downloads/q-agent-harness/docs/architecture.md)
- [docs/operations.md](/Users/qendresahoti/Downloads/q-agent-harness/docs/operations.md)

Goal:

Show that the "system" is made of repository artifacts and operating rules.

### 0:34 - 0:41

Voice:

`First, a map.`

`Your docs, repo structure, and architecture need to explain the system clearly, so the agent can find the right knowledge instead of guessing.`

Show:

- [docs/repo-structure.md](/Users/qendresahoti/Downloads/q-agent-harness/docs/repo-structure.md)
- [docs/product.md](/Users/qendresahoti/Downloads/q-agent-harness/docs/product.md)
- [docs/architecture.md](/Users/qendresahoti/Downloads/q-agent-harness/docs/architecture.md)

Goal:

Show structured knowledge, not just files existing.

### 0:41 - 0:49

Voice:

`Second, guardrails.`

`Not just linting and schema validation, but also tool permissions, approval points, and clear boundaries.`

`Don’t ask the agent to be careful.`

`Build a setup where bad moves are harder to make in the first place.`

Show:

- [docs/starter-checklist.md](/Users/qendresahoti/Downloads/q-agent-harness/docs/starter-checklist.md) on the guardrails section
- optional terminal clip with lint or test output
- optional code editor showing a validation schema or CI config from one of your real repos

Goal:

Make guardrails look like engineering, not vibes.

### 0:49 - 0:57

Voice:

`Third, feedback loops.`

`Tests, UI checks, logs, metrics, traces.`

`The agent needs to see what changed, what broke, and whether the fix actually worked.`

Show:

- [docs/starter-checklist.md](/Users/qendresahoti/Downloads/q-agent-harness/docs/starter-checklist.md) on the feedback loops section
- test runner
- app UI
- logs or charts if you have them

Goal:

This should be the most dynamic section. Use quick cuts.

### 0:57 - 1:00

Voice:

`So the job isn’t disappearing.`

`It’s becoming more about building the environment where good software can actually happen.`

Show:

- return to the 3-card layout
- end with the words:
  - `Map`
  - `Guardrails`
  - `Feedback Loops`

Goal:

Close with a clean summary image.

## Best screens to capture

Minimum set:

1. Article headline screenshot
2. Repo root
3. `README.md`
4. `AGENTS.md`
5. `docs/repo-structure.md`
6. `docs/starter-checklist.md`
7. One test run
8. One app UI or terminal/log clip
9. Final 3-card summary screen

## Editing notes

- Keep clips short, usually 2 to 5 seconds.
- Zoom in on the exact text or section that matters.
- Use one accent color for text highlights.
- Do not leave one static screen up too long.
- Add captions for the 3 framework words even if you say them out loud.
