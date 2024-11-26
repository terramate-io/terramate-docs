---
title: How to use Terramate to automate and orchestrate Terraform Deployments in GitHub Actions
description: Learn how to use Terramate to configure custom GitOps workflows to automate and orchestrate Terraform and OpenTofu Deployments in GitHub Actions.
---

# Run a Deployment in GitHub Actions

The following workflows are blueprints and need some adjustments to work for you.

Search for `CHANGEME` to adjust needed credentials details for AWS and Google Cloud examples.

## Terramate Cloud support

When synchronizing deployments to Terramate Cloud it is recommended to run a drift check right after the deployment.
This drift check will be used to judge the health of the deployment even if the deployment succeeded if can show a drift right away.

## Deployment Blueprints

Create the following GitHub Actions configuration at `.github/workflows/deploy.yml`

::: code-group

```yml [ AWS + Terramate Cloud ]
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
          fetch-depth: 0

      - name: Install Terramate
        uses: terramate-io/terramate-action@v2

      - name: Install Terraform
        uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: 1.7.4
          terraform_wrapper: false

      - name: List changed stacks
        id: list
        run: terramate list --changed

      - name: Configure AWS credentials via OIDC
        if: steps.list.outputs.stdout
        id: auth
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-region: 'CHANGEME: AWS REGION'
          role-to-assume: 'CHANGEME: IAM ROLE ARN'

      - name: Run Terraform init in each changed stacks
        if: steps.list.outputs.stdout
        id: init
        run: |
          terramate run \
            --changed \
            -- \
            terraform init

      - name: Create Terraform plan on changed stacks
        if: steps.list.outputs.stdout
        id: plan
        run: |
          terramate run \
            --changed \
            -- \
            terraform plan -lock-timeout=5m -out out.tfplan

      - name: Apply planned changes on changed stacks
        if: steps.list.outputs.stdout
        id: apply
        run: |
          terramate run \
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
            --changed \
            --sync-drift-status \
            --terraform-plan-file=drift.tfplan \
            -- \
            terraform plan -out drift.tfplan -detailed-exitcode
        env:
          GITHUB_TOKEN: ${{ github.token }}
```

```yml [ GCP + Terramate Cloud ]
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
          fetch-depth: 0

      - name: Install Terramate
        uses: terramate-io/terramate-action@v2

      - name: Install Terraform
        uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: 1.7.4
          terraform_wrapper: false

      - name: List changed stacks
        id: list
        run: terramate list --changed

      - name: Authenticate to Google Cloud via OIDC
        if: steps.list.outputs.stdout
        id: auth
        uses: google-github-actions/auth@v2
        with:
          workload_identity_provider: 'CHANGEME: WORKLOAD IDENTITY PROVIDER ID'
          service_account: 'CHANGEME: SERVICE ACCOUNT EMAIL'

      - name: Run Terraform init on changed stacks
        if: steps.list.outputs.stdout
        id: init
        run: |
          terramate run \
            --changed \
            -- \
            terraform init

      - name: Create Terraform plan on changed stacks
        if: steps.list.outputs.stdout
        id: plan
        run: |
          terramate run \
            --changed \
            -- \
            terraform plan -lock-timeout=5m -out out.tfplan

      - name: Apply planned changes on changed stacks
        if: steps.list.outputs.stdout
        id: apply
        run: |
          terramate run \
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
            --changed \
            --sync-drift-status \
            --terraform-plan-file=drift.tfplan \
            -- \
            terraform plan -out drift.tfplan -detailed-exitcode
        env:
          GITHUB_TOKEN: ${{ github.token }}
```

```yml [ AWS ]
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
          fetch-depth: 0

      - name: Install Terramate
        uses: terramate-io/terramate-action@v2

      - name: Install Terraform
        uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: 1.7.4
          terraform_wrapper: false

      - name: List changed stacks
        id: list
        run: terramate list --changed

      - name: Configure AWS credentials via OIDC
        if: steps.list.outputs.stdout
        id: auth
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-region: 'CHANGEME: AWS REGION'
          role-to-assume: 'CHANGEME: IAM ROLE ARN'

      - name: Run Terraform init on changed stacks
        if: steps.list.outputs.stdout
        id: init
        run: |
          terramate run \
            --changed \
            -- \
            terraform init

      - name: Apply changes on changed stacks
        id: apply
        if: steps.list.outputs.stdout
        run: |
          terramate run \
            --changed \
            -- \
            terraform apply -input=false -auto-approve -lock-timeout=5m
```

```yml [ GCP ]
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
          fetch-depth: 0

      - name: Install Terramate
        uses: terramate-io/terramate-action@v2

      - name: Install Terraform
        uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: 1.7.4

      - name: List changed stacks
        id: list
        run: terramate list --changed

      - name: Authenticate to Google Cloud via OIDC
        if: steps.list.outputs.stdout
        id: auth
        uses: google-github-actions/auth@v2
        with:
          workload_identity_provider: 'CHANGEME: WORKLOAD IDENTITY PROVIDER ID'
          service_account: 'CHANGEME: SERVICE ACCOUNT EMAIL'

      - name: Run terraform init in all changed stacks
        if: steps.list.outputs.stdout
        id: init
        run: terramate run --changed -- terraform init

      - name: Apply changes on changed stacks
        id: apply
        if: steps.list.outputs.stdout
        run: |
          terramate run \
            --changed \
            -- \
            terraform apply -input=false -auto-approve -lock-timeout=5m
```
:::
