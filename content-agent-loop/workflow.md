# Loop Architecture Explanation

This is a **closed reasoning loop** designed for reliable content creation.

## Core Idea

Instead of prompting the model step-by-step, we give it:
- A clear goal
- Strict success criteria  
- A reviewer step (the most important part)
- Explicit stopping conditions

This is the difference between "prompt engineering" and "loop engineering".

## Why the Reviewer Step Matters

Most agents produce mediocre output because they review their own work.  
By forcing a separate critique phase with a high bar (8.5/10), quality improves dramatically.

## How to Run This

### Recommended Setup
- **Claude Code** or **Cursor** with Projects/Artifacts
- Use the `loop.md` as your system prompt
- Start a new conversation and paste the loop
- Give it a topic and say "Run the loop"

### Advanced Version
- Add persistent memory (save research memo to a file)
- Add a separate reviewer model
- Run on a schedule (cron or agent scheduler)

## Customization Tips

You can modify:
- Success criteria (make them stricter or add new ones)
- Number of iterations allowed
- Output format
- Tone guidelines

The more specific your success criteria, the better the loop performs.

## Common Failure Modes

- Agent skips the reviewer step → force it
- Output stays generic → strengthen success criteria
- Too many iterations → add better stopping rules

This structure has been battle-tested for content workflows in June 2026.
