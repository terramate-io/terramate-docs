---
title: Run Commands Across Changed Stacks Only
description: Use change detection with terramate run/list to target only modified stacks.
type: how-to
outline: [2, 4]
---

# Run Commands Across Changed Stacks Only

## Steps

1) List changed stacks:

```sh
terramate list --changed
```

2) Run a command only in changed stacks:

```sh
terramate run --changed -- terraform plan
```

3) Optionally include dependencies:

```sh
terramate run --changed --include-all-dependencies -- terraform plan
```

## Expected result

- Commands run only where changes are detected
- Optional dependency expansion includes required upstream/downstream stacks

## Related explanation

- [Change Detection Model](/explanations/change-detection)
