---
title: How to use Terramate to automate and orchestrate Terraform Deployments in GitHub Actions
description: Learn how to use Terramate to configure custom GitOps workflows to automate and orchestrate Terraform and OpenTofu Deployments in GitHub Actions.
---

# Run a Deployment in GitHub Actions

The following workflows are blueprints and need some adjustments to work for you.

Search for `CHANGEME` to adjust needed credentials details for AWS, Google Cloud, and Azure examples.

## Terramate Cloud support

When synchronizing deployments to Terramate Cloud, it is recommended to run a drift check right after the deployment.
This drift check will be used to validate the integrity of the deployment. Consider the following two scenarios:
- If a deployment succeeds, an immediate drift check will help detect if resources drift right away.
- If a deployment fails, an immediate drift will help to detect and understand partially applied plans.

## Deployment Blueprints

Create the following GitHub Actions configuration at `.github/workflows/deploy.yml`

Please select the tab that fits your use case. Currently available use cases are:
- Terraform + Terramate Cloud
- OpenTofu + Terramate Cloud
- Terragrunt + Terramate Cloud
- Terraform
- OpenTofu
- Terragrunt

::: code-group

```yml [ Terraform + Terramate Cloud ]
name: Terraform Deployment

on:
  push:
    branches:
      - main

jobs:
  deploy:
    name: Deploy Terraform changes in changed Terramate stacks

    permissions:
      id-token: write
      contents: read
      pull-requests: read
      checks: read

    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          ref: ${{ github.head_ref }}
          fetch-depth: 0

      - name: Install Terramate
        uses: terramate-io/terramate-action@v3

      - name: Install Terraform
        uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: 1.7.4
          terraform_wrapper: false

      - name: List changed stacks
        id: list
        run: terramate list --changed

      # # Comment this step out if not using AWS
      - name: Configure AWS credentials via OIDC
        if: steps.list.outputs.stdout
        id: auth
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-region: CHANGEME_AWS_REGION
          role-to-assume: CHANGEME_IAM_ROLE_ARN

      # # Uncomment this if using Google Cloud
      # - name: Authenticate to Google Cloud
      #   if: steps.list.outputs.stdout
      #   id: auth
      #   uses: google-github-actions/auth@v2
      #   with:
      #     workload_identity_provider: CHANGEME_WORKLOAD_IDENTITY_PROVIDER
      #     service_account: CHANGEME_SERVICE_ACCOUNT_EMAIL

      # # Uncomment this if using Microsoft Azure
      # - name: Configure Azure credentials
      #   if: steps.list.outputs.stdout
      #   id: auth
      #   uses: azure/login@v2
      #   with:
      #     client-id: CHANGEME_AZURE_CLIENT_ID
      #     tenant-id: CHANGEME_AZURE_TENANT_ID
      #     subscription-id: CHANGEME_AZURE_SUBSCRIPTION_ID

      - name: Run Terraform init in each changed stacks
        if: steps.list.outputs.stdout
        id: init
        run: |
          terramate run \
            --parallel 1 \
            --changed \
            -- \
            terraform init

      - name: Create Terraform plan on changed stacks
        if: steps.list.outputs.stdout
        id: plan
        run: |
          terramate run \
            --parallel 5 \
            --changed \
            -- \
            terraform plan -lock-timeout=5m -out out.tfplan

      - name: Apply planned changes on changed stacks
        if: steps.list.outputs.stdout
        id: apply
        run: |
          terramate run \
            --parallel 5 \
            --changed \
            --sync-deployment \
            --terraform-plan-file=out.tfplan \
            -- \
            terraform apply -input=false -auto-approve -lock-timeout=5m out.tfplan
        env:
          GITHUB_TOKEN: ${{ github.token }}

      - name: Run drift detection
        if: steps.list.outputs.stdout && ! cancelled() && steps.apply.outcome != 'skipped'
        id: drift
        run: |
          terramate run \
            --parallel 5 \
            --changed \
            --continue-on-error \
            --sync-drift-status \
            --terraform-plan-file=drift.tfplan \
            -- \
            terraform plan -out drift.tfplan -detailed-exitcode
        env:
          GITHUB_TOKEN: ${{ github.token }}
```

