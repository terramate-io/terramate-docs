---
name: terramate-source-verification
description: Ask-first verification of docs against Terramate CLI source code to ensure accuracy and completeness.
metadata:
  version: "2026.02.12"
  owner: Terramate Docs
---

This skill helps agents verify any documentation about Terramate CLI against the actual source code. It is opt-in to avoid adding unnecessary context. Always ask the user before inspecting repositories.

> **Note**: Catalyst capabilities (bundles, components, scaffold, packages, self-service) have been merged into Terramate CLI. There is no separate Catalyst repo; everything lives in the CLI repo.

## Ask-first workflow (always prompt)

Use this short prompt before proceeding:

> Do you want me to verify this against the source code?  
> - Terramate CLI: https://github.com/terramate-io/terramate/  
> Note: This may add context and take extra time.

If the user says "yes," proceed. Otherwise, skip verification and continue normally.

## Targets

- Terramate CLI source: `https://github.com/terramate-io/terramate/`
- Examples (optional for practical behavior): `https://github.com/terramate-io/terramate-catalyst-examples`

## Scope control

- Confirm version/tag/branch if relevant; otherwise default to `main`.
- Limit reads to areas relevant to the current doc changes (commands/features touched).
- Prefer browsing specific files/directories over cloning entire repos.

## What to verify

- Commands: names, subcommands, flags/options, defaults, env vars, exit codes.
- Behavior: side effects, file outputs, scaffolding paths, codegen outputs.
- Errors: notable error conditions or constraints users should know.
- References: paths and link structure (to avoid dead links).

## Where to look

- `cmd/**` and `commands/**`: command wiring, flag definitions, help text.
- `generate/**`, `stack/**`, `run/**`: core engine behavior (change detection, orchestration).
- `commands/**` (e.g., scaffold, component, package): self-service CLI UX and flags.
- `config/**`, `inputs/**`: shapes, required fields, defaults.
- `functions/**` or helpers: exposed functions and metadata access.
- `CHANGELOG.md`, `README.md`: user-facing changes and top-level behavior notes.
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

## Do nots

- Do not change code; read-only verification only.  
- Do not add broad, non-relevant repo context.  
- Do not proceed without explicit user consent (ask-first).
