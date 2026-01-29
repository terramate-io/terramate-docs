# terramate-docs
Repository terramate-docs

## Project Setup

### we use `pnpm` as our package manager, see [here](https://pnpm.io/installation)

Install all dependencies:
```sh
pnpm install
```

Compile and Hot-Reload for Development

```sh
pnpm start
```

## Agent skills (Cursor/AI assistants)

We use agent skills to speed up docs work (VitePress, build preflight, etc.). Cursor auto‑loads skills found under `.cursor/skills/**/SKILL.md` and skills installed via `.agents/skills` symlinks.

### Install

VitePress skill:

```sh
npx skills add https://github.com/antfu/skills --skill vitepress
```

Docs build preflight skill (local):
- Already included in this repo at `.cursor/skills/docs-build-preflight/SKILL.md` (no extra install needed).

Optional: helper to discover skills:

```sh
npx skills add https://github.com/vercel-labs/skills --skill find-skills
```

### Update / reload

```sh
npx skills update
```

If a new skill doesn’t appear immediately, reload the editor window.

Alternatively, combine dependency updates with skills refresh:

```sh
pnpm run deps:update
```
