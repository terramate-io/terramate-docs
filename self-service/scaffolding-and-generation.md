---
title: Scaffolding and Code Generation
description: The end-to-end flow from scaffolding a bundle instantiation to generating stack code.
type: explanation
product: capability
outline: [2, 4]
mermaid: true
---

# Scaffolding and Code Generation

Self-service in Terramate follows a simple loop:

1. Scaffold a bundle instance (`terramate scaffold`)
2. Generate code (`terramate generate`)
3. Plan/apply with your existing tooling
4. Reconfigure inputs when needed

```mermaid
flowchart TD
  A["terramate scaffold"] --> B["Bundle instantiation file"]
  B --> C["terramate generate"]
  C --> D["Create or update stacks"]
  C --> E["Generate IaC files"]
  E --> F["Plan and apply"]
```

### Related

- How-to: [How to Instantiate a Bundle via CLI](/self-service/instantiate-bundle-cli)
- How-to: [How to Reconfigure a Bundle](/self-service/reconfigure-bundle)
