---
title: Bundles
description: Bundles compose components into reusable infrastructure patterns.
type: explanation
product: capability
outline: [2, 4]
---

# Bundles

Bundles are platform-authored infrastructure products built by composing one or more components. They define what consumers can request and how Terramate generates the resulting stack code.

Bundles are the primary self-service unit for developers and AI agents. Instead of wiring modules manually, consumers select a bundle and provide a small set of validated inputs.

## What a bundle contains

A bundle usually includes:

- component composition (for example networking + compute + data)
- an input contract exposed to consumers
- defaults and guardrails from platform teams
- generation targets and output structure
- metadata used for catalog packaging and discovery

Because bundles are defined by platform teams, they enforce consistency without requiring every consumer to understand Terraform/OpenTofu internals.

## Relationship to components

Bundles always require components.

- Components are low-level reusable capabilities.
- Bundles combine those capabilities into opinionated templates.
- Consumers interact with bundles, while platform teams maintain components.

If your team only needs reusable building blocks, components can be used directly. If you want a product-like self-service interface, use bundles on top.

## Input contracts and validation

Bundles expose a curated input contract instead of raw module variables. This lets platform teams:

- choose which options are configurable
- set secure defaults for everything else
- validate or constrain risky values
- keep interfaces stable across upgrades

This contract is the key mechanism that separates platform ownership from consumer autonomy.

## Versioning and lifecycle

Treat bundles like versioned platform APIs:

- publish explicit versions to catalogs
- document breaking changes in input contracts
- support upgrade paths between bundle versions
- use pull requests and CI checks before release

Versioning gives product teams predictability while platform teams keep evolving implementation details behind the scenes.

## Environments with bundles

Bundles are the primary entry point for environment-aware delivery. A bundle declares environment support with an `environments` block:

```hcl
define bundle {
  environments {
    required = true
  }
}
```

When `required = true`, the bundle cannot be used without environments configured in the project. Terramate generates a merged configuration for each environment in the bundle instance and processes them independently.

Inside bundle definitions, the `bundle.environment` namespace gives access to the active environment's `id`, `name`, `description`, and `promote_from` -- use these to generate environment-specific stack paths, resource names, and tags.

Per-environment input overrides are defined in the bundle instance alongside the base spec, with top-level merge semantics.

See [Environments](/environments/environments) for the full configuration reference and merge behavior.

## Organizational patterns

Common bundle strategies include:

- service archetypes: `web-service`, `worker`, `internal-tool`
- environment baselines: `sandbox`, `production-ready`
- domain bundles: `data-pipeline`, `event-consumer`, `ml-inference`

Each bundle encodes your organization’s naming, tagging, security, and cost-control standards.

## Example: web service bundle

A `web-service` bundle might compose:

- `network` component (VPC/subnets/security groups)
- `runtime` component (compute platform and autoscaling)
- `database` component (managed relational datastore)
- `observability` component (logs, metrics, alerts)

Consumers provide inputs like service name, region, and sizing. The bundle maps those inputs into component-specific settings and generates standardized stack code.

## Workflows and references

- Tutorial: [Create a component and bundle](/environments/create-a-component-and-bundle)
- How-to: [Package a catalog](/environments/package-catalog)
- How-to: [Reference bundle values in codegen](/environments/reference-bundle-values-in-codegen)
- Explanation: [Environments](/environments/environments)
- Reference: [Bundle definition](/environments/reference/bundle-definition)
- Next step: [Self-service overview](/self-service/)
