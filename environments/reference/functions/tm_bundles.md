---
title: tm_bundles
description: Returns a list of bundle objects for the given class.
type: reference
product: capability
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
  input  = map(object)  # access value as .input.<name>.value
  export = map(object)  # access value as .export.<name>.value
}
```

## Examples

### Iterate over all bundles of a class

```hcl
dynamic "module" {
  for_each = tm_bundles("example.com/my-bundle/v1")

  content {
    source = module.value.input.source.value
    name   = module.value.input.name.value
  }
}
```

### Access exports from multiple bundles

```hcl
locals {
  all_endpoints = [
    for bundle in tm_bundles("example.com/api-service/v1") :
    bundle.export.endpoint_url.value
  ]
}
```

## Related Functions

- [tm_bundle](/environments/reference/functions/tm_bundle) - Get a single bundle by class and alias/UUID
- [tm_source](/environments/reference/functions/tm_source) - Translate module paths in components

## See Also

- [Bundle Definition](/environments/reference/bundle-definition)
- [Bundle Instantiation](/self-service/reference/bundle-instantiation)
- [Variables](/environments/reference/variables)
