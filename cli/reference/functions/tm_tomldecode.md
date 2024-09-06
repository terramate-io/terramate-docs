---
title: tm_tomldecode | Functions | Configuration Language
description: |-
  The tm_tomldecode function decodes a TOML string into an HCL representation of its
  value.
---

# `tm_tomldecode` Function

`tm_tomldecode` interprets a given string as TOML, returning a HCL value representation
of the result of decoding that string.

This function maps TOML values to **Terramate language values** in the following way:

| TOML type                                              | Terramate type |
| ------------------------------------------------------ | -------------- |
| [String](https://toml.io/en/v1.0.0#string)             | `string`       |
| [Integer](https://toml.io/en/v1.0.0#integer)           | `number`       |
| [Float](https://toml.io/en/v1.0.0#float)               | `number`       |
| [Boolean](https://toml.io/en/v1.0.0#boolean)           | `bool`         |
| [Array](https://toml.io/en/v1.0.0#array)               | `tuple(...)`   |
| [Table](https://toml.io/en/v1.0.0#table)               | `map(...)`     |
| [Date/Time](https://toml.io/en/v1.0.0#local-date-time) | `string`       |

The Terramate language automatic type conversion rules mean that you don't
usually need to worry about exactly what type is produced for a given value,
and can just use the result in an intuitive way.

The Dates or Times decoded into HCL strings can be used with `tm_timeadd` or `tm_timecmp`
because they have the same RFC3309 format.
Example:

```
tm_timeadd(tm_tomldecode("member_since = 1979-05-27T07:32:00Z").member_since, "1h")
1979-05-27T08:32:00Z
```

## Examples

```sh
tm_tomldecode("[project]\nname = 'my app'\nversion = '1.0.0'")
{
  project = {
    name    = "my app"
    version = "1.0.0"
  }
}
```

## Related Functions

* [`tm_tomlencode`](./tm_jsonencode.md) performs the opposite operation, _encoding_
  a value as a TOML string.
