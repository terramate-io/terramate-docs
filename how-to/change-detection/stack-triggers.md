---
title: Fix failed deployments or reconcile drift by rerunning stacks with Terramate Triggers
description: Rerun or skip stacks by marking them as changed (or unchanged) to control what runs in the next Terramate execution.
type: how-to
product: cli
outline: [2, 4]
---
Stack Triggers let you explicitly control Terramate Change Detection by marking stacks as changed even when the stack’s code did not change.

A trigger marks a stack as changed even though no direct or indirect code changes have been made to it.

## Use cases

- A **deployment failed** after merging a pull request. The affected stacks are in a failed state. Sometimes a fix requires code changes; often you only need to rerun the deployment with the same code. In both cases, create a new pull request and trigger the failed stacks to generate a fresh preview and diagnose faster.
- **Drift is detected** and should be reconciled by applying the current code without changing it. Trigger the drifted stacks and create a pull request to fix the drift.

## Benefits

- Your existing review and deployment processes are honored without extra steps.
- Changes can be reviewed and approved before applying, reducing the risk of misconfiguration.
- Using Terramate Cloud status filters to target stacks speeds up executions and improves MTTR in your DORA metrics.

## Prerequisites

- Terramate CLI or Terramate Catalyst is installed
- A repository with one or more stacks under version control (Git)

## Steps

- Create a new branch (ensure you are on the latest HEAD of your default branch, e.g., `main`):
    
    ```bash
    git checkout -b my-branch
    ```
    
- Trigger a specific stack as changed:
    
    ```bash
    terramate trigger /path/to/stack
    git add .tmtriggers
    git commit -m "trigger a stack"
    ```
    
- Trigger stacks by Cloud status (optional, if using Terramate Cloud):
    
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
    
- Trigger nested stacks recursively:
    
    ```bash
    terramate trigger /path/to/parent --recursive
    git add .tmtriggers
    git commit -m "trigger nested stacks recursively"
    ```
    
- Run your workflow:
    
    Create a Terraform preview (`plan`) of all triggered or changed stacks:
    
    ```bash
    terramate run --changed -- terraform plan
    ```
    

## Operational Details

Only triggers introduced (added) in the current Git changeset are considered. Previously introduced triggers are ignored. You can keep them for historical reasons or delete them at any time—deleting trigger files has no effect on past changesets.

A quick recap of how Terramate Change Detection works and what a changeset includes:

Terramate uses Git to detect stacks that have direct or indirect changes. It integrates natively with Git and can also inspect Terraform, OpenTofu, and Terragrunt configurations.

When change detection is enabled (via `--changed`, e.g., in `list` and `run`), the base for comparison depends on context:

- On the default branch (e.g., `main`): compare `HEAD` to the previous commit (often a merge/squash).
- On a feature branch: compare the merge-base of the default branch and `HEAD` to `HEAD`.

You can override the base with `--git-change-base=<commit|branch|tag>`.

See [Change Detection](/cli/change-detection/) and the [Git integration](/cli/change-detection/integrations/git) for details.

## Notes

- Trigger files are stored in the `.tmtriggers/` directory at the repository root. They must be checked in to be considered by change detection. Do NOT add this directory to `.gitignore`.
- Trigger files can be deleted at any time with no effect on past runs. If a trigger is introduced in one commit and removed in a later commit within the same changeset, it has no effect because Terramate considers the full changeset, not individual commits.
- Terramate supports different trigger types. This article focuses on `change` triggers. `ignore` triggers can exclude stacks from change detection (e.g., trivial or purely global changes).

### Related guides and references

- Reference: [terramate trigger](/cli/reference/cmdline/trigger)
- Concepts: [Change Detection](/cli/change-detection/)