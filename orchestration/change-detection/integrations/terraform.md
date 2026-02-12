---
title: Terraform Change Detection Integration
description: Learn how Terramate can help to detect Terraform stacks that reference changed Terraform modules.
---

# Terraform Change Detection Integration

## Local Terraform Module Support

When calculating stacks that have changed and need to be deployed, Terramate will scan each stack's Terraform files (`*.tf`) and detect any local Terraform Modules the stacks use.

When using a local Terraform Module from the same repository, referenced via a relative path, Terramate considers any generated or plain Terraform files associated with it.

Terramate will detect all recursion levels if local Terraform Modules reference other local Terraform Modules recursively.

If any Terraform Module changes, all stacks that use these Modules, directly or indirectly, will be marked as changed and executed, even if there are no changes within the stacks themselves.

