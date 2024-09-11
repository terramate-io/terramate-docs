---
title: tm_hcldecode | Functions | Configuration Language
description: |-
  The tm_hcldecode function decodes an HCL file content into a Terramate representation of its value.
---

# `tm_hcldecode` Function

`tm_hcldecode` interprets a given string as HCL file content and returns a decoded Terramate value representation.
At the moment, blocks **are not supported** and the decoding fails if they are present in input string.

## Examples

```
tm_hcldecode(<<-EOF
  name = "my-instance"
  size = 10
EOF)
{
  name = "my-instance"
  size = 10
}
```

## Related Functions

* [`tm_hclencode`](./tm_hclencode.md) performs the opposite operation, _encoding_
  an object or map value as an HCL file content string.
