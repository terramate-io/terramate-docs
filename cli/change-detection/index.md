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

_Uncommitted file_ is a file tracked by the Git index, but its latest changes are not committed to Git yet
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

## Dependency Filters

When using change detection, you can expand or narrow the selection of stacks by including or excluding their dependencies and dependents. This is particularly useful when working with stacks that have data dependencies (e.g., via [outputs sharing](../../orchestration/outputs-sharing.md) or Terragrunt dependency blocks).

Dependency filters work with both:
- **Terramate dependencies**: Stacks that provide outputs consumed by other stacks via `input.from_stack_id`
- **Terragrunt dependencies**: Stacks referenced in Terragrunt `dependency` blocks

### Understanding Dependencies and Dependents

- **Dependencies**: Stacks that the selected stacks depend on (what they need to run)
- **Dependents**: Stacks that depend on the selected stacks (what needs them to run)
- **Direct**: Only immediate dependencies/dependents
- **All (Transitive)**: Direct dependencies/dependents plus all their dependencies/dependents recursively

### Dependency Filter Flags

The following flags are supported by [`terramate list`](../reference/cmdline/list.md), [`terramate run`](../reference/cmdline/run.md), and [`terramate script run`](../reference/cmdline/script/script-run.md):

#### Include Dependencies

- `--include-all-dependencies`: Add all stacks that the selected stacks depend on (direct + transitive) to the selection
- `--include-direct-dependencies`: Add stacks that the selected stacks directly depend on to the selection

#### Replace with Dependencies

- `--only-all-dependencies`: Replace selection with only all stacks that the selected stacks depend on (direct + transitive)
- `--only-direct-dependencies`: Replace selection with only stacks that the selected stacks directly depend on

#### Exclude Dependencies

- `--exclude-all-dependencies`: Remove all stacks that the selected stacks depend on from the selection

#### Include Dependents

- `--include-all-dependents`: Add all stacks that depend on the selected stacks (direct + transitive) to the selection
- `--include-direct-dependents`: Add stacks that directly depend on the selected stacks to the selection

#### Replace with Dependents

- `--only-all-dependents`: Replace selection with only all stacks that depend on the selected stacks (direct + transitive)
- `--only-direct-dependents`: Replace selection with only stacks that directly depend on the selected stacks

#### Exclude Dependents

- `--exclude-all-dependents`: Remove all dependent stacks from the selection

### Examples

**List changed stacks and their dependencies:**
```bash
terramate list --changed --include-all-dependencies
```

**Run commands only on stacks that depend on changed stacks:**
```bash
terramate run --changed --only-all-dependents -- terraform plan
```

**Run commands on changed stacks but exclude their dependencies:**
```bash
terramate run --changed --exclude-all-dependencies -- terraform apply
```

::: info
Only one of `--only-all-dependencies`, `--only-direct-dependencies`, `--only-direct-dependents`, or `--only-all-dependents` can be used at a time, as they replace the selection.
:::

## Integrations

Detecting changed stacks that contain changes only is based on a [Git integration](./integrations/git.md).

Several other integrations exist to cover specific use cases. For example, the [Terraform integration](./integrations/terraform.md)
allows to mark stacks as changed even if they reference local Terraform modules that have changed but are located outside of a stack directory.
