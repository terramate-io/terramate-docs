---
title: Orchestration | Terramate Concepts
description: Learn how orchestration in Terramate can be used to execute single commands or workflows in stacks using filter and change detection.
---

# Orchestration

Orchestration allows the execution of any commands such as `terraform apply` or `tofu plan` in stacks using a
[graph-based](#graph-based-orchestration) approach. This comes especially handy whenever running Terramate in automation
because the orchestration in Terramate comes with change detection that allows you to orchestrate commands in stacks
that contain changes in a commit, branch or Pull Request.

::: info
Compared to other available tooling, Terramate CLI is not a wrapper around Terraform
or OpenTofu. Instead, you can use Terramate to orchestrate any command in stacks.
:::

## Use Cases

- **Orchestrate commands**: on a single or a graph of stacks using filters.
- **Define and use workflows**: use Terramate Scripts to define custom commands to combine multiple commands into one executable unit of work.
- **Detect changes**: to only orchestrate commands or workflows in stacks that contain changes in a commit, branch or Pull Requests.
- **Execute stacks in order**: define the order of execution of related stacks to ensure dependency constraints.

## Commands and Workflows

Currently, two ways of orchestrating commands exist:

- **Executing a single command** such as `terraform apply` using the [`terramate run`](../cli/cmdline/run.md) command, e.g.,
`terramate run -- terraform apply`.
- **Executing a sequence of commands** combined as a workflow with Terramate scripts using the [`terramate script run`](../cli/cmdline/script/script-run.md)
command, e.g., `terramate script run terraform deploy`.

## Change detection

Terramate comes with a change detection feature, which allows you to orchestrate stacks that contain changes only.
The change detection comes with several integrations to cover IaC-specific use-cases, such as
Terraform and OpenTofu module change detection or Terragrunt dependency change detection.

For details, please see the [change detection](../cli/change-detection/index.md) documentation.

## Sequential and parallel execution

By default, commands and workflows run sequentially in stacks but can also run in [parallel](../cli/orchestration/parallel-execution.md).

## Order of execution

Terramate can invoke commands and workflows on a single stack or a directed acyclic graph (DAG) of stacks.

- **Implicit order of execution**: Allows to define the order of execution by nesting stacks using the file system
hierarchy in a repository.
- **Explicit order of execution** Allows the enforcement of a specific order of execution using stack
configuration such as [`before`](../cli/stacks/configuration.md#before) and
[`after`](../cli/stacks/configuration.md#after) by referencing related stacks by path or tags.
- **Forced execution**: Allows enforcing the execution of specific stacks using stack configuration such as
[`wants`](../cli/stacks/configuration.md#wants) and [`wanted_by`](../cli/stacks/configuration.md#wanted_by) by referencing
related stacks by path or tags.

## Graph-based orchestration

Terramate can invoke commands and workflows on a single stack or a directed acyclic graph (DAG) of stacks.
The graph depicts the dependency relations between the stacks. The run order follows a [topological ordering](https://en.wikipedia.org/wiki/Topological_sorting) of the nodes, which can be filtered using change detection or tag filters. Furthermore, the execution order can also be reversed, which is beneficial when running commands like `terraform destroy` on a graph of dependent stacks.

For details, please see the [graph-based orchestration](../cli/orchestration/order-of-execution.md) documentation.
