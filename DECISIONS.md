# Decisions

Choices I made while building `starter/` on 2026-11-11, so you can check each one.

1. **Comment blocks are HTML comments.** Each file opens with `<!-- -->` so the note is hidden when the file renders on GitHub but the agent still reads it in the raw file. The `--` there is comment syntax, not prose.
2. **Example lines sit inside comments.** In `me.md`, `feedback.md` and the `Project` section of `CLAUDE.md`, the examples are commented out so the agent never treats them as facts about you. The sections look empty when rendered.
3. **The feedback example lives in the header.** You asked for one example entry and also for `feedback.md` to start empty, so the example is part of the format note and the `Entries` section has nothing in it.
4. **The rules and checks in `rules.md` and `verify.md` are live, not commented.** They are the defaults you listed, so they work from the first session. Each file ends with an empty section for project specific lines.
5. **"Five files" means `CLAUDE.md`, `me.md`, `feedback.md`, `rules.md` and `verify.md`.** `AGENTS.md` is a one line pointer and `README.md` is for the human, so neither is counted.
6. **`CLAUDE.md` links the other files with relative Markdown links.** They resolve inside `starter/` and keep resolving once the files are copied into a project root, and the CI link check covers them.
7. **`CLAUDE.md` has an empty `Project` section** with one commented example, because a project needs somewhere to say what it is. It is 27 lines, under the 40 line limit.
8. **The decisions rule writes to `DECISIONS.md` at the project root,** not inside `starter/`, since the files are meant to be copied to the root.
9. **The rules are split into sentences where one line held two.** "Never edit files outside the page or module you were asked to build. Duplicate instead and say so." matches the line used in the rerun in `docs/three-harnesses.md`.
10. **`verify.md` is a numbered list** because the checks run in order and the report needs all three results.
11. **The starter README has exactly the five steps and your required line,** nothing else. The `AGENTS.md` explanation went into `docs/three-harnesses.md` instead.
12. **The main README link points at `starter/README.md`,** not the bare folder, so the CI link check resolves it as a file.
13. **The claim that Codex and Hermes read `AGENTS.md`** rests on the runs documented in `docs/three-harnesses.md`, where each tool got its one line rule through that file. I did not check it against outside docs.
14. **This file is at the repo root** as you asked. It is the only file outside `starter/`, `README.md` and `docs/three-harnesses.md` that I added or changed.
