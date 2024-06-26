---
title: Synchronize Deployments via Scripts
description: Learn how to create a Terramate Script to synchronize deployment status, logs and details with Terramate CLI to Terramate Cloud in automation.
---

# Synchronize Deployments via Scripts

The following Terramate Script is a template that can be used as a starting point for creating a unified execution flow when deploying stacks in automation or via the CLI (manual).

It guarantees that the deployment status is always synchronized to Terramate Cloud.

## Required Permission

To run the script on the local machine `terramate cloud login` needs to be executed before.
When run in CI/CD, Terramate CLI will pick up the OpenID Connect (OIDC) tokens and authenticate to the cloud.

To gather metadata from GitHub about the pull request associated with the deployment, a `GITHUB_TOKEN` needs to be exposed or a valid GitHub CLI configuration needs to be available.

## Command Options

The following options are available in Terramate Scripts and mirror the CLI options with the name:

- Set `sync_deployment = true` to let Terramate CLI know about the command that is doing the actual deployment.
- Set `terraform_plan_file` to the name of the terraform plan to synchronize the deployment details.
- Set `tofu_plan_file` to the name of the tofu plan to synchronize the deployment details.
- Set `terragrunt = true` to use terragrunt for the plan file generation.

## Terramate Script Config for Terraform

The script is executed with `terramate script run terraform deploy`.

```hcl
script "terraform" "deploy" {
  name        = "Terraform Deployment"
  description = "Run a full Terraform deployment cycle and synchronize the result to Terramate Cloud."

  job {
    name        = "Terraform Apply"
    description = "Initialize, validate, plan, and apply Terraform changes."
    commands = [
      ["terraform", "init", "-lock-timeout=5m"],
      ["terraform", "validate"],
      ["terraform", "plan", "-out", "plan.tfplan", "-lock=false"],
      ["terraform", "apply", "-input=false", "-auto-approve", "-lock-timeout=5m", "plan.tfplan", {
        sync_deployment          = true
        terraform_plan_file = "plan.tfplan"
      }],
    ]
  }
}
```

## Terramate Script Config for OpenTofu

The script is executed with `terramate script run tofu deploy`.

```hcl
script "tofu" "deploy" {
  name        = "Tofu Deployment"
  description = "Run a full Tofu deployment cycle and synchronize the result to Terramate Cloud."

  job {
    name        = "Tofu Apply"
    description = "Initialize, validate, plan, and apply Tofu changes."
    commands = [
      ["tofu", "init", "-lock-timeout=5m"],
      ["tofu", "validate"],
      ["tofu", "plan", "-out", "plan.tfplan", "-lock=false"],
      ["tofu", "apply", "-input=false", "-auto-approve", "-lock-timeout=5m", "plan.tfplan", {
        sync_deployment  = true
        tofu_plan_file   = "plan.tfplan"
      }],
    ]
  }
}
```
