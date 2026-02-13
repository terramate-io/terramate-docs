---
title: Share Outputs Between Stacks
description: Configure Terramate output sharing for stack-to-stack data dependencies.
type: how-to
outline: [2, 4]
---

# Share Outputs Between Stacks

## Steps

1) Enable experiment:

```hcl
terramate {
  config {
    experiments = ["outputs-sharing"]
  }
}
```

2) Configure a backend:

```hcl
sharing_backend "default" {
  type     = terraform
  filename = "sharing_generated.tf"
  command  = ["terraform", "output", "-json"]
}
```

3) Define `output` blocks in source stacks and `input` blocks in dependent stacks.

4) Generate and run with sharing enabled:

```sh
terramate generate
terramate run --enable-sharing -- terraform plan
```

## Expected result

- Dependent stacks receive values from source stack outputs at runtime
