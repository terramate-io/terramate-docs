---
title: Configure stack inputs and outputs.
description: Terramate supports connecting stacks inputs and outputs.
---

# Introduction

_Outputs Sharing_  is an advanced feature that uses code generation and 
orchestration to share the execution output of stacks as inputs to other stacks.
This could be used as an alternative to Terraform data sources when they are too 
cumbersome or too brittle.

Example: Let's say you have a `vpc` stack and two subnets (`subnet-A` and `subnet-B`).
This feature lets you reference `outputs.<any vpc output>.value` in both `subnet-A` 
and `subnet-B`.

::: info
Terramate _Outputs Sharing_ is a new and experimental feature that might still be subject to changes in the future.
To use this feature it needs to be enabled explicitly in your Terramate config by adding it to `experiments`.

```hcl
# terramate.tm.hcl
terramate {
  config {
    experiments = [
      "outputs-sharing"
    ]
  }
}
```

:::

## How it works

1. The stacks that output values have Terramate `output` blocks declared in `.tm` files.
2. The stacks that need inputs have Terramate `input` blocks declared in `.tm` files.
3. A `sharing_backend` block is defined in a parent directory visible to the relevant stacks to configure the [generate](../code-generation/index.md) and [orchestration](./index.md) of output sharing.
  - `sharing_backend.type` defines the sharing type.
  - `sharing_backend.filename` defines the generated file name.
  - `sharing_backend.command` defines the command to export the outputs out of stacks.

When running `terramate generate`, the `input` and `output` blocks are generated
accordingly to the `sharing_backend.type` chosen. If `type` is `terraform`, then the
`input` blocks are generated as Terraform `variable` blocks, and `output` blocks as
Terraform `output` blocks.

When you run `terramate run --enable-sharing`, the stacks that define outputs have their values collected by the `sharing_backend.command` setting you provide. If the `type` is Terraform, the stacks that define `input` blocks have their variables configured by exporting `TF_var_<name>` environment variables.

# Setup Outputs Sharing backends.

The feature requires a `sharing_backend` configuration that bind the `input` and `output` blocks and sets up how they should communicate.
The `sharing_backend` blocks has the following syntax:

```
sharing_backend "default" {
  type     = terraform
  filename = "sharing_generated.tf"
  command  = ["terraform", "output", "-json"]
}
```

The `sharing_backend` blocks needs a label name which must be referenced in the `input` and `output` blocks (in the example above it's "default").

It has the attributes below:
- `type` _(required)_ - The type of backend (only `terraform` is currently supported).
- `filename` _(required)_ - The filename used to generate the inputs and outputs accordingly to the given type.
- `command` _(required)_ - The command to be invoked to extract the stack outputs.

The `command` is usually `["terraform", "output", "-json"]` for Terraform IaC, but you can provide any command. The command output **must** be a JSON object.

# Configure stack inputs.

The `input` block defines what values, coming from other stacks, this stack depend upon. See example below:

```hcl
input "vpc_id" {
  backend       = "default"
  from_stack_id = "vpc"
  value         = outputs.vpc_id.value
}
```

The block label is required and it defines the name of the input variable.

It has the attributes below:
- `backend` _(required, string)_ - The name of the sharing backend that this input refers to.
- `from_stack_id` _(required, string)_ - The stack ID where the outputs will be loaded.
- `value` _(required, expression)_ - The expression that computes this input at runtime.
- `mock` _(optional, any)_ - A mock value for the case when the dependent stack outputs are not applied (used for previewing the planned changes).

When `terramate generate` is used with the example configuration above, it generates
the following code:
```
// TERRAMATE: GENERATED AUTOMATICALLY DO NOT EDIT

variable "vpc_id" {
  type = string
}
```

For the same example, let's say executing `terraform output -json` in the `vpc` stack gives the output below:

```json
{
  "vpc_id": {
    "description": "The AWS VPC id",
    "value": "<value>",
    "sensitive": false
  }
}
```

then the expression `outputs.vpc_id.value` (from the `input.value`) returns the `"<value>"` string.

# Configure stack outputs

The `output` block defines what values are exported from the stack. Those values
can be used by other stacks defining `input` blocks.
See example below:

```
output "vpc_id" {
  backend   = "default"
  value     = module.vpc.id
  sensitive = false
}
```

The block label is required and it defines the name of the output.
It has the following attributes:

- `backend` _(required, string)_ - The name of the sharing backend that this input refers to.
- `value` _(required, expression)_ - The expression that exports the stack's resource.
- `sensitive` _(optional, boolean)_ - If the value is sensitive or not.

# Orchestration

During orchestration, if sharing outputs is turned on, Terramate will invoke the
`sharing_backend.command` on demand to gather outputs of referenced stacks and,
depending on the `sharing_backend.type`, supply the stack inputs.
The feature can be turned on with `terramate run --enable-sharing ...` or in the
case of scripts, by setting it as a command object, see the example below:

```hcl
script "terraform" "deploy" {
  job {
    name        = "Terraform Apply"
    description = "Initialize, validate, plan, and apply Terraform changes."
    commands = [
      ["terraform", "init", "-lock-timeout=5m"],
      ["terraform", "validate"],
      ["terraform", "plan", "-out", "out.tfplan", "-lock=false", {
        enable_sharing = true
      }],
      ["terraform", "apply", "-input=false", "-auto-approve", "-lock-timeout=5m", "out.tfplan", {
        cloud_sync_deployment          = true
        cloud_sync_terraform_plan_file = "out.tfplan"
      }],
    ]
  }
}
```

# Mocking

If your team makes use of code review, very often both the dependendy and the 
dependent stacks change in the same PR and in this case, the plan of the 
dependent stack cannot retrieve the outputs of the dependency because
they were not applied yet. For this case, the `input` block supports `mock`
attribute and its value will be used in the case of the dependency stack fail
to return the outputs, or the referenced output is not applied in the plan.
The mock value is only used if `--mock-on-fail` is provided to `terramate run` or
`mock_on_fail` option is provided to the script command.
Example:
```
terramate run --enable-sharing --mock-on-fail -- terraform plan -out out.plan
```
