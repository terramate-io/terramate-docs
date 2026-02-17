---
title: Bundle Definition (HCL)
description: Define a Bundle’s metadata, inputs, scaffolding, stacks, component instances, and exports.
type: reference
product: catalyst
outline: [2, 4]
---

# Bundle Definition

A Bundle is defined using a `define bundle {}` block. One bundle per directory.

## Sections to define

- Metadata
- Alias
- Inputs
- Scaffolding
- Stacks
- Components in stacks
- Exports

## Metadata

```hcl
define bundle metadata {
  class   = "example.com/my-bundle"
  version = "1.0.0"
  name    = "My Bundle"
  description = <<-EOF
    My first Terramate Bundle is doing great things
  EOF
  # Optional
  technologies = ["aws", "terraform"]
}
```

## Alias

`alias` provides a unique identifier for bundle instances (per class) and is typically derived from inputs.

```hcl
define bundle {
  alias = tm_slug(bundle.input.name.value)
}
```

Default alias: `{bundle-instance-dirname}:{name}`.

## Inputs

```hcl
define bundle {
  input "name" {
    type        = string
    description = "Set a name for the service"
    prompt      = "Name of the Service"
    required_for_scaffold = true
  }

  input "visibility" {
    type        = string
    description = "Visibility of the Resource"
    default     = "private"
    prompt      = "Visibility"
    allowed_values = [
      { name = "A public resource", value = "public" },
      { name = "A private resource", value = "private" },
    ]
  }
}
```

### Notes

- Supported types: `string`, `bool`, `number`, `any`, `object`, `list(T)`, `set(T)`, `map(T)`, `tuple(T1, T2, ..., Tn)`, and schema references. See [Type expressions](#type-expressions) for the full type language.
- `prompt`, `allowed_values`, `multiselect`, `multiline`, `required_for_scaffold` are used by `terramate scaffold` and `terramate bundle reconfigure`.
- `required_for_scaffold` (boolean): include this input in the interactive scaffold flow and require a value.

### Immutable inputs

Mark an input as `immutable = true` to prevent it from being changed via `terramate bundle reconfigure`. Immutable inputs are displayed as read-only notes in the reconfigure TUI, showing their current value but not allowing edits.

This is useful for inputs that should not change after initial scaffolding — for example, the target environment or a resource identifier used in naming conventions.

```hcl
define bundle {
  input "env" {
    type        = string
    description = "Target environment"
    prompt      = "Environment"
    immutable   = true
    allowed_values = [
      { name = "Development", value = "dev" },
      { name = "Production", value = "prod" },
    ]
  }
}
```

During `bundle reconfigure`, immutable inputs appear as:

```
  Environment (immutable)

  Target environment
  Current value: "dev"
```

### Object attributes

Inputs can define `attribute` blocks to validate object structure. When attributes are present, the default type becomes `object`.

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

    attribute "gender" {
      type = string
    }

    default = { name = "hans", age = 33 }
  }
}
```

Inputs without a `type` and without attributes default to `type = any` and accept any value.

### Schema definitions

Object attribute definitions can be extracted into reusable schemas. A schema is a top-level definition block, like bundles and components, and can be placed anywhere.

#### Defining schemas

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

#### Using schemas in bundles

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

#### Implicit input schemas

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

### Type expressions

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

#### Sets

`set(T)` is useful when you need guaranteed uniqueness, for example when collecting tags or labels:

```hcl
define bundle {
  input "tags" {
    type    = set(string)
    default = ["web", "api", "web", "prod"]  # Results in ["web", "api", "prod"]
  }
}
```

#### Object with attached attributes

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

#### Variants

`any_of(A, B, ...)` accepts a value matching any of the listed types, similar to union types:

```hcl
type = any_of(string, number)
type = list(any_of(string, common.person))
```

Operands can be any type expression.

#### Non-strict object validation

By default, attribute validation is strict -- unexpected attributes cause an error. Use `has(T)` for non-strict validation that allows extra attributes:

```hcl
# Given { name = "hans", age = 33, unknown = "bla" }:
type = common.person        # Error: unexpected attribute "unknown"
type = has(common.person)   # OK: extra attributes allowed
```

`has(T)` expresses a "has-a" relationship instead of the default "is-a".

#### Schema composition

Schemas can be combined with the `+` operator:

```hcl
type = schemaA + schemaB              # Merge both, must match exactly
type = has(schemaA + schemaB)         # Merge both, allow extras
type = common.person + object         # Merge person schema with local attributes
```

## Scaffolding

```hcl
define bundle scaffolding {
  path = "/path/to/bundle_${tm_slug(bundle.input.name.value)}.tm.yml"
  name = tm_slug(bundle.input.name.value)

  enabled {
    condition     = <bool expression>
    error_message = "Shown when condition is false"
  }
}
```

- `path`/`name`: controls output location and default instance name used by `terramate scaffold`.
- `enabled` blocks: optional gating for whether a bundle is selectable in the scaffold UI. When the `condition` evaluates to false, the bundle is disabled and `error_message` is shown.

## Stacks

```hcl
define bundle stack "organization-members" {
  # Optional: conditionally include this stack
  condition = <bool expression>

  metadata {
    path = "organization/memberships"
    name        = "GitHub Organization Member"
    description = "GitHub organization members, owners, collaborators and blocked users"
    tags = ["example.com/github-organization"]
    # Optional: additional metadata
    after     = []
    before    = []
    wants     = []
    wanted_by = []
    watch     = []
  }

  component "members" {
    source = "/components/terramate.io/terramate-tf-github-organization-members/v1"
    inputs = { for k in tm_keys(bundle.input) : k => bundle.input[k].value }
  }
}
```

Stack metadata supports: `path`, `name`, `description`, `tags`, `after`, `before`, `wants`, `wanted_by`, `watch` (relative `path` is resolved from instantiation file; absolute is from repo root).

### Behavior

- Stacks are created if missing.
- On existing stacks, `name` and `description` are only set if empty; list fields (`tags`, `after`, `before`, `wants`, `wanted_by`, `watch`) are merged (union).
- Removing a bundle instantiation removes generated code but not the stack itself.

### Available bundle context

- `bundle.input` — access input values, e.g. `bundle.input.name.value`
- `bundle.class` — the bundle class (from metadata)
- `bundle.uuid` — the unique instance UUID (useful for tagging and cross‑bundle relationships)

## Exports

```hcl
define bundle export "team_tuple" {
  value = [bundle.input.parent.value, bundle.input.name.value]
}
```

Exports make precomputed values available to other bundles or code generation (e.g., for `allowed_values`).

### Related guides and references

- Concepts: [Bundles](/catalyst/concepts/bundles)
- Reference: [Component Definition](/catalyst/reference/component-definition)
