---
title: Package a Catalog for Remote Use
description: Create a bundles/components catalog and reference it via scaffold.package_sources.
type: how-to
product: catalyst
outline: [2, 4]
---

# Package a Catalog for Remote Use

## Prerequisites

- A repo containing `bundles/` and/or `components/`

## Steps

1) Create a package

```sh
terramate package create dist/catalog
```

2) Host the package

- Serve the `dist/catalog` directory as a ZIP or publish it to a location accessible via HTTPS.

3) Reference the catalog

In your project:

```hcl
scaffold {
  package_sources = [
    "https://example.com/releases/catalog.zip"
  ]
}
```

4) Scaffold from the catalog

```sh
terramate scaffold
```

### Related guides and references

- CLI: `terramate package create` ([reference](/cli/reference/cmdline/package/package-create))
- Concepts: [Collections](/catalyst/concepts/collections)
