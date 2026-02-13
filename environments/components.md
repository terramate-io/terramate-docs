---
title: Components
description: Components encapsulate reusable infrastructure capabilities used by bundles.
type: explanation
product: capability
outline: [2, 4]
---

# Components

Components are the foundational infrastructure building blocks used by platform teams. A component usually wraps Terraform/OpenTofu module logic behind an opinionated, reusable contract.

Examples of components include:

- networking (VPC, subnets, security groups)
- data services (PostgreSQL, Redis, object storage)
- compute/runtime layers (container service, serverless runtime)
- supporting capabilities (IAM, secrets, observability)

## What a component encapsulates

A well-designed component packages:

- module wiring and internal implementation details
- required and optional inputs
- output values used by other components or bundles
- naming/tagging conventions
- security and compliance defaults

This keeps implementation concerns with platform teams while exposing a predictable interface for reuse.

## Components and Terraform modules

Components build on top of modules; they do not replace them.

- Modules are generic reusable code units.
- Components add organizational standards, contracts, and guardrails.
- Bundles then compose multiple components into consumer-facing products.

You can think of components as your company-specific abstraction layer over raw IaC modules.

## Input contracts and standards

Component contracts should be explicit and stable. Common standardization points:

- naming and label formats
- required ownership and cost-allocation tags
- network and encryption defaults
- policy-aligned configuration ranges

By pushing these standards into components, every bundle and stack using them inherits consistent behavior.

## Example: database component

A `database` component might:

- encapsulate the selected Terraform module and backend setup
- enforce encryption and backup defaults
- require a small input set (name, region, size tier)
- expose outputs (endpoint, secret references, security group IDs)

Bundles can then reuse the same component in different service archetypes without duplicating implementation logic.

## Adoption guidance

- Start by converting your highest-value shared modules to components.
- Keep contracts narrow to reduce long-term maintenance overhead.
- Document expected inputs/outputs before broad reuse.
- Promote mature components into bundles for self-service consumption.

## Environments with components

Components inherit environment context from the bundle stack they are instantiated in. The `component.environment` namespace mirrors `bundle.environment` and provides `id`, `name`, `description`, and `promote_from`.

Use `component.environment` as a default for inputs:

```hcl
define component {
  input "env" {
    default = component.environment
  }
}
```

This lets components behave correctly in environment-aware bundles without requiring callers to pass the environment explicitly.

See [Environments](/environments/environments) for the full configuration reference.

## Workflows and references

- How-to: [Convert module to component](/environments/convert-module-to-component)
- Tutorial: [Create a component and bundle](/environments/create-a-component-and-bundle)
- Explanation: [Environments](/environments/environments)
- Reference: [Component definition](/environments/reference/component-definition)
- Related: [Bundles overview](/environments/bundles)
