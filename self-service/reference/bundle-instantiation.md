---
title: Bundle Instantiation Reference
description: Syntax for bundle instantiation in YAML and HCL.
type: reference
product: capability
outline: [2, 4]
---

# Bundle Instantiation

```yaml
apiVersion: terramate.io/cli/v1
kind: BundleInstance
metadata:
  name: my-service
spec:
  source: /bundles/example.com/my-bundle
  inputs:
    name: my-service
```

```hcl
bundle "my-service" {
  source = "/bundles/example.com/my-bundle"
  inputs {
    name = "my-service"
  }
}
```
