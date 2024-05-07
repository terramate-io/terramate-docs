---
title: Get Started with Terramate and Terraform
description: Learn how to onboard Terramate to any existing Terraform project with a single command.
---

# Get started with Terramate and Terraform

This page will teach you how to onboard Terramate to an existing Terraform project.

Terramate can be added to any existing Terraform project with a single command
and without changing any existing configuration, making the onboarding **seamless**
and **fast**.

::: tip
If instead, you'd like to learn how to get started with Terramate from scratch, take a look at our
[Getting Started Guide](../getting-started/index.md).
:::

<!-- The following sections will teach you how to:
- Import Terraform root modules as Terramate stacks
- Orchestrate  -->

## Import Existing Terraform Stacks

To onboard Terramate to an existing Terraform project, you first need to import your Terraform root modules into Terramate.

```bash
terramate create --all-terraform
```

This command will detect existing Terraform root modules and create a stack configuration in them, which Terramate
requires to identify a Terraform root module as a stack.

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
