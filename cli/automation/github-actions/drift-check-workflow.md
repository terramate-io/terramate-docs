---
title: How to use Terramate to automate and orchestrate Terraform Drift Checks in GitHub Actions
description: Learn how to use Terramate to configure custom GitOps workflows to automate and orchestrate Terraform and OpenTofu Drift Checks in GitHub Actions.
---

# Run a Drift Check in GitHub Actions

The following workflows are blueprints and need some adjustments to work for you.

Search for `CHANGEME` to adjust needed credentials details for AWS, Google Cloud, and Azure examples.

Drift Checks require action and protocolling the results, so Terramate Cloud support is required for those workflows at the moment.

The following workflow examples run every day at 2 am.

## Terramate Cloud support

When synchronizing drift checks to Terramate Cloud, the following features will support the team with handling drifts:

- Get notified on new drifts via Slack notifications.
- Highlight and identify drifted stacks in the Stacks List and Dashboard.
- See drift details without requiring your team to have elevated access to read the Terraform state or have access to read the cloud resources.
- Identify the time when a drift happened and how long a stack stayed in a drifted state.
- Create automation to reconcile a drift without human interaction using the `--status` filter in Terramate CLI.

## Deployment Blueprints

Create the following GitHub Actions configuration at `.github/workflows/drift.yml`

Please select the tab that fits your use case. Currently available use cases are:
- Terraform + Terramate Cloud
- OpenTofu + Terramate Cloud
- Terragrunt + Terramate Cloud

::: code-group

````yml [ Terraform + Terramate Cloud ]
name: Scheduled Terraform Drift Detection

on:
  schedule:
    - cron: '0 2 * * *'

jobs:
  drift-detection:
    name: Check Drift

    runs-on: ubuntu-latest

    permissions:
      id-token: write
      contents: read
      pull-requests: read
      checks: read

    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          ref: ${{ github.head_ref }}
          fetch-depth: 0

      - name: Install Terramate
        uses: terramate-io/terramate-action@v2

      - name: Install Terraform
        uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: 1.7.4
          terraform_wrapper: false

      # # Comment this step out if not using AWS
      - name: Configure AWS credentials via OIDC
        id: auth
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-region: CHANGEME_AWS_REGION
          role-to-assume: CHANGEME_IAM_ROLE_ARN

      # # Uncomment this if using Google Cloud
      # - name: Authenticate to Google Cloud
      #   id: auth
      #   uses: google-github-actions/auth@v2
      #   with:
      #     workload_identity_provider: CHANGEME_WORKLOAD_IDENTITY_PROVIDER
      #     service_account: CHANGEME_SERVICE_ACCOUNT_EMAIL

      # # Uncomment this if using Microsoft Azure
      # - name: Configure Azure credentials
      #   id: auth
      #   uses: azure/login@v2
      #   with:
      #     client-id: CHANGEME_AZURE_CLIENT_ID
      #     tenant-id: CHANGEME_AZURE_TENANT_ID
      #     subscription-id: CHANGEME_AZURE_SUBSCRIPTION_ID

      - name: Initialize Terraform
        id: init
        run: |
          terramate run \
           --parallel 1 \
           -- \
           terraform init -lock-timeout=5m

      - name: Run drift detection
        id: drift
        run: |
          terramate run \
          --sync-drift-status \
          --terraform-plan-file=drift.tfplan \
          --continue-on-error \
          --parallel 5 \
          -- \
          terraform plan -out drift.tfplan -detailed-exitcode -lock=false
        env:
          GITHUB_TOKEN: ${{ github.token }}

      # # Optional step to reconcile (apply) the drifted stacks
      # # This only applies to stack with a `reconcile` tag by default
      # # Uncomment if desired
      # - name: Check for auto reconcile
      #   id: find-drifted
      #   run: |
      #     terramate list \
      #       --status=drifted \
      #       --tags reconcile
      #
      # - name: Drift reconciliation
      #   id: drift-reconcile
      #   if: steps.find-drifted.outputs.stdout
      #   run: |
      #     terramate run \
      #       --status=drifted \
      #       --tags reconcile \
      #       --parallel 5 \
      #       --sync-deployment \
      #       --terraform-plan-file=drift.tfplan \
      #       -- \
      #       terraform apply -input=false -auto-approve -lock-timeout=5m drift.tfplan
      #   env:
      #     GITHUB_TOKEN: ${{ github.token }}
````

````yml [ OpenTofu + Terramate Cloud ]
name: Scheduled OpenTofu Drift Detection

on:
  schedule:
    - cron: '0 2 * * *'

