---
title: Get started with Terramate and Terraform
description: Learn how to onboard Terramate to any existing Terraform project with a single command.
---

# Get started with Terramate and Terraform

This page will teach you how to onboard Terramate to an existing Terraform project.

One of Terramate's features is that you can onboard Terramate to any existing Terraform project with a single command
and without changing any existing configuration, making the onboarding **seamless**
and **fast**.

::: tip
If instead, you'd like to learn how to get started with Terramate from scratch, take a look at our
[Getting Started Guide](https://terramate.io/docs/cli/getting-started/).
:::

The following sections will teach you how to:

## Import Existing Terraform Stacks

To onboard Terramate to any existing Terraform project, the first step you need to take is to import your Terraform root
modules to Terramate. The following command will detect all root modules available in your repository and create a
`stack.tm.hcl` file in each root detected root module. This file is used to configure the metadata and orchestration behavior
of a stack in Terramate.

```bash
terramate create --all-terraform
```

This command will detect existing Terraform root modules and create a stack configuration in them, which is required for
Terramate to identify a Terraform root module as a stack. This allows you to

## Create a Cloud Account

## Sync your stacks to Terramate Cloud

## Terramate Features for Terraform Repositories

All Terramate features are now available to your team.

The following set of features highlights some special benefits:

- Use Terramate Change Detection to orchestrate Terraform in an efficient way
- Execute **any** command within stacks imported from terraform configuration.
- Run Terraform in any CI/CD following the Terramate Automation Blueprints and examples.
- Make use of Terramates advanced Code Generation and Globals to share data more easily.
- Synchronize deployments, drift runs, and previews to **Terramate Cloud** and get
  - Visibility of the Health of all Terraform Configurations over multiple repositories
  - Drift Detection in all Stacks
  - Pull Request Previews for actual changes
  - Notifications on deployment failures or newly detected drifts
  - Advanced collaboration and alert routing

## Run Terraform Commands

### List all Stacks

Any Terramate CLI Feature is now available in your Stacks.

```bash
terramate list
```

### Init Terraform

```bash
terramate run -- terraform init
```

### Create a Terraform Plan in parallel

```bash
terramate run --parallel 5 -- terraform plan -out plan.tfplan
```

### Apply a Terraform Plan in Changed Stacks

```bash
terramate run --changed -- terraform apply -out plan.tfplan -auto-approve
```
