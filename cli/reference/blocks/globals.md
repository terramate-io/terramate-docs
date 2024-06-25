---
title: globals | Block | Configuration Language
description: Learn how to define Globals using the globals block.
---

# The `globals` block

Use the `globals` block to define [global variables](../variables/globals.md) and access them in the `global` namespace via `global.<variable-name>`. You can define globals at any level of your project hierarchy and set different globals for various configurations (a set of Terramate files specific to a directory). 
Follow these rules when defining `globals`:

- Redefining a `globals` identifier in the same directory causes a conflict/error.
- Multiple `globals` blocks defined at different hierarchy levels result in the child block overriding the same `globals` identifiers in the parent block.
- Multiple `globals` blocks defined at the same hierarchy level merge the unique `globals` identifiers
- Importing a `globals` file preserves the original hierarchy level of the imported `globals`.

## Arguments

- `<variable-name>`: name of the global variable
- `<expression>`: can consist of [Terramate Variables](../variables/index.md) and [Terramate Functions](../functions/index.md)

## Syntax

```hcl
globals {
  <variable-name> = <expression>
}
```

## Examples

When you run commands from a stack, Globals (`global.`) and Metadata (`terramate.`) are available and are [evaluated lazily](../variables/globals.md#lazy-evaluation) within the context of that stack.

```hcl
# stacks/bob/stack.tm.hcl

stack {
  name        = "Bob"
  description = "Bob's first stack"
  id          = "f4b30f69-9f40-49b0-ab98-395ff07c784f"
}

globals "terraform" {
  version = "1.8.0"
}

terramate {
  config {
    run {
      env {
        TERRAFORM_VERSION = global.terraform.version
      }
    }
  }
}
```
