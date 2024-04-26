---
title: OpenTofu Change Detection Integration
description: Learn how Terramate can help to detect OpenTofu stacks that reference changed Terraform or OpenTofu Modules.
---

# OpenTofu Change Detection Integration

## Local OpenTofu Module Support

When calculating stacks that have changed and need to be deployed, Terramate will scan each stack's OpenTofu files (`*.tf`) and detect any local OpenTofu Modules the stacks use.

A local OpenTofu Module is located within the same repository and referenced via a relative path. Any generated or plain OpenTofu files will be considered.

If local OpenTofu Modules are referencing other local OpenTofu Modules recursively, all recursion levels will be detected.

If any OpenTofu Module has been changed, all stacks referencing any of those Modules either directly or indirectly will be also marked as changed and will be executed even though no changes need to be detected within the stack itself.

As OpenTofu supports Terraform Modules the integration considers Terraform and OpenTofu Modules.
