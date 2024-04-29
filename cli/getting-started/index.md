---
title: "Quickstart: Getting Started with Terramate and Terraform"
description: Get started with Terramate CLI in 5 minutes. Learn basic Terramate concepts such as stacks, code generation and change detection using Terramate CLI and Terraform.
---

# Quickstart

In this guide, you will learn how to get started with Terramate from scratch by building a basic Terramate
project that manages Terraform or OpenTofu in stacks using the most essential Terramate features, such as **stacks**,
**code generation**, **orchestration**, and **change detection**.

<!-- NOTE: Add more tutorials over time -->

<!-- If you want to get an overview of what Terramate CLI is and how it works, please read the [introduction guide](../../index.md). -->

::: tip Terramate Community Discord Server
Join the ***[Terramate Community](https://terramate.io/discord)*** on Discord, the best place to ask questions and get
answers about Terramate and its ecosystem. Come aboard ⛵️🏴‍☠️
:::

<!-- If instead you want to learn how to use Terramate in an existing Terraform project, go here instead: -->

## Introduction

For a quick example of how Terramate works, this guide takes you through the following steps:

1. Creating a new Terramate project.
1. Adding stacks using Terramate CLI.
1. Generating a Terraform local backend configuration in all stacks using code generation.
1. Orchestrating commands such as `terraform plan` and `terraform apply` using orchestration and change detection.
1. Syncing all stacks to Terramate Cloud.

## Prerequisites

Before you get started using Terramate, let’s run through a few quick steps to ensure your environment is set up correctly.

### Install Terramate

::: code-group
```sh [macOS]
$ brew install terramate
```

```sh [Linux]
$ brew install terramate
```

```sh [Windows]
$ choco install terramate
```
:::

Other installation options [are available](../installation.md#alternative-installation-methods). When the installation completes, you can test it out by reading the current version:

```sh
$ terramate version
```

### Install Terraform or OpenTofu

Next, install Terraform or OpenTofu which we will orchestrate using Terramate:

- [Install Terraform](https://developer.hashicorp.com/terraform/install)
- [Install OpenTofu](https://opentofu.org/docs/intro/install/)

## Create a new project

Terramate requires a git repository to work and every git repository is considered
a project in Terramate.

Let's set up your first Terramate project by creating a new directory `terramate-quickstart` and initializing a new, empty
repository:

```sh
$ git init -b main terramate-quickstart
$ cd terramate-quickstart
```

New git repositories are empty per default and don't contain any commits. The change detection in Terramate works by detecting
changes between at least two commits. Let's add an initial, empty commit to the repository:

```sh
$ git commit --allow-empty -m "Initial empty commit"
```

## Create stacks

Now that the repository is ready, you can create your first stack. Stacks in Terramate are a collection of infrastructure
resources that you configure, provision and manage as a unit.

We will give the stack an ***optional*** `name` and `description` upon creation. Name and description can be used to keep
track of the purpose and details of a stack.

Terramate will ensure that on creation, each stack gets an `id` set automatically if not defined by the user.

```sh
$ terramate create \
  --name "Alice" \
  --description "Alice's first stack" \
  stacks/alice
```

The `terramate create` command creates a file `stack.tm.hcl` containing a `stack {}` block to configure the stack, which will
look something like this.

```sh
$ cat stacks/alice/stack.tm.hcl

stack {
  name        = "Alice"
  description = "Alice's first stack"
  id          = "5b33e1c4-a3b0-477d-b0f1-add5918f764d"
}
```

::: info How does Terramate detect stacks?
Stacks in Terramate are identified by a directory that includes a `*.tm.hcl` file, which contains a `stack {}` block.
The file can have any name but the [terramate create](../cmdline/create.md) command always creates a file named `stack.tm.hcl`
:::

Next, let's check in our newly created stack to the repository:

```sh
$ git add stacks/alice/stack.tm.hcl
$ git commit -m "Create a first stack with Terramate"
```

To verify that Terramate is aware of the new stack, you can run [`terramate list`](../cmdline/list.md), which returns
a list of all stacks available in your project.

```sh
$ terramate list
stacks/alice
```

To create a second stack, we follow the same commands. First, we create the stack:

```sh
$ terramate create \
  --name "Bob" \
  --description "Bob's first stack" \
  stacks/bob
```

Next, we add the second stack to our repository:

```sh
$ git add stacks/bob/stack.tm.hcl
$ git commit -m "Create a second stack with Terramate"
```

To verify that Terramate is aware of both stacks, we can run [`terramate list`](../cmdline/list.md) again.

```sh
$ terramate list
stacks/alice
stacks/bob
```

## Change detection in action

Since we created our stacks step by step and created a git commit per stack, we can leverage
[change detection](../change-detection/index.md) to see what changes we introduced in our latest commit.

```sh
$ terramate list --changed
stacks/second
```

By running the command mentioned above, you will see only the second stack is listed now, as we newly introduced the
second stack without changing the first stack. Terramate’s [change detection](../change-detection/index.md) is based on a
[Git integration](../change-detection/integrations/git.md) but also supports more integrations like
[Terraform](../change-detection/integrations/terraform.md) to detect affected stacks using a local Terraform Module
that has been updated outside of the stack.

## Code generation

Empty stacks are of not much use. One of Terramate’s primary use cases is orchestrating IaC tools such as Terraform and
generating code for it - but Terramate is not limited to Terraform and can also be used with other tooling such as
OpenTofu, Terragrunt, Kubernetes, Helm, CloudFormation, etc.

Every Terraform stack will need a backend configuration. For the sake of this guide, we will use the Terraform local backend.

To generate backend code we create a file called `stacks/backend.tm.hcl`:

::: code-group
```sh [Terraform]
$ cat <<EOF >stacks/backend.tm.hcl
generate_hcl "backend.tf" {
  content {
    terraform {
      backend "local" {}
    }
  }
}
EOF
```

```sh [OpenTofu]
$ cat <<EOF >stacks/backend.tm.hcl
generate_hcl "backend.tf" {
  content {
    terraform {
      backend "local" {}
    }
  }
}
EOF
```
:::

This configures Terramate to generate a `backend.tf` file in every stack it can reach within the `stacks/` directory.
In this case our `alice` and `bob` stacks.

To trigger the code generation we need to run the [`terramate generate`](../cmdline/generate.md) command:

```sh
$ terramate generate

Code generation report

Successes:

- /stacks/alice
  [+] backend.tf

- /stacks/bob
  [+] backend.tf

Hint: '+', '~' and '-' mean the file was created, changed and deleted, respectively.
```

The generation report will report any changes in the generated code.

Let’s commit the changes and generated code:

```sh
$ git add stacks
$ git commit -m 'Add a backend configuration to all stacks'
```

::: tip
It's a recommended best practice to check in generated code to your repository.
For details, please see [code generation best practices](../code-generation/index.md#best-practices).
:::

## Orchestration in action

The stacks created in the previous sections both represent isolated environments, often referred
to as "root modules" in Terraform and OpenTofu. To make them functional, we must run `terraform init` or `tofu init`
in both. Terramate allows you to orchestrate any command in stacks using the [terramate run](../cmdline/run.md) command.

But before we can start, we need to prepare git to ignore terraform temporary files by adding a `.gitignore` file, which is
located in the root directory of our repository:

```sh
# NOTE:
# You might not want to add state and lock file here
# This is just convenient when running the quickstart guide
$ cat <<EOF >.gitignore
.terraform
.terraform.lock.hcl
terraform.tfstate
EOF

$ git add .gitignore
$ git commit -m 'Add .gitignore'
```

Now let’s initialize our stacks:

::: code-group
```sh [Terraform]
$ terramate run terraform init
```

```sh [OpenTofu]
$ terramate run tofu init
```
:::

And run a Terraform plan:

::: code-group
```sh [Terraform]
$ terramate run terraform plan
```

```sh [OpenTofu]
$ terramate run tofu plan
```
:::

## Add Terraform resources

In this section, we create a Terraform [null resource](https://registry.terraform.io/providers/hashicorp/null/latest/docs/resources/resource.html)
for the purpose of demonstration. Null Resources do not need to configure any cloud credentials as they do not create real
resources but only virtual ones.

This example will show:
- You can use plain Terraform config in any stack and do not need to use [code generation](../code-generation/index.md).
- Running only on changed stacks can save us time running and reviewing.

```sh
$ cat <<EOF >stacks/bob/null.tf
resource "null_resource" "quickstart" {
}
EOF

$ git add stacks/bob/null.tf
$ git commit -m "Add a null resource"
```

Applying the changes will need a sequence of re-initializing Terraform, and running `terraform apply` in the changed stacks.
As we only added the resource to the `second` stack, we can leverage [change detection](../change-detection/index.md)
to run in the changed stack only too.

Running commands in stacks containing changes only, allows us to keep execution run times fast and blast radius small.

Re-initialize Terraform to download the null provider:

::: code-group
```sh [Terraform]
$ terramate run --changed terraform init
```

```sh [OpenTofu]
$ terramate run --changed tofu init
```
:::

Preview a plan:

::: code-group
```sh [Terraform]
terramate run --changed terraform plan
```

```sh [OpenTofu]
terramate run --changed tofu plan
```
:::

After reviewing the plan, we can apply the changes:

::: code-group
```sh [Terraform]
terramate run --changed terraform apply -auto-approve
```

```sh [OpenTofu]
terramate run --changed tofu apply -auto-approve
```
:::

When running `terraform plan` again, we expect no changes to be planned anymore:

::: code-group
```sh [Terraform]
terramate run --changed terraform plan
```

```sh [OpenTofu]
terramate run --changed tofu plan
```
:::

## Connecting Terramate Cloud

## Conclusion

We hope this tutorial has helped you grasp the basics of Terramate.
Here's a summary of what we learned:

- How to initialize a Terramate Repository with Git support
- How to create [Terramate Stacks](../stacks/index.md)
- How to leverage [Change Detection](../change-detection/index.md) when [managing stacks](../stacks/manage.md) or [running commands](../orchestration/run-commands-in-stacks.md)
- How to [generate code](../code-generation/index.md) (Terraform Backend) in all stacks to keep the configuration DRY
- How to deploy Terraform using a local backend and [null resources](https://registry.terraform.io/providers/hashicorp/null/latest/docs/resources/resource.html) as an example
- Terramate is not limited to executing Terraform, but can help scale Terraform for any use case

Those examples hopefully give you a starting point and help you get insights into the capabilities of Terramate.
This is just the tip of the iceberg and running code generation and change detection on scale can help you save a lot of time when maintaining or running Terraform.

## Next steps

- Learn more about [Stacks](../stacks/index.md)
- Learn more about [Orchestration](../orchestration/index.md)
- Learn more about [Code Generation](../code-generation/index.md)
- Learn more about [Change Detection](../change-detection/index.md)
- Learn more about [Variables](../code-generation/variables/index.md) available in Terramate such as
[Globals](../code-generation/variables/globals.md) or [Metadata](../code-generation/variables/metadata.md).
- Learn more about [Running Terramate in CI/CD](https://blog.terramate.io/how-to-build-a-ci-cd-pipeline-for-terraform-with-terramate-on-github-actions-57de86d9e66a)
- Learn more about use cases outside of the Terraform Universe

## Join the community

If you have questions or feature requests regarding Terramate, we encourage you to join our
[Discord Community](https://terramate.io/discord) where we host regular events such as weekly Office hours.
It's an excellent place to contact our team and fellow community members if you have questions regarding Terramate.
Alternatively, you can also create an issue in the [Github repository](https://github.com/terramate-io/terramate).
