---
title: tm_strcontains | Functions | Configuration Language
description: The tm_strcontains function checks whether a substring is within another string.
---

# `tm_strcontains` Function

`tm_strcontains` function checks whether a substring is within another string.

```
tm_strcontains(string, substr)
```

## Examples

```sh
tm_strcontains("hello world", "wor")
true

tm_strcontains("hello world", "wod")
false
```

## Related Functions

* [`tm_startswith`](./tm_startswith.md) takes two values: a string to check and a prefix string. The function returns true if the string begins with that exact prefix.
* [`tm_endswith`](./tm_endswith.md) takes two values: a string to check and a suffix string. The function returns true if the first string ends with that exact suffix.
