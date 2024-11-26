---
title: How to use Terramate to automate and orchestrate Terraform Drift Checks in GitHub Actions
description: Learn how to use Terramate to configure custom GitOps workflows to automate and orchestrate Terraform and OpenTofu Drift Checks in GitHub Actions.
---

# Run a Drift Check in GitHub Actions

The following workflows are blueprints and need some adjustments to work for you.

Search for `CHANGEME` to adjust needed credentials details for AWS and Google Cloud examples.

Drift Checks require action and protocolling the results, so Terramate Cloud support is required for those workflows at the moment.

The following workflows run every day at 2 am.

## Terramate Cloud support

When synchronizing drift checks to Terramate Cloud, the following features will support the team with handling drifts:

- Get notified on new drifts via Slack notifications.
- Highlight and identify drifted stacks in the Stacks List and Dashboard
- See drift details without requiring your team to have elevated access to read the Terraform state or have access to read the cloud resources.
- Identify the time when a drift happened and how long a stack stayed in a drifted state.
- Create automation to reconcile a drift without human interaction using the `--status` filter in Terramate CLI.

## Deployment Blueprints

Create the following GitHub Actions configuration at `.github/workflows/drift.yml`

::: code-group

```yml [ AWS + Terramate Cloud ]
name: Scheduled Terraform Drift Detection

on:
  schedule:
    - cron: '0 2 * * *'

jobs:
  drift-detection:
    name: Check Drift

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
        uses: terramate-io/terramate-action@v2

      - name: Install Terraform
        uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: 1.7.4
          terraform_wrapper: false

      - name: Configure AWS credentials via OIDC
        id: auth
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-region: 'CHANGEME: AWS REGION'
          role-to-assume: 'CHANGEME: IAM ROLE ARN'

      - name: Run Terraform init on all stacks
        id: init
        run: terramate run -- terraform init

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
```

```yml [ GCP + Terramate Cloud ]
name: Scheduled Terraform Drift Detection

on:
  schedule:
    - cron: '0 2 * * *'

jobs:
  drift-detection:
    name: Check Drift

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
        uses: terramate-io/terramate-action@v2

      - name: Install Terraform
        uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: 1.7.4
          terraform_wrapper: false

      - name: Authenticate to Google Cloud via OIDC
        id: auth
        uses: google-github-actions/auth@v2
        with:
          workload_identity_provider: 'CHANGEME: WORKLOAD IDENTITY PROVIDER ID'
          service_account: 'CHANGEME: SERVICE ACCOUNT EMAIL'

      - name: Run Terraform init on all stacks
        id: init
        run: terramate run -C stacks -- terraform init

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
```
:::
