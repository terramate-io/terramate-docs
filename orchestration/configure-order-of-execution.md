---
title: Configure Order of Execution Between Stacks
description: Set explicit before/after ordering rules to control stack execution.
type: how-to
outline: [2, 4]
---

# Configure Order of Execution Between Stacks

## Steps

1) Add ordering metadata in `stack.tm.hcl`:

```hcl
stack {
  after  = ["network/vpc"]
  before = ["apps/api"]
}
```

2) Validate run order:

```sh
terramate list --run-order
```

3) Execute:

```sh
terramate run -- terraform apply
```

## Expected result

- Terramate applies your explicit ordering rules on top of stack hierarchy
