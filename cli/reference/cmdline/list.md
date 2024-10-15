---
title: terramate list - Command
description: List all stacks or apply filters to selectively list stacks in the current repository by using the `terramate list` command.
---

# List

The `terramate list` command lists all Terramate stacks in the current directory recursively. These can be additionally filtered based on Terramate Cloud status with the `--status=<status>` filter (valid statuses are documented on the [trigger page](./experimental/experimental-trigger.md))

## Usage

`terramate list [options]`

## Examples

### List all stacks in the current directory recursively:

```bash
terramate list
```

### List all stacks in the current directory sorted by order of execution:

```bash
terramate list --run-order
```

### Explicitly change the working directory:

```bash
terramate list --chdir path/to/directory
```

### List all stacks below the current directory that have a "drifted" status on Terramate Cloud

```bash
terramate list --status=drifted
```

### List all changed stacks ignoring untracked files

```
terramate list --changed --disable-change-detection=git-untracked
```

## Options

- `-C, --chdir=<path>`: Set the working directory.
- `-B, --git-change-base=<ref>`: Specify the Git base ref for computing changes.
- `-c, --changed`: Filter stacks by changed infrastructure.
- `--enable-change-detection=<options>`: Enable specific change detection features. Possible values are (multiple options supported): 'git-untracked', 'git-uncommitted'.
- `--disable-change-detection=<options>`: Disable specific change detection features (multiple options supported): 'git-untracked', 'git-uncommitted'.
- `--tags=<tags>`: Filter stacks by tags. Use ":" for logical AND and "," for logical OR. Examples:
  - `--tags=app:prod` filters stacks containing tag "app" AND "prod".
  - If multiple `--tags` options are provided, an OR expression is created. Example: `--tags=a --tags=b` is the same as `--tags=a,b`.
- `--no-tags=<no-tags>`: Filter stacks that do not have the given tags.
- `--log-level=<level>`: Set the log level. Possible values include 'disabled', 'trace', 'debug', 'info', 'warn', 'error', or 'fatal'.
- `--log-fmt=<format>`: Choose the log format. Options are 'console', 'text', or 'json'.
- `--log-destination=<destination>`: Set the destination of log messages. Default is `stderr`.
- `--quiet`: Disable output.
- `-v, --verbose=<level>`: Increase the verbosity of the output. The level is optional and defaults to 0 if not specified.
- `--why`: Show the reason why a stack has changed.
- `--status=<status>`: Filter by status on Terramate Cloud.
  - If the experimental deployment targets option is enabled, `--target` is required (see [run](./run#tmc-deployment-targets)).
- `--run-order`: Sort stacks by order of execution.****
