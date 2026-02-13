---
title: Use a Remote Catalog for Scaffolding
description: Configure package sources so scaffold can load bundles from remote catalogs.
type: how-to
product: capability
outline: [2, 4]
---

# Use a Remote Catalog for Scaffolding

1) Configure `terramate.tm.hcl`:

```hcl
scaffold {
  package_sources = [
    "github.com/my-org/my-repo?ref=v1.0.0"
  ]
}
```

2) Run `terramate scaffold`.

Expected result: remote bundles appear in selection.
