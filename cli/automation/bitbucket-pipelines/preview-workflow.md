---
title: How to use Terramate to automate and orchestrate Terraform Previews in Bitbucket Pipelines
description: Learn how to use Terramate to configure custom GitOps workflows to automate and orchestrate Terraform and OpenTofu Previews in Bitbucket Pipelines.
---

# Run a Preview in Bitbucket Pipelines

The following workflow is a blueprint and may require adjustments to fit your needs.

## Preview Blueprint

This is the snippet from [`bitbucket-pipelines.yml`](./index.md#main-pipelines-file) that runs on pull requests and executes the terraform plan on changed stacks, then posts the resulting plan as a pull request comment.

```yaml
pipelines:
  pull-requests:
    '**':
      - step:
          name: Preview
          oidc: true
          script:
            - . ./bitbucket-scripts/install.sh
            - CHANGED_STACKS=$(terramate -C stacks/$STACKS_PATH list --changed)
            - if [[ -z "$CHANGED_STACKS" ]]; then echo "No changed stacks. Exiting."; exit 0; fi
            - echo -e "List of changed stacks:\n$CHANGED_STACKS"
            - export WIP=projects/<PROJECT_NUMBER>/locations/global/workloadIdentityPools/<WIP_NAME>/providers/<WIPP_NAME>
            - export SA=<SERVICE_ACCOUNT_EMAIL>
            - . ./bitbucket-scripts/gcp-oidc-auth.sh $WIP $SA
            - . ./bitbucket-scripts/terraform-plan.sh
            - . ./bitbucket-scripts/pr-comment.sh
```
