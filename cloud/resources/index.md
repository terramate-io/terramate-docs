---
title: Manage Resources | Terramate Cloud
description: Learn how Terramate helps you to manage infrastructure Resources in Terramate Cloud
---

# Resources

Resources in the Terramate Cloud dashboard lets teams manage all their infrastructure assets from a single place. It monitors resources deployed with Infrastructure as Code (IaC) across multiple VCS providers, repositories, and teams, offering a complete picture of your infrastructure. The dashboard displays resource status, enabling teams to identify drifted or misconfigured assets based on deployment outcomes and drift runs.

![Resources in Terramate Cloud](../assets/Resources_TMC.png)

The Resources page displays all known resources across multiple repositories. Each resource highlights its essential metadata. You can sort the list—by default, resources are arranged by the time of their last update—and use filters to narrow results by repository or status. Additionally, you can search for resources by entering a search string in the name or path. Clicking on any resource opens its [Resource Details](./details.md) page.

## Filter Options:

- **Status**: Filter resources by their current state:
    - `Healthy`: The resource is deployed successfully, and its current state matches the expected configuration.
    - `Drifted`: The resource’s actual state has deviated from its declared configuration due to changes or misconfigurations.
    - `Pending`: The resource is awaiting evaluation, with its status still being determined through ongoing deployment or drift checks.
- **Technology**: Filter resources based on the technology used, such as Terraform or OpenTofu.
- **Type**: Filter resources by their specific type.
- **Repository**: Filter resources by the repository that contains the resource.
- **Provider**: Filter resources by the cloud provider associated with them.
- **Target**: Filter resources by the target environment or module where they are deployed.
- **Checks**: Filter resources by the policy checks executed against them.
- **Account**: Filter resources based on the associated account.