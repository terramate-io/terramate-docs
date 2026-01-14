---
title: Reference Bundle Values in Code Generation
description: Use tm_bundle and tm_bundles to consume bundle inputs/exports in generated code.
type: how-to
product: catalyst
outline: [2, 4]
---

# Reference Bundle Values in Code Generation

You can reference data from instantiated bundles in code generation logic using Catalyst functions.

## Access a specific bundle

```hcl
# Example: access an export value
tm_bundle("example.com/my-bundle/v1", "main").exports.my_export.value
```

## Access all bundles of a class

```hcl
# Iterate through all instances of a class
[for b in tm_bundles("example.com/my-bundle/v1") : b.alias]
```

## Guidance

- Prefer `tm_bundle`/`tm_bundles` over `terramate.bundles` for new code.
- Pass data through component inputs when needed inside component code generation.

### Related guides and references

- Reference: [Catalyst Functions](/catalyst/reference/functions)
