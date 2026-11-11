# Three harnesses, one task

Same design file (`design/reference/resources.html`), same prompt, same starting commit (`e163859`), each tool in its own git worktree.
Claude Code ran Opus 5.5, Hermes ran Opus 5.5 through the Anthropic API, and Codex ran its default model, `gpt-6-astra`.
This follows the HuggingFace result in [the 3 upgrades](three-upgrades.md): one model in four coding tools solved 62 percent of its tasks in one and 33 percent in another.

## The prompt

```
Build the /resources page of this site from the design reference at design/reference/resources.html.

Context you must read first: design/README.md and design/tokens.json (the design system), design/reference/home.html (the already built home page, for structure and shared components), and the existing /resources route if there is one.

What the page is: a library of free resources. Header "The library", filters by the four moments (Know yourself, Think, Build, Check) and by type (doc, gist, repo), a grid of cards where each card shows the keyword chip in its moment color, the title, one line of description, and the link. An empty state with the cloud illustration when a filter has no results. Footer stays at the bottom of the viewport on short pages. Light and dark theme both, using the existing theme toggle and tokens.

Data comes from a resources.json file you create with these entries, titles and descriptions in plain words, one line each:
- Know yourself, BRAIN, gist: the open intelligence folder, five files every agent reads, https://gist.github.com/kju4q/f411eb225f672b3962aec5454b580d78
- Think, THINK, repo: five Claude thinking chains for 2026, https://github.com/kju4q/q-claude-skills/blob/main/skills/thinking/techniques-2026.md
- Think, FIRST, gist: make the agent ask what you'd choose before it recommends, https://gist.github.com/kju4q/c6f2ddb657b8513dc0c68f87ae81d5f0
- Build, HARNESS, doc: three harness upgrades, https://github.com/kju4q/q-agent-harness/blob/main/docs/three-upgrades.md
- Build, REPO, gist: the running list of repos from the five repos videos, https://gist.github.com/kju4q/ae02deb4b05032a6a58d0692bd908c85
- Build, SKILL, repo: write your own skill, https://github.com/kju4q/q-claude-skills/blob/main/docs/write-a-skill.md
- Check, LOOP, doc: the harness loop, propose, run, compare, keep, https://github.com/kju4q/q-agent-harness/blob/main/docs/harness-loop.md
- Check, ROTATE, gist: the key rotation checklist, https://gist.github.com/kju4q/f8bc4266d83c170b8c8b414f27865048

Rules: use the design tokens, do not invent colors or fonts. Reuse the nav, footer and card components from the home page instead of writing new ones. Do not touch any page other than /resources. Verify with the existing tests, tsc and a production build, and add a test that the page renders with the filters. Do not open a browser.

When done, tell me what you read before starting, what you changed, and what you verified.
```

## What each tool did

### Claude Code

**Read first:** `~/.claude/TASTE.md`, `package.json` and the list of tracked files. Then it searched every branch and worktree for the design reference, which hadn't been added yet. Once the file was there, it read `design/README.md`, `design/tokens.json`, `design/tokens.css`, both references, the Card, Tag and Nav specs, the root layout, `globals.css` and every file in `src/components/home/`.

**Asked:** three questions before writing any code. The reference file was missing, so should it wait for the file or build from the brief? The repo had no test runner, so should it add Vitest, Jest or nothing? Should it work in the main checkout or in the `site-claude` worktree? The answers were: wait for the file, Vitest, the worktree.

**Changed:**

- `src/content/resources.json`: the 8 entries.
- `src/components/resources/ResourceCard.tsx`: a new card component, plus the moment and type lists.
- `src/components/resources/Library.tsx`: the filters, the count, the grid and the empty state.
- `src/app/resources/layout.tsx`: wraps the route in the home page shell and loads `home-page.css`.
- `src/app/resources/page.tsx`: nav, header, library and footer.
- `src/app/resources/resources-page.css`: 78 lines of page styles.
- `public/cloud.svg`: a copy of the cloud sticker for the empty state.
- `vitest.config.mts`: the test config.
- `src/app/resources/page.test.tsx`: the test.
- `package.json`: a `test` script and 4 dev dependencies (Vitest 3.2.7, jsdom 26.1.0 and two Testing Library packages).
- `package-lock.json`: 2,274 changed lines from those 4 packages.

