---
title: tm_bundles - Terramate Catalyst Functions
description: Returns a list of bundle objects for the given class in Terramate Catalyst.
---

# tm_bundles(class)

Returns a list of bundle objects for the given `class`. If none exist, returns an empty list.

## Syntax

```hcl
tm_bundles(class)
```

### Parameters

- `class` (string) - The bundle class identifier to query for

### Return Value

Returns a list of bundle objects. Each bundle object has the following schema:

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

### Iterate over all bundles of a class

```hcl
dynamic "module" {
  for_each = tm_bundles("example.com/my-bundle/v1")

  content {
    source = module.value.inputs.source.value
    name   = module.value.inputs.name.value
  }
}
```

### Access exports from multiple bundles

```hcl
locals {
  all_endpoints = [
    for bundle in tm_bundles("example.com/api-service/v1") :
    bundle.exports.endpoint_url.value
  ]
}
```

## Related Functions

- [tm_bundle](/catalyst/reference/functions/tm_bundle) - Get a single bundle by class and alias/UUID
- [tm_source](/catalyst/reference/functions/tm_source) - Translate module paths in components

## See Also

- [Bundle Definition](/catalyst/reference/bundle-definition)
- [Bundle Instantiation](/catalyst/reference/bundle-instantiation)
- [Variables](/catalyst/reference/variables)
