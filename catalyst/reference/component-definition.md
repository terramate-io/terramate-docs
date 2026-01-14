---
title: Component Definition (HCL)
description: Define a Component’s metadata, inputs, and the code generation surface it exposes to bundles.
type: reference
product: catalyst
outline: [2, 4]
---

# Component Definition

A Component is defined using a `define component {}` block. One component per directory.

## Metadata

```hcl
define component metadata {
  class   = "example.com/my-component"
  version = "1.0.0"
  name    = "My Component"
  description = <<-EOF
    My first Terramate Component is doing amazing stuff
  EOF
  # Optional
  technologies = ["aws", "terraform"]
}
```

## Inputs

```hcl
define component {
  input "name" {
    type        = string
    description = "Set a name for the service"
  }

  input "visibility" {
    type        = string
    description = "Visibility of the Resource"
    default     = "private"
  }
}
```

## Code generation

All Terramate configuration in the component directory participates in code generation (`generate_hcl`, `generate_file`, or `.tmgen` files).

- Access component inputs as `component.input.<name>.value`.
- Pass bundle inputs down explicitly via the bundle’s component instantiation `inputs` map.

Example component instantiation inside a bundle stack:

```hcl
component "members" {
  source = "/components/terramate.io/terramate-tf-github-organization-members/v1"
  inputs = { for k in tm_keys(bundle.input) : k => bundle.input[k].value }
}
```

### Related guides and references

- Concepts: [Components](/catalyst/concepts/components)
- How‑to: [Convert a TF module to a Component](/catalyst/how-to/convert-module-to-component)
