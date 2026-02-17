---
title: input | Block | Configuration Language
description: Learn how to define stack inputs for outputs sharing using the input block.
---

# The `input` block

Use the `input` block to define values that a stack depends on from other stacks. When `terramate generate` is run, `input` blocks are translated into the appropriate code for the configured backend (e.g., Terraform `variable` blocks).

::: info
Outputs Sharing is an experimental feature. To use this block, enable the experiment in your Terramate configuration:

```hcl
terramate {
  config {
    experiments = ["outputs-sharing"]
  }
}
```

:::

## Arguments

- **label** _(required)_ - The name of the input variable.

- `backend` _(required, string)_ - The name of the `sharing_backend` that this input refers to.

- `from_stack_id` _(required, string)_ - The stack ID of the stack whose outputs this input depends on.

- `value` _(required, expression)_ - An expression that computes this input at runtime from the referenced stack's outputs.

- `sensitive` _(optional, boolean)_ - Marks the input value as sensitive. Only generated when set.

- `mock` _(optional, any)_ - A fallback value used when the dependency stack's outputs are not yet applied (useful for previewing planned changes).

## Syntax

```hcl
input "vpc_id" {
  backend       = "default"
  from_stack_id = "vpc"
  value         = outputs.vpc_id.value
}
```

## Examples

### Import a VPC ID from another stack

```hcl
input "vpc_id" {
  backend       = "default"
  from_stack_id = "vpc"
  value         = outputs.vpc_id.value
}
```

### Use a mock value for plan previews

```hcl
input "vpc_id" {
  backend       = "default"
  from_stack_id = "vpc"
  value         = outputs.vpc_id.value
  mock          = "vpc-mock-id"
}
```

## See also

- [Outputs Sharing guide](../../orchestration/outputs-sharing.md)
- [sharing_backend block](./sharing-backend.md)
- [output block](./output.md)
