---
title: How to use Terramate to automate and orchestrate Terraform Previews in GitLab CI
description: Learn how to use Terramate to configure custom GitOps workflows to automate and orchestrate Terraform and OpenTofu Previews in GitLab CI.
---

# Run a Preview in GitLab CI

The following workflow is a blueprint and may require adjustments to fit your needs.

## Preview Blueprint

Create the following GitLab CI workflow file at `gitlab-ci/.plan.yml`

```yaml
plan:
  extends:
    - .common
    - .id_tokens
  only:
    - merge_requests
  stage: plan
  before_script:
    - !reference [.setup, script]
  script:
    - terramate fmt --check
    - export CHANGED_STACKS=$(terramate list --changed)
    - export CHANGED_STACKS_NUMBER=$(echo $CHANGED_STACKS |wc -w)
    - if [ $CHANGED_STACKS_NUMBER -eq 0 ]; then echo "No changed stacks. Exiting."; exit 0; else echo -e "Changed stacks:\n$CHANGED_STACKS"; fi
    - !reference [.auth, script]
    - terramate run --parallel 1 --changed -- terraform init -lock-timeout=5m
    - terramate run --parallel 5 --changed -- terraform validate
    - terramate run --parallel 5 --changed -- terraform plan -lock-timeout=5m -out=out.tfplan
```
