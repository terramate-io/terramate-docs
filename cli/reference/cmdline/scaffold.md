---
title: terramate scaffold
description: Interactively instantiate a Catalyst Bundle and write an instantiation file (HCL/YAML).
type: reference
product: cli
outline: [2, 4]
---

# terramate scaffold

Interactively instantiate a Bundle by selecting from local or remote collections and providing input values via prompts. Writes a Bundle Instantiation file at the path defined by the bundle's scaffolding configuration.

## Usage

```sh
terramate scaffold [--output-format yaml|hcl] [--generate]
```

### Flags

| Flag | Default | Description |
|---|---|---|
| `--output-format` | `yaml` | Output format for the created instantiation file. Supported: `yaml`, `hcl`. |
| `--generate` | `false` | Run `terramate generate` automatically after creating the bundle instance. |

## Behavior

- Lists Bundles discovered locally (e.g., `/bundles`) and from configured remote catalogs.
- Prompts for inputs as defined by the bundle (supports `prompt`, `allowed_values`, `multiselect`, `multiline`).
- Writes an instantiation file (`bundle.tm.hcl` or `bundle.tm.yml`) based on the bundle's scaffolding configuration.

> [!TIP]
> To update an existing bundle instance, use [`terramate bundle reconfigure`](/cli/reference/cmdline/bundle/bundle-reconfigure) instead.

### Related guides and references

- CLI reference: [`terramate bundle reconfigure`](/cli/reference/cmdline/bundle/bundle-reconfigure)
- CLI reference: [`terramate generate`](/cli/reference/cmdline/generate)
- Reference: [Bundle Instantiation](/self-service/reference/bundle-instantiation)
- Concepts: [Collections](/self-service/collections)
