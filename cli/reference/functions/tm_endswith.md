---
title: tm_endswith | Functions | Configuration Language
description: The `tm_endswith` returns true if the first string ends with that exact suffix.
---

# `tm_endswith` Function

The `tm_endswith` function checks if a given string ends with a specified suffix. It accepts two arguments: the string to evaluate and the suffix string. The function returns true if the string ends with the exact suffix provided.

```hcl
tm_endswith(string, suffix)
```

## Examples

```sh
tm_endswith("hello world", "world")
true

tm_endswith("hello world", "hello")
false
```

## Related Functions

* The [tm_startswith](./tm_startswith.md) function checks if a given string starts with a specified prefix. It accepts two arguments: the string to evaluate and the prefix string. The function returns true if the string begins with the exact prefix provided.

