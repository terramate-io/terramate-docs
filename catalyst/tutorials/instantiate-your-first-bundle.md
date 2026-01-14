---
title: Instantiate Your First Bundle
description: A friendly, end-to-end walkthrough to scaffold a bundle and generate infrastructure code.
type: tutorial
product: catalyst
outline: [2, 4]
---

# Instantiate Your First Bundle

This tutorial guides you from zero to a generated set of stacks and Terraform code using a Catalyst Bundle.

## Prerequisites

- [Terramate Catalyst CLI installed](../installation.md)
- A repository with at least one available bundle (local or remote catalog)

## Steps

1) Scaffold the bundle

```sh
terramate scaffold
```

- Select the bundle and provide requested inputs. The CLI writes an instantiation file (HCL/YAML).

2) Generate code

```sh
terramate generate
```

- Creates stacks (if missing) and generates Terraform files into them.

3) Inspect the result

- Open the created stacks and review generated Terraform.
- Run your usual `terraform plan` (or OpenTofu) in the affected stacks.

## Next steps

- How‑to: [Reconfigure a bundle](/catalyst/how-to/reconfigure-bundle)
- Concepts: [Scaffolding and Code Generation](/catalyst/concepts/scaffolding-and-generation)
