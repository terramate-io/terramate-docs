---
title: import | Block | Configuration Language
description: Learn how to import Terramate configuration using the import block.
---

# Importing configurations using the `import` block

Each configuration can import other configurations using the `import` block.

Imported files are handled as if they are in the directory of the importing file. Duplicated blocks will be [merged](../configuration/index.md#config-merging).

The `import` block does not support merging of its attributes and multiple blocks can be defined in the same file or directory given that their source attributes are different. In other words, each file can only be imported once into a single configuration set.

An imported file can import other files but cycles are not allowed.

## Argument reference of the `import` block

- `source` _(required block)_ The `source` must reference a file using a relative path or an absolute path relative to the
project's root. Only files inside the project can be imported and they must be from disjoint directories, which means you cannot import files from parent directories as they're already visible in the child configuration.

## Examples

### Import a single file

```hcl
import {
    # import a specific file
    source = "/imports/globals.tm.hcl"
}
```

### Glob import all files inside a directory

```hcl
import {
    # import all files in a directory
    source = "/imports/*.tm.hcl"
}
```
