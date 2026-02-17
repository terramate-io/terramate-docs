---
name: terramate-source-verification
description: Ask-first verification of docs against Terramate CLI and Catalyst source code to ensure accuracy and completeness.
metadata:
  version: "2026.01.29"
  owner: Terramate Docs
---

This skill helps agents verify any documentation about Terramate CLI or Terramate Catalyst against the actual source code. It is opt-in to avoid adding unnecessary context. Always ask the user before inspecting repositories.

## Ask-first workflow (always prompt)

Use this short prompt before proceeding:

> Do you want me to verify this against the source code?  
> - Terramate CLI: https://github.com/terramate-io/terramate/  
> - Catalyst (dev): https://github.com/terramate-io/terramate-catalyst-dev  
> Note: This may add context and take extra time.

If the user says “yes,” proceed. Otherwise, skip verification and continue normally.

## Targets

- Terramate CLI source: `https://github.com/terramate-io/terramate/`
- Terramate Catalyst (dev): `https://github.com/terramate-io/terramate-catalyst-dev`
- Examples (optional for practical behavior): `https://github.com/terramate-io/terramate-catalyst-examples`

## Scope control

- Confirm product: CLI vs Catalyst (or both).
- Confirm version/tag/branch if relevant; otherwise default to `main`.
- Limit reads to areas relevant to the current doc changes (commands/features touched).
- Prefer browsing specific files/directories over cloning entire repos.

## What to verify

- Commands: names, subcommands, flags/options, defaults, env vars, exit codes.
- Behavior: side effects, file outputs, scaffolding paths, codegen outputs.
- Errors: notable error conditions or constraints users should know.
- References: paths and link structure (to avoid dead links).

## Where to look (CLI)

- `cmd/**` and `commands/**`: command wiring, flag definitions, help text.
- `generate/**`, `stack/**`, `run/**`: core engine behavior (change detection, orchestration).
- `CHANGELOG.md`, `README.md`: user-facing changes and top-level behavior notes.

## Where to look (Catalyst)

- `commands/**` (e.g., scaffold, component, package): CLI UX and flags.
- `config/**`, `inputs/**`: shapes, required fields, defaults.
- `functions/**` or helpers: exposed functions and metadata access.
- For end-to-end reality checks, cross-reference `terramate-catalyst-examples`.

## Suggested approach

1) Identify the exact features/commands in the doc update.  
2) Inspect the closest code entry points first (command package or file).  
3) Confirm flags, defaults, and any notable warnings/constraints.  
4) If docs mention paths/outputs, search for constants/templates that produce them.  
5) Summarize discrepancies; propose doc updates with precise wording.  
6) Keep quotes minimal; prefer short code excerpts or inline references.

## Output expectations

- A short verification note with findings (match/mismatch).  
- List of any changes needed in docs (bulleted).  
- Links to specific files/lines if possible.

## Don’ts

- Don’t change code; read-only verification only.  
- Don’t add broad, non-relevant repo context.  
- Don’t proceed without explicit user consent (ask-first).

