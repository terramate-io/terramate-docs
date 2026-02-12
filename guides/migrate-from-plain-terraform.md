---
title: Migrate from Terraform-only Workflows
description: Move from manual Terraform orchestration to Terramate workflows.
---

# Migrate from Terraform-only Workflows

If your teams run Terraform manually with scripts, Terramate gives you stack-aware orchestration without changing core Terraform usage.

## What changes and what stays the same

- **Stays the same**: Terraform modules, providers, state backends, and plan/apply semantics.
- **Changes**: Stack selection, execution order, generated boilerplate, and operational visibility.

## Recommended rollout

### 1) Introduce Terramate for inventory and execution

- [Install Terramate CLI](/cli/installation)
- [Start with Terraform](/get-started/terraform)
- [`terramate list`](/cli/reference/cmdline/list)
- [`terramate run`](/cli/reference/cmdline/run)

### 2) Standardize repeated configuration

- [Code Generation overview](/code-generation/)
- [Generate HCL](/code-generation/generate-hcl)
- [Generate Files](/code-generation/generate-file)

### 3) Limit execution scope by change

- [Change Detection](/orchestration/change-detection/)
- [Tag Filter](/orchestration/tag-filter)

### 4) Adopt CI/CD blueprints

- [CI/CD overview](/ci-cd/)
- [Deployment workflows](/deployments/)
- [Pull request previews](/previews/)

### 5) Add Cloud observability

- [Dashboard](/dashboard/)
- [Alerts](/alerts/)
- [Policies](/policies/)

## Success criteria

- [ ] Teams stop maintaining bespoke orchestration scripts
- [ ] CI runtimes drop with changed-stack execution
- [ ] Generated code reduces copy/paste configuration drift
- [ ] Deployment and drift events are visible across repositories
