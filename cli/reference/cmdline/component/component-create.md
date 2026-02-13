---
title: terramate component create
description: Scaffold a Catalyst Component from a Terraform/OpenTofu module by inferring inputs from module variables.
type: reference
product: cli
outline: [2, 4]
---

# terramate component create

Convert a Terraform/OpenTofu module into a Catalyst Component by generating initial component metadata and inputs.

## Usage

```sh
terramate component create [path]
```

### Arguments

| Argument | Description | Default |
|----------|-------------|---------|
| `path`   | Path to the Terraform/OpenTofu module directory. | `.` (current directory) |

### Path resolution

- **Relative paths** (e.g. `modules/s3-module`) are resolved from the current working directory (respects the `-C` flag).
- **Absolute paths** (e.g. `/modules/s3-module`) are resolved relative to the **project root**, not the filesystem root.
- **Empty or `.`** defaults to the current working directory.

The resolved path must be within the project root.

### Examples

```sh
# Point to a module using a relative path
terramate component create modules/s3-module

# Run inside the module directory
cd path/to/module
terramate component create .

# Point to a module using a project-relative absolute path
terramate component create /modules/s3-module

# Combine with -C flag
terramate -C modules/ component create s3-module
```

## Behavior

- Infers component inputs from Terraform/OpenTofu module variables.
- Creates initial component metadata.
- Produces files required to reference the component from a Bundle.

## See also

- Reference: [Component Definition](/environments/reference/component-definition)
