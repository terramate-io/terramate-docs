---
title: How to use Terramate to automate and orchestrate Terraform Deployments in GitLab CI
description: Learn how to use Terramate to configure custom GitOps workflows to automate and orchestrate Terraform and OpenTofu Deployments in GitLab CI.
---

# Run a Deployment in GitLab CI

The following workflow is a blueprint and may require adjustments to fit your needs.

## Terramate Cloud support

When synchronizing deployments to Terramate Cloud it is recommended to run a drift check right after the deployment.
This drift check will be used to judge the health of the deployment. Even if the deployment succeeded, it can show a drift right away.

## Deployment Blueprint

Create the following GitLab CI workflow file at `gitlab-ci/.deploy.yml`

```yaml
apply:
  extends:
    - .common
    - .id_tokens
  only:
    - main
  stage: apply
  before_script:
    - !reference [.setup, script]
  script:
    - terramate fmt --check
    - CHANGED_STACKS=$(terramate list --changed)
    - CHANGED_STACKS_NUMBER=$(echo $CHANGED_STACKS |wc -w)
    - if [ $CHANGED_STACKS_NUMBER -eq 0 ]; then echo "No changed stacks. Nothing to do..."; exit 0; else echo -e "Changed stacks:\n$CHANGED_STACKS"; fi
    - !reference [.auth, script]
    - terramate run --parallel 1 --changed -- terraform init -lock-timeout=5m
    - terramate run --parallel 5 --changed -- terraform validate
    - terramate run --changed -- terraform plan -lock-timeout=5m -out=out.tfplan
    - terramate run --changed --sync-deployment --terraform-plan-file=out.tfplan -- terraform apply -input=false -auto-approve -lock-timeout=5m out.tfplan
    - terramate run --changed --sync-drift-status --terraform-plan-file=drift.tfplan -- terraform plan -out drift.tfplan -detailed-exitcode
```
