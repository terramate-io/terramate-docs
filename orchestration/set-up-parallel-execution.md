---
title: Set Up Parallel Execution
description: Configure parallel command execution across independent stacks.
type: how-to
outline: [2, 4]
---

# Set Up Parallel Execution

## Steps

1) Run commands in parallel:

```sh
terramate run --parallel 5 -- terraform plan
```

2) For scripts:

```sh
terramate script run --parallel 5 deploy
```

3) Tune concurrency (`--parallel N`) based on runner capacity and provider rate limits.

## Expected result

- Independent stacks run concurrently
- Execution order constraints are still respected
