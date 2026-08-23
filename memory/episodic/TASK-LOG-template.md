# Task Log (Tier 2)

Episodic memory. One entry per completed task. This is the record of what
you actually tried, not what you meant to try.

Loaded on demand, not always. It can grow.

## Why keep it

A single entry is worth little. The value shows up when the same lesson
appears three times. That repetition is the signal that something should be
promoted to a procedure (Tier 4) or a hot rule (Tier 1). See
`COMPACTION.md` at the repo root.

Write the entry when the task ends, while you still remember what went
wrong. An entry written a week later is a summary of the commit message,
which you already have.

## Entry format

Five fields. Nothing else. The date is generated for you.

```
date: <YYYY-MM-DD, filled in automatically>
task: <what you set out to do, one line>
approach: <what you actually did, including anything you tried first and abandoned>
result: <what happened, including failures and how many attempts it took>
lesson: <what you would tell someone starting the same task tomorrow>
```

Rules for filling it in:

- **date** is never typed by hand. `scripts/log-task` generates it.
- **task** is the goal, not the ticket number. "Fix the login timeout bug" beats "PROJ-4412".
- **approach** should mention the thing that did not work. That is usually where the lesson lives.
- **result** should be honest about attempt count. "Worked on the third try" carries information that "worked" does not.
- **lesson** must be transferable. If it only applies to this one file, it is not a lesson, it is a comment. Leave it blank rather than padding it.

An entry with a blank lesson is fine and common. Most tasks teach nothing.

---

## Entries

Oldest first. New entries are appended at the end.

Use `scripts/log-task` rather than writing these by hand. It creates this
file from the template on first use, stamps the date, and keeps the field
order consistent.

```
log-task --task "..." --approach "..." --result "..." --lesson "..."
```

Run it with no flags to be prompted for each field.
