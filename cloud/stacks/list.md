# Stacks List

The Stacks page displays all known stacks across multiple repositories. Each stack highlights its essential metadata. You can sort the list—by default, stacks are arranged by the time of their last update—and use filters to narrow results by repository or status. Additionally, you can search for stacks by entering a search string in the name or path. Clicking on any stack opens its [Stack Details](./details.md) page.

![Stacks Overview](../assets/stacks-index.png "Terramate Cloud Stacks Overview")

## Filter Options:

- **Status**: Filter stacks by their current state:
    - [Healthy](./status.md#healthy): The stack is deployed successfully, and does not have any detected drifts.
    - [Failed](./status.md#failed): The stack has failed to deploy the planned changes.
    - [Drifted](./status.md#drifted): The stack has differences between the desired configuration(code) and applied configuration(cloud).
- **Repository**: Filter stacks by the repository that contains them.
- **Tag**: Filter stacks by their [tags](../../cli/stacks/configuration.md#tags)
- **Target**: Filter stacks by the target environment where they are deployed.
- **Checks**: Filter stacks by the result of policy checks executed against them.