```yml [ OpenTofu + Terramate Cloud ]
name: OpenTofu Deployment

on:
  push:
    branches:
      - main

jobs:
  deploy:
    name: Deploy OpenTofu changes in changed Terramate stacks

    permissions:
      id-token: write
      contents: read
      pull-requests: read
      checks: read

    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          ref: ${{ github.head_ref }}
          fetch-depth: 0

      - name: Install Terramate
        uses: terramate-io/terramate-action@v3

      - name: Install OpenTofu
        uses: opentofu/setup-opentofu@v1
        with:
          tofu_version: 1.9.0
          tofu_wrapper: false

      - name: List changed stacks
        id: list
        run: terramate list --changed

      # # Comment this step out if not using AWS
      - name: Configure AWS credentials via OIDC
        if: steps.list.outputs.stdout
        id: auth
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-region: CHANGEME_AWS_REGION
          role-to-assume: CHANGEME_IAM_ROLE_ARN

      # # Uncomment this if using Google Cloud
      # - name: Authenticate to Google Cloud
      #   if: steps.list.outputs.stdout
      #   id: auth
      #   uses: google-github-actions/auth@v2
      #   with:
      #     workload_identity_provider: CHANGEME_WORKLOAD_IDENTITY_PROVIDER
      #     service_account: CHANGEME_SERVICE_ACCOUNT_EMAIL

      # # Uncomment this if using Microsoft Azure
      # - name: Configure Azure credentials
      #   if: steps.list.outputs.stdout
      #   id: auth
      #   uses: azure/login@v2
      #   with:
      #     client-id: CHANGEME_AZURE_CLIENT_ID
      #     tenant-id: CHANGEME_AZURE_TENANT_ID
      #     subscription-id: CHANGEME_AZURE_SUBSCRIPTION_ID

      - name: Run OpenTofu init on changed stacks
        if: steps.list.outputs.stdout
        id: init
        run: |
          terramate run \
            --parallel 1 \
            --changed \
            -- \
            tofu init

      - name: Create OpenTofu plan on changed stacks
        if: steps.list.outputs.stdout
        id: plan
        run: |
          terramate run \
            --parallel 5 \
            --changed \
            -- \
            tofu plan -lock-timeout=5m -out out.otplan

      - name: Apply planned changes on changed stacks
        if: steps.list.outputs.stdout
        id: apply
        run: |
          terramate run \
            --parallel 5 \
            --changed \
            --sync-deployment \
            --tofu-plan-file=out.otplan \
            -- \
            tofu apply -input=false -auto-approve -lock-timeout=5m out.otplan
        env:
          GITHUB_TOKEN: ${{ github.token }}

      - name: Run drift detection
        if: steps.list.outputs.stdout && ! cancelled() && steps.apply.outcome != 'skipped'
        id: drift
        run: |
          terramate run \
            --parallel 5 \
            --changed \
            --continue-on-error \
            --sync-drift-status \
            --tofu-plan-file=drift.otplan \
            -- \
            tofu plan -out drift.otplan -detailed-exitcode
        env:
          GITHUB_TOKEN: ${{ github.token }}
```

