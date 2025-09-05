---
title: tm_slug | Functions | Configuration Language
description: |-
  The tm_slug function converts strings into URL-friendly slugs by replacing
  special characters with hyphens. It supports both single strings and lists.
---

# `tm_slug` Function

`tm_slug` converts strings into URL-friendly slugs by replacing special characters, spaces, and punctuation with hyphens. The function is polymorphic, accepting both single strings and lists of strings for batch processing.

```hcl
tm_slug(input)
```

The function normalizes text by:
- Converting to lowercase
- Replacing spaces and special characters with hyphens
- Removing consecutive hyphens
- Trimming leading hyphens (but preserving trailing hyphens from punctuation)

## Arguments

* `input` - Either a single string or a list of strings to convert into slugs. Supports both HCL list and tuple types.

## Return Value

- For string input: Returns a single slug string
- For list input: Returns a list of slug strings, preserving the original order

## Examples

### Single String Input

```hcl
locals {
  product_slug = tm_slug("Hello World!")
  # Returns: "hello-world-"
  
  service_slug = tm_slug("Product/Service Name")
  # Returns: "product-service-name"
  
  complex_slug = tm_slug("API v2.0 - User Management!")
  # Returns: "api-v2-0-user-management-"
}
```

### List Input (Batch Processing)

```hcl
locals {
  product_names = ["Product A", "Service/B", "Component C!"]
  product_slugs = tm_slug(local.product_names)
  # Returns: ["product-a", "service-b", "component-c-"]
  
  # Eliminates need for list comprehension:
  # Old way: [for s in local.product_names : tm_slug(s)]
  # New way: tm_slug(local.product_names)
}
```

### Mixed Content Processing

```hcl
locals {
  various_inputs = [
    "Hello World!",
    "API v2.0",
    "User-Management System",
    "Special@Characters#Here"
  ]
  
  clean_slugs = tm_slug(local.various_inputs)
  # Returns: [
  #   "hello-world-",
  #   "api-v2-0", 
  #   "user-management-system",
  #   "special-characters-here"
  # ]
}
```

## Common Use Cases

### URL Generation

```hcl
locals {
  page_titles = [
    "About Us",
    "Contact Information", 
    "Product Documentation",
    "API Reference"
  ]
  
  url_paths = tm_slug(local.page_titles)
  # Returns: ["about-us", "contact-information", "product-documentation", "api-reference"]
  
  full_urls = [
    for slug in local.url_paths : "https://example.com/${slug}"
  ]
}
```

### Resource Naming

```hcl
locals {
  service_names = [
    "User Authentication",
    "Payment Processing",
    "Email Notifications"
  ]
  
  # Generate AWS resource names
  lambda_names = [
    for slug in tm_slug(local.service_names) : "lambda-${slug}"
  ]
  # Returns: ["lambda-user-authentication", "lambda-payment-processing", "lambda-email-notifications"]
}
```

### File and Directory Names

```hcl
locals {
  module_titles = [
    "Network Configuration",
    "Security Groups & Rules", 
    "Load Balancer Setup"
  ]
  
  directory_names = tm_slug(local.module_titles)
  # Returns: ["network-configuration", "security-groups-rules", "load-balancer-setup"]
  
  module_paths = [
    for name in local.directory_names : "modules/${name}"
  ]
}
```

### Database Table Names

```hcl
locals {
  entity_names = [
    "User Profiles",
    "Order History",
    "Product Categories"
  ]
  
  table_names = tm_slug(local.entity_names)
  # Returns: ["user-profiles", "order-history", "product-categories"]
}
```

### Configuration Keys

```hcl
locals {
  feature_descriptions = [
    "Advanced Analytics",
    "Real-time Notifications",
    "Multi-factor Authentication"
  ]
  
  config_keys = tm_slug(local.feature_descriptions)
  # Returns: ["advanced-analytics", "real-time-notifications", "multi-factor-authentication"]
}
```

## Performance

The function is optimized for batch processing:
- Processing 1000 strings takes approximately 1ms
- More efficient than equivalent list comprehensions
- Memory efficient for large datasets

## Type Support

* **Strings**: Direct conversion to slug format
* **Lists**: Element-wise conversion, preserving order
* **Tuples**: Converted to lists, then processed

## Error Handling

The function provides clear error messages for:
- Unsupported input types (only string and list of strings supported)
- Invalid list elements (all elements must be strings)

## Related Functions

* [`tm_lower`](./tm_lower.md) - Converts strings to lowercase
* [`tm_replace`](./tm_replace.md) - Replaces patterns in strings
* [`tm_join`](./tm_join.md) - Joins list elements with a separator