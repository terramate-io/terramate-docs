---
title: terramate | Block | Configuration Language
description: Learn how to configure a Terramate project using the terramate block.
---

# The `terramate` block

Use the `terramate` block to define project-wide configurations in the project's root. The `terramate` block is defined in the `terramate.tm.hcl` file and overrides any defaults by Terramate.

## Arguments

- `required_version`: specify the Terramate version to be used inside a project. More details about this attribute are [here](../../projects/configuration.md#the-terramaterequired_version-attribute).
- `config`: define project-wide configurations in this block.
    - `config.git`: [configure](../../projects/configuration.md#the-terramateconfiggit-block) git integration
    - `config.generate`: [configure](../../projects/configuration.md#the-terramateconfiggenerate-block) code generation feature
    - `config.run`: [configure](../../projects/configuration.md#the-terramateconfiggenerate-block) the `terramate run` command or set environment variables for it
    - `config.cloud`: [configure](../../projects/configuration.md#the-terramateconfigcloud-block) the default Terramate Cloud organization name

## Syntax

```hcl
terramate {
  required_version = "terramate-version"
  config {
    git {
      # Git configuration
      default_remote = "origin"
      default_branch = "main"

      # Safeguard
      check_untracked   = false # Deprecated as of v0.4.5 (use terramate.config.disable_safeguards instead)
      check_uncommitted = false # Deprecated as of v0.4.5 (use terramate.config.disable_safeguards instead)
      check_remote      = false # Deprecated as of v0.4.5 (use terramate.config.disable_safeguards instead)
    }
    generate {
        hcl_magic_header_comment_style = "# or //"
    }
    run {
         check_gen_code = false # Deprecated as of v0.4.5 (use terramate.config.disable_safeguards instead)
        env {
        TF_PLUGIN_CACHE_DIR = "/some/path/etc"
        }
    }
    cloud {
      organization = "cloud-org-name"
    }
  }
}
```