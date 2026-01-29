---
name: docs-build-preflight
description: Mandatory preflight for docs changes to ensure the site builds and lints cleanly before commit/PR.
metadata:
  version: "2026.01.29"
  owner: Terramate Docs
---

Use this skill before committing or opening a PR that modifies documentation.

## Checklist (run in repo root)

1) Install dependencies (once per environment)
```bash
pnpm install
```

2) Build docs (must pass — treat failures as blockers)
```bash
pnpm docs:build
```

3) Optional preview (spot runtime issues)
```bash
pnpm docs:preview
```

4) Lint and fix (Markdown, config, theme JS/TS)
```bash
pnpm lint
pnpm lint:fix
```

5) Re-run build after fixes
```bash
pnpm docs:build
```

## Failure handling
- Read the build error; fix bad imports, broken links, or MD/TS config issues.
- Validate sidebar links in `.vitepress/config.ts` if navigation changed.
- Re-run steps 2 and 5 until green.

## When to use
- Any Markdown edit, navigation change, or theme/config tweak.
- Before committing and before pushing a branch/PR.

## Related
- VitePress skill: `.cursor/skills/vitepress/SKILL.md`
- Project guide: `AGENTS.md` (Build & PR guidelines)

