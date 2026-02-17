---
title: terramate | Block | Configuration Language
description: Learn how to configure a Terramate project using the terramate block.
---

# The `terramate` block

Use the `terramate` block to define project-wide configurations. The `terramate` block is usually defined in the `terramate.tm.hcl` file(or any file of your choice at the project's root) and overrides any defaults by Terramate.

## Arguments

- `required_version`: specify the Terramate version to be used inside a project. More details about this attribute are [here](../../projects/configuration.md#the-terramate-required_version-attribute).
- `config`: define project-wide configurations in this block.
    - `config.git`: [configure](../../projects/configuration.md#the-terramate-config-git-block) git integration
    - `config.generate`: [configure](../../projects/configuration.md#the-terramate-config-generate-block) code generation feature
    - `config.run`: [configure](../../projects/configuration.md#the-terramate-config-generate-block) the `terramate run` command or set environment variables for it
    - `config.cloud`: [configure](../../projects/configuration.md#the-terramate-config-cloud-block) the default Terramate Cloud organization name
    - `config.change_detection`: configure change detection behavior
        - `config.change_detection.terragrunt`: configure Terragrunt change detection
            - `enabled` _(string)_ - One of `"auto"`, `"off"`, or `"force"`
        - `config.change_detection.git`: configure git-based change detection
            - `untracked` _(bool or string)_ - Whether untracked files trigger change detection (`true`/`false` or `"on"`/`"off"`)
            - `uncommitted` _(bool or string)_ - Whether uncommitted files trigger change detection (`true`/`false` or `"on"`/`"off"`)
    - `config.telemetry`: configure CLI telemetry
        - `enabled` _(bool or string)_ - Enable or disable telemetry (`true`/`false` or `"on"`/`"off"`)

## Syntax

```hcl
terramate {
  required_version = ">= 0.12.0"
  # required_version_allow_prereleases = true

  config {
    # git {
    #   # Git configuration
    #   default_remote = "origin"
    #   default_branch = "main"
    # }

    # Optionally disable safe guards
    # Learn more: https://terramate.io/docs/cli/orchestration/safeguards
    # disable_safeguards = [
    #   "git-untracked",
    #   "git-uncommitted",
    #   "git-out-of-sync",
    #   "outdated-code",
    # ]

    # generate {
    #   hcl_magic_header_comment_style = "#"
    # }

    run {
      env {
        TF_PLUGIN_CACHE_DIR = "${terramate.root.path.fs.absolute}/.tf_plugin_cache_dir"
      }
    }

    cloud {
      organization = "cloud-org-name"
      # location = "us" # default is "eu"
    }

    # change_detection {
    #   terragrunt {
    #     enabled = "auto" # "auto", "off", or "force"
    #   }
    #   git {
    #     untracked   = true
    #     uncommitted = true
    #   }
    # }

    # telemetry {
    #   enabled = true
    # }

    # Enable Terramate Scripts
    experiments = [
      "scripts",
      "outputs-sharing",
      "tmgen"
    ]
  }
}
```