**Verified:** 3 of 3 tests pass. The test renders the page in jsdom, clicks the filter buttons and counts the cards that are left. The type check (`tsc`) and `npm run build` pass. It skipped lint because the repo has no ESLint config, and it didn't open a browser.

**Time:** 4m41s after the questions.

**Permission:** it ran in auto mode and never stopped for a permission prompt. Its only stop was the three questions.

### Codex

**Read first:** `design/README.md`, `design/tokens.json`, both references, a search for `AGENTS.md`, `package.json`, `tsconfig.json`, the home components and CSS, and the Card and Tag specs.

**Asked:** nothing.

**Changed:**

- `src/components/home/Card.tsx`: a new shared card, pulled out of the home feed.
- `src/components/home/Featured.tsx`: the home feed now uses `Card` (11 lines in, 17 out).
- `src/content/resources.json`: the 8 entries.
- `src/app/resources/page.tsx`: nav, header, library and footer. It loads `home-page.css` directly and has no layout file.
- `src/app/resources/resource-library.tsx`: the filters, the count, the grid and the empty state, with the cloud drawn as inline SVG.
- `src/app/resources/resources.css`: 88 lines of page styles.
- `src/app/resources/resources.test.cjs`: the test.

No new packages and no change to `package.json`.

**Verified:** 3 of 3 tests pass with Node's built-in test runner. The test compiles the TSX with the TypeScript package that was already installed, renders the page to static HTML and calls the filter function directly. Nothing gets clicked. There's no `npm test` script, so the test only runs if you point Node's test runner at `src/app/resources/resources.test.cjs` yourself. The type check (`tsc`), `npm run build` and git's whitespace check pass. It also ran a one-off script that rendered the home feed from the last commit and from the new code and checked that the HTML matched.

**Time:** 6m30s.

**Permission:** once, to run `npm run build` with network access after the sandbox blocked Google Fonts.

### Hermes

**Read first:** `design/README.md`, `design/tokens.json`, `git status` and the file list. Then both references, the home page and its components, `next.config.mjs`, the sticker README, the installed Node versions and the existing files in `src/lib/content/`.

**Asked:** nothing. It put five "decisions you should check" at the end of its report instead: card reuse, cloud or cat for the empty state, the keyword chip color, the type filter list and the titles it wrote.

**Changed:**

- `src/content/resources.json`: the 8 entries.
- `src/lib/content/resources.ts`: types, the moment and type lists, and the filter and count functions, kept free of Next so the test can import them.
- `src/components/resources/ResourceLibrary.tsx`: the filters, the count, the grid and the empty state. Each card is a plain `<a class="box rc">` written inline.
- `src/app/resources/layout.tsx`: wraps the route in the home page shell and loads `home-page.css`.
- `src/app/resources/page.tsx`: nav, header, library and footer.
- `src/app/resources/resources-page.css`: 75 lines of page styles.
- `tests/resources.test.mjs`: the test.
- `package.json`: a `test` script that runs Node's built-in test runner. No new packages.

**Verified:** The type check (`tsc`) and `npm run build` pass, and 3 of 3 tests pass. The tests check the data, the filter logic and the HTML that `next build` wrote to `.next`, so `npm test` fails unless you build first. The third test failed on its first run, and Hermes edited it twice before it passed. It needs Node 22.18 or newer, so it switched to Node 22.23.4 from nvm. Lint couldn't run, and it didn't open a browser.

**Time:** 5m11s.

**Permission:** twice, both for Python heredoc scripts it used to edit its own test file.

## The same decision, three ways

The prompt said to reuse the card component from the home page and not to touch any page other than `/resources`. The home page has no card component. Its card is markup written inline in `Featured.tsx` and styled by the `.box` class. You can't follow both rules, and each tool broke a different one.

**Codex extracted it.** It moved the markup from `Featured.tsx` into `Card.tsx`, pointed the home feed at the new component and built the resource cards from it too. To show the home page hadn't changed, it rendered the old feed from git and the new one and compared the HTML, and the two were identical. What it costs later: there's one card to change and both pages follow. It also edited a home file, which the prompt ruled out. The comparison was a one-off script that isn't in the repo, so nothing will catch the home card changing by accident later.

