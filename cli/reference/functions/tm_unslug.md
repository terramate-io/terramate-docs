---
title: tm_unslug | Functions | Configuration Language
description: |-
  The tm_unslug function performs reverse mapping of slugs back to original strings
  using a dictionary lookup.
---

# `tm_unslug` Function

`tm_unslug` performs reverse mapping of slugs back to their original strings using
a dictionary-based lookup. This function is the inverse of `tm_slug` and supports
both single string and list of strings as input.

```hcl
tm_unslug(slug, dictionary)
```

The function accepts:
- `slug`: A string or list of strings containing slugified values to reverse
- `dictionary`: A list of original strings to use for the reverse mapping

## Examples

### Single String Input

```sh
tm_unslug("team-alpha", ["Team Alpha", "Team Beta"])
"Team Alpha"

tm_unslug("hello-world", ["Hello World", "Foo Bar"])
"Hello World"
```

### List Input

```sh
tm_unslug(["foo-bar", "hello-world"], ["Foo Bar", "Hello World"])
["Foo Bar", "Hello World"]

tm_unslug(["product-a", "service-b"], ["Product A", "Service/B", "Other Item"])
["Product A", "Service/B"]
```

### Error Handling

The function detects collisions when multiple dictionary entries would map to the same slug:

```sh
# This would cause an error due to collision
tm_unslug("team-a", ["Team A", "Team-A"])
# Error: collision detected between "Team A" and "Team-A"
```

## Normalization Rules

The function applies smart normalization when matching slugs:
- Handles Unicode characters and special characters
- Normalizes whitespace and punctuation
- Case-insensitive matching

## Related Functions

* [`tm_slug`](./tm_slug.md) performs the opposite operation: converting strings
  to slugified format suitable for URLs and identifiers.