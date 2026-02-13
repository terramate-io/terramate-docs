---
title: Reference Bundle Values in Code Generation
description: Use tm_bundle and tm_bundles in generation logic.
type: how-to
product: capability
outline: [2, 4]
---

# Reference Bundle Values in Code Generation

```hcl
tm_bundle("example.com/my-bundle/v1", "main").export.my_export.value
```

```hcl
[for b in tm_bundles("example.com/my-bundle/v1") : b.alias]
```
