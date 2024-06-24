---
title: stack | Block | Configuration Language
description: Learn how to configure stacks using the stack block.
---

# The `stack` block

Use the `stack` block to define a stack within a stack directory. Terramate detects stacks based on this `stack` block, and you can define only one `stack` block per stack directory. The stack metadata defined in the `stack` block is accessible only from the stack directory where it is defined. You can access this metadata via the `terramate` namespace using the `terramate.stack` object. For example, `terramate.stack.<key>` where `<key>` is any key defined in the `stack` block.

## Arguments

- `id` (string) The user-defined id of the stack.
- `name` (string) The user-defined name of the stack.
- `description` (string) The user-defined description of the stack.
- `tags` (list of strings) The user-defined [tags](../../stacks/configuration.md#tags) of the stack.
- `path` (object) An object defining the path of a stack within the repository in different ways
    - `absolute` (string) The absolute path of the stack within the repository.
    - `basename` (string) The base name of the stack path.
    - `relative` (string) The relative path of the stack from the repository root.
    - `to_root` (string) The relative path from the stack to the repository root (upwards).

## Syntax

```hcl
stack{
    id = "some-id"
    name = "name can be different from stack.tm.hcl"
    description = "stack description"
    tags = ["list", "of", "tags"]
}
```
## Examples

```hcl
stack {
  id          = "7b5f4d89-70a7-42f0-972f-3be8550e65df"
  name        = "My Awesome Stack Name"
  description = "My Awesome Stack Description"
  tags = [
    "aws",
    "vpc",
    "bastion",
  ]
}
```