---
title: tm_filebase64 | Functions | Configuration Language
description: |-
  The tm_filebase64 function reads the contents of the file at the given path and
  returns them as a base64-encoded string.
---

# `tm_filebase64` Function

`filebase64` reads the contents of a file at the given path and returns them as
a base64-encoded string.

```hcl
tm_filebase64(path)
```

The result is a Base64 representation of the raw bytes in the given file.
Strings in the Terraform language are sequences of Unicode characters, so
Base64 is the standard way to represent raw binary data that cannot be
interpreted as Unicode characters. Resource types that operate on binary
data will accept this data encoded in Base64, thus avoiding the need to
decode the result of this function.

Terraform uses the "standard" Base64 alphabet as defined in
[RFC 4648 section 4](https://tools.ietf.org/html/rfc4648#section-4).

This function can be used only with functions that already exist as static
files on disk at the beginning of a Terraform run. Language functions do not
participate in the dependency graph, so this function cannot be used with
files that are generated dynamically during a Terraform operation.

## Examples

```sh
tm_filebase64("${terramate.stack.path.to_root}/hello.txt")
SGVsbG8gV29ybGQ=
```

## Related Functions

* [`tm_file`](./tm_file.md) also reads the contents of a given file,
  but interprets the data as UTF-8 text and returns the result directly
  as a string, without any further encoding.
* [`tm_base64decode`](./tm_base64decode.md) can decode a Base64 string representing
  bytes in UTF-8, but in practice `base64decode(filebase64(...))` is equivalent
  to the shorter expression `file(...)`.
