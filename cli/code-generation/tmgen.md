---
title: Terraform, OpenTofu and HCL Code Generation
description: Learn how to use Terramate to generate Terraform and OpenTofu configurations on the fly.
---

# Ad-hoc HCL Code Generation

::: info
This is an experimental feature. Please enable the `"tmgen"` experiment in your Terramate configuration by adding it to the `terramate.config.experiments` list.

Advanced documentation can be found here once the feature reaches stable status.

Please contact us on GitHub or in Discord if you like to know more or want to give early feedback.
:::

Use any HCL file as a blueprint to generate code for a stack by adding `.tmgen` to the file type and running `terramate generate` against it. This means you do not need to place the to-be generated code in the `generate_hcl` block of a separate `.tm.hcl` file as done in the [Code Generation](./generate-hcl.md).

You can use Terramate data such as [globals](https://terramate.io/docs/cli/code-generation/variables/globals) , [metadata](https://terramate.io/docs/cli/code-generation/variables/metadata) or [functions](https://terramate.io/docs/cli/code-generation/functions/) in a `.tmgen` file.

::: tip Important
To use `globals` in a `.tmgen` file , create a separate `config.tm.hcl` file to define them first.
:::

### Example

1. Create a new repository: 
```sh
git init tmgen-guide
```
2.  Create a new file inside the repo called `terramate.tm.hcl` with the following content, enabling the `tmgen` feature:
```sh
terramate {
  config {
    # Enables the simplified adhoc HCL code generation
    # https://terramate.io/docs/cli/code-generation/tmgen
    experiments = [
      "tmgen"
    ]
  }
}
```
3. Create a new stack: 
```sh
terramate create example-stack
```
4. Create a new file `main.tf.tmgen` with the following content:
```sh
module "vpc" {
  source  = "cloudposse/vpc/aws"
  version = tm_try(global.terraform.modules.vpc.version, "2.0.0")
  
  namespace = "eg"
  stage     = "test"
  name      = "app"

  ipv4_primary_cidr_block = "10.0.0.0/16"

  assign_generated_ipv6_cidr_block = true
}
```
5. Create a new file to define the global `config.tm.hcl` with the following content:
```sh
globals "terraform" "modules" "vpc" {
  version = "2.2.0"
}
```
6. Run `terramate generate` to generate a `main.tf` file in the `example-stack` using the `main.tf.tmgen` file as a blueprint.
```sh
terramate generate
```