```yml [ Terragrunt + Terramate Cloud ]
name: Terragrunt Deployment

on:
  push:
    branches:
      - main

jobs:
  deploy:
    name: Deploy Terragrunt changes in changed Terramate stacks

    permissions:
      id-token: write
      contents: read
      pull-requests: read
      checks: read

    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          ref: ${{ github.head_ref }}
          fetch-depth: 0

      - name: Install Terramate
        uses: terramate-io/terramate-action@v3

      - name: Setup Terragrunt
        uses: autero1/action-terragrunt@v3
        with:
          terragrunt-version: 0.72.6
          token: ${{ github.token }}

      - name: List changed stacks
        id: list
        run: terramate list --changed

      # # Comment this step out if not using AWS
      - name: Configure AWS credentials via OIDC
        if: steps.list.outputs.stdout
        id: auth
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-region: CHANGEME_AWS_REGION
          role-to-assume: CHANGEME_IAM_ROLE_ARN

      # # Uncomment this if using Google Cloud
      # - name: Authenticate to Google Cloud
      #   if: steps.list.outputs.stdout
      #   id: auth
      #   uses: google-github-actions/auth@v2
      #   with:
      #     workload_identity_provider: CHANGEME_WORKLOAD_IDENTITY_PROVIDER
      #     service_account: CHANGEME_SERVICE_ACCOUNT_EMAIL

      # # Uncomment this if using Microsoft Azure
      # - name: Configure Azure credentials
      #   if: steps.list.outputs.stdout
      #   id: auth
      #   uses: azure/login@v2
      #   with:
      #     client-id: CHANGEME_AZURE_CLIENT_ID
      #     tenant-id: CHANGEME_AZURE_TENANT_ID
      #     subscription-id: CHANGEME_AZURE_SUBSCRIPTION_ID

      - name: Run Terragrunt init in each changed stacks
        if: steps.list.outputs.stdout
        id: init
        run: |
          terramate run \
            --parallel 1 \
            --changed \
            -- \
            terragrunt init

      - name: Create Terragrunt plan on changed stacks
        if: steps.list.outputs.stdout
        id: plan
        run: |
          terramate run \
            --parallel 5 \
            --changed \
            -- \
            terragrunt plan -lock-timeout=5m -out out.tfplan

      - name: Apply planned changes on changed stacks
        if: steps.list.outputs.stdout
        id: apply
        run: |
          terramate run \
            --parallel 5 \
            --changed \
            --sync-deployment \
            --terraform-plan-file=out.tfplan \
            --terragrunt \
            -- \
            terragrunt apply -input=false -auto-approve -lock-timeout=5m out.tfplan
        env:
          GITHUB_TOKEN: ${{ github.token }}

      - name: Run drift detection
        if: steps.list.outputs.stdout && ! cancelled() && steps.apply.outcome != 'skipped'
        id: drift
        run: |
          terramate run \
            --parallel 5 \
            --changed \
            --sync-drift-status \
            --continue-on-error \
            --terraform-plan-file=drift.tfplan \
            --terragrunt \
            -- \
            terragrunt plan -out drift.tfplan -detailed-exitcode
        env:
          GITHUB_TOKEN: ${{ github.token }}
```

```yml [ Terraform ]
name: Terraform Deployment

on:
  push:
    branches:
      - main

jobs:
  deploy:
    name: Deploy Terraform changes in changed Terramate stacks

    permissions:
      id-token: write
      contents: read

    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          ref: ${{ github.head_ref }}
          fetch-depth: 0

      - name: Install Terramate
        uses: terramate-io/terramate-action@v3

      - name: Install Terraform
        uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: 1.7.4
          terraform_wrapper: false

      - name: List changed stacks
        id: list
        run: terramate list --changed

      # # Comment this step out if not using AWS
      - name: Configure AWS credentials via OIDC
        if: steps.list.outputs.stdout
        id: auth
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-region: CHANGEME_AWS_REGION
          role-to-assume: CHANGEME_IAM_ROLE_ARN

      # # Uncomment this if using Google Cloud
      # - name: Authenticate to Google Cloud
      #   if: steps.list.outputs.stdout
      #   id: auth
      #   uses: google-github-actions/auth@v2
      #   with:
      #     workload_identity_provider: CHANGEME_WORKLOAD_IDENTITY_PROVIDER
      #     service_account: CHANGEME_SERVICE_ACCOUNT_EMAIL

      # # Uncomment this if using Microsoft Azure
      # - name: Configure Azure credentials
      #   if: steps.list.outputs.stdout
      #   id: auth
      #   uses: azure/login@v2
      #   with:
      #     client-id: CHANGEME_AZURE_CLIENT_ID
      #     tenant-id: CHANGEME_AZURE_TENANT_ID
      #     subscription-id: CHANGEME_AZURE_SUBSCRIPTION_ID

      - name: Run Terraform init in each changed stacks
        if: steps.list.outputs.stdout
        id: init
        run: |
          terramate run \
            --parallel 1 \
            --changed \
            -- \
            terraform init

      - name: Apply planned changes on changed stacks
        if: steps.list.outputs.stdout
        id: apply
        run: |
          terramate run \
            --parallel 5 \
            --changed \
            -- \
            terraform apply -input=false -auto-approve -lock-timeout=5m
```

