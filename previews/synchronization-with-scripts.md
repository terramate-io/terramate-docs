---
title: Synchronize Pull Request Previews in Automation
description: Learn how to create a Terramate Script to synchronize pull request previews with Terramate CLI to Terramate Cloud in automation.
---

# Synchronize Pull Request Previews via Scripts

::: warning
Pull Request Previews are currently only supported in GitHub Actions.
More integrations are on the roadmap.
:::

The following Terramate Script is a template that can be used as a starting point for creating a flow that synchronizes previews to Terramate Cloud.

## Required Permissions

To gather metadata from GitHub about the pull request associated with the preview, a `GITHUB_TOKEN` needs to be exposed or a valid GitHub CLI configuration needs to be available.

## Command Options

The following options are available in Terramate Scripts and mirror the CLI options with the name:

- Set `sync_preview = true` to let Terramate CLI know about the command that is doing the actual preview and return a detailed exit status to define a successful run that has changed or has no changes detected.
- Set `terraform_plan_file` to the name of the terraform plan to synchronize the deployment details.
- Set `tofu_plan_file` to the name of the tofu plan to synchronize the deployment details.
- Set `terragrunt = true` to use terragrunt for the plan file generation.

## Terramate Script Config for Terraform

The script is executed with `terramate script run --changed terraform preview` to synchronize previews for all changed stacks in a pull request.

```hcl
script "terraform" "preview" {
  name        = "Terraform Deployment Preview"
  description = "Create a preview of Terraform Changes and synchronize it to Terramate Cloud."

  job {
    name        = "Terraform Plan"
    description = "Initialize, validate, and plan Terraform changes."
    commands = [
      ["terraform", "init", "-lock-timeout=5m"],
      ["terraform", "validate"],
      ["terraform", "plan", "-out", "preview.tfplan", "-detailed-exitcode", "-lock=false", {
        sync_preview             = true
        terraform_plan_file = "preview.tfplan"
      }],
    ]
  }
}
```

## Terramate Script Config for OpenTofu

The script is executed with `terramate script run --changed tofu preview` to synchronize previews for all changed stacks in a pull request.

```hcl
script "tofu" "preview" {
  name        = "Tofu Deployment Preview"
  description = "Create a preview of Tofu Changes and synchronize it to Terramate Cloud."

  job {
    name        = "Tofu Plan"
    description = "Initialize, validate, and plan Tofu changes."
    commands = [
      ["tofu", "init", "-lock-timeout=5m"],
      ["tofu", "validate"],
      ["tofu", "plan", "-out", "preview.tfplan", "-detailed-exitcode", "-lock=false", {
        sync_preview   = true
        tofu_plan_file = "preview.tfplan"
      }],
    ]
  }
}
```
