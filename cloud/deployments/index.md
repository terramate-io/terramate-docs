---
title: Deployments | Terramate Cloud
description: Learn how deployments in Terramate help you to deploy and observe changes with Infrastructure as Code.
---

# Deployments

This section explains **deployments** as a core concept in Terramate.

::: info
For Terramate Cloud to associate deployments triggered on GitHub Actions, GitLab CI/CD, or any other CI/CD platform with your Terramate Cloud user, you must connect those platforms to your Terramate Cloud account. Learn more about how to link your accounts
with Terramate Cloud in the [account linking](../profile/account-linking.md) documentation.
:::

## Introduction

Deployments in the context of Infrastructure as Code (IaC) are a process that groups various activities to provision
and decommission infrastructure resources that are defined in code to the cloud or other providers.

Terramate Cloud keeps track of all activities related to the full deployment life-cycle, the outcome of such activities,
notifies and alerts about anomalies and failures, and provides full audibility (search, filter, browse) of historic
changes.

Terramate CLI orchestrates all related activities (such as `terraform apply`) and synchronizes details to
Terramate Cloud from various sources (e.g. multiple stacks, repositories, or CI/CD environments - even manual execution)
and over multiple technologies (e.g. Terraform, OpenTofu, CloudFormation, Pulumi) and for multiple providers
(e.g. AWS, Google Cloud, Azure).

![Deployments in Terramate Cloud](../assets/deployments/overview.png)
