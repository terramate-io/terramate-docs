---
title: vendor | Block | Configuration Language
description: Learn how to configure module vendoring using the vendor block.
---

# The `vendor` block

Use the `vendor` block to configure how Terramate vendors external modules into your project. The `vendor` block can only appear once in a project and does not support labels.

For details on vendoring modules, see [vendor download](../../reference/cmdline/experimental/experimental-vendor-download.md).

## Arguments

- `dir` _(optional, string)_ - The directory where vendored modules will be stored.

- `manifest` _(optional, block)_ - Configures which files to include when vendoring.
    - `default` _(optional, block)_ - Default manifest settings.
        - `files` _(optional, set of strings)_ - Glob patterns specifying which files from the module to vendor.

## Syntax

```hcl
vendor {
  dir = "/modules"

  manifest {
    default {
      files = [
        "**/*.tf",
        "**/*.md",
        "**/LICENSE",
      ]
    }
  }
}
```

## Examples

### Vendor Terraform modules

```hcl
vendor {
  dir = "/vendor/modules"

  manifest {
    default {
      files = [
        "**/*.tf",
        "**/*.tf.json",
      ]
    }
  }
}
```
