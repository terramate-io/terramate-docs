---
title: How to use Terramate to automate and orchestrate Terraform Deployments in GitLab CI
description: Learn how to use Terramate to configure custom GitOps workflows to automate and orchestrate Terraform and OpenTofu Deployments in GitLab CI.
---

# Run a Deployment in GitLab CI

The following workflow is a blueprint and may require adjustments to fit your needs.

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
    - terramate run --parallel 5 --changed -- terraform apply -input=false -auto-approve -lock-timeout=5m
```
