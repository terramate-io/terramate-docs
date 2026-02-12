---
title: Migrate from Terragrunt
description: Incrementally adopt Terramate in existing Terragrunt repositories.
---

# Migrate from Terragrunt

This guide helps teams adopt Terramate without rewriting their Terragrunt repository.

## Migration strategy

1. Keep your current directory and state layout.
2. Install Terramate and initialize stack metadata.
3. Start with non-invasive commands (`list`, `run`, `script run`).
4. Add change detection and graph-aware orchestration.
5. Enable optional Cloud sync for previews, deployments, and drift.

## Step-by-step

### 1) Install and bootstrap

- [Install Terramate CLI](/cli/installation)
- [Start with Terragrunt](/get-started/terragrunt)

### 2) Establish stack inventory

- [Create Stacks](/stacks/create)
- [View Stacks](/stacks/list)
- CLI reference: [`terramate list`](/cli/reference/cmdline/list)

### 3) Replace ad-hoc loops with orchestration

- [Run Commands in Stacks](/orchestration/run-commands-in-stacks)
- [Order of Execution](/orchestration/order-of-execution)
- CLI reference: [`terramate run`](/cli/reference/cmdline/run)

### 4) Add selective execution

- [Change Detection](/orchestration/change-detection/)
- [Run Commands Across Changed Stacks](/orchestration/change-detection/run-commands-across-changed-stacks)

### 5) Roll out CI/CD workflows

- [GitHub Actions workflows](/ci-cd/github-actions/)
- [GitLab CI workflows](/ci-cd/gitlab-ci/)
- [Bitbucket workflows](/ci-cd/bitbucket-pipelines/)

### 6) Enable cloud visibility (optional)

- [Set up Terramate Cloud](/guides/set-up-terramate-cloud)
- [Deployments](/deployments/)
- [Drift Management](/drift/)

## Validation checklist

- [ ] Stack inventory matches expected services/environments
- [ ] `terramate run` replaces custom shell loops
- [ ] Change detection shortens CI runtime
- [ ] Preview and deployment sync works in your main pipeline
