# Terragrunt Integration

Terramate now features built-in change detection for Terragrunt projects. This integration allows you to quickly identify which Terragrunt stacks changed based on the structure of the configuration.

## How it works

In addition to the normal stack change detection, Terramate parses the Terragrunt configuration and also identify the cases below:

- included files (by processing `include` blocks)
- dependencies (`dependency` and `dependencies` blocks)
- file read by function calls (`read_terragrunt_config()`, `read_tfvars_file()` and etc)
- local `terraform.source` blocks.
- etc
