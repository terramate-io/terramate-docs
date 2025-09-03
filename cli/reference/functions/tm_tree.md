---
title: tm_tree | Functions | Configuration Language
description: |-
  The tm_tree function converts an unordered list of parent-child pairs into
  hierarchical paths, supporting multiple root structures.
---

# `tm_tree` Function

`tm_tree` converts an unordered list of parent-child pairs into hierarchical paths.
It takes a list of `[parent, child]` tuples and returns a list of paths, where each
path is a list of strings from root to node.

```hcl
tm_tree(pairs)
```

The function processes parent-child relationships to build tree structures, where:
- A `null` parent indicates a root node
- Each path represents a complete branch from root to node
- Output is deterministically sorted in lexicographical order

## Arguments

* `pairs` - A list of tuples, where each tuple contains `[parent, child]`. The parent
  can be `null` to indicate a root node.

## Return Value

Returns a list of paths, where each path is a list of strings representing the 
hierarchical path from root to node.

## Examples

### Basic Tree Structure

```hcl
locals {
  pairs = [
    [null, "root"],
    ["root", "child1"],
    ["root", "child2"],
    ["child1", "grandchild"]
  ]
  branches = tm_tree(local.pairs)
  # Returns: [
  #   ["root"],
  #   ["root", "child1"],
  #   ["root", "child1", "grandchild"],
  #   ["root", "child2"]
  # ]
}
```

### Multiple Root Nodes

```hcl
locals {
  pairs = [
    [null, "root1"],
    [null, "root2"],
    ["root1", "branch1"],
    ["root2", "branch2"]
  ]
  branches = tm_tree(local.pairs)
  # Returns: [
  #   ["root1"],
  #   ["root1", "branch1"],
  #   ["root2"],
  #   ["root2", "branch2"]
  # ]
}
```

### Complex Hierarchies

```hcl
locals {
  org_structure = [
    [null, "company"],
    ["company", "engineering"],
    ["company", "sales"],
    ["engineering", "backend"],
    ["engineering", "frontend"],
    ["backend", "api"],
    ["backend", "database"],
    ["frontend", "web"],
    ["frontend", "mobile"]
  ]
  org_tree = tm_tree(local.org_structure)
  # Returns hierarchical paths for the entire organization structure
}
```

## Error Handling

The function validates the tree structure and will report errors for:

* **Cycles**: When a node is its own ancestor
* **Conflicting Parents**: When a child has multiple different parents
* **Unknown Parents**: When a parent reference doesn't exist in the tree

## Common Use Cases

### Directory Structure Generation

```hcl
locals {
  module_hierarchy = [
    [null, "modules"],
    ["modules", "networking"],
    ["modules", "compute"],
    ["networking", "vpc"],
    ["networking", "firewall"],
    ["compute", "instances"],
    ["compute", "loadbalancer"]
  ]
  module_paths = tm_tree(local.module_hierarchy)
  # Use with tm_joinlist to create file paths
  file_paths = tm_joinlist("/", local.module_paths)
}
```

### Dependency Management

```hcl
locals {
  dependencies = [
    [null, "base"],
    ["base", "network"],
    ["network", "compute"],
    ["compute", "application"]
  ]
  deployment_order = tm_tree(local.dependencies)
  # Returns deployment order respecting dependencies
}
```

## Related Functions

* [`tm_joinlist`](./tm_joinlist.md) - Joins the hierarchical paths produced by `tm_tree`
  into string paths with a specified separator