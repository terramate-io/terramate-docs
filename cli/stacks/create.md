---
title: Create Stacks
description: Learn how to create and manage Infrastructure as Code agnostic stacks with Terramate.
---

# Create Stacks

On this page, you will learn how to create stacks with Terramate CLI.

## Create a new stack with the CLI

Stacks can be created with the [`terramate create`](../reference/cmdline/create.md) command.

```sh
terramate create <directory>
```

This command will create a directory and add a `stack.tm.hcl` file that contains the
configuration for your stack adding the directory basename as `name` and `description` and creating a UUIDv4 as `id`
that needs to be unique within the current repository and identifying the stack in Terramate Cloud if connected.

You can set a stack's [metadata](./configuration.md#general-stack-metadata) like its `name`, and `description`, add `tags`,
and configure the [orchestration behavior](./configuration.md#explicit-order-of-execution) upon stack creation.

The following example:

```sh
terramate create \
  stacks/vpc \
  --name "Main VPC" \
  --description "Stack to manage the main VPC"
```

will create a stack with the following configuration:

```hcl
# ./stacks/vpc/stack.tm.hcl
stack {
  name        = "Main VPC"
  description = "Stack to manage the main VPC"
  id          = "3271f37c-0e08-4b59-b205-1ee61082ff26"
}
```

::: tip
It is recommended to never change a stack's `id` once committed to allow tracking of the stack when refactoring the
directory hierarchy.
:::

Terramate detects stacks based on the existence of a `stack {}` block. The name of the file is not important and can be different from `stack.tm.hcl`. There can be exactly one stack block defined in a stack.

### Code Generation

Upon creation of a stack, [code generation](../code-generation/index.md) will be triggered so that the new stack can be
initialized with a default configuration if desired. This is especially helpful when you want to generate required
configurations such as Terraform provider and backend configuration.

You can disable code generation upon stack creation by passing the `--no-generate` flag, e.g. `terramate create some-stack --no-generate`.

## Import existing stacks

Terramate can detect and import various existing configurations.

- `terramate create --all-terraform` will [import existing Terraform and OpenTofu](../on-boarding/terraform.md)
- `terramate create --all-terragrunt` will [import existing Terragrunt](../on-boarding/terragrunt.md)
