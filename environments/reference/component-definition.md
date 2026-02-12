---
title: Component Definition Reference
description: Reference for component metadata, inputs, and generation behavior.
type: reference
product: capability
outline: [2, 4]
---

# Component Definition

A component is defined with `define component` blocks and provides reusable infrastructure capabilities consumed by bundles.

## Supported sections

### Metadata

```hcl
define component metadata {
  class       = "example.com/networking/v1"
  version     = "1.0.0"
  name        = "Networking"
  description = "Reusable networking baseline"
}
```

Metadata identifies the component contract and ownership context.

### Inputs

```hcl
define component {
  input "name" {
    type        = string
    description = "Name of the ALB"
  }

  input "env" {
    default = component.environment
  }

  input "vpc_filter_tags" {
    type        = map(string)
    description = "Tags to filter VPC via data sources"
    default     = {}
  }
}
```

Inputs define the interface bundles pass values into. Use `component.environment` as a default to inherit the active environment automatically.

### Usage from bundle stacks

```hcl
define bundle stack "service" {
  component "alb" {
    source = "/components/example.com/terramate-aws-alb/v1"

    inputs {
      name = "${bundle.input.name.value}-${bundle.environment.id}"

      vpc_filter_tags = {
        "bundle-uuid" = bundle.uuid
      }
    }
  }
}
```

Bundle stacks instantiate components and map bundle inputs into component inputs. Environment context is inherited automatically via `component.environment`.

### Generation behavior

All Terramate configuration in a component directory participates in generation workflows:

- `generate_hcl`
- `generate_file`
- `.tmgen`

Component logic can read its own values through `component.input.<name>.value`.

### Component context

| Namespace | Description |
|---|---|
| `component.input.<name>.value` | Access component input values |
| `component.environment.id` | Active environment short identifier (inherited from bundle) |
| `component.environment.name` | Active environment display name |
| `component.environment.description` | Active environment description |
| `component.environment.available` | Whether an environment is active |
| `component.environment.promote_from` | Source environment `id`, or `null` |

## Related

- [Components](/environments/components)
- [Bundles](/environments/bundles)
- [Environments](/environments/environments)
