---
title: Synchronize Drift Checks from CLI
description: Learn how to synchronize drift status with Terramate CLI to Terramate Cloud.
---

# Synchronize Drift Checks from CLI

To display deployments on Terramate Cloud, we need to synchronize their status and details.

If you are already using [Terramate CLI](../../cli/installation.md) to orchestrate your stacks, the configuration needed to synchronize deployments is minimal.

You can synchronize deployments using [`terramate run`](../../cli/reference/cmdline/run.md) or reduce the overhead on the caller side by using [Terramate Scripts](../../cli/orchestration/scripts.md), such as `terramate script run`, which triggers deployment sync automatically.

## Required Permission

To run the command on a local machine, execute `terramate cloud login` first. In CI/CD environments, Terramate CLI will use OpenID Connect (OIDC) tokens to authenticate to the cloud.

To gather metadata from GitHub about the pull request associated with the preview, expose a `GITHUB_TOKEN` or have a valid GitHub CLI configuration available.

## `terramate run`

The [run](../../cli/reference/cmdline/run.md) command in Terramate CLI offers some command line options to synchronize drift status information to Terramate Cloud.

- `--sync-drift-status` Synchronizes the drift status and logs to Terramate Cloud
- `--terraform-plan-file FILE` A Terraform integration that allows synchronization of details about the changed, added, or deleted Terraform Resources that were planned and define the drift between code and cloud.

::: tip
Use the following command to synchronize the full status of your stacks to Terramate Cloud.
Ensure that you are also authenticated with your CI/CD e.g. GitHub to collect all metadata.
:::

The full command line to run a drift check looks like the following:

```bash
terramate run \
  --sync-drift-status \
  --terraform-plan-file out.tfplan \
  --continue-on-error \
  terraform plan -out out.tfplan -detailed-exitcode
```

It is recommended to create a Terramate Script as explained in the next section, to provide an easy interface for users that can be used on local machines the same way as in CI/CD automated environments.
This way the options do not need to be added and memorized.

In case communication with Terramate Cloud fails, the drift check will continue as expected but the drift details might not be fully synchronized with Terramate Cloud.
Warning messages will help you identify any problems.
