---
title: Terramate Catalyst Functions Reference
description: Functions available in Terramate Catalyst for accessing bundle data and managing module references.
type: reference
product: catalyst
---

# Catalyst Functions Reference

Terramate Catalyst provides specialized functions for working with bundles, components, and module references during code generation and scaffolding.

## Available Functions

### Bundle Access Functions

- [tm_bundles(class)](/catalyst/reference/functions/tm_bundles) - Returns a list of bundle objects for a given class
- [tm_bundle(class, alias)](/catalyst/reference/functions/tm_bundle) - Returns a single bundle object by class and alias/UUID

### Path Translation Functions

- [tm_source(relative_path)](/catalyst/reference/functions/tm_source) - Translates relative paths from component context to stack context

## Related References

- [Bundle Definition](/catalyst/reference/bundle-definition)
- [Component Definition](/catalyst/reference/component-definition)
- [Variables](/catalyst/reference/variables)
