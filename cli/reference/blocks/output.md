---
title: output | Block | Configuration Language
description: Learn how to define stack outputs for outputs sharing using the output block.
---

# The `output` block

Use the `output` block to define values that a stack exports for consumption by other stacks via [outputs sharing](../../orchestration/outputs-sharing.md). When `terramate generate` is run, `output` blocks are translated into the appropriate code for the configured backend (e.g., Terraform `output` blocks).

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

- **label** _(required)_ - The name of the output.

- `backend` _(required, string)_ - The name of the `sharing_backend` that this output refers to.

- `value` _(required, expression)_ - The expression that exports the stack's resource value.

- `description` _(optional, string)_ - A description of the output.

- `sensitive` _(optional, boolean)_ - Marks the output value as sensitive. Only generated when set.

## Syntax

```hcl
output "vpc_id" {
  backend   = "default"
  value     = module.vpc.id
}
```

## Examples

### Export a VPC ID

```hcl
output "vpc_id" {
  backend     = "default"
  value       = module.vpc.id
  description = "The AWS VPC ID"
  sensitive   = false
}
```

## See also

- [Outputs Sharing guide](../../orchestration/outputs-sharing.md)
- [sharing_backend block](./sharing-backend.md)
- [input block](./input.md)
