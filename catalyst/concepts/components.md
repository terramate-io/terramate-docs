---
title: Components
description: Learn what Terramate Catalyst Components are and how platform teams encapsulate reusable infrastructure capabilities.
type: explanation
product: catalyst
outline: [2, 4]
mermaid: true
---

# Components

Components are the foundational building blocks in Catalyst. A Component encapsulates a single infrastructure capability (e.g., VPC, database, queue) including:

- Underlying Terraform/OpenTofu module wiring
- Inputs and outputs
- Naming/tagging conventions
- Security and compliance defaults

### Diagram

```mermaid
graph TD
  A[Component definition] --> B[Code generation]
  B --> C[Generated IaC in stacks]
  D[Bundle reference via source] -.-> A
```

### Characteristics

- Defined and owned by platform teams
- Reusable across Bundles
- Policy‑aware and opinionated
- Implemented using Terraform/OpenTofu modules or any IaC the team chooses

Developers typically do not use Components directly. Instead, Components are instantiated within Bundle stacks.

### Example

```hcl
define component metadata {
  class   = "example.com/my-component"
  version = "1.0.0"
  name    = "My Component"
}

define component {
  input "name" {
    type        = string
    description = "Service name"
  }
}
```

### Related guides and references

- Reference: [Component definition syntax](/catalyst/reference/component-definition)
- How‑to: [Convert a TF module to a Component](/catalyst/how-to/convert-module-to-component)
