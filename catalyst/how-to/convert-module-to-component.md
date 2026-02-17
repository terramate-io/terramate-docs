---
title: Convert a Terraform Module to a Component
description: Use terramate component create to scaffold a Component from a TF/OpenTofu module.
type: how-to
product: catalyst
outline: [2, 4]
---

# Convert a Terraform Module to a Component

## Goal

- Turn an existing Terraform/OpenTofu module into a Catalyst Component that bundles can reference via `source`, with inputs inferred from module variables and basic metadata scaffolded.
- Outcome: a reusable, policy‑ready Component definition living alongside your module, ready to be wired into bundles and generated into stack code.

## Prerequisites

- A Terraform/OpenTofu module directory with variables defined

## Steps

1) Run inside the module directory

```sh
terramate component create
```

Alternatively, pass the module path directly:

```sh
terramate component create path/to/module      # relative to working directory
```

2) Review generated files
- Inputs are inferred from module variables
- Initial metadata for the component is created

3) Reference from a bundle
- In your bundle stack, add a `component` block pointing to this component’s `source`

## Example: Convert terraform-aws-modules/s3-bucket

1) Fetch the module locally and enter it

```sh
git clone https://github.com/terraform-aws-modules/terraform-aws-s3-bucket.git
cd terraform-aws-s3-bucket
```

2) Scaffold a Component

```sh
terramate component create
```

3) Review the generated definition
- Inputs are inferred from `variables.tf` (e.g., `bucket`, `versioning`, `policy`, …).
- Metadata is initialized; update `class`, `name`, and `version` to match your catalog.

Example metadata (edit to your org):

```hcl
define component metadata {
  class   = "example.com/aws-s3-bucket"
  version = "1.0.0"
  name    = "AWS S3 Bucket"
    
   ...
}
```

4) Reference from a bundle

```hcl
define bundle stack "storage" {
  component "bucket" {
    source = "/components/example.com/aws-s3-bucket/v1"
    inputs = {
      bucket     = "my-s3-bucket"
      versioning = { enabled = true }
    }
  }
}
```

## Expected result

- A usable Component definition that can be instantiated by Bundles.

### See also

- Reference: [Component Definition](/cli/reference/blocks/define-component)
