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
  }
}
```

Inputs define the bundle contract consumed by scaffolding workflows.

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

#### Schema definitions

Object attribute definitions can be extracted into reusable schemas. A schema is a top-level definition block, like bundles and components, and can be placed anywhere.

##### Defining schemas

```hcl
define schema "person" {
  attribute "name" {
    type = string
  }
  attribute "age" {
    type = number
  }
}
```

##### Using schemas in bundles

Import schemas into a bundle with `uses schemas` and reference them in type expressions:

```hcl
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

`source` can be a local or remote path, just like a component. Multiple schemas can exist in the same directory -- all are included and available under the assigned namespace, preventing naming collisions when importing from multiple sources.

##### Implicit input schemas

When attributes are defined directly in an input, they implicitly define a schema. Implicit input schemas are available under the `input` namespace and can be referenced in other inputs:

```hcl
define bundle {
  input "owner" {
    attribute "name" { type = string }
    attribute "age"  { type = number }
    default = { name = "hans", age = 33 }
  }

  input "backup_owner" {
    type = input.owner
  }
}
```

#### Type expressions

Terramate uses its own type expression language for input validation. The following type constructors are available:

| Type | Description |
|---|---|
| `any` | Matches any value. |
| `string` | A string value. |
| `bool` | A boolean value. |
| `number` | A numeric value. |
| `object` | An object. Without attributes, matches any object. With `attribute` blocks, validates structure. |
| `list(T)` | An ordered list where all elements match `T`. |
| `set(T)` | Like `list(T)` but automatically removes duplicate values. Order of first occurrence is preserved. |
| `map(T)` | A map with string keys and values matching `T`. |
| `tuple(T1, T2, ..., Tn)` | A fixed-length sequence where each position matches its type. |

##### Sets

`set(T)` is useful when you need guaranteed uniqueness, for example when collecting tags or labels:

```hcl
define bundle {
  input "tags" {
    type    = set(string)
    default = ["web", "api", "web", "prod"]  # Results in ["web", "api", "prod"]
  }
}
```

##### Object with attached attributes

When `object` appears inside a collection type, `attribute` blocks are attached to the object definition:

```hcl
define bundle {
  input "people" {
    type = list(object)

    attribute "name" {
      type = string
    }

    attribute "age" {
      type = number
    }

    default = [{ name = "hans", age = 33 }, { name = "frieda", age = 34 }]
  }
}
```

The implicit schema type for `people` is `list(object)`. To make the person concept reusable, define it in an external schema and use `type = list(common.person)`.

##### Variants

`any_of(A, B, ...)` accepts a value matching any of the listed types, similar to union types:

```hcl
type = any_of(string, number)
type = list(any_of(string, common.person))
```

Operands can be any type expression.

##### Non-strict object validation

By default, attribute validation is strict -- unexpected attributes cause an error. Use `has(T)` for non-strict validation that allows extra attributes:

```hcl
# Given { name = "hans", age = 33, unknown = "bla" }:
type = common.person        # Error: unexpected attribute "unknown"
type = has(common.person)   # OK: extra attributes allowed
```

`has(T)` expresses a "has-a" relationship instead of the default "is-a".

##### Schema composition

Schemas can be combined with the `+` operator:

```hcl
type = schemaA + schemaB              # Merge both, must match exactly
type = has(schemaA + schemaB)         # Merge both, allow extras
type = common.person + object         # Merge person schema with local attributes
```

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

- `path`/`name`: controls output location and default instance name used by `terramate scaffold`.
- `enabled` blocks: optional gating for whether a bundle is selectable in the scaffold UI. When the `condition` evaluates to false, the bundle is disabled and `error_message` is shown.

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
