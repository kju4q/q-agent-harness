# Autonomous Content Loop

> **"The loop I designed so my agent runs without me"**

A production-ready agent loop that turns a single topic into a finished Twitter thread + Instagram Reel script with minimal human input.

## Why This Exists

Most people still manually prompt agents for every step.  
This loop flips the model: you design the system once, give it a goal, and it iterates until the output meets your standards.

## What the Loop Does

Given only a **topic**, the agent will autonomously:

1. Research the topic deeply
2. Create a content strategy (thread + Reel)
3. Write a full Twitter thread
4. Write a Reel script + caption
5. Self-critique the output
6. Refine until quality threshold is met
7. Output final assets ready to post

## How to Use

1. Copy the loop from `loop.md`
2. Paste it into Claude Code / Cursor / your agent environment
3. Give it a topic like: `"Build vs buy for AI tools in 2026"`
4. Let it run. Review only the final output.

## Structure

- `loop.md` — The full loop system prompt (copy this)
- `examples/` — Real examples of topics and outputs
- `workflow.md` — Explanation of the loop architecture

## Philosophy

This is **loop engineering**, not prompt engineering.  
You define the goal + success criteria once. The agent handles the iteration.

---

Built by [@kjut4q](https://x.com/kjut4q) • June 2026
