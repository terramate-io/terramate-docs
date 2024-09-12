---
title: tm_hcldecode | Functions | Configuration Language
description: |-
  The tm_hcldecode function decodes an HCL file content into a Terramate representation of its value.
---

# `tm_hcldecode` Function

The `tm_hcldecode` function parses a given string as HCL file content and returns a decoded Terramate value. Currently, the function **does not support** blocks, and the decoding process will fail if blocks are present in the input string.

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

* [`tm_hclencode`](./tm_hclencode.md) performs the reverse operation, encoding an object or map into an HCL file content string.
