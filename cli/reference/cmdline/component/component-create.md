---
title: terramate component create
description: Scaffold a Catalyst Component from a Terraform/OpenTofu module by inferring inputs from module variables.
type: reference
product: catalyst
outline: [2, 4]
---

# terramate component create

Convert a Terraform/OpenTofu module into a Catalyst Component by generating initial component metadata and inputs.

## Usage

Run inside a Terraform/OpenTofu module directory:

```sh
terramate component create
```

## Behavior

- Infers component inputs from Terraform/OpenTofu module variables.
- Creates initial component metadata.
- Produces files required to reference the component from a Bundle.

## See also

- Reference: [Component Definition](/catalyst/reference/component-definition)
