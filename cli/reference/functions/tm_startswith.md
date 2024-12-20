---
title: tm_startswith | Functions | Configuration Language
description: The `tm_startswith` function returns true if the string begins with that exact prefix.
---

# `tm_startswith` Function

The `tm_startswith` function checks if a given string starts with a specified prefix. It accepts two arguments: the string to evaluate and the prefix string. The function returns true if the string begins with the exact prefix provided.

```hcl
tm_startswith(string, prefix)
```

## Examples

```sh
tm_startswith("hello world", "hello")
true

startswith("hello world", "world")
false
```

## Related Functions

* The `tm_endswith` function checks if a given string ends with a specified suffix. It accepts two arguments: the string to evaluate and the suffix string. The function returns true if the string ends with the exact suffix provided.
