---
title: terramate trigger - Command
description: Mark a stacks as changed so they will be triggered in Change Detection by using the `terramate trigger` command.
---

# Trigger

The `terramate trigger` command forcibly marks a stack as "changed" even if it doesn't contain any code changes according to the
[change detection](/orchestration/change-detection/index.md). It does this by creating a file (by default in `/.tmtriggers`)
which should then be committed. `terramate run` will then execute commands against any stacks that have been triggered
in the last commit (as well as any other changed stacks).

The trigger mechanism has various use cases. It may be that a previous CI/CD run failed or that you have detected a drift between the code and the actual state. For those using Terramate Cloud, the additional `--status=<status>` argument can be used to trigger stacks that are in one of the following states:

| Status      | Meaning                                                                  |
| ----------- | ------------------------------------------------------------------------ |
| `ok`        | The stack is not drifted and the last deployment succeeded               |
| `failed`    | The last deployment of the stack failed so the status is unknown         |
| `drifted`   | The actual state is different from that defined in the code of the stack  |
| `unhealthy` | This meta state matches any undesirable state (failed, drifted etc)      |
| `healthy`   | This meta state matches stacks that have no undesirable state            |

## Usage

```sh
terramate trigger [options] <stack-path>
```

## Examples

### Trigger a stack as changed

```bash
terramate trigger /path/to/stack
```

### Trigger all drifted stacks as changed

```bash
terramate trigger --status=drifted
```

### Recursively trigger stacks to ignore them.

```bash
terramate trigger some/path --recursive --ignore-change
```

## Ignore Trigger

When you make cosmetic changes to one or more stacks that don't affect the managed resources, you can use the `--ignore-change` flag to trigger those stacks to remain unchanged.
This flag configures the change detection to ignore these stacks in the next Pull Request and deployment.

```bash
terramate trigger /path/to/stack --ignore-change
```

## Options

- `--status <status>`: Trigger all stacks filtered by status on Terramate Cloud.
- `--recursive`: recursively triggers all nested stacks starting from the targeted stack.
- `--change` (*default*): Trigger a stack to configure change detection, marking it as changed.
- `--ignore-change`: Trigger a stack to configure change detection, marking it unchanged in the next run.
