---
title: sharing_backend | Block | Configuration Language
description: Learn how to configure an outputs sharing backend using the sharing_backend block.
---

# The `sharing_backend` block

Use the `sharing_backend` block to configure a backend that enables [outputs sharing](../../orchestration/outputs-sharing.md) between stacks. The `sharing_backend` block binds `input` and `output` blocks and defines how stack outputs are collected and distributed.

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

- **label** _(required)_ - A name for this sharing backend, referenced by `input` and `output` blocks.

- `type` _(required, keyword)_ - The type of backend. Currently only `terraform` is supported (also works with OpenTofu).

- `filename` _(required, string)_ - The filename used to generate the input and output code (e.g., Terraform `variable` and `output` blocks).

- `command` _(required, list of strings)_ - The command invoked to extract stack outputs. The command output **must** be a JSON object.

## Syntax

```hcl
sharing_backend "default" {
  type     = terraform
  filename = "sharing_generated.tf"
  command  = ["terraform", "output", "-json"]
}
```

## Examples

### Share outputs between Terraform stacks

```hcl
sharing_backend "default" {
  type     = terraform
  filename = "sharing_generated.tf"
  command  = ["terraform", "output", "-json"]
}
```

### Share outputs between OpenTofu stacks

```hcl
sharing_backend "tofu" {
  type     = terraform
  filename = "sharing_generated.tf"
  command  = ["tofu", "output", "-json"]
}
```

## See also

- [Outputs Sharing guide](../../orchestration/outputs-sharing.md)
- [input block](./input.md)
- [output block](./output.md)
