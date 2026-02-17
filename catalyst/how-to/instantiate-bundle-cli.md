---
title: Instantiate a Bundle via CLI
description: Use terramate scaffold and terramate generate to create stacks and code from a Bundle.
type: how-to
product: catalyst
outline: [2, 4]
---

# Instantiate a Bundle via CLI

## Prerequisites

- [Terramate CLI installed](/cli/installation)
- At least one bundle available (local `/bundles` or a configured remote catalog)

## Steps

1) Scaffold

```sh
terramate scaffold
```

- Select a bundle (local or from remote collections)
- Fill in requested inputs
- The instantiation file is written to the path defined by the bundle’s scaffolding config

2) Generate

```sh
terramate generate
```

- Creates missing stacks defined by the bundle
- Generates Terraform/OpenTofu code into those stacks

### Single-command alternative

```sh
terramate scaffold --generate
```

This scaffolds the bundle and runs `terramate generate` in one step.

## Expected result

- New bundle instantiation file (HCL/YAML)
- Generated code in the target stacks, ready for `plan`/`apply` with your existing tooling

### Related guides and references

- Concepts: [Scaffolding and Code Generation](/catalyst/concepts/scaffolding-and-generation)
- Reference: [Bundle Instantiation](/cli/reference/blocks/bundle)
