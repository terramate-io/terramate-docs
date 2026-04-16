---
title: tm_templatestring | Functions | Configuration Language
description: |-
  The tm_templatestring function takes a string and renders it as a template
  using a supplied set of template variables.
---

# `tm_templatestring` Function

`tm_templatestring` takes a string and renders it as a template using a
supplied set of template variables.

```hcl
tm_templatestring(str, vars)
```

The template syntax is the same as for
[string templates](https://developer.hashicorp.com/terraform/language/expressions/strings#string-templates)
in the main Terramate language, including interpolation sequences delimited with
`${ ... }`. This function just allows longer template sequences to be factored
out into a separate string for readability.

When using the `tm_templatestring` function, it's important to keep in mind the
usage of escape sequences to prevent premature interpolation. To ensure that
placeholders are treated as literals until they are converted to template
variables, use the escape sequences `$${...}` and `%%{...}` to represent
`${...}` and `%{...}` literals, respectively.

The "vars" argument must be an object. Within the template string, each key in
the map serves as a variable for interpolation. The template may also use any
other function available in the Terramate language. Variable names must each
start with a letter, followed by zero or more letters, digits, or underscores.

Strings in the Terramate language are sequences of Unicode characters, so
this function will interpret the string contents as UTF-8 encoded text.
Any invalid UTF-8 sequences within the template string will result in an error.

## Examples

### Simple String Template

```sh
tm_templatestring("Hello, Jodie!", {})
Hello, Jodie!
```

### String interpolation with variable

```sh
tm_templatestring("Hello, $${name}!", { name = "Alice" })
Hello, Alice!
```

### Lists

```sh
tm_templatestring("List Items: $${join(\", \", list)}", { list = ["value1", "value2", "value3"] })
List Items: value1, value2, value3
```

### Maps

```sh
tm_templatestring("%%{ for key, value in map ~}$${key}=$${value} %%{ endfor ~}", { map = { key1 = "value1", key2 = "value2" } })
key1=value1 key2=value2
```

## Related Functions

* [`tm_templatefile`](./tm_templatefile.md) reads a file from disk and renders
  its content as a template using a supplied set of template variables.
