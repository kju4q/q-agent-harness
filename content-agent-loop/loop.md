# Content Loop (Karpathy Style)

Simple generate → verify → fix loop using files for state.

## Core Idea

Keep the loop extremely simple:

1. Write a plan
2. Generate output
3. Verify it
4. Fix if needed
5. Repeat

All state lives in files so you can see exactly what happened.

## The Loop

### Step 1: Plan
Create a file called `plan.md` with:
- The topic
- 3-5 key points to cover
- Target format (thread vs reel)

### Step 2: Generate
Based on the plan, create the content in `draft.md`.

### Step 3: Verify
Open `draft.md` and check:
- Is it actually good?
- Does it pass basic rules? (no hallucinations, clear hook, proper length)
- Would you post this yourself?

If yes → done.  
If no → go to Step 4.

### Step 4: Fix
Edit `draft.md` directly based on what was wrong.  
Update `plan.md` if the direction was off.

### Step 5: Repeat
Go back to Step 3 (Verify) until the output is good.

## Rules

- Never do more than 5 iterations on the same draft.
- If it's still bad after 5 tries, rewrite the plan from scratch.
- Always keep the plan and draft as separate files.
- The human only looks at the final `draft.md`.

## Why This Works

- Extremely simple (you can understand the whole loop in 10 seconds)
- State is visible (just open the files)
- Fast feedback loop
- No complex scoring or multi-agent bullshit

Start with a topic. Create the plan. Then run the loop.