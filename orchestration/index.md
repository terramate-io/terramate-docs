---
title: Orchestration
description: Learn how to orchestrate the execution of commands or sequences of commands in stacks using the orchestration in Terramate.
type: explanation
---

# Orchestration

Orchestration is the capability that lets you execute commands across many stacks safely and predictably. Instead of manually entering each stack directory, you define stack structure and Terramate handles execution order and fan-out.

## What orchestration solves

- Coordinate execution across large stack sets
- Preserve dependency order where required
- Run independent stacks in parallel for faster feedback
- Combine stack selection with change detection to reduce blast radius

## Execution model

Terramate uses stack relationships and execution order metadata to build an execution graph. Parent/child relationships and explicit ordering rules determine what can run concurrently and what must run sequentially.

## Related guides

- How-to: [Run Commands in Stacks](./run-commands-in-stacks.md)
- How-to: [Workflows](./scripts.md)
- How-to: [Parallel Execution](./parallel-execution.md)
- How-to: [Order of Execution](./order-of-execution.md)
- How-to: [Outputs Sharing](./outputs-sharing.md)
- Explanation: [Change Detection](./change-detection/index.md)
- Reference: [`terramate run`](/cli/reference/cmdline/run)

## Use-case guides

- [Manage Terraform at Scale](/guides/manage-terraform-at-scale)
- [Set Up Drift Detection](/guides/set-up-drift-detection)
- [Migrate from Terraform-only Workflows](/guides/migrate-from-plain-terraform)

## Explanation

- [Orchestration Model](/explanations/orchestration)
