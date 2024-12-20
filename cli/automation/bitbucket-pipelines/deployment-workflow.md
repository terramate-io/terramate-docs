---
title: How to use Terramate to automate and orchestrate Terraform Deployments in Bitbucket Pipelines
description: Learn how to use Terramate to configure custom GitOps workflows to automate and orchestrate Terraform and OpenTofu Deployments in Bitbucket Pipelines.
---

# Run a Deployment in Bitbucket Pipelines

The following workflow is a blueprint and may require adjustments to fit your needs.

## Deployment Blueprint

This is the snippet from `bitbucket-pipelines.yml` that runs on "push to main" events (usually when a PR is merged) and executes the terraform apply on changed stacks.

```yaml
branches:
  main:
    - step:
        name: Deploy
        oidc: true
        script:
          - . ./bitbucket-scripts/install.sh
          - CHANGED_STACKS=$(terramate -C stacks/$STACKS_PATH list --changed)
          - if [[ -z "$CHANGED_STACKS" ]]; then echo "No changed stacks. Exiting."; exit 0; fi
          - echo -e "List of changed stacks:\n$CHANGED_STACKS"
          - export WIP=projects/<PROJECT_NUMBER>/locations/global/workloadIdentityPools/<WIP_NAME>/providers/<WIPP_NAME>
          - export SA=<SERVICE_ACCOUNT_EMAIL>
          - . ./bitbucket-scripts/gcp-oidc-auth.sh $WIP $SA
          - . ./bitbucket-scripts/terraform-apply.sh
```