**Claude Code wrote a new one.** It left the home page alone and wrote `ResourceCard.tsx` with its own `.rc` styles. What it costs later: you now have two cards. Change the border, radius or hover on the home card and the resources card stays the same, so every card change has to be made twice. It kept the rule about other pages, broke the rule about reuse and said so in its report.

**Hermes reused the style.** It wrote no component. Each resource link gets the home `.box` class plus its own `.rc` class, so it picks up the home card's styles and overrides the layout. What it costs later: any change to `.box` on the home page changes the resources cards too, including changes you only meant for home. That link lives in CSS, where it's easy to miss. With no component, a third page would copy the markup a third time.

## What I'd change in each tool's instructions

- **Codex:** Never edit files outside the page you were asked to build, even to refactor. Duplicate instead and say so.
- **Hermes:** Before any decision with two reasonable options, ask me, then continue.
- **Claude Code:** When the brief and the design reference disagree, the reference wins, and tell me where.

## What one line changed

I ran it again the next day with the same prompt, the same starting commit (`e163859`) and the same model per tool: Claude Code and Hermes on Opus 5.5, Codex on `gpt-6-astra`. The only change was one line in the file each tool reads first. Claude Code got this in `CLAUDE.md`: "When the brief and the design reference disagree, the reference wins, and tell me where." Codex got this in `AGENTS.md`: "Never edit files outside the page you were asked to build, even to refactor. Duplicate instead and say so." Hermes got this in `AGENTS.md`: "Before any decision with two reasonable options, ask me, then continue."

### Claude Code

**Different from yesterday:** It followed the reference wherever it disagreed with the brief and listed the 5 places in its report: the type filters, the extra card fields, the intro paragraph, the empty state and the moment dot. It was the only tool to build all five type filters from the reference (prompt, skill, doc, gist, repo), so prompt and skill always show the empty state with today's data. It wrote no separate card component this time. The card markup lives in `Library.tsx` and the home page is untouched.

**Asked:** nothing.

**Changed:**

- `src/content/resources.json`: the 8 entries.
- `src/lib/content/resources.ts`: types, the moment and type lists, and the filter function.
- `src/components/resources/Library.tsx`: the filters, the count, the cards and the empty state.
- `src/app/resources/layout.tsx`: wraps the route in the home page shell and loads `home-page.css`.
- `src/app/resources/page.tsx`: nav, header, library and footer.
- `src/app/resources/resources.css`: 75 lines of page styles.
- `public/cloud.svg`: a copy of the cloud sticker.
- `vitest.config.mts` and `src/app/resources/page.test.tsx`: the test.
- `package.json` and `package-lock.json`: a `test` script and 1 dev dependency (Vitest 3.2.7). Yesterday it added 4.

**Verified:** 4 of 4 tests pass. They render the library to static HTML, check all 11 filter buttons and 8 cards, and call the filter function directly. Nothing gets clicked. The type check (`tsc`) and `npm run build` pass, and it counted the cards by moment in the prerendered HTML.

**Time:** 3m47s.

**Edge:** The repo had no test runner, and it picked Vitest without asking. It only mentioned the alternatives in its final report.

### Codex

**Different from yesterday:** It kept every file inside `src/app/resources`. Yesterday it pulled a shared `Card.tsx` out of the home feed and edited `Featured.tsx`. Today it copied the card markup and 138 lines of shell styles from the home page into the route and said so in a comment. It still imports `NavPill` and `HomeFooter` unchanged.

**Asked:** once, for network access to rerun the build.

**Changed:**

- `src/app/resources/resources.json`: the 8 entries.
- `src/app/resources/page.tsx`: nav, header, library and footer.
- `src/app/resources/resource-library.tsx`: the filters, the count, the cards and the empty state, with the cloud as inline SVG in token colors.
- `src/app/resources/resources.css`: 138 lines, the copied shell styles plus the page styles.
- `src/app/resources/resources.test.cjs`: the test.

No new packages and no change to `package.json`.

**Verified:** 22 of 22 tests pass with Node's built-in test runner. The type check (`tsc`), git's whitespace check and a parse of the new CSS pass. The production build did not pass in its session.

**Time:** 5m42s.

