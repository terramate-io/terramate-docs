---
title: How to use Terramate to automate and orchestrate Terraform and OpenTofu Drift Checks in BitBucket Pipelines
description: Learn how to use Terramate to configure custom GitOps workflows to automate and orchestrate Terraform and OpenTofu Drift Checks in BitBucket Pipelines.
---

## Drift Detection Blueprint

This is the snippet from [`bitbucket-pipelines.yml`](./index.md#main-pipelines-file) that runs on a scheduled interval or on manual invocation.

::: info
To make drift detection run on a schedule, please follow the instructions in the Bitbucket documentation: https://support.atlassian.com/bitbucket-cloud/docs/pipeline-triggers/
:::

```yaml
custom:
  drift:
    - step:
        name: Drift Detection
        oidc: true
        script:
          - . ./bitbucket-scripts/install.sh
          - export WIP=<WORKLOAD_IDENTITY_PROVIDER>
          - export SA=<SERVICE_ACCOUNT>
          - . ./bitbucket-scripts/gcp-oidc-auth.sh $WIP $SA
          - . ./bitbucket-scripts/drift.sh
```
