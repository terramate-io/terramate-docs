---
title: terramate scaffold
description: Interactively instantiate a Catalyst Bundle and write an instantiation file (HCL/YAML).
type: reference
product: catalyst
outline: [2, 4]
---

# terramate scaffold

Interactively instantiate a Bundle by selecting from local or remote collections and providing input values via prompts. Writes a Bundle Instantiation file at the path defined by the bundle’s scaffolding configuration.

## Usage

```sh
terramate scaffold [--output-format yaml|hcl] [--generate]
```

- --output-format: Output format for the created instantiation file. Defaults to yaml. Supported: yaml, hcl.
- --generate: Run `terramate generate` automatically after creating the bundle instance. Defaults to false.

## Behavior

- Lists Bundles discovered locally (e.g., `/bundles`) and from configured remote catalogs.
- Prompts for inputs as defined by the bundle (supports `prompt`, `allowed_values`, `multiselect`, `multiline`).
- Writes an instantiation file (`bundle.tm.hcl` or `bundle.tm.yml`) based on the bundle’s scaffolding configuration.

### Related guides and references

- terramate generate (core CLI)
- Reference: [Bundle Instantiation](/cli/reference/blocks/bundle)
- Concepts: [Collections](/catalyst/concepts/collections)
