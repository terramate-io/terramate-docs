---
title: assert | Block | Configuration Language
description: Learn how to use the assert block to configure assertions for Terramate configuration such as code generation.
---

# The `assert` block

Use the `assert` block to allow code generation when a condition is `true`. It helps to catch mistakes in your configuration.
You can use the `assert` block only when the [generation context](../../code-generation/index.md#generation-context) is of type stack.
The `assert` block behaves hierarchically, meaning any `assert` blocks defined in a parent directory will apply to all stacks within that directory. For example, an `assert` block defined at the root of a project will apply to all stacks.

You can define `assert` blocks inside `generate_hcl` and `generate_file` blocks, where the `assert` block can access locally scoped data like the `let` namespace.

## Arguments

| name             |      type      | description |
|------------------|----------------|-------------|
| `assertion`        | `boolean` | any expression which results in a boolean |
| `message`             | `string`  | error message that must evaluate as string |
| `warning`   (optional)| `boolean` | boolean attribute, defaults to `false` |

The `assertion` condition gets checked within the context of a stack. If it is `false`, no code gets generated for that stack, and an error appears in the `message` field.

To still generate code for a stack when the `assertion` is `false`, set the optional `warning` field to `true`. This setting will produce a warning message along with the generated code.

## Syntax

```hcl
assert{
    assertion = <expression evaluating to boolean>
    message = "assertion failure reason"
}
```

## Examples

```hcl
assert {
  assertion = global.a == global.b
  message   = "assertion failed, details: ${global.a} != ${global.b}"
}
```
