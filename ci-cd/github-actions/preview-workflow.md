---
title: How to use Terramate to automate and orchestrate Terraform Previews in GitHub Actions
description: Learn how to use Terramate to configure custom GitOps workflows to automate and orchestrate Terraform and OpenTofu Previews in GitHub Actions.
---

# Run a Preview in GitHub Actions

The following workflows are blueprints and need some adjustments to work for you.

Note:
<!-- insert a quick video or pictures describing PR-level -->
<!-- plan sanitization -->
<!-- how exactly does terramate cloud work -->
<!-- what data Terramate Cloud has access to -->
<!-- install App for GitHub note -->

Search for `CHANGEME` to adjust needed credentials details for AWS, Google Cloud, and Azure examples.

## Terramate Cloud support

When synchronizing previews to Terramate Cloud, previews will be synchronized with a detailed status and can be reviewed on a stack level.

## Preview Blueprints

Create the following GitHub Actions configuration at `.github/workflows/preview.yml`

::: warning

Ensure that you are explicitly disabling the `wrapper` option when using the Terraform or OpenTofu Setup GitHub Action!

::: code-group

```yml [ Terraform ]
- uses: hashicorp/setup-terraform@v3
  with:
    terraform_wrapper: false
```

```yml [ OpenTofu ]
- uses: opentofu/setup-opentofu@v1
  with:
    tofu_wrapper: false
```
:::

Please select the tab that fits your use case. Currently available use cases are:
- Terraform + Terramate Cloud
- OpenTofu + Terramate Cloud
- Terragrunt + Terramate Cloud
- Terraform
- OpenTofu
- Terragrunt

::: code-group

````yml [ Terraform + Terramate Cloud ]
name: Terraform Preview

on:
  pull_request:

jobs:
  preview:
    name: Plan Terraform changes in changed Terramate stacks
    runs-on: ubuntu-latest

    permissions:
      id-token: write
      contents: read
      pull-requests: write
      checks: read

    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          ref: ${{ github.head_ref }}
          fetch-depth: 0

      - name: Install Terramate
        uses: terramate-io/terramate-action@v3
        with:
          version: "0.14.0"

      - name: Install Terraform
        uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: 1.12.2
          terraform_wrapper: false

      - name: Check Terramate formatting
        run: terramate fmt --check

      - name: Check Terraform formatting
        run: terraform fmt -recursive -check -diff

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

      - name: Initialize Terraform in changed stacks
        if: steps.list.outputs.stdout
        id: init
        run: |
          terramate run \
           --parallel 1 \
           --changed \
           -- \
           terraform init -lock-timeout=5m

      - name: Validate Terraform configuration in changed stacks
        if: steps.list.outputs.stdout
        id: validate
        run: |
          terramate run \
            --parallel 5 \
            --changed \
            -- \
            terraform validate

      - name: Plan Terraform changes in changed stacks
        if: steps.list.outputs.stdout
        id: plan
        run: |
          terramate run \
            --parallel 5 \
            --changed \
            --sync-preview \
            --terraform-plan-file=out.tfplan \
            --continue-on-error \
            -- \
            terraform plan -out out.tfplan -detailed-exitcode -lock=false
        env:
          GITHUB_TOKEN: ${{ github.token }}
````

````yml [ OpenTofu + Terramate Cloud ]
name: OpenTofu Preview

on:
  pull_request:

jobs:
  preview:
    name: Plan OpenTofu changes in changed Terramate stacks
    runs-on: ubuntu-latest

    permissions:
      id-token: write
      contents: read
      pull-requests: write
      checks: read

    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          ref: ${{ github.head_ref }}
          fetch-depth: 0

      - name: Install Terramate
        uses: terramate-io/terramate-action@v3
        with:
          version: "0.14.0"

      - name: Install OpenTofu
        uses: opentofu/setup-opentofu@v1
        with:
          tofu_version: 1.10.3
          tofu_wrapper: false

      - name: Check Terramate formatting
        run: terramate fmt --check

      - name: Check OpenTofu formatting
        run: tofu fmt -recursive -check -diff

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

      - name: Initialize OpenTofu in changed stacks
        if: steps.list.outputs.stdout
        id: init
        run: |
          terramate run \
           --parallel 1 \
           --changed \
           -- \
           tofu init -lock-timeout=5m

      - name: Validate OpenTofu configuration in changed stacks
        if: steps.list.outputs.stdout
        id: validate
        run: |
          terramate run \
            --parallel 5 \
            --changed \
            -- \
            tofu validate

      - name: Plan OpenTofu changes in changed stacks
        if: steps.list.outputs.stdout
        id: plan
        run: |
          terramate run \
            --parallel 5 \
            --changed \
            --sync-preview \
            --tofu-plan-file=out.otplan \
            --continue-on-error \
            -- \
            tofu plan -out out.otplan -detailed-exitcode -lock=false
        env:
          GITHUB_TOKEN: ${{ github.token }}
