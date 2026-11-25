# Three habits for when Claude Code feels expensive and sloppy at the same time

None of these are features. They are decisions about what the model spends your tokens on.

## 1. A script instead of forty edits

When one change touches many files, each edit is its own round of reading, thinking and writing. Forty files means forty rounds. And every round is another chance to get one file slightly wrong.

So I ask for one script instead. I read it, I run it, and I keep it. This is the exact prompt I use:

```
Don't edit the files one by one. Write me one script that does it, show me the script, and wait for my ok before running it.
```

Before I say ok, I check two things. The script needs a dry run mode that prints every change without writing anything. And it has to check git status first and refuse to run if there are uncommitted changes, so git can always take me back to where I started.

```bash
if [ -n "$(git status --porcelain)" ]; then
  echo "Uncommitted changes. Commit or stash first." >&2
  exit 1
fi
```

```
./script.sh --dry-run
```

## 2. Haiku for the boring stretch

Not every task needs the big model. Commit messages, renames, docs, and tests written from a spec go to Haiku. Decisions, debugging, and anything that touches data stay on Opus.

The switch is one command:

```
/model haiku
```

And back up:

```
/model opus
```

The rule is simple. Switch down for the chore, and switch back up before the next real decision, in the same session.

One catch I found in [the docs](https://code.claude.com/docs/en/commands). `/model` with a name also saves it as your default for new sessions. If you only want it for this session, run `/model` with no argument and press `s` on the row you want.

Here is what the switch is worth. Prices from [the Claude pricing page](https://platform.claude.com/docs/en/about-claude/pricing), checked on 25 Nov 2026, per million tokens:

| Model | Input | Output |
|---|---|---|
| Opus 5.5 | $4 | $20 |
| Haiku 5.5, prompts up to 100k tokens | $0.10 | $0.50 |
| Haiku 5.5, prompts over 100k tokens | $0.50 | $2.50 |

Haiku is 40x cheaper than Opus while the session is under 100k tokens. Past that, Haiku's price goes up 5x and it's 8x cheaper. Still a real saving, but another reason to keep sessions short.

## 3. Clear instead of arguing

After two failed fixes, the context is full of wrong attempts. Every new answer leans on them.

So I stop arguing. I run `/clear`, which starts a new conversation with empty context but keeps your CLAUDE.md. Then I restate the problem in two lines:

```
Problem: <what is broken, and how I can see it's broken>
Already tried: <what failed, and what that ruled out>
```

The second line is the one that matters. It keeps the lesson from the failed attempts and throws away the attempts themselves.

## Which one you need

High cost and right answers: habit 2. High cost and wrong answers: habit 3. One change across many files: habit 1.

Built by [@qendresahhoti](https://instagram.com/qendresahhoti), more at [github.com/kju4q](https://github.com/kju4q)
