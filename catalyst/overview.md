---
title: What is Terramate Catalyst
description: Learn how Terramate Catalyst enables developers to deploy and manage infrastructure in a self-service using IaC tools like Terraform, OpenTofu, or Terragrunt, packaged as Terramate Bundles.
outline: [2, 4]
---

# What is Terramate Catalyst?

Your web application teams already rely on a design system to ensure a consistent look, feel, and quality across every product they ship. Catalyst brings that same design-system approach to infrastructure.

**Platform teams** use the Terraform skills they already have to encode security, compliance, observability, and architectural best practices into reusable
infrastructure components and bundles.

**Developers** then consume those bundle to deploy production-grade infrastructure quickly and consistently, without needing to understand Terraform or how the underlying infrastructure works.

## The Challenge

Infrastructure as Code tools like Terraform and OpenTofu let platform teams provision and manage infrastructure with Git‑based workflows (GitOps). They’re powerful—yet not always accessible to developers who aren’t experts in IaC or cloud engineering. Common challenges include:

- Learning HCL to work with Terraform and OpenTofu
- Managing Terraform state safely
- Composing modules, separating state, and structuring environments
- Manage day 2 operations such as upgrading modules, providers, and tooling
- Managing infrastructure drift complexity

This creates a bottleneck where only a few people can ship infrastructure changes. Terramate aims to fix that.

## How does Catalyst work?

Terramate Catalyst helps developers deploy and manage infrastructure in a self-service using IaC tools like Terraform, OpenTofu, or Terragrunt,
packaged as Terramate Bundles. Bundles are easy to create, version, share, and publish, so you can stop copy-and-paste workflows and enforce consistency.

At its core, Catalyst transforms how infrastructure is delivered and consumed inside organizations by introducing two new primitives: Bundles and Components.

![Terramate Catalyst Overview](./assets/catalyst-overview.png "Terramate Catalyst Overview")

### Components

**Components** are the foundational building blocks in Catalyst.

A Component represents a single, opinionated infrastructure capability, such as:

- A VPC
- A PostgreSQL database
- An S3 bucket
- A Kubernetes cluster
- A message queue

Components are:

- Defined and owned by platform teams
- Implemented using Terraform modules or any other arbitrary IaC
- Opinionated and policy-aware
- Reusable across Bundles

A Component encapsulates:

- Terraform module wiring
- Required inputs and outputs
- Naming conventions
- Tagging standards
- Security and compliance defaults

### Bundles

**Bundles** are higher-level abstractions built by composing one or more Components.

A Bundle answers questions like:

> “What infrastructure does a typical service need in our organization?”

Examples:
- A “web service” bundle (VPC, load balancer, database, IAM roles)
- A “data pipeline” bundle (storage, queues, compute, observability)
- An “internal tool” bundle with restricted access patterns

Bundles:

- Hide Terraform and infrastructure topology from consumers
- Encode organizational best practices
- Define sensible defaults while remaining configurable
- Define how environments are managed
- Can be versioned and shared across teams

Developers interact primarily with Bundles, not Components.

## How does Catalyst compare to Terraform and OpenTofu?

Catalyst does **not** replace Terraform or OpenTofu. Instead if bundles existing IaC into easy to use bundles that developers can use to create new environments from. You can onboard Catalyst to any existing 

Key characteristics:

- Generated code is plain Terraform
- Existing Terraform tooling continues to work
- State is managed using standard Terraform backends
- Teams can inspect, audit, and debug generated output

This ensures Catalyst remains compatible with:
- Existing Terraform ecosystems
- CI/CD pipelines
- Security scanning tools
- Policy engines

## Governance and Control

Catalyst enables strong governance without slowing teams down:

- Platform teams control the shape of infrastructure through Components and Bundles
- Consumers are constrained to safe, approved configurations
- Drift is minimized through standardization
- Changes are reviewed and versioned in Git

This model scales across:
- Multiple teams
- Multiple environments
- Multiple cloud accounts
- Large organizations with strict compliance needs

## Self-Service Infrastructure

Catalyst is designed to be consumed through multiple interfaces:

- CLI workflows
- CI/CD automation
- Internal developer portals
- AI agents and automation systems

Because infrastructure intent is declared at a high level, Catalyst enables **true self-service** without sacrificing reliability or security.

## When to Use Catalyst

Catalyst is a good fit if you:

- Operate a platform team supporting multiple product teams
- Want to standardize infrastructure without blocking developers
- Are struggling with Terraform sprawl or duplication
- Need stronger governance and clearer ownership boundaries
- Want infrastructure definitions that are easy for humans *and machines* to consume

## Getting Started

- [Installation](./installation.md)
- [Getting Started Guide](https://terramate.io/rethinking-iac/technical-introduction-to-terramate-catalyst/)

