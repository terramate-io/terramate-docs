---
title: tm_joinlist | Functions | Configuration Language
description: |-
  The tm_joinlist function joins nested lists of strings with a specified
  separator, converting hierarchical list structures into joined string paths.
---

# `tm_joinlist` Function

`tm_joinlist` joins nested lists of strings with a specified separator, converting
hierarchical list structures into joined string paths. It is particularly useful
for converting the output of `tm_tree` into file paths or other delimited strings.

```hcl
tm_joinlist(separator, list_of_lists)
```

The function processes each inner list by joining its elements with the specified
separator, returning a list of joined strings.

## Arguments

* `separator` - The string to use as a separator when joining list elements. Can be
  a single character or multi-character string.
* `list_of_lists` - A list containing lists of strings to be joined. Supports both
  HCL list and tuple types.

## Return Value

Returns a list of strings, where each string is the result of joining the elements
of the corresponding inner list with the specified separator.

## Examples

### Basic Path Joining

```hcl
locals {
  paths = tm_joinlist("/", [
    ["root"],
    ["root", "child"],
    ["root", "child", "leaf"]
  ])
  # Returns: ["root", "root/child", "root/child/leaf"]
}
```

### Different Separators

```hcl
locals {
  # Using dot notation
  namespaces = tm_joinlist(".", [
    ["com"],
    ["com", "example"],
    ["com", "example", "app"]
  ])
  # Returns: ["com", "com.example", "com.example.app"]
  
  # Using double colon
  cpp_namespaces = tm_joinlist("::", [
    ["std"],
    ["std", "vector"],
    ["std", "map"]
  ])
  # Returns: ["std", "std::vector", "std::map"]
}
```

### Integration with tm_tree

```hcl
locals {
  # Define hierarchical structure
  tree_pairs = [
    [null, "src"],
    ["src", "main"],
    ["src", "test"],
    ["main", "java"],
    ["main", "resources"],
    ["test", "java"],
    ["test", "resources"]
  ]
  
  # Convert to tree branches
  tree_branches = tm_tree(local.tree_pairs)
  
  # Join into paths
  directory_paths = tm_joinlist("/", local.tree_branches)
  # Returns: [
  #   "src",
  #   "src/main",
  #   "src/main/java",
  #   "src/main/resources",
  #   "src/test",
  #   "src/test/java",
  #   "src/test/resources"
  # ]
}
```

## Common Use Cases

### File Path Generation

```hcl
locals {
  module_structure = [
    ["terraform"],
    ["terraform", "modules"],
    ["terraform", "modules", "network"],
    ["terraform", "modules", "compute"],
    ["terraform", "environments"],
    ["terraform", "environments", "dev"],
    ["terraform", "environments", "prod"]
  ]
  
  file_paths = tm_joinlist("/", local.module_structure)
  
  # Create .tf files in each directory
  module_files = [
    for path in local.file_paths : "${path}/main.tf"
  ]
}
```

### Package Naming

```hcl
locals {
  package_hierarchy = [
    ["com"],
    ["com", "company"],
    ["com", "company", "product"],
    ["com", "company", "product", "service"],
    ["com", "company", "product", "model"],
    ["com", "company", "product", "controller"]
  ]
  
  java_packages = tm_joinlist(".", local.package_hierarchy)
  # Returns Java package names like "com.company.product.service"
}
```

### AWS Resource Naming

```hcl
locals {
  resource_hierarchy = [
    ["prod"],
    ["prod", "us-east-1"],
    ["prod", "us-east-1", "vpc"],
    ["prod", "us-east-1", "vpc", "public"],
    ["prod", "us-east-1", "vpc", "private"]
  ]
  
  resource_names = tm_joinlist("-", local.resource_hierarchy)
  # Returns: [
  #   "prod",
  #   "prod-us-east-1",
  #   "prod-us-east-1-vpc",
  #   "prod-us-east-1-vpc-public",
  #   "prod-us-east-1-vpc-private"
  # ]
}
```

### URL Path Construction

```hcl
locals {
  api_paths = [
    ["api"],
    ["api", "v1"],
    ["api", "v1", "users"],
    ["api", "v1", "users", "{id}"],
    ["api", "v1", "products"],
    ["api", "v1", "products", "{id}"]
  ]
  
  endpoints = tm_joinlist("/", local.api_paths)
  
  # Prepend with base URL
  full_urls = [
    for endpoint in local.endpoints : "https://api.example.com/${endpoint}"
  ]
}
```

## Error Handling

The function validates inputs and provides comprehensive error handling for:

* Invalid separator types (must be a string)
* Invalid list structure (must be a list of lists)
* Non-string elements in inner lists

## Related Functions

* [`tm_tree`](./tm_tree.md) - Generates hierarchical list structures that can be
  joined using `tm_joinlist`
* [`tm_join`](./tm_join.md) - Joins elements of a single list with a separator
* [`tm_split`](./tm_split.md) - Performs the opposite operation, splitting strings
  into lists