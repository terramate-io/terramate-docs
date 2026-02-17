---
title: environment | Block | Configuration Language
description: Define deployment environments for Terramate Catalyst.
---

# The `environment` block

Use the `environment` block to define a deployment environment in your Terramate project. Environments let you model promotion workflows (e.g., dev -> staging -> production) and associate stacks with specific deployment targets.

The `environment` block does not support labels or nested blocks.

## Arguments

- `id` _(required, string)_ - A unique identifier for the environment.

- `name` _(required, string)_ - A human-readable name for the environment.

- `description` _(optional, string)_ - A description of the environment's purpose.

- `promote_from` _(optional, string)_ - The ID of the environment that promotes into this one, defining a promotion chain.

## Syntax

```hcl
environment {
  id          = "dev"
  name        = "Development"
  description = "Development environment"
}
```

## Examples

### Define a promotion chain

```hcl
# environments/dev.tm.hcl
environment {
  id          = "dev"
  name        = "Development"
  description = "Development environment for testing changes"
}

# environments/staging.tm.hcl
environment {
  id           = "staging"
  name         = "Staging"
  description  = "Pre-production environment"
  promote_from = "dev"
}

# environments/prod.tm.hcl
environment {
  id           = "prod"
  name         = "Production"
  description  = "Production environment"
  promote_from = "staging"
}
```
