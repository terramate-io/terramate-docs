---
title: Pull Request Previews | Terramate Cloud
description: Learn how to use Pull Requests with Terrmate to manage the infrastructure lifecycle of tools such as Terraform and OpenTofu.
type: explanation
---

# Pull Request Previews

This section explains **pull requests** as a core concept in Terramate.

## Introduction

Terramate enables effective collaboration among team members by providing Pull Request-based workflows, allowing teams
to review and discuss proposed changes before merging a PR and triggering a deployment. This allows teams to keep track of changes,
configure reviewers, set up acceptance criteria for merging, and much more.

::: info
To associate Pull Requests on GitHub, GitLab, or any other VCS platform with your Terramate Cloud user, connect these platforms to your Terramate Cloud account. Learn to link your accounts in the [account linking](/settings/account-linking.md) documentation.
:::

## Pull Request Integration

Terramate provides native Pull Request integration for GitHub, GitLab, BitBucket and others
to allow you to keep track of changes.

For every new commit added to a Pull Request Terramate will run a preview of all changes and provide a summary directly
inside the Pull Requests. In addition, a detailed overview containing all changes, affected resources, policy evaluations,
etc. will be provided in Terramate Cloud.

![Pull Request Preview](../cloud/assets/previews/pull-request-preview.png)

<!-- ## Pull Request Previews -->

<!-- ## Pull Request Checks -->

## Related guides

- [Manage Terraform at Scale](/guides/manage-terraform-at-scale)
- [Migrate from Terragrunt](/guides/migrate-from-terragrunt)

## Related references

- [`terramate run`](/cli/reference/cmdline/run)
- [Cloud API: Previews](/reference/cloud-api/previews)
