---
title: Code Generation
description: Learn how to keep your stacks DRY by generating files such as Terraform, Kubernetes Manifests and more.
type: explanation
---

# Code Generation

Terramate code generation keeps large stack estates DRY by letting you define generation logic once and apply it consistently across stack hierarchies.

## Why it exists

- Eliminate duplicate backend/provider/files across stacks
- Keep generated output native and reviewable
- Apply policy and conventions uniformly

## Generation strategies

- [`.tmgen`](./tmgen.md) for ad-hoc HCL extension in stack context
- [`generate_hcl`](./generate-hcl.md) for HCL generation in stack context
- [`generate_file`](./generate-file.md) for arbitrary file generation in root or stack context

## Important behavior

- Hierarchical inheritance applies through directory trees
- Labels must be unique in a hierarchy for active generation blocks
- Filters and conditions determine target stacks
- Assertions can stop generation early when preconditions fail

## Related guides and references

- How-to: [Generate HCL](./generate-hcl.md)
- How-to: [Generate Files](./generate-file.md)
- Reference: [`terramate generate`](/cli/reference/cmdline/generate)
- Reference: [Configuration: `import`](/cli/reference/configuration/#import-block-schema)

## Use-case guides

- [Manage Terraform at Scale](/guides/manage-terraform-at-scale)
- [Migrate from Terraform-only Workflows](/guides/migrate-from-plain-terraform)

## Explanation

- [Code Generation Model](/explanations/code-generation)
