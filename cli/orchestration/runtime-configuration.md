---
title: Runtime Configuration
description: Learn how to configure environment variables available to the terramate run command.
---

# Runtime Configuration

Terramate CLI offers flexible options for configuring environment variables for orchestrating commands and managing your infrastructure as code. This guide explains how to set environment variables project-wide, for specific stacks or directories, through the CLI, and using `.direnv`.

## Configuring Environment Variables

### Using the Current Environment

You can access any environment variable that is exposed by the host when orchestrating commands with the `terramate run` and `terramate script run` commands.

```sh
export ENVIRONMENT=prod
terramate run --eval -- echo "\${terramate.root.path.fs.absolute}/config/${ENVIRONMENT}.tfvars"
### Passing Variables Directly to the Terramate Process

You can also pass variables directly to the Terramate process.

```sh
ENVIRONMENT=prod terramate run --eval -- echo "\${terramate.root.path.fs.absolute}/config/${ENVIRONMENT}.tfvars"
```

## Project-wide Environment Variables
To configure project-wide environment variables, define them in the `terramate.config.run.env` block inside the `terramate.tm.hcl` file at the root of your repository.

```hcl
# terramate.tm.hcl

terramate {
  config {
    run {
      env {
        TF_PLUGIN_CACHE_DIR = "/some/path/etc"
        ALICE = "BOB"
      }
    }
  }
}
```
## Stack-level Environment Variables
To configure stack-specific environment variables, define them in the `terramate.config.run.env` block inside the `stack.tm.hcl` file within the desired stack.

```hcl
# stacks/bob/stack.tm.hcl

stack {
  name        = "Bob"
  description = "Bob's first stack"
  id          = "f4b30f69-9f40-49b0-ab98-395ff07c784f"
}

terramate {
  config {
    run {
      env {
        FOO = "BAR"
      }
    }
  }
}
```

Here, `FOO` is specific to the stack "Bob" and its nested stacks.

### Evaluation Rules and Flexibility
When defining values in the `terramate.config.run.env` block, Terramate follows clear evaluation rules:

- Higher-level variables pass down to all nested stacks.
- Redefining variables at the same level results in conflict.
- Redefining variables at lower levels to replace previous values for precise customization.
- Terramate evaluates values only at the stack level, optimizing performance.
- Using `null` as a value for any variable signifies it is unset, preventing its export.
- To unset a variable at lower levels, assign them to be `unset` or `null` .

## Using the `env` Namespace
Use the `env` namespace to access all environment variables available to the process. It is read-only and available at run time. For example, you can read any variable passed to the `terramate` command or exposed to the process by your operating system.
```hcl
# terramate.tm.hcl or any stack configuration

terramate {
  config {
    run {
      env {
        TF_VAR_environment = env.ENVIRONMENT
      }
    }
  }
}
```
Use it to dynamically assign variables in the stack configuration at runtime, thus adding more flexibility to your Terraform workflows.
```hcl
$ ENVIRONMENT=production terramate run -- bash -c 'echo $TF_VAR_environment'

terramate: Entering stack in /stacks/a
terramate: Executing command "bash -c echo $TF_VAR_environment"
production

terramate: Entering stack in /stacks/b
terramate: Executing command "bash -c echo $TF_VAR_environment"
production
```

## Using Globals and Metadata
Globals (`global.*`) and Metadata (`terramate.*`) are available and are evaluated lazily within the context of the stack where commands are executed.

```hcl
# stacks/bob/stack.tm.hcl

stack {
  name        = "Bob"
  description = "Bob's first stack"
  id          = "f4b30f69-9f40-49b0-ab98-395ff07c784f"
}

globals "terraform" {
  version = "1.8.0"
}

terramate {
  config {
    run {
      env {
        TERRAFORM_VERSION = global.terraform.version
      }
    }
  }
}
```
## Using Functions
All Terramate exported functions are available for use within environment variable configurations.

```hcl
# stacks/bob/stack.tm.hcl

stack {
  name        = "Bob"
  description = "Bob's first stack"
  id          = "f4b30f69-9f40-49b0-ab98-395ff07c784f"
}

globals {
  environment = "prod"
}

terramate {
  config {
    run {
      env {
        TF_ENV = tm_upper(global.environment)
      }
    }
  }
}
```

## Using Direnv
Direnv is an extension for your shell that can load and unload environment variables based on the current directory. Use Direnv with Terramate to configure environment variables for specific stacks.

```sh
echo export ALICE=bob > path/to/stack/.envrc
```

```sh
terramate run -C path/to/stack -- bash -c 'eval "$(direnv export bash)"; echo $ALICE'
```