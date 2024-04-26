---
title: Terraform Change Detection Integration
description: Learn how Terramate can help to detect Terraform stacks that reference changed Terraform modules.
---

# Terraform Change Detection Integration

## Local Terraform Module Support

When calculating stacks that have changed and need to be deployed, Terramate will scan each stack's Terraform files (`*.tf`) and detect any local Terraform Modules the stacks use.

A local Terraform Module is located within the same repository and referenced via a relative path. Any generated or plain Terraform files will be considered.

If local Terraform Modules are referencing other local Terraform Modules recursively, all recursion levels will be detected.

If any Terraform Module has been changed, all stacks referencing any of those Modules either directly or indirectly will be also marked as changed and will be executed even though no changes need to be detected within the stack itself.

![Module Change Detection](../../assets/module-change-detection.gif)
