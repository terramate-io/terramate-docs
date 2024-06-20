---
title: lets | Block | Configuration Language
description: Learn how to define variables available to the current generate_hcl block only using the lets block.
---

# The `lets` block

Use the `lets` block in Terramate to define context-based variables local to the parent block where you declare them.
Utilize these variables in surrounding attributes or blocks, such as `generate_hcl`, `generate_file`, and `script` blocks.
The `lets` block achieves cleaner code by preventing global namespace clutter with locally scoped variables.

## Arguments

`<variable-name>`: The name of the variable to be defined.
`<expression>`: The expression to be evaluated and assigned to the variable.

### Syntax

```hcl
lets {
  <variable-name> = <expression>
}
```
### Contexts

You can use the `lets` block in the following contexts:
- `generate_hcl` blocks
- `generate_file` blocks
- `script` blocks

### Key Differences from Global Variables

- `lets` variables are only available within the block they are defined in and do not carry over to child directories.
- `lets` variables cannot use labels.
- `lets` variables can be accessed using the let namespace in expressions.

## Examples

### Using `lets` in a `generate_file` Block

In this example, a JSON-encoded object is created using a lets variable and used within the generate_file block.

```hcl
generate_file "file.json" {
  lets {
    # let.json is available in the current generate_file block only
    json = tm_jsonencode({ "hello" = "world" })
  }

  content = let.json
}
```
### Defining Temporary Variables

Here, a temporary variable is defined within the lets block and used in other arguments within the generate_file block.

```hcl
generate_file "example.txt" {
  lets {
    temp_a_plus_b = global.a + global.b
  }

  content = let.temp_a_plus_b
}
```
### Using lets in a `generate_hcl` Block

In this example, a lets block is used within a generate_hcl block to define a temporary variable.

```hcl
generate_hcl {
  lets {
    greeting = "Hello, World!"
  }

  content {
    body = <<EOF
    {
      "message": "${let.greeting}"
    }
    EOF
  }
}
```