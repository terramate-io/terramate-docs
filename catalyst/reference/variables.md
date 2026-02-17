---
title: Catalyst Variables
description: terramate.bundles provides bundle data; prefer tm_bundles and tm_bundle going forward.
type: reference
product: catalyst
outline: [2, 4]
---

# Catalyst Variables

## terramate.bundles (deprecated)

Note: Prefer the functions `tm_bundles()` and `tm_bundle()` for new usage. The variable will be available only in specific contexts.

Shape: map‑of‑maps keyed by `class` and `alias`:

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

- Reference: [Catalyst Functions](/catalyst/reference/functions/)
