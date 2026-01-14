---
title: Use a Remote Catalog for Scaffolding
description: Configure scaffold.package_sources to select Bundles and Components from remote or packaged catalogs.
type: how-to
product: catalyst
outline: [2, 4]
---

# Use a Remote Catalog for Scaffolding

## Prerequisites

- A remote repository or archive exposing `terramate_packages.json` at its root

## Steps

1) Configure sources in `terramate.tm.hcl`

```hcl
scaffold {
  package_sources = [
    "github.com/my-org/my-repo?ref=v1.0.0",
    "https://my-org.com/releases/v1.zip"
  ]
}
```

2) Scaffold and select from the remote catalog

```sh
terramate scaffold
```

## Expected result

- Remote bundles/components are listed alongside local bundles for selection.

### Related guides and references

- Concepts: [Collections](/catalyst/concepts/collections)
