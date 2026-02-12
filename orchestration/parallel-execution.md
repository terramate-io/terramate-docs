---
title: Parallel Execution
description: Learn how to orchestrate and execute commands and workflows in parallel using parallel execution in Terramate CLI.
---

# Parallel Execution

This section explains how to orchestrate the execution of commands and workflows in stacks in parallel.

## Introduction

Terramate facilitates parallel execution, enabling independent stacks to run in parallel, thereby offering significant
time savings, particularly during commands like `terraform plan`. Despite the parallel nature of execution, Terramate
ensures that the [order of execution](../orchestration/order-of-execution.md) is still respected.

This approach notably diminishes build time consumption for deployments and drift detection to a bare minimum, while
also reducing waiting time for users when executing commands across stacks. Moreover, with Terramate Cloud, users can
conveniently access logs of all executed stacks in the correct order, further enhancing visibility and monitoring
capabilities during the execution process.

To initiate parallel execution, users can utilize the `--parallel N` flag, where `N` represents the number of parallel
processes desired. This allows users to tailor the level of parallelism according to their specific requirements.

## Run a command in stacks in parallel

This command runs `terraform plan` in parallel across all stacks while maintaining the specified order.

```sh
terramate run --parallel 5 terraform plan
```

## Run a workflow in stacks in parallel

This command runs a workflow named `deploy` configured with Terramate Scripts in parallel across all stacks while
maintaining the specified order.

```sh
terramate script run --parallel 5 deploy
```

## Related explanation

- [Orchestration Model](/explanations/orchestration)
