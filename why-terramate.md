---
title: Why Terramate
description: Learn why teams choose Terramate over DIY tooling and purpose-built IaC platforms to manage Terraform and OpenTofu at scale.
---

# Why Terramate

Learn what makes managing Infrastructure as Code hard today, how existing approaches fall short, and why teams choose Terramate to manage Terraform and OpenTofu at scale.

## The problem with IaC today

Managing cloud infrastructure with Terraform and OpenTofu at scale is hard. Teams hit the same walls:

- **Poor environment management**: Terraform and OpenTofu offer only basic primitives for managing environments -- workspaces and directory duplication -- with no standard way to promote changes from dev to staging to production. Teams end up with duplicated code, inconsistent configurations, and error-prone manual promotion workflows.
- **Fragile automation**: Pipelines are glued together from dozens of tools -- CI scripts, wrapper scripts, linters, policy engines, and notification hooks -- creating a platform that is brittle and expensive to maintain.
- **No unified visibility**: Deployments, drift, and infrastructure changes are scattered across repositories, CI logs, and cloud consoles, with no single place to see what is happening.
- **Broad access requirements**: Many platforms require direct access to your cloud accounts, state files, and source code in order to operate, expanding your attack surface.
- **Slow feedback loops**: Without change detection, every pull request triggers a full `plan` across the entire repository, making reviews slow and risky.
- **IaC expertise as a bottleneck**: Terraform and OpenTofu require deep expertise to use safely, locking out application developers who need infrastructure but cannot write or review HCL. Without self-service, every request flows through a small platform team, creating a bottleneck that slows down the entire organization.

## Existing approaches

Two approaches dominate the market today. Both come with significant trade-offs.

### The DIY approach

Teams build a platform around open-source IaC tools by combining CI/CD pipelines, custom scripts, and a patchwork of third-party integrations. This approach:

- Requires dedicated platform engineering teams to build and maintain.
- Does not scale -- adding repositories, environments, or teams multiplies complexity.
- Offers no built-in collaboration, observability, or governance.
- Produces fragile automation that breaks when any component changes.

### Purpose-built CI/CD platforms (TACOS)

Terraform Automation and Collaboration Software (TACOS) are purpose-built CI/CD platforms for IaC. While they provide automation and collaboration out of the box, they:

- Only mitigate parts of the problem -- they automate plan/apply but do not help you organize, structure, or maintain your IaC codebase.
- Come with a significant price tag and long-term vendor lock-in.
- Often require refactoring existing IaC configurations into platform-specific patterns.
- Require broad access to your cloud accounts, state files, and often your source code.
- Replace your existing CI/CD rather than integrating with it, forcing you to adopt new secrets management and permissions models.
- Are time-consuming to onboard and manage.

## The Terramate approach

Terramate takes a fundamentally different approach: integrate with what you already have, shift orchestration to the client side, and use a push-only data model that keeps sensitive data in your environment.

- **Full IaC lifecycle**: Terramate covers the entire lifecycle -- from structuring your codebase and keeping it DRY, to deploying across environments, to continuously maintaining and updating infrastructure over time.
- **Works with your existing CI/CD**: Run Terramate in GitHub Actions, GitLab CI, Bitbucket Pipelines, Azure DevOps, or any other CI/CD system you already use.
- **No cloud account access required**: Terramate never needs credentials to your AWS, GCP, or Azure accounts.
- **No state file access**: Execution and state stay in your environment. Terramate Cloud does not read or store your Terraform state.
- **No source code access**: The push-only model means Cloud receives metadata and sanitized resources, not your code.
- **Client-side sanitization**: When extracting resources from plan files, Terramate CLI redacts all sensitive values -- secrets, certificates, and credentials -- on the client side before pushing any data to Terramate Cloud.
- **Open-source CLI**: The orchestration layer is fully open source. No vendor lock-in on the tool that runs your infrastructure.
- **Incremental adoption**: Add Terramate to any existing Terraform, OpenTofu, or Terragrunt project in minutes without refactoring your code or changing your workflow.
- **Keep your secrets management and permissions model**: No new credential stores, no new permission boundaries. Your existing security posture stays intact.

## How Terramate compares

| Dimension | DIY | Purpose-built CI/CD | Terramate |
|---|---|---|---|
| Time to onboard | Weeks to months | Days to weeks | Minutes |
| Migration effort | N/A | Often significant | Incremental |
| Configuration effort | N/A | UI, API, or Terraform provider | Inline configuration -- efficient and lean |
| Environment management | Manual duplication | Limited | Built-in with promotion chains |
| Secrets management | You manage | Platform-specific | You keep yours |
| Delivery speed | Slow (full repo runs) | Moderate | Fast (change detection + parallel) |
| Self-service infrastructure | Build it yourself | Limited | Built-in |
| Visibility and collaboration | Build it yourself | Partially included | Included |
| AI ready | N/A | Very limited | Agents, MCP, Skills |
| Required access | You manage cloud, state, and code | Cloud accounts, state, and often source code | None -- push-only, no access to cloud, state, or code |
| Execution and CI/CD | Your runners | Platform-managed runners, replaces your CI/CD | Your runners, works with any CI/CD |
| Pricing model | Infrastructure cost only | Per resource, run, or concurrency | Open-source CLI; predictable Cloud pricing |
| Native IaC (no wrappers) | Yes | Platform-specific patterns required | Yes -- native Terraform/OpenTofu |
| Code structure and maintenance | Manual | Not addressed | Built-in (stacks, codegen, bundles) |
| Deployment options | N/A | SaaS, limited self-host | SaaS and BYOC |
| Open source and licensing | Varies | BSL or proprietary; TACOS platforms competing with HashiCorp cannot run Terraform >= 1.6 under BSL terms | CLI is fully open source; runs any Terraform or OpenTofu version since your CI/CD executes it, not Terramate |
| Customization | Unlimited but fragile | Limited by platform | Fully configurable, zero lock-in |

## Next steps

- [How Terramate Works](/how-it-works)
- [Install Terramate CLI](/cli/installation)
- Onboard an existing project: [Terraform](/get-started/terraform), [OpenTofu](/get-started/opentofu), [Terragrunt](/get-started/terragrunt)
- [Book a demo](https://terramate.io/demo)
- Join the [Discord community](https://terramate.io/discord)
