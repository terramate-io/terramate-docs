---
title: tm_hclencode | Functions | Configuration Language
description: The tm_hclencode function encodes a given value as a HCL file content.
---

# `tm_hclencode` Function

`tm_hclencode` encodes a given object or map value to a string using [HCL](https://github.com/terramate-io/hcl/blob/main/hclsyntax/spec.md) file syntax.
The top-level object keys and values are encoded as HCL top-level attributes.

The main use case for this function is generating the Terraform/Tofu [`.tfvars`](https://developer.hashicorp.com/terraform/language/values/variables#variable-definitions-tfvars-files) file.

The top-level object key **MUST** be a [valid HCL identifier](https://github.com/terramate-io/hcl/blob/main/hclsyntax/spec.md#structural-elements) or else it fails.
At this point, blocks **cannot be encoded**.

Example:
```
tm_hclencode({name = "my-instance", size = "10"})
name = "my-instance"
size = 10

```

## Examples

```sh
tm_hclencode({image_id = "ami-abc123", availability_zone_names = ["us-east-1a", "us-west-1c"]})
image_id = "ami-abc123"
availability_zone_names = [
  "us-east-1a",
  "us-west-1c",
]
```

## Related Functions

* [`tm_hcldecode`](./tm_hcldecode.md) performs the opposite operation, _decoding_
  an HCL file content to obtain its corresponding Terramate value.
