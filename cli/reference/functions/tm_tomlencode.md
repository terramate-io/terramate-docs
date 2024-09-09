---
title: tm_tomlencode | Functions | Configuration Language
description: The tm_tomlencode function encodes a given value as a TOML string.
---

# `tm_tomlencode` Function

`tm_tomlencode` encodes a given value to a string using [TOML](https://toml.io/en/) syntax.

This function maps **Terramate language values** to TOML values in the following way:

| Terramate type | TOML type |
| -------------- | --------- |
| `string`       | [String](https://toml.io/en/v1.0.0#string)    |
| `number`       | [Float](https://toml.io/en/v1.0.0#float)    |
| `bool`         | [Boolean](https://toml.io/en/v1.0.0#boolean)      |
| `list(...)`    | [Array](https://toml.io/en/v1.0.0#array)     |
| `set(...)`     | [Array](https://toml.io/en/v1.0.0#array)     |
| `tuple(...)`   | [Array](https://toml.io/en/v1.0.0#array)     |
| `map(...)`     | [Table](https://toml.io/en/v1.0.0#table)   |
| `object(...)`  | [Table](https://toml.io/en/v1.0.0#table)    |
| Null value     | Not supported*    |

Because `null` values are not supported in TOML, they are not encoded, which means that
`tm_tomlencode(null)` is an error and if `null` appear in any collection type, it's ignored
or the field it sets is not encoded.

Example of `null` value:

```
tm_tomlencode({a = 1, b = null})
a = 1.0

```

## Examples

```sh
tm_tomlencode([1, 2, 3])
[1.0, 2.0, 3.0]

tm_tomlencode({project = {name = "my app", version = "1.0.0"}})
[project]
name = 'my app'
version = '1.0.0'
```

## Related Functions

* [`tm_tomldecode`](./tm_tomldecode.md) performs the opposite operation, _decoding_
  a TOML string to obtain its corresponding HCL value.
