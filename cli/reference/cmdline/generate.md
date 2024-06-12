---
title: terramate generate - Command
description: Run the Code Generation for your project by using `terramate generate` command.
---

# Generate

The `terramate generate` command generates files for all code generation strategies. For an overview of code generation strategies available please see the [code generation documentation](../../code-generation/index.md).

## Usage

`terramate generate [options]`

## Examples

Generate files for all configurations defined in the current directory and its subdirectories.

```bash
terramate generate
```

To generate Terraform files targeting configurations defined within a specific subdirectory, use the `-C` (or `--chdir`) flag followed by the desired directory path.

```bash
terramate -C some/dir generate
```

By default, Terramate returns status code = 0 when it succeeds at ensuring that all files are updated.
If you wish to know when files were touched in disk, then use the `--detailed-exit-code` flag.

```bash
terramate generate --detailed-exit-code
```
