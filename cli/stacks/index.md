---
title: Stacks | Terramate Concepts
description: Learn how stacks help you efficiently manage services and environments with Terraform and OpenTofu at any scale.

outline: [2, 4]
---

# Stacks

A stack is a collection of infrastructure resources that you ***configure***, ***provision*** and ***manage*** as a unit
with Infrastructure as Code tooling such as Terraform and OpenTofu.

Each stack represents one or multiple services in one or multiple environments.

You can think about a stack as a combination of:

- **Infrastructure code** which declares a set of infrastructure resources. Terraform and OpenTofu (`*.tf` files) are
examples of infrastructure code.
- **State** that describes the status of the resources according to the _latest deployment_ (e.g., Terraform state - which
is usually stored in a remote location such as an AWS S3 Bucket).
- **Configuration** used to _configure_ the stack and its managed infrastructure resources (e.g., variables, stack configuration, etc.)

Most of the time, Terramate projects manage dozens, hundreds, or even thousands of stacks. This is possible because
Terramate helps you to nest, group and orchestrate stacks by providing a suite of tools that allow you to work with
multiple stacks at any scale.

## Use Cases

- **Deploy entire services and environments:** Use stacks to group infrastructure resources required to manage
and deploy services such as networking, storage, and compute, - or entire environments as a single unit without worrying
about dependencies.
- **Multi-tenant infrastructure management:** Use stacks to group and separate resources required to deploy across multiple regions, availability zones or cloud provider accounts.
- **Manage ownership, governance and compliance:** Use stacks to manage the ownership and to enforce compliance and
governance policies for specific services and environments.

## Benefits

Using stacks to break up your infrastructure code into manageable pieces is considered an industry standard and provides the following benefits:

✅ **Reduce run times significantly** by selectively targeting only the required stacks for execution (e.g., only the stacks that have changed in the last PR). Stacks also enable parallel execution.

✅ **Limit the blast radius risk** by grouping IaC-managed assets in logical units such as environments, business units, regions or services isolated from each other.

✅ **Separate management responsibilities** across team boundaries by assigning and managing the ownership of stacks to users and teams.

✅ **Remove sequential and blocking operations** by enabling parallel development and execution of independent stacks.

## Conventions

The following conventions are crucial for you to understand how stacks are used to design
services and environments.

### Parent Stacks

Parent stacks are `top-level` stacks that may contain child stacks that might be nested.
The following example shows a `dev` environment that is composed of multiple stacks, each managing a specific
infrastructure service:

```sh
.
└── dev
    ├── config.tm.hcl
    ├── db
    │   ├── backend.tf
    │   ├── main.tf
    │   ├── stack.tm.hcl
    │   └── terraform.tf
    ├── k8s
    │   ├── backend.tf
    │   ├── main.tf
    │   ├── stack.tm.hcl
    │   └── terraform.tf
    └── vpc
        ├── backend.tf
        ├── main.tf
        ├── stack.tm.hcl
        └── terraform.tf
```

The stacks `db`, `k8s` and `vpc` are all parent stacks located inside the `dev` directory. If you orchestrate commands
such as `terraform apply` with the [`terramate run`](../reference/cmdline/run.md) command, Terramate detects that those stacks
aren't nested and dependent on each other, which means they can be executed in parallel.

### Child Stacks

Child stacks are nested stacks with exactly one parent stack. Using nested child Stacks allows you to map your
infrastructure code as a tree, which leads to a natural organization of your infrastructure resources with Infrastructure
as Code.

If we look back at the previous example, but this time we assume that the `db` and `k8s` stacks are child stacks of the
`vpc` stack, the example would look something like this:

```sh
.
└── vpc
    ├── backend.tf
    ├── main.tf
    ├── stack.tm.hcl
    ├── terraform.tf
    ├── db
    │   ├── backend.tf
    │   ├── main.tf
    │   ├── stack.tm.hcl
    │   └── terraform.tf
    └── k8s
        ├── backend.tf
        ├── main.tf
        ├── stack.tm.hcl
        ├── terraform.tf
        └── db
            ├── backend.tf
            ├── main.tf
            ├── stack.tm.hcl
            └── terraform.tf
```

This means that the `db` and `k8s` stacks depend on the `vpc` stack. If you orchestrate commands such as
`terraform apply` with the [`terramate run`](../reference/cmdline/run.md) command, Terramate detects this dependency and ensures
that the parent `vpc` stack will be successfully executed before executing the child stacks `k8s` and `db` using a graph-based approach.

To learn more about this topic, please find the guide at [nesting stacks](../stacks/nesting.md).

<!-- ## Create and configure Stacks

Stacks can be created with the [terramate create](../cli/cmdline/create.md) command, which creates a directory with a
`stack.tm.hcl` file inside used to configure the [metadata](../cli/code-generation/variables/metadata#stack-metadata),
[orchestration](../cli/stacks/configuration.md#explicit-order-of-execution) and
[change detection](../cli/stacks/configuration.md#influence-change-detection) configuration of the stack. -->
