---
title: Change Detection
description: Learn about the fundamental concept of Change Detection in Terramate.
type: explanation
---

# Change Detection

Change detection identifies which stacks are impacted by repository changes so teams can run work only where needed.

## Why it matters

- Reduce blast radius by targeting only changed stacks
- Speed up CI/CD by skipping unaffected stacks
- Keep orchestration focused and auditable

## How it works

Change detection is based on Git deltas (commits, branches, pull requests), with optional inclusion of untracked and uncommitted files. The selection can then be widened or narrowed through dependency filters.

## Dependency Filters

Dependency filters allow selecting dependencies or dependents of an already-selected stack set. They work with data dependencies (Terramate output sharing and Terragrunt dependency blocks), not ordering-only relations.

## Integrations

Change detection integrates with:

- [Git integration](./integrations/git.md)
- [Terraform integration](./integrations/terraform.md)
- [Terragrunt integration](./integrations/terragrunt.md)
- [OpenTofu integration](./integrations/opentofu.md)

## Related guides and references

- How-to: [Run Commands in Stacks](/orchestration/run-commands-in-stacks)
- How-to: [Tag Filter](/orchestration/tag-filter)
- Reference: [`terramate list`](/cli/reference/cmdline/list)
- Reference: [`terramate run`](/cli/reference/cmdline/run)
- Reference: [`terramate script run`](/cli/reference/cmdline/script/script-run)

## Use-case guides

- [Set Up Drift Detection](/guides/set-up-drift-detection)
- [Manage Terraform at Scale](/guides/manage-terraform-at-scale)

## Explanation

- [Change Detection Model](/explanations/change-detection)
