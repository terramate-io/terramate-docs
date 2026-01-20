---
title: terramate script run - Command
description: Execute a Terramate Script in all stacks or in a filtered subset of stacks by using the `terramate script run` command.
---

# Script Run

::: info Note
This is an experimental feature that might be subject to change in the future. To use it now, you must enable the project config option `terramate.config.experiments = ["scripts"]`
:::

## Overview

A [script](../../../orchestration/scripts.md#introduction) is a collection of different commands which are part of a workflow.
You can run a single `script run` command to run all the commands of the script block as one single executable unit without having to run them one by one.

## Usage

`terramate script run [options] CMD...`

`CMD` needs to match the label defined in the script block. For example:

```
script "mycommand" {
...
}
```
The above script can be run with `script run mycommand`.

Scripts follow the same inheritance rules as globals and will only run where:

- The script is defined or inherited.
- The specified filters (`--changed`, `--tags`, etc.) match.

### Options

- **`--changed`**
Runs the script on stacks with changes.

- **`--tags=tags`**
Runs the script on stacks with specific tags.

- **`--disable-change-detection=mode`**
Disables change detection for uncommitted files or other modes.

- **`--continue-on-error`**
Continues executing the script even if errors occur.

- **`--dry-run`**
Shows what would happen without executing the script.

- **`--no-recursive`**
Runs the script only in the current stack without traversing subdirectories.

- **`--status=status`**
Filters stacks based on Terramate Cloud status (e.g., `unhealthy`).

- **`--reverse`**
Runs the script in reverse order across stacks.

### Dependency Filters

These flags allow you to expand or narrow the selection of stacks by including or excluding their dependencies and dependents. They work with both Terramate dependencies (via `input.from_stack_id` for [outputs sharing](../../../orchestration/outputs-sharing.md)) and Terragrunt dependencies (via `dependency` blocks). See the [Change Detection dependency filters](../../../change-detection/index.md#dependency-filters) documentation for details.

#### Include Dependencies

- **`--include-all-dependencies`**: Add all stacks that the selected stacks depend on (direct + transitive) to the selection
- **`--include-direct-dependencies`**: Add stacks that the selected stacks directly depend on to the selection

#### Replace with Dependencies

- **`--only-all-dependencies`**: Replace selection with only all stacks that the selected stacks depend on (direct + transitive)
- **`--only-direct-dependencies`**: Replace selection with only stacks that the selected stacks directly depend on

#### Exclude Dependencies

- **`--exclude-all-dependencies`**: Remove all stacks that the selected stacks depend on from the selection

#### Include Dependents

- **`--include-all-dependents`**: Add all stacks that depend on the selected stacks (direct + transitive) to the selection
- **`--include-direct-dependents`**: Add stacks that directly depend on the selected stacks to the selection

#### Replace with Dependents

- **`--only-all-dependents`**: Replace selection with only all stacks that depend on the selected stacks (direct + transitive)
- **`--only-direct-dependents`**: Replace selection with only stacks that directly depend on the selected stacks

#### Exclude Dependents

- **`--exclude-all-dependents`**: Remove all dependent stacks from the selection

::: info
Only one of `--only-all-dependencies`, `--only-direct-dependencies`, `--only-direct-dependents`, or `--only-all-dependents` can be used at a time, as they replace the selection.
:::

### Examples

**Run a script called `deploy` on all stacks where it is available:**
```bash
terramate script run deploy
```

**Run the `deploy` script on all changed stacks:**
```bash
terramate script run --changed deploy
```

**Run the `deploy` script on all changed stacks, ignoring uncommitted files:**
```bash
terramate script run --changed --disable-change-detection=git-uncommitted deploy
```

**Run the `deploy` script on all changed stacks and continue on error:**
```bash
terramate script run --changed --continue-on-error deploy
```

**Perform a dry run of the `deploy` script:**
```bash
terramate script run --dry-run deploy
```

**Run the `deploy` script in a specific stack without recursing into subdirectories:**
```bash
terramate -C path/to/stack script run --no-recursive deploy
```

**Run a script in all stacks with a specific Terramate Cloud status (`unhealthy`):**
```bash
terramate script run --status=unhealthy deploy
```

**Run the `destroy` script on all stacks in reverse order:**
```bash
terramate script run --reverse destroy
```

**Run the `deploy` script on changed stacks and their dependencies:**
```bash
terramate script run --changed --include-all-dependencies deploy
```

**Run the `deploy` script only on stacks that depend on changed stacks:**
```bash
terramate script run --changed --only-all-dependents deploy
```