````

````yml [ Terragrunt + Terramate Cloud ]
name: Terragrunt Preview

on:
  pull_request:

jobs:
  preview:
    name: Plan Terragrunt changes in changed Terramate stacks
    runs-on: ubuntu-latest

    permissions:
      id-token: write
      contents: read
      pull-requests: write
      checks: read

    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          ref: ${{ github.head_ref }}
          fetch-depth: 0

      - name: Install Terramate
        uses: terramate-io/terramate-action@v3
        with:
          version: "0.14.0"

      # Comment this out if not using Terraform
      - name: Install Terraform
        uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: 1.12.2
          terraform_wrapper: false

      # Uncomment this if using OpenTofu
      # - name: Install OpenTofu
      #   uses: opentofu/setup-opentofu@v1
      #   with:
      #     tofu_version: 1.10.3
      #     tofu_wrapper: false

      - name: Setup Terragrunt
        uses: autero1/action-terragrunt@v3
        with:
          terragrunt-version: 0.83.2
          token: ${{ github.token }}

      - name: Check Terramate formatting
        run: terramate fmt --check

      - name: Check Terragrunt formatting
        run: terragrunt fmt --terragrunt-check

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

      - name: Initialize Terragrunt in changed stacks
        if: steps.list.outputs.stdout
        id: init
        run: |
          terramate run \
           --parallel 1 \
           --changed \
           -- \
           terragrunt init -lock-timeout=5m

      - name: Validate Terragrunt configuration in changed stacks
        if: steps.list.outputs.stdout
        id: validate
        run: |
          terramate run \
            --parallel 5 \
            --changed \
            -- \
            terragrunt validate

      - name: Plan Terragrunt changes in changed stacks
        if: steps.list.outputs.stdout
        id: plan
        run: |
          terramate run \
            --parallel 5 \
            --changed \
            --sync-preview \
            --terraform-plan-file=out.tfplan \
            --terragrunt \
            --continue-on-error \
            -- \
            terragrunt plan -out out.tfplan -detailed-exitcode -lock=false
        env:
          GITHUB_TOKEN: ${{ github.token }}
````

````yml [ Terraform ]
name: Terraform Preview

on:
  pull_request:

