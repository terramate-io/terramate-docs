---
title: Using Terraform CLI Workspaces | How-to Guide
description: Learn how to manage environments using Terraform CLI Workspaces with Terramate.

---

# Using Workspaces

## Introduction

Different environments for deployments are essential for gradually rolling out changes and testing new features in one environment (e.g., testing) before applying them to another environment (e.g. production). To achieve this, you must isolate your state files for each environment. In Terraform/OpenTofu, you can do this using Workspaces or File Layouts, each with pros and cons.

## Workspaces

Terraform Workspaces enable you to make multiple deployments using the same stack by isolating the state files for each deployment. This separation ensures that the state files for each deployment are stored in different locations, allowing the same infrastructure code to support multiple environments.

When using different Terraform Workspaces, you can use the [`target`](../../cli/reference/cmdline/run.md#tmc-deployment-targets) option in Terramate to sync your deployments as distinct targets on Terramate Cloud. This feature treats each deployment with a different target as a separate entity on Terramate Cloud.

## Steps

1. Enable the experimental target feature by setting the project config option `terramate.config.experiments= ["targets"]`  before following the below steps.

2. Create a new project, add a couple of stacks, and sync to the Terramate Cloud by following the quick-start guide up-to this [step](../../cli/getting-started/index.md#login-from-cli)

3. List Available Terraform Workspaces in the bob stack:

```bash
cd stacks/bob

terraform workspace list

Sync the default workspace as the default target to Terramate Cloud:

terramate run \               
  --sync-drift-status \
  --terraform-plan-file deploy.tfplan \
  --target default \
  -- \
  terraform plan -out deploy.tfplan -detailed-exitcode
```

4. Create a new workspace `prod`:

 ```bash
 terraform workspace new prod
 ``` 

5. Sync the Workspace as the `prd` target:

    - It doesn't recognize the null resource created earlier in the default workspace as the state files are isolated.

    - target name (`prd`) can be different from workspace name (`prod`).

```bash
terramate run \
  --sync-drift-status \
  --terraform-plan-file plan.tfplan \
  --target prd \
  -- \
  terraform plan -out deploy.tfplan -detailed-exitcode
```

6. Run the `apply` command:

```bash
terramate run \
  --sync-deployment \
  --target prd \
  -- \
  terraform apply -input=false -auto-approve -lock-timeout=5m deploy.tfplan
```

7. Verify Successful Deployment:

    - A successful deployment is shown in the Terramate Cloud dashboard.

    - Note that the target is `prd` for the `bob` stack in the stacks pane.