**Edge:** `npm run build` failed twice. Inside the sandbox it couldn't reach Google Fonts. After I allowed network access, the rerun failed again in the `next/font` loader. Codex ended by reporting the build as blocked. The same worktree built fine when run outside its sandbox after the session.

### Hermes

**Different from yesterday:** It asked before deciding. Yesterday it asked nothing and listed five "decisions you should check" at the end. Today it asked four questions in one batch before writing a file, then one more when the Vitest install hit a peer conflict. On my answers it added Vitest and Testing Library, where yesterday it had used zero dependencies. It still builds each card from the home `.box` class plus its own `.rc` class.

**Asked:** five questions, all before it wrote any file:

1. The reference's extra card fields or only the four in the brief?
2. A zero-dependency test or Vitest with Testing Library?
3. The cloud at 96px or 72px?
4. Should the keyword chip copy on click?
5. How to fix the Vitest peer conflict: pin Vitest 3, bump `@types/node`, or force the install?

**Changed:**

- `src/content/resources.json`: the 8 entries.
- `src/lib/content/resources.ts`: types, the moment and type lists, the filter function and the count label.
- `src/components/resources/ResourceLibrary.tsx`: the filters, the count, the cards and the empty state.
- `src/app/resources/layout.tsx`: wraps the route in the home page shell and loads `home-page.css`.
- `src/app/resources/page.tsx`: nav, header, library and footer.
- `src/app/resources/resources-page.css`: 86 lines of page styles.
- `vitest.config.mts` and `tests/resources-page.test.tsx`: the test.
- `package.json` and `package-lock.json`: a `test` script and 5 dev dependencies (Vitest 3, jsdom and three Testing Library packages).

**Verified:** 2 of 2 tests pass. The second test clicks the filters and reaches the empty state. The type check (`tsc`) and `npm run build` pass, and it checked the prerendered HTML for the 8 cards. Every command ran on Node 22.23.4 from nvm.

**Time:** 8m59s.

**Edge:** Its first step was to read the `design-reference-to-nextjs-page` skill it wrote itself yesterday, which recommends a zero-dependency test. Its last step was to update that skill to record that I picked Vitest and how to pin it. Whatever it learned on this run, it will read again next time.

### The winner depends on what you want

- Hermes if you want it to ask first.
- Codex if you want it to decide alone and check its own work.
- Claude Code if you want it to tell you where your brief is wrong.

## The starter folder

[`starter/`](../starter/README.md) is the empty version of the harness from this test, ready to copy into any project. `CLAUDE.md` holds the instructions and points at the other four files: `me.md` for who you are, `feedback.md` for what the agent got wrong, `rules.md` for what it can't do, and `verify.md` for how it proves the work. `AGENTS.md` is one line that sends Codex and Hermes to `CLAUDE.md`, so all three tools read the same harness.

### Rerun with the starter folder (Nov 11)

I made two fresh worktrees from the same commit as the earlier runs and copied the `starter/` folder into the root of each, leaving out its `README.md`. I filled `me.md` with four lines and gave both tools the identical `/resources` prompt from the earlier runs.

**Codex** ran `gpt-6-astra` and took 3m29s. Before writing anything it asked which card approach to take, citing `CLAUDE.md` for asking and `rules.md` for not editing shared files, and its recommended option was "adapt the home card markup inside /resources". It asked before running `npm ci`. It started a dependency audit nobody asked for and dropped it when I told it to. Every new file is under `src/app/resources`. The type check (`tsc`) passed, and the build passed after I allowed network access once for Google Fonts. It wrote 3 tests with `node:test`, and when I ran them afterwards 3 of 3 passed.

**Hermes** ran Opus 5.5 through the Anthropic API and took two runs. The first died at 4m45s when the API credits ran out. The second started from a reset worktree. It read all six files first and said so, then asked four questions before building: the titles and descriptions, the sticker size (96px), whether to run `npm ci`, and which test runner to use. It built with `node:test`, 6 of 6 tests pass, the type check (`tsc`) and the build pass, and it touched no other page. It listed five places where the design docs disagreed with the brief, and it updated its own skill. Two notes. It changed `package.json` to add a `test` script, which Codex did not. And it reused a `tests/resources.test.mjs` left over from the first run, because my reset only cleaned `src/`.

With the folder, both tools asked before deciding and both stayed inside the page, and the differences left are what each tool does with permission to ask.