jobs:
  preview:
    name: Plan Terraform changes in changed Terramate stacks
    runs-on: ubuntu-latest

    permissions:
      id-token: write
      contents: read
      pull-requests: write
      checks: read

    steps:
      - name: Prepare pull request preview comment
        if: github.event.pull_request
        uses: marocchino/sticky-pull-request-comment@v2
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          header: preview
          message: |
            ## Preview of Terraform changes in ${{ github.event.pull_request.head.sha }}

            :warning: preview is being created... please stand by!

      - name: Checkout
        uses: actions/checkout@v4
        with:
          ref: ${{ github.head_ref }}
          fetch-depth: 0

      - name: Install Terramate
        uses: terramate-io/terramate-action@v3
        with:
          version: "0.14.0"

      - name: Install Terraform
        uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: 1.12.2
          terraform_wrapper: false

      - name: Check Terramate formatting
        run: terramate fmt --check

      - name: Check Terraform formatting
        run: terraform fmt -recursive -check -diff

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

      - name: Initialize Terraform in changed stacks
        if: steps.list.outputs.stdout
        id: init
        run: |
          terramate run \
            --parallel 1 \
            --changed \
            -- \
            terraform init -lock-timeout=5m

      - name: Validate Terraform configuration in changed stacks
        if: steps.list.outputs.stdout
        id: validate
        run: |
          terramate run \
            --parallel 5 \
            --changed \
            -- \
            terraform validate

      - name: Plan Terraform changes in changed stacks
        if: steps.list.outputs.stdout
        id: plan
        run: |
          terramate run \
            --parallel 5 \
            --changed \
            --continue-on-error \
            -- \
            terraform plan -out out.tfplan -lock=false

      # # Note: Due to a limitation in the size of a GitHub PR comment (65,536 characters), we are truncating the output if it's too long. For better and complete previews or changes consider Terramate Cloud.
      # # Note: Depending on the setup, you may need to add pr-comment.txt to your .gitignore to avoid any failures
      - name: Generate preview details
        if: steps.list.outputs.stdout
        id: comment
        run: |
          echo >>pr-comment.txt "## Preview of Terraform changes in ${{ github.event.pull_request.head.sha }}"
          echo >>pr-comment.txt
          echo >>pr-comment.txt "### Changed Stacks"
          echo >>pr-comment.txt
          echo >>pr-comment.txt '```bash'
          echo >>pr-comment.txt "${{ steps.list.outputs.stdout }}"
          echo >>pr-comment.txt '```'
          echo >>pr-comment.txt
          echo >>pr-comment.txt "#### Terraform Plan"
          echo >>pr-comment.txt
          echo >>pr-comment.txt '```terraform'
          terramate run --changed -- terraform show -no-color out.tfplan |& dd bs=1024 count=248 >>pr-comment.txt
          [ "${PIPESTATUS[0]}" == "141" ] && sed -i 's/#### Terraform Plan/#### :warning: Terraform Plan truncated: please check console output :warning:/' pr-comment.txt
          echo >>pr-comment.txt '```'
          cat pr-comment.txt >>$GITHUB_STEP_SUMMARY

      - name: Generate preview when no stacks changed
        if: success() && !steps.list.outputs.stdout
        run: |
          echo >>pr-comment.txt "## Preview of Terraform changes in ${{ github.event.pull_request.head.sha }}"
          echo >>pr-comment.txt
          echo >>pr-comment.txt "### Changed Stacks"
          echo >>pr-comment.txt
          echo >>pr-comment.txt 'No changed stacks, no detailed preview will be generated.'
          cat pr-comment.txt >>$GITHUB_STEP_SUMMARY

      - name: Generate preview when things failed
        if: always() && failure()
        run: |
          echo >>pr-comment.txt "## Preview of Terraform changes in ${{ github.event.pull_request.head.sha }}"
          echo >>pr-comment.txt
          echo >>pr-comment.txt "### Changed Stacks"
          echo >>pr-comment.txt
          echo >>pr-comment.txt '```bash'
          echo >>pr-comment.txt "${{ steps.list.outputs.stdout }}"
          echo >>pr-comment.txt '```'
          echo >>pr-comment.txt ':boom: Generating preview failed. Please see details in Actions output.'
          cat pr-comment.txt >>$GITHUB_STEP_SUMMARY

      - name: Publish generated preview as GitHub commnent
        uses: marocchino/sticky-pull-request-comment@v2
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          header: preview
          path: pr-comment.txt
````

````yml [ OpenTofu ]
name: OpenTofu Preview

on:
  pull_request:

