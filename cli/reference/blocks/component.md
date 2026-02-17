---
title: component | Block | Configuration Language
description: Syntax for instantiating a Component in HCL to deploy infrastructure from a catalog.
outline: [2, 4]
---

# Component Instantiation

Instantiate a component by creating an HCL configuration in a Terramate file. A component instantiation references a component definition and provides input values.

```hcl
# file: component.tm.hcl or component.tm
component "my-component" {
  source = "github.com/org/catalog//components/my-component?ref=v1.0.0"

  inputs {
    name       = "my-service"
    visibility = "public"
  }
}
```

## Labels

The `component` block requires one or two labels:

- **1 label**: `component "<name>" { ... }` - defines the component instantiation.
- **2 labels**: `component "<name>" "inputs" { ... }` - extends the inputs of an already declared component (useful for splitting inputs across files).

## Supported attributes

- `source` _(required, string)_ - The location of the component definition. Can be a local directory (relative or absolute from repo root) or a remote reference (e.g., `github.com/org/repo//components/my-component?ref=v1.0.0`).

- `condition` _(optional, expression)_ - A boolean expression that controls whether this component is instantiated.

- `environment` _(optional, expression)_ - The environment this component is associated with.

- `inputs` _(optional, attribute or block)_ - Input values for the component. Can be specified as an attribute (map) or a block. When both are used, block values take precedence for the same key.

## Syntax

### Basic instantiation

```hcl
component "vpc" {
  source = "../components/vpc"

  inputs {
    cidr_block = "10.0.0.0/16"
    region     = "us-east-1"
  }
}
```

### Conditional instantiation

```hcl
component "monitoring" {
  source    = "../components/monitoring"
  condition = global.enable_monitoring

  inputs {
    alert_email = global.ops_email
  }
}
```

### Split inputs across files

```hcl
# file: component.tm.hcl
component "service" {
  source = "../components/service"

  inputs {
    name = "my-service"
  }
}

# file: component-env.tm.hcl
component "service" "inputs" {
  region = global.region
}
```

## See also

- Concepts: [Components](/catalyst/concepts/components)
- Reference: [Component Definition](/cli/reference/blocks/define-component)
- Reference: [Bundle Instantiation](/cli/reference/blocks/bundle)
