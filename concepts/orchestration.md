---
title: Orchestration | Terramate Concepts
description: Learn how orchestration in Terramate can be used to execute single commands or workflows in stacks.
---

# Orchestration

In this section, we will cover orchestration as a core concept in Terramate.

## Introduction

Orchestration allows the execution of commands such as `terraform apply` or `tofu plan` in stacks.

## Commands and workflows

Currently, two ways of orchestrating commands exist:

- Executing a single command such as `terraform apply` with the `terramate run` command, e.g., `terramate run -- terraform apply`.
- Executing a sequence of commands combined as workflow using Terramate scripts with the `terramate script run` command, e.g., `terramate script run terraform deploy`.

## Sequential and parallel execution

By default, commands and workflows run sequentially in stacks but can also run in [parallel](../cli/orchestration/parallel-execution.md).

## Dependency graph

Terramate can invoke commands and workflows on a single stack or a directed acyclic graph (DAG) of stacks.
The graph depicts the dependency relations between the stacks. The run order follows a [topological ordering](https://en.wikipedia.org/wiki/Topological_sorting) of the nodes, which can be filtered using change detection or tag filters. Furthermore, the execution order can also be reversed, which is beneficial when running commands like `terraform destroy` on a graph of dependent stacks.

## Change detection

Terramate comes with a change detection feature, which allows you to orchestrate stacks that contain changes only.
The change detection comes with several integrations to cover IaC-specific use-cases, such as Terraform module change
detection or Terragrunt dependency change detection.

For details, please see the [change detection](../cli/change-detection/index.md) documentation.
