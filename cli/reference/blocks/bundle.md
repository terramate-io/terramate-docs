---
title: bundle | Block | Configuration Language
description: Syntax for instantiating a Bundle in HCL or YAML to drive scaffolding and generation.
outline: [2, 4]
---

# Bundle Instantiation

Instantiate a bundle by creating a YAML or HCL configuration file. Scaffolding can create this file for you, or you may author it directly.

:::: code-group

```yaml [YAML]
# file: bundle.tm.yml or bundle.tm.yaml
apiVersion: terramate.io/cli/v1
kind: BundleInstance
metadata:
  name: {name}
  # Optional unique identifier for this instance
  uuid: {uuid}
spec:
  source: {bundle-source}
  inputs:
    attribute: value
```

```hcl [HCL]
# file: bundle.tm.hcl or bundle.tm
bundle "{name}" {
  # Optional unique identifier for this instance
  uuid    = "{uuid}"

  source  = "{bundle-source}"
  version = "{bundle-version}" # optional (not yet supported)

  inputs {
    attribute = value
  }
}
```

::::

### Notes

- Default: `terramate scaffold` generates YAML by default. Use `--output-format hcl` to emit HCL instead.
- YAML: `metadata.name` mirrors the HCL label; `spec` mirrors the HCL body.
- YAML: values may embed HCL expressions via `!hcl {expression}`.
- YAML: bundle instances are auto‑loaded by Terramate at startup; no additional import is required.

### Rules

- `{name}` (HCL label) should be a slug:
  - ≤ 255 ASCII characters
  - lowercase alphanumeric, '-' or '_' in the middle
  - starts with `[a-z]`, ends with `[a-z0-9]`
- `{bundle-source}` may be:
  - local dir relative to this file
  - absolute path from repo root
  - remote reference (e.g., `github.com/org/repo//bundles/my-bundle?ref=v1.0.0` or `https://host/releases/v1.zip//bundles/my-bundle?ref=v1.0.0`)
- `version` is reserved for future support.

### Supported attributes and blocks

- `bundle.{name}.source` (required): bundle definition location.
- `bundle.{name}.version` (optional): bundle version (not yet supported).
- `bundle.{name}.inputs` (attribute): map of inputs; unknown keys are ignored.
- `bundle.{name}.inputs` (block): inputs by block; takes precedence over the map for same key.

See also

- Concepts: [Bundles](/catalyst/concepts/bundles)
- Reference: [Bundle Definition](/cli/reference/blocks/define-bundle)
