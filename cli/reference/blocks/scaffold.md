---
title: scaffold | Block | Configuration Language
description: Configure scaffold settings for Terramate Catalyst.
---

# The `scaffold` block

Use the `scaffold` block to configure project-level scaffolding settings for Terramate Catalyst. This block controls where Catalyst looks for bundle and component packages when scaffolding new instances.

## Arguments

- `package_sources` _(optional, list of strings)_ - A list of package source URLs or paths that Catalyst searches when resolving bundle and component references during scaffolding.

## Syntax

```hcl
scaffold {
  package_sources = [
    "github.com/my-org/infra-catalog//packages?ref=main",
    "/local/packages",
  ]
}
```

## See also

- CLI command: [terramate scaffold](/cli/reference/cmdline/scaffold)
- Concepts: [Scaffolding & Generation](/catalyst/concepts/scaffolding-and-generation)
