---
title: Code Generation | Terramate Concepts
description: "Learn how code generation in Terramate can be used to keep your stacks DRY by generating native Terraform,
OpenTofu, HCL, JSON and YAML files."
---

# Code Generation

In this section, we will cover code generation as a core concept in Terramate.

## Introduction

Terramate supports code generation for Terraform, OpenTofu, YAML, or JSON, and any arbitray files. Generating code in stacks can help keep
your stacks DRY (think generating files such as Terraform provider configuration or Kubernetes manifests).

This feature is useful whenever you want to conditionally generate code for stacks based on stack metadata such as tags or paths.

## Why code generation

Terramate chooses code generation over abstraction to enable backward compatibility and integrations with all supporting
tooling. By generating, e.g., native Terraform code, you can use Terramate with all supporting tooling without requiring
any additional integration. Stacks in Terramate are native environments by default, like Terraform or OpenTofu root
modules, which is why generating code with Terramate doesn't cause any lock-ins. You can off-board Terramate at
any point in time from your project without any migration effort.

In addition, generation code allows for all STA ("Static Code Analysis") tools to be integrated with Terramate, meaning
tools such as infracost, checkov, trivy, and others integrate without any additional effort.

## Use cases:

To mention some of the use cases of code generation:

- Keeping stacks DRY by generating Terraform or OpenTofu backend and provider configuration.
- Programmatically managing Terraform and Provider versions in stacks using `globals` and allowing advanced techniques such as canary releases or partial updates.
- Generating GitHub Actions workflows.
- Generating different templates based on provider versions.
- Scaffolding of complex IaC templates accessible for everyone.
