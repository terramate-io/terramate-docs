---
title: tm_urldecode | Functions | Configuration Language
description: The tm_urldecode function applies URL decoding to a given string.
---

# `tm_urldecode` Function

`tm_urldecode` applies URL decoding to a given encoded string.

The function is capable of decoding a comprehensive range of characters,
including those outside the ASCII range. Non-ASCII characters are first treated
as UTF-8 bytes, followed by the application of percent decoding to each byte,
facilitating the accurate decoding of multibyte characters.

## Examples

```sh
tm_urldecode("Hello+World%21")
Hello World!
tm_urldecode("%E2%98%83")
☃
tm_urldecode("foo%3Abar%40localhost%3Ffoo%3Dbar%26bar%3Dbaz")
foo:bar@localhost?foo=bar&bar=baz
```

## Related Functions

* [`tm_urlencode`](./tm_urlencode.md) performs the opposite operation, encoding
  a string for use in a URL query string.
