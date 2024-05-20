---
title: terramate debug show generate origins - Command
description: Debug generated files using the 'terramate debug show generate-origins' command to gain insights into the origin of each file.
---
# Generate Origins

The `terramate debug show generate-origins` command prints the origin source for the generated files.

## Usage

`terramate debug show generate-origins [options]`

## Examples

Print the origins of all generated files in the current directory:

```bash
terramate debug show generate-origins
```
Change the working directory before listing origins:

```bash
terramate debug show generate-origins --chdir path/to/directory
```
Filter results based on change detection and path:

```bash
terramate -C stacks/ --changed debug show generate-origins
```