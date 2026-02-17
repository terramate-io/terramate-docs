---
title: Create a Component and Bundle
description: Turn a Terraform module into a Component, then compose it in a Bundle and generate code.
type: tutorial
product: catalyst
outline: [2, 4]
---

# Create a Component and Bundle

Learn how to [scaffold](../concepts/scaffolding-and-generation.md) a [Component](../concepts/components.md) from an existing Terraform/OpenTofu module and use it inside a [Bundle](../concepts/bundles.md).

## Prerequisites

- A Terraform/OpenTofu module directory with variables

## Steps

1) Create a Component from a module

```sh
cd path/to/module
terramate component create
```

- Review generated component metadata and inputs.

2) Define a Bundle that uses the Component

Create a new bundle definition directory and add a stack with a component instance:

```hcl
define bundle stack "example" {
  metadata {
    path = "stacks/example"
    name = "Example Stack"
  }

  component "example" {
    source = "/components/path/to/created-component"
    inputs = {} # wire bundle inputs as needed
  }
}
```

3) Scaffold and generate

```sh
terramate scaffold
terramate generate
```

## Next steps

- How‑to: [Convert a module to a Component](/catalyst/how-to/convert-module-to-component)
- Reference: [Bundle Definition](/catalyst/reference/bundle-definition)