jobs:
  drift-detection:
    name: Check Drift

    runs-on: ubuntu-latest

    permissions:
      id-token: write
      contents: read
      pull-requests: read
      checks: read

    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          ref: ${{ github.head_ref }}
          fetch-depth: 0

      - name: Install Terramate
        uses: terramate-io/terramate-action@v2

      - name: Install OpenTofu
        uses: opentofu/setup-opentofu@v1
        with:
          tofu_version: 1.9.0
          tofu_wrapper: false

      # # Comment this step out if not using AWS
      - name: Configure AWS credentials via OIDC
        id: auth
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-region: CHANGEME_AWS_REGION
          role-to-assume: CHANGEME_IAM_ROLE_ARN

      # # Uncomment this if using Google Cloud
      # - name: Authenticate to Google Cloud
      #   id: auth
      #   uses: google-github-actions/auth@v2
      #   with:
      #     workload_identity_provider: CHANGEME_WORKLOAD_IDENTITY_PROVIDER
      #     service_account: CHANGEME_SERVICE_ACCOUNT_EMAIL

      # # Uncomment this if using Microsoft Azure
      # - name: Configure Azure credentials
      #   id: auth
      #   uses: azure/login@v2
      #   with:
      #     client-id: CHANGEME_AZURE_CLIENT_ID
      #     tenant-id: CHANGEME_AZURE_TENANT_ID
      #     subscription-id: CHANGEME_AZURE_SUBSCRIPTION_ID

      - name: Initialize OpenTofu
        id: init
        run: |
          terramate run \
           --parallel 1 \
           -- \
           tofu init -lock-timeout=5m

      - name: Run drift detection
        id: drift
        run: |
          terramate run \
            --parallel 5 \
            --sync-drift-status \
            --continue-on-error \
            --tofu-plan-file=drift.otplan \
            -- \
            tofu plan -out drift.otplan -detailed-exitcode -lock=false
        env:
          GITHUB_TOKEN: ${{ github.token }}

      # # Optional step to reconcile (apply) the drifted stacks
      # # This only applies to stack with a `reconcile` tag by default
      # # Uncomment if desired
      # - name: Check for auto reconcile
      #   id: find-drifted
      #   run: |
      #     terramate list \
      #       --status=drifted \
      #       --tags reconcile
      #
      # - name: Drift reconciliation
      #   id: drift-reconcile
      #   if: steps.find-drifted.outputs.stdout
      #   run: |
      #     terramate run \
      #       --status=drifted \
      #       --tags reconcile \
      #       --parallel 5 \
      #       --sync-deployment \
      #       --tofu-plan-file=drift.otplan \
      #       -- \
      #       tofu apply -input=false -auto-approve -lock-timeout=5m drift.otplan
      #   env:
      #     GITHUB_TOKEN: ${{ github.token }}
````

````yml [ Terragrunt + Terramate Cloud ]
name: Scheduled Terragrunt Drift Detection

on:
  schedule:
    - cron: '0 2 * * *'

jobs:
  drift-detection:
    name: Check Drift

    runs-on: ubuntu-latest

    permissions:
      id-token: write
      contents: read
      pull-requests: read
      checks: read

    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          ref: ${{ github.head_ref }}
          fetch-depth: 0

      - name: Install Terramate
        uses: terramate-io/terramate-action@v2

      - name: Setup Terragrunt
        uses: autero1/action-terragrunt@v3
        with:
          terragrunt-version: 0.72.6
          token: ${{ github.token }}

      # # Comment this step out if not using AWS
      - name: Configure AWS credentials via OIDC
        id: auth
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-region: CHANGEME_AWS_REGION
          role-to-assume: CHANGEME_IAM_ROLE_ARN

      # # Uncomment this if using Google Cloud
      # - name: Authenticate to Google Cloud
      #   id: auth
      #   uses: google-github-actions/auth@v2
      #   with:
      #     workload_identity_provider: CHANGEME_WORKLOAD_IDENTITY_PROVIDER
      #     service_account: CHANGEME_SERVICE_ACCOUNT_EMAIL

      # # Uncomment this if using Microsoft Azure
      # - name: Configure Azure credentials
      #   id: auth
      #   uses: azure/login@v2
      #   with:
      #     client-id: CHANGEME_AZURE_CLIENT_ID
      #     tenant-id: CHANGEME_AZURE_TENANT_ID
      #     subscription-id: CHANGEME_AZURE_SUBSCRIPTION_ID

      - name: Initialize Terragrunt
        id: init
        run: |
          terramate run \
           --parallel 1 \
           -- \
           terragrunt init -lock-timeout=5m

      - name: Run drift detection
        id: drift
        run: |
          terramate run \
            --parallel 5 \
            --sync-drift-status \
            --continue-on-error \
            --terraform-plan-file=drift.tfplan \
            --terragrunt \
            -- \
            terragrunt plan -out drift.tfplan -detailed-exitcode -lock=false
        env:
          GITHUB_TOKEN: ${{ github.token }}

      # # Optional step to reconcile (apply) the drifted stacks
      # # This only applies to stack with a `reconcile` tag by default
      # # Uncomment if desired
      # - name: Check for auto reconcile
      #   id: find-drifted
      #   run: |
      #     terramate list \
      #       --status=drifted \
      #       --tags reconcile
      #
      # - name: Drift reconciliation
      #   id: drift-reconcile
      #   if: steps.find-drifted.outputs.stdout
      #   run: |
      #     terramate run \
      #       --status=drifted \
      #       --tags reconcile \
      #       --parallel 5 \
      #       --sync-deployment \
      #       --terraform-plan-file=drift.tfplan \
      #       --terragrunt \
      #       -- \
      #       terragrunt apply -input=false -auto-approve -lock-timeout=5m drift.tfplan
      #   env:
      #     GITHUB_TOKEN: ${{ github.token }}
````

:::
