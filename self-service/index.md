---
title: Self-Service Infrastructure
description: Enable app and development teams to instantiate approved infrastructure patterns safely using Terramate.
type: explanation
product: capability
outline: [2, 4]
---

# Self-Service Infrastructure

Self-service lets application teams provision approved infrastructure patterns without becoming Terraform experts. Platform teams define the contracts, and developers or agents consume those contracts through guided workflows.

## How self-service works

Self-service in Terramate follows a clear separation of responsibilities:

- platform teams define components and bundles
- catalogs publish approved, versioned bundle offerings
- consumers instantiate bundles with constrained inputs
- Terramate generates native IaC code and stack structure

This model keeps control with platform teams while removing day-to-day delivery bottlenecks for application teams.

## Primary outcomes

- Select bundles from local or remote catalogs
- Provide inputs through guided prompts
- Generate stack code with native IaC output
- Reconfigure existing bundle instances safely
- Enable repeatable consumption by humans and automation

## Consumption interfaces

### CLI

The CLI is ideal for local workflows, CI/CD, and automated pipelines. Teams can scaffold, instantiate, and reconfigure bundles directly in repositories.

- [Scaffolding and Code Generation](/self-service/scaffolding-and-generation)
- [`terramate scaffold`](/cli/reference/cmdline/scaffold)
- [`terramate bundle reconfigure`](/cli/reference/cmdline/bundle/bundle-reconfigure)

### Internal portals and service catalogs

Teams can expose bundles through internal developer portals or catalogs, where developers select approved templates and provide a minimal input set. This supports governance without forcing every team to understand low-level IaC structure.

### AI agents and automation

Because bundle contracts are explicit and constrained, AI agents can safely consume them in automation workflows:

- propose or instantiate infrastructure changes
- follow platform-approved input schemas
- generate auditable pull requests for review

This enables autonomous day-2 operations while preserving policy and ownership boundaries.

## CLI and Cloud touchpoints

### Cloud
- [Deployments](/deployments/)
- [Pull Request Previews](/previews/)
- [Alerts](/alerts/)

## Next steps

- Tutorial: [Instantiate Your First Bundle](/self-service/instantiate-your-first-bundle)
- How-to: [How to Instantiate a Bundle via CLI](/self-service/instantiate-bundle-cli)
- How-to: [Use a Remote Catalog](/self-service/use-remote-catalog)
- How-to: [Reconfigure a Bundle](/self-service/reconfigure-bundle)

## Related guides

- [Manage Terraform at Scale](/guides/manage-terraform-at-scale)
- [Migrate from Terragrunt](/guides/migrate-from-terragrunt)
