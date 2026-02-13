---
title: terramate | Block | Configuration Language
description: Learn how to configure a Terramate project using the terramate block.
---

# The `terramate` block

Use the `terramate` block to define project-wide configurations. The `terramate` block is usually defined in the `terramate.tm.hcl` file(or any file of your choice at the project's root) and overrides any defaults by Terramate.

## Arguments

- `required_version`: specify the Terramate version to be used inside a project. More details about this attribute are [here](/cli/projects/configuration.md#the-terramate-required_version-attribute).
- `config`: define project-wide configurations in this block.
    - `config.git`: [configure](/cli/projects/configuration.md#the-terramate-config-git-block) git integration
    - `config.generate`: [configure](/cli/projects/configuration.md#the-terramate-config-generate-block) code generation feature
    - `config.run`: [configure](/cli/projects/configuration.md#the-terramate-config-generate-block) the `terramate run` command or set environment variables for it
    - `config.cloud`: [configure](/cli/projects/configuration.md#the-terramate-config-cloud-block) the default Terramate Cloud organization name

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
    # Learn more: https://terramate.io/docs/orchestration/safeguards
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

    # Enable Terramate Scripts
    experiments = [
      "scripts",
      "outputs-sharing",
      "tmgen"
    ]
  }
}
```