```yml [ OpenTofu ]
name: OpenTofu Deployment

on:
  push:
    branches:
      - main

jobs:
  deploy:
    name: Deploy OpenTofu changes in changed Terramate stacks

    permissions:
      id-token: write
      contents: read

    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          ref: ${{ github.head_ref }}
          fetch-depth: 0

      - name: Install Terramate
        uses: terramate-io/terramate-action@v3

      - name: Install OpenTofu
        uses: opentofu/setup-opentofu@v1
        with:
          tofu_version: 1.9.0
          tofu_wrapper: false

      - name: List changed stacks
        id: list
        run: terramate list --changed

      # # Comment this step out if not using AWS
      - name: Configure AWS credentials via OIDC
        if: steps.list.outputs.stdout
        id: auth
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-region: CHANGEME_AWS_REGION
          role-to-assume: CHANGEME_IAM_ROLE_ARN

      # # Uncomment this if using Google Cloud
      # - name: Authenticate to Google Cloud
      #   if: steps.list.outputs.stdout
      #   id: auth
      #   uses: google-github-actions/auth@v2
      #   with:
      #     workload_identity_provider: CHANGEME_WORKLOAD_IDENTITY_PROVIDER
      #     service_account: CHANGEME_SERVICE_ACCOUNT_EMAIL

      # # Uncomment this if using Microsoft Azure
      # - name: Configure Azure credentials
      #   if: steps.list.outputs.stdout
      #   id: auth
      #   uses: azure/login@v2
      #   with:
      #     client-id: CHANGEME_AZURE_CLIENT_ID
      #     tenant-id: CHANGEME_AZURE_TENANT_ID
      #     subscription-id: CHANGEME_AZURE_SUBSCRIPTION_ID

      - name: Run OpenTofu init on changed stacks
        if: steps.list.outputs.stdout
        id: init
        run: |
          terramate run \
            --parallel 1 \
            --changed \
            -- \
            tofu init

      - name: Apply planned changes on changed stacks
        if: steps.list.outputs.stdout
        id: apply
        run: |
          terramate run \
            --parallel 5 \
            --changed \
            -- \
            tofu apply -input=false -auto-approve -lock-timeout=5m
```

```yml [ Terragrunt ]
name: Terragrunt Deployment

on:
  push:
    branches:
      - main

jobs:
  deploy:
    name: Deploy Terragrunt changes in changed Terramate stacks

    permissions:
      id-token: write
      contents: read

    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          ref: ${{ github.head_ref }}
          fetch-depth: 0

      - name: Install Terramate
        uses: terramate-io/terramate-action@v3

      - name: Setup Terragrunt
        uses: autero1/action-terragrunt@v3
        with:
          terragrunt-version: 0.72.6
          token: ${{ github.token }}

      - name: List changed stacks
        id: list
        run: terramate list --changed

      # # Comment this step out if not using AWS
      - name: Configure AWS credentials via OIDC
        if: steps.list.outputs.stdout
        id: auth
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-region: CHANGEME_AWS_REGION
          role-to-assume: CHANGEME_IAM_ROLE_ARN

      # # Uncomment this if using Google Cloud
      # - name: Authenticate to Google Cloud
      #   if: steps.list.outputs.stdout
      #   id: auth
      #   uses: google-github-actions/auth@v2
      #   with:
      #     workload_identity_provider: CHANGEME_WORKLOAD_IDENTITY_PROVIDER
      #     service_account: CHANGEME_SERVICE_ACCOUNT_EMAIL

      # # Uncomment this if using Microsoft Azure
      # - name: Configure Azure credentials
      #   if: steps.list.outputs.stdout
      #   id: auth
      #   uses: azure/login@v2
      #   with:
      #     client-id: CHANGEME_AZURE_CLIENT_ID
      #     tenant-id: CHANGEME_AZURE_TENANT_ID
      #     subscription-id: CHANGEME_AZURE_SUBSCRIPTION_ID

      - name: Run Terragrunt init in each changed stacks
        if: steps.list.outputs.stdout
        id: init
        run: |
          terramate run \
            --parallel 1 \
            --changed \
            -- \
            terragrunt init

      - name: Apply planned changes on changed stacks
        if: steps.list.outputs.stdout
        id: apply
        run: |
          terramate run \
            --parallel 5 \
            --changed \
            -- \
            terragrunt apply -input=false -auto-approve -lock-timeout=5m
```

:::
