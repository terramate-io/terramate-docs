---
title: terramate bundle reconfigure
description: Interactively update the inputs of an existing Bundle instance.
type: reference
product: cli
outline: [2, 4]
---

# terramate bundle reconfigure

Interactively update the inputs of an existing Bundle instance. The command opens a TUI pre-filled with the current input values, allowing you to change mutable inputs and write the updated instantiation file.

## Usage

```sh
terramate bundle reconfigure [--output-format yaml|hcl]
```

### Flags

| Flag | Default | Description |
|---|---|---|
| `--output-format` | *(empty — preserve existing)* | Override the output format of the updated file. Supported: `yaml`, `hcl`. When empty, the existing file format is preserved. |

## Behavior

1. **Discovers** all bundle instances in the current project.
2. **Prompts** the user to select the instance to reconfigure.
3. **Evaluates** the bundle definition and loads existing input values.
4. **Renders** an interactive form:
   - Mutable inputs are pre-filled with their current values and can be edited.
  - [Immutable inputs](/environments/reference/bundle-definition#immutable-inputs) are shown as read-only notes displaying the current value.
   - Only inputs with a `prompt` attribute are displayed.
5. **Writes** the updated instantiation file upon confirmation (atomic file replace).

### Input field types

The field type rendered in the TUI is determined by the input definition:

| Input definition | TUI field |
|---|---|
| `allowed_values` + `multiselect` | Multi-select list |
| `allowed_values` | Single-select list |
| `type = bool` | Yes / No confirm |
| `type = string` | Text input |
| `type = number` | Number input |
| `type = list(string)` or `list(number)` | Multi-line text input |
| Any other type | HCL expression input |

### Merge behavior

- Updated and unchanged inputs are merged into the output.
- Inputs set to `nil` or `null` are removed from the output.
- Input ordering follows the bundle definition order first, with any extra keys sorted alphabetically.

## Example

```sh
# Reconfigure interactively, keeping the existing file format
terramate bundle reconfigure

# Regenerate code after reconfiguring
terramate generate
```

### Related guides and references

- How-to: [How to Reconfigure a Bundle](/self-service/reconfigure-bundle)
- CLI reference: [`terramate scaffold`](/cli/reference/cmdline/scaffold)
- Reference: [Bundle Definition — Immutable inputs](/environments/reference/bundle-definition#immutable-inputs)
- Reference: [Bundle Instantiation](/self-service/reference/bundle-instantiation)
