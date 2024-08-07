---
title: Synchronize Drift Checks via Scripts
description: Learn how to create a Terramate Script to synchronize drift status with Terramate CLI to Terramate Cloud in automation or from local machines.
---

# Synchronize Drift Checks via Scripts

The following Terramate Script is a template that can be used as a starting point for creating a unified execution flow when checking stacks for drifts in automation or via the CLI (manual).

It guarantees that the drift status of each stack is always synchronized to Terramate Cloud.

## Required Permission

To run the command on a local machine, execute `terramate cloud login` first. In CI/CD environments, Terramate CLI will use OpenID Connect (OIDC) tokens to authenticate to the cloud.

To gather metadata from GitHub about the pull request associated with the preview, expose a `GITHUB_TOKEN` or have a valid GitHub CLI configuration available.

## Command Options

The following options are available in Terramate Scripts and mirror the CLI options with the name:

- Set `sync_drift_status = true` to let Terramate CLI know about the command that is doing the actual drift check and returns a detailed exit status to define a successful run that has changed or has no changes detected.
- Set `terraform_plan_file` to the name of the terraform plan to synchronize the deployment details.
- Set `tofu_plan_file` to the name of the tofu plan to synchronize the deployment details.
- Set `terragrunt = true` to use terragrunt for the plan file generation.

## Terramate Script Config for Terraform

The script is executed with `terramate script run terraform detect-drift`.

```hcl
script "terraform" "detect-drift" {
  name        = "Terraform Drift Check"
  description = "Detect drifts in Terraform configuration and synchronize it to Terramate Cloud."

  job {
    name        = "Terraform Plan"
    description = "Initialize, validate, and plan Terraform changes."
    commands = [
      ["terraform", "init", "-lock-timeout=5m"],
      ["terraform", "plan", "-out", "drift.tfplan", "-detailed-exitcode", "-lock=false", {
        sync_drift_status        = true
        terraform_plan_file = "drift.tfplan"
      }],
    ]
  }
}
```

## Terramate Script Config for OpenTofu

The script is executed with `terramate script run tofu detect-drift`.

```hcl
script "tofu" "detect-drift" {
  name        = "Tofu Drift Check"
  description = "Detect drifts in Tofu configuration and synchronize it to Terramate Cloud."

  job {
    name        = "Tofu Plan"
    description = "Initialize, validate, and plan Tofu changes."
    commands = [
      ["tofu", "init", "-lock-timeout=5m"],
      ["tofu", "plan", "-out", "drift.tfplan", "-detailed-exitcode", "-lock=false", {
        sync_drift_status        = true
        tofu_plan_file = "drift.tfplan"
      }],
    ]
  }
}
```
