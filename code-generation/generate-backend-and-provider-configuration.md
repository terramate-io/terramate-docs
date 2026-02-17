---
title: Generate Terraform Backend and Provider Configuration
description: Use generate_hcl to keep backend and provider blocks DRY across stacks.
type: how-to
outline: [2, 4]
---

# Generate Terraform Backend and Provider Configuration

## Steps

1) Define a generation block at a shared parent directory:

```hcl
generate_hcl "_terramate_generated_backend.tf" {
  content {
    terraform {
      backend "s3" {
        bucket = "my-state-bucket"
        key    = "terraform/stacks/${terramate.stack.id}/terraform.tfstate"
        region = "eu-central-1"
      }
    }
  }
}
```

2) Optionally add provider generation in another `generate_hcl` block.

3) Run:

```sh
terramate generate
```

## Expected result

- Matching stacks receive generated backend/provider files automatically
