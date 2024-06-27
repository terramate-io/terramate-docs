---
title: map | Block | Configuration Language
description: Learn how to define complex maps and objects inside globals and lets blocks using the map block.
---

# The `map` block

Use the `map` block to convert a list into a map (key-value pair) or a nested map within a `globals` or `lets` block. 
If you have multiple objects in a list with one or more identical keys, you can merge values corresponding to the identical keys while iterating over them.
For each object in the list, you can access the previous or the current value of any of its keys.
In the `for-each` iteration, the iterator (default name `element`) is an object with the following properties:
```hcl
element = {
    new = <current element>
    old = <previous set value in the object> || null
}
```
## Arguments

The `map` block can only be used inside the [`globals`](../configuration/index.md#globals-block-schema) or [`lets`](../configuration/index.md#lets-block-schema) block, requires one label and optionally accepts a [`value`](../configuration/index.md#value-block-schema).

| name             |      type      | description |
|------------------|----------------|-------------|
| `for_each`        | `list(any)`       | The input list |
| `key`             | `string`          | The computed key |
| `value`           | `any`             | The value for the key |
| [`value`](#value-block-schema) | `block*` | value properties |

The `value` block and the `value` attribute **cannot** be used together.

## Syntax

```hcl
globals {
  map totals {
    for_each = global.orders

    key = element.new.name

    value {
      total_spent = tm_try(element.old.total_spent, 0) + element.new.price
    }
  }
}
```
## Examples

Let's convert the `global.orders` list below into a nested object organized by name and product.

```hcl
globals {
  orders = [
    { name = "Morpheus", product = "sunglass", price = 100.5 },
    { name = "Trinity", product = "cape", price = 82.30 },
    { name = "Trinity", product = "necklace", price = 25.0 },
    { name = "Trinity", product = "sunglass", price = 100.5 },
    { name = "Anderson", product = "ollydbg", price = 30 },
    { name = "Morpheus", product = "boot", price = 65 },
    { name = "Anderson", product = "cape", price = 82.30 },
    { name = "Morpheus", product = "sunglass", price = 145.50 },
  ]
}
```
```hcl
globals {
  map totals {
    for_each = global.orders

    iterator = per_name

    key = per_name.new.name

    value {
      total_spent = tm_try(per_name.old.total_spent, 0) + per_name.new.price

      map per_product {
        for_each = [for v in global.orders : v if v.name == per_name.new.name]

        iterator = per_product

        key = per_product.new.product

        value {
          total = tm_try(per_product.old.total, 0) + per_product.new.price
        }
      }
    }
  }
}
```
It will result in the below object: 
```hcl
obj = {
  Anderson = {
    total_spent = 112.3
    per_product = {
      cape = {
        total = 82.3
      }
      ollydbg = {
        total = 30
      }
    }
  }
  Morpheus = {
    total_spent = 311
    per_product = {
      boot = {
        total = 65
      }
      sunglass = {
        total = 246
      }
    }
  }
  Trinity = {
    total_spent = 207.8
    per_product = {
      cape = {
        total = 82.3
      }
      necklace = {
        total = 25
      }
      sunglass = {
        total = 100.5
      }
    }
  }
}
```