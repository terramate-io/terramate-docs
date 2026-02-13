---
title: Stacks
description: Understand how Terramate stacks are defined, managed, and synchronized with Terramate Cloud.
type: explanation
---

# Stacks

Stacks are Terramate's core unit for structuring and operating infrastructure as code. You can create, configure, and run commands on stacks with Terramate CLI, then synchronize stack status to Terramate Cloud for inventory and observability.

Use stacks when you need explicit deployable boundaries, better blast-radius control, and predictable execution across large repositories.

![Stacks Overview](../cloud/assets/stacks-index.png "Terramate Cloud Stacks Overview")

## Build and manage stacks

- [Create Stacks](./create.md)
- [Configure Stacks](./configuration.md)
- [Nesting Stacks](./nesting.md)
- [Clone Stacks](./clone.md)
- [Manage Stacks](./manage.md)
- [Delete Stacks](./delete.md)

## Cloud inventory and status

- [View Stacks](./list.md)
- [Stack Details](./details.md)
- [Stack Status](./status.md)
- [Synchronize Stacks](./sync.md)

Each stack can be `healthy` or `unhealthy` (for example `failed` or `drifted`) based on deployment and drift outcomes.

## Related guides

- [Manage Terraform at Scale](/guides/manage-terraform-at-scale)
- [Set Up Drift Detection](/guides/set-up-drift-detection)
- [Migrate from Terragrunt](/guides/migrate-from-terragrunt)

## Related references

- [`terramate create`](/cli/reference/cmdline/create)
- [`terramate list`](/cli/reference/cmdline/list)
- [`terramate run`](/cli/reference/cmdline/run)

## Explanation

- [Stacks Model](/explanations/stacks)
