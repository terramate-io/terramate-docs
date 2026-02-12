---
title: Fix failed deployments or reconcile drift by rerunning stacks with Terramate Triggers
description: Rerun or skip stacks by marking them as changed (or unchanged) to control what runs in the next Terramate execution.
type: how-to
product: cli
outline: [2, 4]
---

# Fix failed deployments or reconcile drift by rerunning stacks with Terramate Triggers

Stack Triggers let you explicitly control Terramate Change Detection by marking stacks as changed even when the stack’s code did not change.

A trigger marks a stack as changed even though no direct or indirect code changes have been made to it.

## When to use

- A **deployment failed** after merging a pull request.
  The affected stacks are in a failed state. Sometimes a fix requires code changes;
  often you only need to rerun the deployment with the same code.
  In both cases, create a new pull request and trigger the failed stacks to generate a fresh preview and diagnose faster.
- **Drift is detected** and should be reconciled by applying the current code without changing it.
  Trigger the drifted stacks and create a pull request to fix the drift.

## Prerequisites

- Terramate CLI or Terramate Catalyst is installed
- A repository with one or more stacks under version control (Git)

### 1. Create a new branch

```bash
git checkout -b my-branch
```

### 2. Mark a stack as changed

```bash
terramate trigger /path/to/stack
git add .tmtriggers
git commit -m "trigger a stack"
```

### 3. Trigger by Cloud status (optional)

```bash
# All drifted stacks
terramate trigger --status=drifted
git add .tmtriggers
git commit -m "trigger drifted stacks"
```

Supported stack status codes include:

- `healthy` (meta status matching Terramate Cloud UI)
  - `ok` — Stacks that are neither drifted nor have failed (unfixed) deployments
- `unhealthy` (meta status matching Terramate Cloud UI)
  - `failed` — Stacks with a failed latest deployment that hasn’t been fixed yet (may also be drifted; failed takes precedence)
  - `drifted` — Stacks that are drifted without a previously failed deployment

Additional, more detailed codes are available via `--deployment-status` or `--drift-status`.

### 4. Trigger nested stacks (optional)

```bash
terramate trigger /path/to/parent --recursive
git add .tmtriggers
git commit -m "trigger nested stacks recursively"
```

### 5. Preview the changes

Create a Terraform preview (`plan`) of all triggered or changed stacks:

```bash
terramate run --changed -- terraform plan
```

## Result

- The plan includes stacks with actual code/config changes and any stacks you explicitly marked (change triggers) or selected by status.
- In normal pull‑request workflows, these triggered stacks are considered even if no stack code changed; they are added in addition to any stacks that change detection would include normally.

## Troubleshooting

- No stacks selected: ensure `.tmtriggers` files were added and committed; verify the stack path is correct.
- Status filter returns none: confirm the stack status in Terramate Cloud and that you used the correct `--status`, `--deployment-status`, or `--drift-status`.
- Unexpected set of stacks: remember the comparison base differs on default vs feature branches; override with `--git-change-base=<commit|branch|tag>`.
- Nested stacks not affected: use `--recursive` with the correct parent path.

## Notes

- Trigger files are stored in the `.tmtriggers/` directory at the repository root. They must be checked in to be considered by change detection. Do NOT add this directory to `.gitignore`.
- Trigger files can be deleted at any time with no effect on past runs. If a trigger is introduced in one commit and removed in a later commit within the same changeset, it has no effect because Terramate considers the full changeset, not individual commits.
- Terramate supports different trigger types. This article focuses on `change` triggers. `ignore` triggers can exclude stacks from change detection (e.g., trivial or purely global changes).

### Related guides and references

- Reference: [terramate trigger](/cli/reference/cmdline/trigger)
- Concepts: [Change Detection](/orchestration/change-detection/)