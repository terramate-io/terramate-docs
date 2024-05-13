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

To simplify starting with code generation any file inside a stack ending with `.tmgen` will be read by Terramate and extend Terramate Globals and Terramate Functions and be generated into a file in the same directory having the extension removed.

To generate a Terraform file create a file `main.tf.tmgen` and Terramate will generate a `main.tf` if it does not exist replacing all `global.*` and `terramate.*` references and executing any `tm_*` Functions.

This way renaming an existing file into `{file}.tmgen` will regenrate it once calling `terramate generate`.

## Inheritance

`.tmgen` files do not inherit into child stacks and when defined outside of a stack nothing will be generated (This behavior is subject to change during the experiment phase).

## Example Execution

The following example renames a `main.tf` file and allows to regenerate it using Terramates advanced Code Generation features.

```sh
mv main.tf main.tf.tmgen
terramate generate
```
