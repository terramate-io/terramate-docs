---
title: script | Block | Configuration Language
description: Learn how to configure reusable workflows using the script block.
---

# The `script` block

Use the script block to define a [script](https://terramate.io/docs/cli/orchestration/scripts). You can place the script block in any Terramate configuration file in your project hierarchy. 

## Arguments

- `name` (optional) - specifies a name for the jobs being executed (up to 128 characters)

- `description` (optional) - describe the jobs being executed (up to 1000 characters)

- `lets` (optional) - contains one or more blocks that define local variables for the script. Multiple `lets` blocks get merged.

- `job` (required) - contains one or more blocks, each defining a sequence of commands to execute in the script. Jobs are executed in the order they are defined.

## Syntax

```hcl
script "command" "subcommand" { # any level of subcommands is supported
  description = "Execute commands"
  job {
    description = "hello world job"
    commands = [
      ["echo", "-n", "Hello"],
      ["echo", " World!"],
    ]
  }
}
```
## Examples

### Run a Terraform/OpenTofu deployment

Run `terramate script run deploy` to deploy using Terraform or OpenTofu.

```hcl
script "deploy" {
  description = "Run a Terraform/Tofu deployment"
  lets {
    provisioner = "terraform" # another option: "tofu"
  }
  job {
    name        = "deploy"
    description = "Initialize, validate and deploy Terraform stacks"
    commands = [
      [let.provisioner, "init"],
      [let.provisioner, "validate"],
      ["tfsec", "."],
      [let.provisioner, "apply", "-auto-approve"],
    ]
  }
}
```