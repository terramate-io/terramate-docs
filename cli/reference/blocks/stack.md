---
title: stack | Block | Configuration Language
description: Learn how to configure stacks using the stack block.
---

# The `stack` block

Use the `stack` block to define a stack within a directory. Terramate detects stacks based on this `stack` block, and you can define only one `stack` block per directory. Use the `stack` block to configure:
- The metadata of the stack
- The orchestration behaviour of a stack
- The change detection behaviour of a stack

### Metadata

The stack metadata defined in the `stack` block is scoped locally to the directory where it is defined. You can access this metadata via the `terramate` namespace using the `terramate.stack` object. For example, `terramate.stack.<key>` where `<key>` is any key defined in the `stack` block.

**Note:** Not every stack block attribute is available at runtime. Please refer to the [this](../variables/metadata.md#stack-metadata) page for available fields.

### Orchestration Behavior

In Terramate, the default [execution order](../../orchestration/index.md#default-order-of-execution) is that the parent stacks always run before child stacks as per the filesystem hierarchy. For a particular stack, you can override this default and control which stacks will run before or after by explicitly defining the execution order in the `stack` block using the `before` and `after` attributes. For details, please see [orchestration](../../orchestration/index.md).

### Change Detection Behavior

Your stacks might depend on files outside the stack's directory, such as files not in the stack directory or its subdirectories. If any of these files change, you would like Terramate to see your stack as 'changed' to use the [change detection](../../change-detection/index.md) feature.
You can include these dependent files in the `watch` list of the stack's block. Any changes in these files will mark your stack as changed.

### Arguments

You can see `stack` argument details [here](../../stacks/configuration.md#general-stack-metadata).

- `id` (string): the id of the stack
- `name` (string): The name of the stack
- `description` (string): the description of the stack
- `tags` (list(string)): the tags of the stack
- `before` (list(string)): always run this stack [`before`](../../stacks/configuration.md#before) stacks in this list. It accepts: 
  - project absolute paths (e.g., `/other/stack`)
  - paths relative to the directory of this stack (e.g., `../other/stack`)
  - [tags](../../orchestration/tag-filter.md)
- `after` (list(string)): always run this stack [`after`](../../stacks/configuration.md#after) stacks in this list. It accepts: 
  - project absolute paths (e.g., `/other/stack`)
  - paths relative to the directory of this stack (e.g., `../other/stack`)
  - [tags](../../orchestration/tag-filter.md)
- `wants` (list(string)): always run these [`wanted`](../../stacks//configuration.md#wants) stacks when this stack is run. It accepts file paths and tags, same as `before` or `after` arguments.
- `wanted-by` (list(string)): always run this stack when running stacks in this list as it is [`wanted_by`](../../stacks//configuration.md#wanted_by) them. It accepts file paths and tags, same as `before` or `after` arguments.
- `watch` (list(string)): Mark this stack as changed if any files in this [`watch`](../../stacks/configuration.md#watch) list is changed. It accepts: 
  - project absolute paths (e.g., `/other/stack`)
  - paths relative to the directory of this stack (e.g., `../other/stack`)
  - expression with [functions](../functions/index.md)(but not [variables](../variables/index.md)).

## Syntax

```hcl
stack {
    id = "some-id"
    name = "some name"
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
   watch = [
    "/external/file1.txt",
    "/external/file2.txt"
   ]
  after = [
  "tag:prod:networking", # all stacks containing `prod` and `networking` tags.
  "/prod/apps/auth",
  ]
}
```