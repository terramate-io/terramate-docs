---
title: Reconfigure a Bundle
description: Update an existing bundle instance interactively or by editing the instantiation file.
type: how-to
product: catalyst
outline: [2, 4]
---

# Reconfigure a Bundle

After a bundle has been instantiated you may need to change its inputs — for example, switching a resource from private to public. Catalyst supports two workflows: an **interactive CLI** flow and **manual editing**.

## Prerequisites

- An existing bundle instantiation file (HCL or YAML) created via `terramate scaffold`

## Option A — Interactive reconfigure (recommended)

The `bundle reconfigure` command re-opens the same interactive TUI used during scaffolding, pre-filled with the current input values.

### 1) Run reconfigure

```sh
terramate bundle reconfigure
```

- Select the bundle instance you want to update.
- Existing values are pre-filled in every field.
- Inputs marked as `immutable` are displayed as read-only notes and cannot be changed.
- Confirm with **Overwrite Bundle** or discard with **Discard Changes**.

### 2) Regenerate

```sh
terramate generate
```

> [!TIP]
> The `--output-format` flag lets you override the file format (`yaml` or `hcl`). When omitted, the existing format is preserved.

## Option B — Manual editing

### 1) Edit the instantiation file

Open the `.tm.yml` / `.tm.hcl` file and adjust values in the `inputs` map or `inputs {}` block.

### 2) Regenerate

```sh
terramate generate
```

## Immutable inputs

Bundle authors can mark inputs as `immutable = true` in the bundle definition. Immutable inputs:

- **Cannot be changed** via `bundle reconfigure` — they appear as read-only notes showing the current value.
- **Can still be edited manually** in the instantiation file, but doing so is not recommended as it may break assumptions the bundle relies on (e.g., environment or naming conventions).

```hcl
define bundle {
  input "env" {
    type      = string
    prompt    = "Environment"
    immutable = true
  }
}
```

## Expected result

- The instantiation file is updated with the new input values.
- Code is regenerated according to the new inputs.
- Stacks are not recreated; stack metadata remains unchanged.
- Immutable inputs retain their original values.

### Related guides and references

- CLI reference: [`terramate bundle reconfigure`](/cli/reference/cmdline/bundle/bundle-reconfigure)
- CLI reference: [`terramate scaffold`](/cli/reference/cmdline/scaffold)
- Reference: [Bundle Definition — `immutable`](/catalyst/reference/bundle-definition#immutable-inputs)
- Reference: [Bundle Instantiation](/catalyst/reference/bundle-instantiation)
