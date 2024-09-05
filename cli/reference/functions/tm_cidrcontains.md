---
title: tm_cidrcontains | Functions | Configuration Language
description: The tm_cidrcontains determines whether a given IP address or an address prefix given in CIDR notation is within a given IP network address prefix.
---

# `tm_cidrcontains` Function

The `tm_cidrcontains` determines whether a given IP address or an address prefix given in [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation is within a given IP network address prefix.

Note that both arguments must belong to the same address family, either IPv4 or IPv6. A family mismatch will result in an error.

## Examples

```sh
tm_cidrcontains("192.168.2.0/20", "192.168.2.1")
true

tm_cidrcontains("192.168.2.0/20", "192.168.2.0/22")
true

tm_cidrcontains("192.168.2.0/20", "192.126.2.1")
false

tm_cidrcontains("192.168.2.0/20", "192.126.2.0/18")
false

tm_cidrcontains("fe80::/48", "fe80::1")
true

tm_cidrcontains("fe80::/48", "fe81::1")
false
```

## Related Functions

* [`tm_cidrhost`](./tm_cidrhost.md) calculates a full host IP address within a given IP network address prefix.
* [`tm_cidrsubnet`](./tm_cidrsubnet.md) calculates a subnet address under a given
  network address prefix.
* [`tm_cidrsubnets`](./tm_cidrsubnets.md) calculates a sequence of consecutive IP address ranges within a particular CIDR prefix.
* [`tm_cidrnetmask](./tm_cidrnetmask.md) converts an IPv4 address prefix given in CIDR notation into a subnet mask address.
