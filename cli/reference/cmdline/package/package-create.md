---
title: terramate package create
description: Create a package (catalog) containing bundles and components for remote distribution.
type: reference
product: catalyst
outline: [2, 4]
---

# terramate package create

Package bundles and components into a distributable catalog that can be consumed by `terramate scaffold` via `scaffold.package_sources`.

## Usage

```sh
terramate package create <output-dir> \
  [--manifest-only] \
  [--location "<location override>"] \
  [--name "<catalog name>"] \
  [--description "<catalog description>"]
```

- `<output-dir>`: Output directory for the package contents.
- `--manifest-only`: Generate only the `terramate_packages.json` manifest without copying referenced files.
- `--location`: Override the package location.
- `--name`: Set catalog name shown to users.
- `--description`: Set catalog description shown to users.

### Related guides and references

- Concepts: [Collections](/catalyst/concepts/collections)
- How‑to: [Use a Remote Catalog](/catalyst/how-to/use-remote-catalog)
