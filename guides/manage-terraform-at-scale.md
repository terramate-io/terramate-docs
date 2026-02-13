---
title: Manage Terraform at Scale
description: Combine stacks, orchestration, and code generation for large Terraform estates.
---

# Manage Terraform at Scale

This guide links the core Terramate capabilities you need once infrastructure spans many teams and environments.

## Architecture pattern

1. Model deployable units as [Stacks](/stacks/).
2. Standardize shared config with [Code Generation](/code-generation/).
3. Run dependency-aware workflows via [Orchestration](/orchestration/).
4. Sync outcomes to Cloud for [Deployments](/deployments/), [Drift](/drift/), and [Alerts](/alerts/).

## Implementation path

### Define stack boundaries

- [Create Stacks](/stacks/create)
- [Nesting Stacks](/stacks/nesting)
- [Using Workspaces](/stacks/using-workspaces)

### Standardize generated configuration

- [Generate backend and provider configuration](/code-generation/generate-backend-and-provider-configuration)
- [Generate HCL](/code-generation/generate-hcl)

### Orchestrate safe execution

- [Run Commands in Stacks](/orchestration/run-commands-in-stacks)
- [Set Up Parallel Execution](/orchestration/set-up-parallel-execution)
- [Configure Order of Execution](/orchestration/configure-order-of-execution)

### Optimize for speed with selective runs

- [Change Detection](/orchestration/change-detection/)
- [Run Commands Across Changed Stacks](/orchestration/change-detection/run-commands-across-changed-stacks)

### Operationalize in CI/CD

- [GitHub Actions](/ci-cd/github-actions/)
- [GitLab CI](/ci-cd/gitlab-ci/)
- [Bitbucket Pipelines](/ci-cd/bitbucket-pipelines/)

## Related references

- [`terramate run`](/cli/reference/cmdline/run)
- [`terramate generate`](/cli/reference/cmdline/generate)
- [Cloud API](/reference/cloud-api/)
