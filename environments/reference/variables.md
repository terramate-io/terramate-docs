---
title: Bundle & Component Variables
description: Variable namespaces for accessing bundle data in code generation.
type: reference
product: capability
outline: [2, 4]
---

# Bundle & Component Variables

## terramate.bundles (deprecated)

Note: Prefer the functions `tm_bundles()` and `tm_bundle()` for new usage. The variable will be available only in specific contexts.

Shape: map-of-maps keyed by `class` and `alias`:

```hcl
terramate.bundles[{class}][{alias}].input
terramate.bundles[{class}][{alias}].export
```

### Example usage

```hcl
allowed_values = tm_concat(
  [{ name = "-- None --", value = null }],
  [for parent in tm_try(
    tm_joinlist("/",
      tm_tree(tm_values(
        terramate.bundles["terramate.io/tf-github-team"])[*].export.team_tuple.value
      )
    ),
    []) :
    { name = parent, value = tm_reverse(tm_split("/", parent))[0] }
  ]
)
```

### See also

- Reference: [Functions](/environments/reference/functions/)
