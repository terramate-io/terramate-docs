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

Stacks can be created and configured with [Terramate CLI](../../cli/stacks/create.md), located in a _repository_ and synced
to Terramate Cloud. As the stack within a _repository_ is only plain code and configuration, Terramate Cloud offers to
synchronize a state of all stacks when orchestrated with Terramate CLI and keep track of this state over multiple
deployments or drift runs.

::: tip
Do not confuse the state of a stack with the Terraform state defined by the Terraform Backend Configuration. The Terramate Cloud state of a stack includes the Terraform state and extends it with additional status values and metadata.
:::

In addition, the stack inventory is not limited to single stacks or single repositories but combines all stacks in all your
organization's repositories in a central place.

Each stack can be `healthy` or `unhealthy` (e.g. `failed` or `drifted`) depending on the result of [deployments](../deployments/index.md)
or [drift runs](../drift/index.md).
