---
title: Stack Inventory | Terramate Cloud
description: Learn how to use the Stack Inventory in Terramate Cloud to keep an overview of all stacks managed with Terramate.
---

# Stack Inventory

The stack inventory helps you to keep an overview of all stacks managed with Terramate.

::: tip
To learn more about stacks in Terramate, please read [an introduction to Stacks](../../cli/stacks/index.md).
:::

![Stacks Overview](../assets/stacks.png "Terramate Cloud Stacks Overview")

Stacks can be created, configured and managed with [Terramate CLI](../../cli/stacks/create.md) and are located in a
_repository_ on GitHub, GitLab, BitBucket or any other supported VCS provider. As a stack within a _repository_ is only
plain code and configuration, you can use Terramate CLI to sync the status of your stacks to Terramate Cloud.
This allows you to keep track of all orchestrated operations such as previews, deployments, and drift runs and also provides
in-detail observability, such as resources managed in stacks, costs, policy violations and more!

In addition, the stack inventory is not limited to single stacks or single repositories but combines all stacks in all your
organization's repositories in a central place.

Each stack can be `healthy` or `unhealthy` (e.g. `failed` or `drifted`) depending on the result of [deployments](../deployments/index.md)
or [drift runs](../drift/index.md).
