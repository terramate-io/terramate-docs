---
title: Change Detection
description: Learn about the fundamental concept of Change Detection in Terramate.
---

# Change Detection

When working with multiple stacks, a common challenge is to execute commands in stacks that contain changes only to
preserve a **small blast radius** and **fast execution run times**.

That's why Terramate CLI comes with a change detection feature that can detect stacks containing changes in a commit, branch, or Pull Request.

## Introduction

The change detection is enabled by providing the `--changed` option to commands such as [`run`](../reference/cmdline/run.md) or
[`list`](../reference/cmdline/list.md) and can be configured to use a specific branch as a reference.

E.g., to list all stacks that contain changes:

```sh
terramate list --changed
```

Since `v0.11.0` untracked and uncommitted files are also considered changes.

::: info
_Untracked file_ is a file which isn't tracked by the Git index

_Uncommitted file_ means Git knows about them but the latest changes in them are not committed to Git yet.
:::

The change detection behavior can be customized in the configuration or by command-line flags.

Example:

```hcl
terramate {
  config {
    change_detection {
      git {
        # valid options: true, "on", false, "off"
        untracked   = "off"
        uncommitted = "off"
      }
    }
  }
}
```

Use `--enable-change-detection=<options>` and `--disable-change-detection=<options>` to override the default settings and configuration. These flags are supported in the commands listed below (refer to their documentation for usage):

- [`terramate list`](../reference/cmdline/list.md)
- [`terramate run`](../reference/cmdline/run.md)
- [`terramate script run`](../reference/cmdline/script/script-run.md)

## Integrations

Detecting changed stacks that contain changes only is based on a [Git integration](./integrations/git.md).

Several other integrations exist to cover specific use cases. For example, the [Terraform integration](./integrations/terraform.md)
allows to mark stacks as changed even if they reference local Terraform modules that have changed but are located outside of a stack directory.
