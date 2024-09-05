---
title: tm_timecmp | Functions | Configuration Language
description: The tm_timecmp compares two timestamps and returns a number that represents the ordering of the instants those timestamps represent.
---

# `tm_timecmp` Function

The `tm_timecmp` compares two timestamps and returns a number that represents the ordering of the instants those timestamps represent.

```
tm_timecmp(timestamp_a, timestamp_b)
```

| Condition                                          | Return Value |
| -------------------------------------------------- | ------------ |
| `timestamp_a` is before `timestamp_b`              | -1           |
| `timestamp_a` is the same instant as `timestamp_b` | 0            |
| `timestamp_a` is after `timestamp_b`               | 1            |

When comparing the timestamps, `tm_timecmp` takes into account the UTC offsets given in each timestamp. For example, `06:00:00+0200` and `04:00:00Z` are the same instant after taking into account the `+0200` offset on the first timestamp.

In the Terramate language, timestamps are conventionally represented as strings using *RFC 3339* "Date and Time format" syntax. The `tm_timecmp` requires the its two arguments to both be strings conforming to this syntax.

## Examples

```sh
tm_timecmp("2017-11-22T00:00:00Z", "2017-11-22T00:00:00Z")
0

tm_timecmp("2017-11-22T00:00:00Z", "2017-11-22T01:00:00Z")
-1

tm_timecmp("2017-11-22T01:00:00Z", "2017-11-22T00:00:00Z")
1

tm_timecmp("2017-11-22T01:00:00Z", "2017-11-22T00:00:00-01:00")
0
```

## Related Functions

* [`tm_formatdate`](./tm_formatdate.md) can convert the resulting timestamp to
  other date and time formats.
* [`tm_timeadd`](./tm_timeadd.md) adds a duration to a timestamp, returning a new timestamp.
* [`tm_timestamp`](./tm_timestamp.md) returns a string representation of the current date
  and time.