---
title: tm_base64gunzip | Functions | Configuration Language
description: |-
  The tm_base64gunzip function decodes a Base64-encoded string and uncompresses
  the result with gzip.
---

# `tm_base64gunzip` Function

`tm_base64gunzip` decodes a Base64-encoded string and uncompresses the result
with gzip.

Terraform uses the "standard" Base64 alphabet as defined in
[RFC 4648 section 4](https://tools.ietf.org/html/rfc4648#section-4).

## Related Functions

* [`tm_base64gzip`](./tm_base64gzip.md) compresses a string with gzip and then
  encodes the result in Base64 encoding.
* [`tm_base64decode`](./tm_base64decode.md) decodes a Base64 string without
  gzip decompression.
