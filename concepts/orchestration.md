---
title: Orchestration | Terramate Concepts
description: Learn how stacks help you efficiently build and manage infrastructure as code projects at any scale with technologies such as Terraform.
---

# Orchestration

In this section, we will cover orchestration as a core concept in Terramate.

## Introduction

Orchestration allows the execution of commands such as `terraform apply` or `tofu plan` in stacks.

## Commands and workflows

Currently, two ways of orchestrating commands exist:

- Executing a single command such as `terraform apply` with the `terramate run` command, e.g. `terramate run -- terraform apply`.
- Executing a sequence of commands combined as workflow using Terramate scripts with the `terrmate run script` command, e.g. `terramate script run terraform deploy`.

Per default, commands and workflows are executed in stacks sequentially but can be executed [in parallel](../cli/orchestration/parallel-execution.md) also.

## Graph-based execution

Terramate can be used to invoke commands and workflows on a single stack or a DAG "directed acyclic graph" of stacks.

## Change Detection

Terramate comes with a change detection feature, which allows you to orchestrate stacks that contain changes only.
The change detection comes with several integrations to cover IaC-specific use-cases such as Terraform module change
detection or Terragrunt dependency change detection.

For details, please see:
- Git change detection
- Terraform change detection
- OpenTofu change detection
- Terragrunt -

## Filters

Additional filters are available, when selecting a list of stacks for orchestration.
