---
title: Catalyst Functions
description: Use tm_bundles and tm_bundle to access instantiated bundle data in code generation and scaffolding.
type: reference
product: catalyst
outline: [2, 4]
---

# Catalyst Functions

## tm_bundles(class)

Returns a list of bundle objects for the given `class`. If none exist, returns an empty list.

Bundle object schema:

```hcl
{
  class   = string
  alias   = string
  uuid    = string
  inputs  = map(object)  # access value as .inputs.<name>.value
  exports = map(object)  # access value as .exports.<name>.value
}
```

## tm_bundle(class, alias)

Returns a single bundle object for the given `class` and key, or `null` if not found. The key can be either the bundle alias or the bundle UUID.

Examples

```hcl
# Access an export
tm_bundle("example.com/my-bundle/v1", "main").exports.my_export.value

# Access an input
tm_bundle("example.com/my-bundle/v1", "main").inputs.name.value

# Select by UUID instead of alias
tm_bundle("example.com/my-bundle/v1", "5d5b9f5c-2b66-4a3c-8d0a-2a6f7b9e2c1a").inputs.name.value
```

### Related guides and references

- Reference: [Variables](/catalyst/reference/variables)
