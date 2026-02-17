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

- Supported types: `string`, `number`, `any`, `list(...)`, `map(...)`. (Terraform‑style `object` is not supported.)
- `prompt`, `allowed_values`, `multiselect`, `multiline`, `required_for_scaffold` are used by `terramate scaffold`.
- `required_for_scaffold` (boolean): include this input in the interactive scaffold flow and require a value.

## Scaffolding

```hcl
define bundle scaffolding {
  path = "/path/to/bundle_${tm_slug(bundle.input.name.value)}.tm.yml"
  name = tm_slug(bundle.input.name.value)
}
```

Controls where the instantiation file is written and its default name.

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
