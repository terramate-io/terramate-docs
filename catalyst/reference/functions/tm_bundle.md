---
title: tm_bundle - Terramate Catalyst Functions
description: Returns a single bundle object for the given class and key in Terramate Catalyst.
---

# tm_bundle(class, alias)

Returns a single bundle object for the given `class` and key, or `null` if not found. The key can be either the bundle alias or the bundle UUID.

## Syntax

```hcl
tm_bundle(class, key)
```

### Parameters

- `class` (string) - The bundle class identifier to query for
- `key` (string) - The bundle alias or UUID to match

### Return Value

Returns a single bundle object or `null` if not found. The bundle object has the following schema:

```hcl
{
  class   = string
  alias   = string
  uuid    = string
  inputs  = map(object)  # access value as .inputs.<name>.value
  exports = map(object)  # access value as .exports.<name>.value
}
```

## Examples

### Access a bundle export

```hcl
locals {
  api_endpoint = tm_bundle("example.com/my-bundle/v1", "main").exports.my_export.value
}
```

### Access a bundle input

```hcl
locals {
  service_name = tm_bundle("example.com/my-bundle/v1", "main").inputs.name.value
}
```

### Select by UUID instead of alias

```hcl
locals {
  config = tm_bundle(
    "example.com/my-bundle/v1",
    "5d5b9f5c-2b66-4a3c-8d0a-2a6f7b9e2c1a"
  ).inputs.configuration.value
}
```

### Handle missing bundles

```hcl
locals {
  optional_config = try(
    tm_bundle("example.com/optional-bundle/v1", "main").inputs.config.value,
    "default-value"
  )
}
```

## Related Functions

- [tm_bundles](/catalyst/reference/functions/tm_bundles) - Get all bundles of a given class
- [tm_source](/catalyst/reference/functions/tm_source) - Translate module paths in components

## See Also

- [Bundle Definition](/catalyst/reference/bundle-definition)
- [Bundle Instantiation](/catalyst/reference/bundle-instantiation)
- [Variables](/catalyst/reference/variables)
