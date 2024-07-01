---
title: stack | Block | Configuration Language
description: Learn how to configure stacks using the stack block.
---

# The `stack` block

Use the `stack` block to define a stack within a directory. Terramate detects stacks based on this `stack` block, and you can define only one `stack` block per stack directory. Use the `stack` block to configure:
- The metadata of the stack
- The orchestration behaviour of a stack
- The change detection behaviour of a stack

### Metadata

The stack metadata defined in the `stack` block is scoped locally to the directory where it is defined. You can access this metadata via the `terramate` namespace using the `terramate.stack` object. For example, `terramate.stack.<key>` where `<key>` is any key defined in the `stack` block.

### Orchestration Behavior

In Terramate, the default execution order is that the parent stacks always run before child stacks as per the filesystem hierarchy. For a particular stack, you can override this default and control which stacks will run before or after by explicitly defining the execution order in the `stack` block using the `before`, `after`, or `wants` keywords. For details, please see [orchestration](../../orchestration/index.md).

### Change Detection Behavior

Your stacks might depend on files not in the stack's directory. If any of these files change, you would like Terramate to see your stack as 'changed' to use the [change detection](../../change-detection/index.md) feature.
You can include these dependent files in the `watch` list of the stack's block. Any changes in these files will mark your stack as changed.

### Arguments

You can see `stack` argument details [here](../../stacks/configuration.md#general-stack-metadata).

| name             |      type      | description |
|------------------|----------------|-------------|
| id               | string         | The id of the stack |
| name             | string         | The name of the stack |
| description      | string         | The description of the stack |
| tags             | list(string)   | The tags of the stack |
| before           | list(string)   | Always run this stack [`before`](../../stacks/configuration.md#before) stacks in this list |
| after            | list(string)   | Always run this stack [`after`](../../stacks/configuration.md#after) stacks in this list |
| wants            | list(string)   | Always run these [`wanted`](../../stacks//configuration.md#wants) stacks when this stack is run |
| wanted_by            | list(string)   | Always run this stack when running stacks in this list as it is [`wanted_by`](../../stacks//configuration.md#wanted_by) them |
| watch            | list(string)   | Mark this stack as changed if any files in this [`watch`](../../stacks/configuration.md#watch) list is changed


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
   watch = [
    "/external/file1.txt",
    "/external/file2.txt"
   ]
  after = [
  "tag:prod:networking",
  "/prod/apps/auth",
  ]
}
```