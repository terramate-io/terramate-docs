---
title: tm_startswith | Functions | Configuration Language
description: The `tm_startswith` function returns true if the string begins with that exact prefix.
---

# `tm_startswith` Function

`tm_startswith` takes two values: a string to check and a prefix string. The function returns true if the string begins with that exact prefix.

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

