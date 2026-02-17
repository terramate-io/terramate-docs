---
title: tm_source
description: Translates relative paths from component context to stack context.
type: reference
product: capability
---

# tm_source(relative_path)

Translates a relative path to a module or resource from the component's context to the stack's context during code generation.

This function is used inside component code generation to reference local Terraform modules. At code generation time, the relative path defined in the component's context will be translated into a relative path based on the stack where the code is being generated.

## Syntax

```hcl
tm_source(relative_path)
```

### Parameters

- `relative_path` (string) - A relative path from the component's location to the target module or resource

### Return Value

Returns a string containing the translated relative path from the stack's perspective.

## Behavior

- **Local references**: If the component, bundle, and referenced path are all local, the generated path in the stack will be relative, pointing to the correct module location within the repository.
- **Remote references**: If the references are remote, the remote referenced path will be adjusted accordingly.

::: warning
This function is only required for local module references. When referencing remote modules (e.g., from a registry), this function is not required and can be omitted.
:::

## Examples

### Reference a module in the parent directory

```hcl
generate_hcl "main.tf" {
  content {
    module "my-module" {
      source = tm_source("..") # reference a module in the parent directory

      name        = "example"
      environment = "production"
    }
  }
}
```

### Reference a sibling module

```hcl
generate_hcl "main.tf" {
  content {
    module "networking" {
      source = tm_source("../networking-module")

      vpc_cidr = "10.0.0.0/16"
    }
  }
}
```

### Reference a module at a specific relative path

```hcl
generate_hcl "main.tf" {
  content {
    module "database" {
      source = tm_source("../../modules/postgres")

      instance_type = "db.t3.medium"
    }
  }
}
```

### Remote modules (no tm_source needed)

```hcl
generate_hcl "main.tf" {
  content {
    module "vpc" {
      source  = "terraform-aws-modules/vpc/aws"
      version = "5.0.0"

      name = "my-vpc"
    }
  }
}
```

## How It Works

When a component is instantiated in a stack, the relative path specified in `tm_source()` is automatically adjusted based on the stack's location in the repository structure.

For example, if:
- Component is at: `_components/my-component/`
- Module is at: `_modules/shared-module/`
- Stack is at: `stacks/prod/app/`

Then `tm_source("../../_modules/shared-module")` in the component will be translated to the correct relative path from the stack's location.

## Related Functions

- [tm_bundle](/environments/reference/functions/tm_bundle) - Get a single bundle by class and alias
- [tm_bundles](/environments/reference/functions/tm_bundles) - Get all bundles of a given class

## See Also

- [Component Definition](/environments/reference/component-definition)
- [Bundle Definition](/environments/reference/bundle-definition)
- [Scaffolding & Generation](/self-service/scaffolding-and-generation)
