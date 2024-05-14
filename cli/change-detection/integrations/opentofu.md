---
title: OpenTofu Change Detection Integration
description: Learn how Terramate can help to detect OpenTofu stacks that reference changed Terraform or OpenTofu Modules.
---

# OpenTofu Change Detection Integration

## Local OpenTofu Module Support

Terramate scans each stack's OpenTofu files (`*.tf`) to detect any local OpenTofu Modules the stacks use when calculating changed stacks for deployment.

When using a local OpenTofu Module from the same repository, referenced via a relative path, Terramate considers any generated or plain OpenTofu files associated with it.

Terramate will detect all recursion levels if local OpenTofu Modules reference other local OpenTofu Modules recursively.

If any OpenTofu Module changes, all stacks that use these Modules, directly or indirectly, will be marked as changed and executed, even if there are no changes within the stacks themselves.

As OpenTofu supports Terraform Modules the integration considers Terraform and OpenTofu Modules.
