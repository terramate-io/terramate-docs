---
title: How to use Terramate to automate and orchestrate Terraform Drift Checks in GitLab CI
description: Learn how to use Terramate to configure custom GitOps workflows to automate and orchestrate Terraform and OpenTofu Drift Checks in GitLab CI.
---

# Run a Drift Check in GitLab CI

The following workflow is a blueprint and may require adjustments to fit your needs.

Terramate Cloud support is essential for workflows to perform Drift Checks, as it requires access to take action and record the results.

The following workflow is configurable on a schedule. The schedule can be created by following the guide for [Scheduled Pipelines](https://docs.gitlab.com/ee/ci/pipelines/schedules.html).

## Terramate Cloud support

When synchronizing drift checks with Terramate Cloud, the following features assist your team in handling drifts:

- Receive Slack notifications for new drifts.
- Highlight and identify drifted stacks in the Stacks List and Dashboard.
- View drift details without requiring the team to have elevated access to the Terraform state or cloud resources.
- Identify when a drift occurred and how long a stack remained drifted.
- Automate drift reconciliation without human intervention using the `--status` filter in the Terramate CLI.

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
