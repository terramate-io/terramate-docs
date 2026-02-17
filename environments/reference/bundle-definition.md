---
title: Bundle Definition Reference
description: Reference for bundle metadata, inputs, stacks, scaffolding, and exports.
type: reference
product: capability
outline: [2, 4]
---

# Bundle Definition

A bundle is defined with `define bundle` blocks. Bundles are composed from components and are the primary self-service interface for consumers.

## Supported sections

### Metadata

```hcl
define bundle metadata {
  class       = "example.com/my-bundle"
  version     = "1.0.0"
  name        = "My Bundle"
  description = "Platform-approved bundle"
}
```

Use metadata to define class/version identity and human-readable context.

### Alias

```hcl
define bundle {
  alias = tm_slug(bundle.input.name.value)
}
```

`alias` should be unique per bundle class and deterministic from stable inputs.

### Inputs

```hcl
define bundle {
  input "name" {
    type        = string
    description = "Service name"
    prompt      = "Name"
  }

  input "environment" {
    type        = string
    description = "Environment identifier"
    default     = "dev"
    immutable   = true
  }
}
```

Inputs define the bundle contract consumed by scaffolding/reconfigure workflows.

Supported types: `string`, `bool`, `number`, `any`, `object`, `list(T)`, `set(T)`, `map(T)`, `tuple(T1, T2, ..., Tn)`, and schema references.

#### Object attributes

Inputs can define `attribute` blocks for structured validation. When attributes are present, the default type becomes `object`:

```hcl
define bundle {
  input "person" {
    attribute "name" {
      type     = string
      required = true
    }
    attribute "age" {
      type     = number
      required = true
    }
    default = { name = "hans", age = 33 }
  }
}
```

#### Schemas

Object attribute definitions can be extracted into reusable `define schema` blocks and imported with `uses schemas`:

```hcl
define schema "person" {
  attribute "name" { type = string }
  attribute "age"  { type = number }
}

define bundle {
  uses schemas "common" {
    source = "/schemas/terramate.io/common/v1"
  }

  input "owner" {
    type    = common.person
    default = { name = "hans", age = 33 }
  }
}
```

Implicit input schemas are available as `input.<name>` for cross-referencing between inputs in the same bundle.

#### Type expressions

| Type | Description |
|---|---|
| `any` | Matches any value |
| `string`, `bool`, `number` | Primitive types |
| `object` | Object; with `attribute` blocks validates structure |
| `list(T)`, `set(T)`, `map(T)` | Collection types (`set` deduplicates) |
| `tuple(T1, T2, ..., Tn)` | Fixed-length typed sequence |
| `any_of(A, B, ...)` | Union/variant type |
| `has(T)` | Non-strict validation (allows extra attributes) |
| `A + B` | Schema composition (merge attributes) |

For the full type system reference with detailed examples, see [Bundle Definition (HCL)](/catalyst/reference/bundle-definition#type-expressions).

### Scaffolding

```hcl
define bundle scaffolding {
  path = "/configs/services/${tm_slug(bundle.input.name.value)}.tm.hcl"
  name = tm_slug(bundle.input.name.value)

  enabled {
    condition     = true
    error_message = "Bundle currently not available"
  }
}
```

Scaffolding controls where instance configuration is generated and whether a bundle is selectable.

### Environments

```hcl
define bundle {
  environments {
    required = true
  }
}
```

| Attribute | Default | Description |
|---|---|---|
| `required` | `false` | Bundle cannot be used without environments configured in the project. |

When `required = true`, `terramate scaffold` asks the user to select an environment.

### Stacks and component composition

```hcl
define bundle stack "s3-bucket" {
  metadata {
    path = "/stacks/${bundle.environment.id}/s3-buckets/${tm_slug(bundle.input.name.value)}-${bundle.environment.id}"
    name = "AWS S3 Bucket ${bundle.input.name.value}-${bundle.environment.id}"

    tags = [
      bundle.class,
      "environment/${bundle.environment.id}",
    ]
  }

  component "s3-bucket" {
    source = "./components/terramate-aws-s3-bucket"

    inputs {
      name = "${bundle.input.name.value}-${bundle.environment.id}"
      acl  = bundle.input.visibility.value

      tags = {
        "${bundle.class}/environment" = bundle.environment.id
      }
    }
  }
}
```

Bundle stacks define generated stack metadata and component instantiations. Use `bundle.environment` to render environment-specific paths, names, and tags.

### Exports

```hcl
define bundle export "alb_name" {
  value = tm_join("-", [bundle.input.name.value, bundle.environment.id])
}
```

Exports publish computed values for use in other bundles or generation logic.

### Bundle context

The following namespaces are available inside `define bundle`:

| Namespace | Description |
|---|---|
| `bundle.input.<name>.value` | Access input values |
| `bundle.class` | The bundle class (from metadata) |
| `bundle.uuid` | The unique instance UUID |
| `bundle.environment.id` | Active environment short identifier |
| `bundle.environment.name` | Active environment display name |
| `bundle.environment.description` | Active environment description |
| `bundle.environment.available` | Whether an environment is active |
| `bundle.environment.promote_from` | Source environment `id`, or `null` |

## Related

- [Bundles](/environments/bundles)
- [Components](/environments/components)
- [Environments](/environments/environments)
