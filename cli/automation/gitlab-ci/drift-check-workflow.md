---
title: How to use Terramate to automate and orchestrate Terraform Drift Checks in GitLab CI
description: Learn how to use Terramate to configure custom GitOps workflows to automate and orchestrate Terraform and OpenTofu Drift Checks in GitLab CI.
---

# Run a Drift Check in GitLab CI

The following workflow is a blueprint and needs some adjustments to work for you.

Drift Checks require action and protocolling the results, so Terramate Cloud support is required for those workflows at the moment.

The following workflow is configurable on a schedule. The schedule can be created by following the guide for [Scheduled Pipelines](https://docs.gitlab.com/ee/ci/pipelines/schedules.html).

## Terramate Cloud support

When synchronizing drift checks to Terramate Cloud, the following features will support the team with handling drifts:

- Get notified on new drifts via Slack notifications.
- Highlight and identify drifted stacks in the Stacks List and Dashboard
- See drift details without requiring your team to have elevated access to read the Terraform state or have access to read the cloud resources.
- Identify the time when a drift happened and how long a stack stayed in a drifted state.
- Create automation to reconcile a drift without human interaction using the `--status` filter in Terramate CLI.

## Deployment Blueprint

Create the following GitLab CI workflow file at `gitlab-ci/.drift-check.yml`

```yaml
plan:
  extends:
    - .common
    - .id_tokens
  only:
    - schedules
  stage: drift
  before_script:
    - !reference [.setup, script]
  script:
    - !reference [.auth, script]
    - terramate run --parallel 1 -- terraform init -lock-timeout=5m
    - terramate run --parallel 5 -- terraform validate
    - terramate run --parallel 5 --sync-drift-status --terraform-plan-file=drift.tfplan --continue-on-error -- terraform plan -lock-timeout=5m -out=drift.tfplan
```