jobs:
  preview:
    name: Plan OpenTofu changes in changed Terramate stacks
    runs-on: ubuntu-latest

    permissions:
      id-token: write
      contents: read
      pull-requests: write
      checks: read

    steps:
      - name: Prepare pull request preview comment
        if: github.event.pull_request
        uses: marocchino/sticky-pull-request-comment@v2
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          header: preview
          message: |
            ## Preview of OpenTofu changes in ${{ github.event.pull_request.head.sha }}

            :warning: preview is being created... please stand by!

      - name: Checkout
        uses: actions/checkout@v4
        with:
          ref: ${{ github.head_ref }}
          fetch-depth: 0

      - name: Install Terramate
        uses: terramate-io/terramate-action@v3
        with:
          version: "0.14.0"

      - name: Install OpenTofu
        uses: opentofu/setup-opentofu@v1
        with:
          tofu_version: 1.10.3
          tofu_wrapper: false

      - name: Check Terramate formatting
        run: terramate fmt --check

      - name: Check OpenTofu formatting
        run: tofu fmt -recursive -check -diff

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

      - name: Initialize OpenTofu in changed stacks
        if: steps.list.outputs.stdout
        id: init
        run: |
          terramate run \
            --parallel 1 \
            --changed \
            -- \
            tofu init -lock-timeout=5m

      - name: Validate OpenTofu configuration in changed stacks
        if: steps.list.outputs.stdout
        id: validate
        run: |
          terramate run \
            --parallel 5 \
            --changed \
            -- \
            tofu validate

      - name: Plan OpenTofu changes in changed stacks
        if: steps.list.outputs.stdout
        id: plan
        run: |
          terramate run \
            --parallel 5 \
            --changed \
            --continue-on-error \
            -- \
            tofu plan -out out.otplan -lock=false

      # # Note: Due to a limitation in the size of a GitHub PR comment (65,536 characters), we are truncating the output if it's too long. For better and complete previews or changes consider Terramate Cloud.
      # # Note: Depending on the setup, you may need to add pr-comment.txt to your .gitignore to avoid any failures
      - name: Generate preview details
        if: steps.list.outputs.stdout
        id: comment
        run: |
          echo >>pr-comment.txt "## Preview of OpenTofu changes in ${{ github.event.pull_request.head.sha }}"
          echo >>pr-comment.txt
          echo >>pr-comment.txt "### Changed Stacks"
          echo >>pr-comment.txt
          echo >>pr-comment.txt '```bash'
          echo >>pr-comment.txt "${{ steps.list.outputs.stdout }}"
          echo >>pr-comment.txt '```'
          echo >>pr-comment.txt
          echo >>pr-comment.txt "#### OpenTofu Plan"
          echo >>pr-comment.txt
          echo >>pr-comment.txt '```terraform'
          terramate run --changed -- tofu show -no-color out.otplan |& dd bs=1024 count=248 >>pr-comment.txt
          [ "${PIPESTATUS[0]}" == "141" ] && sed -i 's/#### OpenTofu Plan/#### :warning: OpenTofu Plan truncated: please check console output :warning:/' pr-comment.txt
          echo >>pr-comment.txt '```'
          cat pr-comment.txt >>$GITHUB_STEP_SUMMARY

      - name: Generate preview when no stacks changed
        if: success() && !steps.list.outputs.stdout
        run: |
          echo >>pr-comment.txt "## Preview of OpenTofu changes in ${{ github.event.pull_request.head.sha }}"
          echo >>pr-comment.txt
          echo >>pr-comment.txt "### Changed Stacks"
          echo >>pr-comment.txt
          echo >>pr-comment.txt 'No changed stacks, no detailed preview will be generated.'
          cat pr-comment.txt >>$GITHUB_STEP_SUMMARY

      - name: Generate preview when things failed
        if: always() && failure()
        run: |
          echo >>pr-comment.txt "## Preview of OpenTofu changes in ${{ github.event.pull_request.head.sha }}"
          echo >>pr-comment.txt
          echo >>pr-comment.txt "### Changed Stacks"
          echo >>pr-comment.txt
          echo >>pr-comment.txt '```bash'
          echo >>pr-comment.txt "${{ steps.list.outputs.stdout }}"
          echo >>pr-comment.txt '```'
          echo >>pr-comment.txt ':boom: Generating preview failed. Please see details in Actions output.'
          cat pr-comment.txt >>$GITHUB_STEP_SUMMARY

      - name: Publish generated preview as GitHub commnent
        uses: marocchino/sticky-pull-request-comment@v2
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          header: preview
          path: pr-comment.txt
````

````yml [ Terragrunt ]
name: Terragrunt Preview

on:
  pull_request:

jobs:
  preview:
    name: Plan Terragrunt changes in changed Terramate stacks
    runs-on: ubuntu-latest

    permissions:
      id-token: write
      contents: read
      pull-requests: write
      checks: read

    steps:
      - name: Prepare pull request preview comment
        if: github.event.pull_request
        uses: marocchino/sticky-pull-request-comment@v2
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          header: preview
          message: |
            ## Preview of Terragrunt changes in ${{ github.event.pull_request.head.sha }}

            :warning: preview is being created... please stand by!

      - name: Checkout
        uses: actions/checkout@v4
        with:
          ref: ${{ github.head_ref }}
          fetch-depth: 0

      - name: Install Terramate
        uses: terramate-io/terramate-action@v3
        with:
          version: "0.14.0"

      # Comment this out if not using Terraform
      - name: Install Terraform
        uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: 1.12.2
          terraform_wrapper: false

      # Uncomment this if using OpenTofu
      # - name: Install OpenTofu
      #   uses: opentofu/setup-opentofu@v1
      #   with:
      #     tofu_version: 1.10.3
      #     tofu_wrapper: false

      - name: Setup Terragrunt
        uses: autero1/action-terragrunt@v3
        with:
          terragrunt-version: 0.83.2
          token: ${{ github.token }}

      - name: Check Terramate formatting
        run: terramate fmt --check

      - name: Check Terragrunt formatting
        run: terragrunt fmt --terragrunt-check

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

      - name: Initialize Terragrunt in changed stacks
        if: steps.list.outputs.stdout
        id: init
        run: |
          terramate run \
            --parallel 1 \
            --changed \
            -- \
            terragrunt init -lock-timeout=5m

      - name: Validate Terragrunt configuration in changed stacks
        if: steps.list.outputs.stdout
        id: validate
        run: |
          terramate run \
            --parallel 5 \
            --changed \
            -- \
            terragrunt validate

      - name: Plan Terragrunt changes in changed stacks
        if: steps.list.outputs.stdout
        id: plan
        run: |
          terramate run \
            --parallel 5 \
            --changed \
            --continue-on-error \
            -- \
            terragrunt plan -out out.tfplan -lock=false

      # # Note: Due to a limitation in the size of a GitHub PR comment (65,536 characters), we are truncating the output if it's too long. For better and complete previews or changes consider Terramate Cloud.
      # # Note: Depending on the setup, you may need to add pr-comment.txt to your .gitignore to avoid any failures
      - name: Generate preview details
        if: steps.list.outputs.stdout
        id: comment
        run: |
          echo >>pr-comment.txt "## Preview of Terragrunt changes in ${{ github.event.pull_request.head.sha }}"
          echo >>pr-comment.txt
          echo >>pr-comment.txt "### Changed Stacks"
          echo >>pr-comment.txt
          echo >>pr-comment.txt '```bash'
          echo >>pr-comment.txt "${{ steps.list.outputs.stdout }}"
          echo >>pr-comment.txt '```'
          echo >>pr-comment.txt
          echo >>pr-comment.txt "#### Terragrunt Plan"
          echo >>pr-comment.txt
          echo >>pr-comment.txt '```terraform'
          terramate run --changed -- terragrunt show out.tfplan |& dd bs=1024 count=248 >>pr-comment.txt
          [ "${PIPESTATUS[0]}" == "141" ] && sed -i 's/#### Terragrunt Plan/#### :warning: Terragrunt Plan truncated: please check console output :warning:/' pr-comment.txt
          echo >>pr-comment.txt '```'
          cat pr-comment.txt >>$GITHUB_STEP_SUMMARY

      - name: Generate preview when no stacks changed
        if: success() && !steps.list.outputs.stdout
        run: |
          echo >>pr-comment.txt "## Preview of Terragrunt changes in ${{ github.event.pull_request.head.sha }}"
          echo >>pr-comment.txt
          echo >>pr-comment.txt "### Changed Stacks"
          echo >>pr-comment.txt
          echo >>pr-comment.txt 'No changed stacks, no detailed preview will be generated.'
          cat pr-comment.txt >>$GITHUB_STEP_SUMMARY

      - name: Generate preview when things failed
        if: always() && failure()
        run: |
          echo >>pr-comment.txt "## Preview of Terragrunt changes in ${{ github.event.pull_request.head.sha }}"
          echo >>pr-comment.txt
          echo >>pr-comment.txt "### Changed Stacks"
          echo >>pr-comment.txt
          echo >>pr-comment.txt '```bash'
          echo >>pr-comment.txt "${{ steps.list.outputs.stdout }}"
          echo >>pr-comment.txt '```'
          echo >>pr-comment.txt ':boom: Generating preview failed. Please see details in Actions output.'
          cat pr-comment.txt >>$GITHUB_STEP_SUMMARY

      - name: Publish generated preview as GitHub commnent
        uses: marocchino/sticky-pull-request-comment@v2
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          header: preview
          path: pr-comment.txt
````

:::
