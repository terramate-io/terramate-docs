---
title: Configuration | Terramate Concepts
description: Learn how Terramate follows the everything as code principle by using Hashicorp Configuration Language (HCL) as its main configuration language.
---

# Configuration

This section explains **configuration** as a core concept in Terramate.

## Introduction

Terramate follows the **"everything as code"** principle, meaning you can fully configure Terramate with code.

Terramate uses **Hashicorp Configuration Language (HCL)** as its configuration language by
extending HCL with Terramate-specific language constructs such as the `terramate`, `stack`, `generate_hcl` or `globals`
blocks that allow you to configure Terramate features such as Stacks, Orchestration, Code Generation, and Variables.

## Why HCL

HCL is a structured configuration language rather than a data structure serialization language.
It means that, unlike languages such as JSON, YAML, or TOML, HCL gets decoded using an application-defined schema.

In a nutshell:
- HCL allows you to **define**, **compute** and **reuse** configurations easily.
- Terramate builds on top of HCL by adding Terramate-specific language constructs to HCL.
- Terramate provides a **great** developer experience** by providing a language server and IDE plugins.
- Using HCL enables you to use all Terraform and OpenTofu functions such as `upper` or `regex` prefixed with `tm_` at any place
in your Terramate project.

::: tip Developer Experience
Terramate provides a language server and several IDE plugins to provide the best developer experience
possible while working with Terramate. For details, please see the [installation guide](../cli/installation.md).
:::

## Why not YAML, JSON, etc

Most traditional configuration languages are static and do not support variable or function calls for static
configuration management. HCL comes with variables and functions built-in, allowing users to easily reuse and compute
configuration. For example, in Terramate, you can use all available Terraform functions prefixed with `_tm` out of the box.
