---
title: Reconfigure a Bundle
description: Edit the bundle instantiation (HCL or YAML) and regenerate code.
type: how-to
product: catalyst
outline: [2, 4]
---

# Reconfigure a Bundle

## Prerequisites

- An existing bundle instantiation file (HCL/YAML)

## Steps

1) Edit the instantiation file
- Adjust values in the `inputs` map or `inputs {}` block.

2) Regenerate

```sh
terramate generate
```

## Expected result

- Code is updated according to the new inputs.
- Stacks are not recreated; stack metadata remains unchanged.

### Related guides and references

- Reference: [Bundle Instantiation](/catalyst/reference/bundle-instantiation)
