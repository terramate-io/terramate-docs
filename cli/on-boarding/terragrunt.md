---
title: "On-boarding: Terragrunt On-boarding"
description: Import your existing Terragrunt Setup to Terramate
---

# Start with existing Terragrunt Projects

::: info
If you are looking for an actionable and quick guide explaining how to
supercharge any existing Terragrunt project with Terramate in just 5 minutes,
take a look at our most recent [Terramate and Terragrunt guide](https://terramate.io/rethinking-iac/how-terramate-adds-superpowers-to-terragrunt-in-just-5-minutes/).
:::

## Import Existing Terragrunt Stacks

To create Terramate Stacks from existing Terragrunt Modules run the following command.

```bash
terramate create --all-terragrunt
```

This command will detect existing Terragrunt Modules, create a stack configuration in them and will set up the order of execution in `before` and `after` attributes for detected Terragrunt dependencies.

## Terramate Features for Terragrunt Repositories

All Terramate features are now available to your team, so you get the best of both worlds.

The following set of features highlights some special benefits:

- Use Terramate Change Detection to reduce run times of terragrunt commands
- Execute **any** command within stacks imported from terragrunt config.
- Run Terragrunt in any CI/CD following the Terramate Automation Blueprints and examples.
- Make use of Terramates advanced Code Generation and Globals to share data more easily.
- Use Terragrunt and plain Terraform side-by-side.
- Synchronize deployments, drift runs, and previews to **Terramate Cloud** and get
  - Visibility of the Health of all Terragrunt Modules over multiple repositories
  - Drift Detection in all Stacks
  - Pull Request Previews for actual changes
  - Notifications on deployment failures or newly detected drifts
  - Advanced collaboration and alert routing

## Options

The Terragrunt change detection is automatically enabled if the project contains any
Terragrunt stack but this behavior can be turned off using the configuration below:

```hcl
terramate {
  config {
    change_detection {
      terragrunt {
        enabled = "off"
      }
    }
  }
}
```

The valid options for `terramate.config.change_detection.terragrunt.enabled` are:

- `"auto"` (_default_): Only enables Terragrunt change detection if a Terragrunt stack is detected.
- `"force"`: Run the Terragrunt change detection all the time.
- `"off"`: Disables the Terragrunt change detection.

## Run Terragrunt Commands

Since you are using Terramate to orchestrate Terragrunt now, the `terragrunt run-all` command is not needed anymore and you can replace it with `terramate run -- terragrunt <cmd>` to execute terragrunt within single stacks.

The main benefit you get is to be able to make use of Terramates advanced Change Detection and other filters to orchestrate Terragrunt execution and also any other tooling inside of the stacks.

### List all Stacks

After importing Stacks imported from Terragrunt are not special compared to other stacks.
Any Terramate CLI Feature is now available in those Stacks and you can run any commands within the stacks.

```bash
terramate list
```

### Init Terraform with Terragrunt

```bash
terramate run -- terragrunt init
```

### Create a Terraform Plan with Terragrunt in parallel

```bash
terramate run --parallel 5 -- terragrunt plan -out plan.tfplan
```

### Apply a Terraform Plan with Terragrunt in Changed Stacks

```bash
terramate run --changed -- terragrunt apply -auto-approve plan.tfplan
```
