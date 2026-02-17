---
title: Get Started with Terramate and Terraform
description: Learn how to onboard Terramate to any existing Terraform project with a single command.
---

# Get started with Terramate and Terraform

This guide will teach you how to onboard Terramate to any existing Terraform repository in less than 5 minutes.

Here's what you will learn:
- Install Terramate CLI
- Onboard Terramate CLI to your Terraform repository
- Sign up for a free Terramate Cloud account
- Sync your stacks to Terramate Cloud

Let's get started!

::: info
If you have any questions you can get in touch with our team by joining our [Discord community](https://terramate.io/discord).
:::

## 1: Install Terramate CLI

Install the Terramate CLI:

 ::: code-group
```sh [macOS]
brew install terramate
```

```sh [Ubuntu & Debian]
# Add the Terramate repo to your sources
echo "deb [trusted=yes] https://repo.terramate.io/apt/ /" \
  | sudo tee /etc/apt/sources.list.d/terramate.list

apt update
apt install terramate
```

```sh [Fedora & CentOS]
# Add the Terramate repo to your sources
sudo tee /etc/yum.repos.d/terramate.repo <<EOF
[terramate]
name=Terramate Repository
baseurl=https://repo.terramate.io/yum/
enabled=1
gpgcheck=0
EOF

dnf install terramate
```

```txt [Windows]
Download the binary from
https://github.com/terramate-io/terramate/releases
```
:::

For other installation methods, please see the [installation page](/cli/installation).

## 2: Import Terraform Root Modules

To enable Terramate CLI to interact with your Terraform configurations, you first need to import existing Terraform root
modules (modules with a state backend configuration) as Terramate stacks, which can be done with the following command:

```bash
terramate create --all-terraform
```
This command creates a `stack.tm.hcl` file in every existing Terraform root module, enabling Terramate to consider the
Terraform root modules as stacks.

Those files are used to configure the metadata such as `name`, `description`, `tags`, and optionally the orchestration behavior of a stack.

For example, an existing Terraform repository with two root modules:
```bash
.
├── alice
│   ├── main.tf
│   └── backend.tf
├── bob
│   ├── main.tf
│   └── backend.tf

```
After running the command, a `stack.tm.hcl` file is created in both root modules marking them as Terramate stacks:

```bash
.
├── alice
│   ├── main.tf
│   ├── stack.tm.hcl
│   └── backend.tf
├── bob
│   ├── main.tf
│   ├── stack.tm.hcl
│   └── backend.tf
```

Now that you successfully onboarded Terramate CLI to your repository, you can start using the CLI to orchestrate your stacks.

**List all stacks in a repository**

```sh
terramate list
```

**Initialize all stacks in a repository**

```sh
terramate run -- terraform init
```

**Create a plan for all stacks in parallel**

```sh
terramate run --parallel 5 -- terraform plan -out plan.tfplan
```

**Run an apply in all stacks that contain changes**

```sh
terramate run --changed -- terraform apply -auto-approve plan.tfplan
```

Those are some of the most important examples of orchestrating commands with Terramate CLI. If you want to learn more
about how the orchestration engine in Terramate CLI works, please take a look at the [orchestration](/orchestration/) docs.

## 3: Sign up for Terramate Cloud

Next, we'll sign up for a free Terramate Cloud account. You can use Terramate CLI to sync your stacks to Terramate Cloud
which provides an additional dashboard that adds features like observability, insights, asset management, stateful orchestration,
drift detection, alerts, and more to your Terramate projects.

When signing up to the platform at [cloud.terramate.io](https://cloud.terramate.io/), you are asked to choose a social login provider to sign in with.

Terramate Cloud offers to sign in using:

- A Google Workspace Account (formerly known as GSuite Account),
- A GitHub Account
- A Microsoft Entra ID Account

## 4: Create your Organization

After you set up your profile, join an organization you were invited to or create your own. To create an organization,
choose a display name and a short name. The short name appears in URLs (https://cloud.terramate.io/o/{short-name}) and
in the Terramate CLI when you select an organization to sync or retrieve data from.

You can belong to multiple organizations and teams. Click the “join” button to become an active member, then click
“visit” to view your organization.

## 5: Configure your repository

Configure your Terramate project to sync data to your Terramate Cloud organization after creating it.

::: code-group
```sh [Terramate EU]
$ cat <<EOF >terramate.tm.hcl
terramate {
  config {
    cloud {
      organization = "organization-short-name" # TODO: fill in your org short name
    }
  }
}
EOF

$ git add terramate.tm.hcl
$ git commit -m "Add Terramate Cloud configuration"
```

```sh{6} [Terramate US]
$ cat <<EOF >terramate.tm.hcl
terramate {
  config {
    cloud {
      organization = "organization-short-name" # TODO: fill in your org short name
      location     = "us"
    }
  }
}
EOF

$ git add terramate.tm.hcl
$ git commit -m "Add Terramate Cloud configuration"
```
:::

## 6: Login from CLI

To synchronize data from your local machine, you will need to login to Terramate Cloud from the CLI.
Terramate CLI will store a session on your machine after a successful login.

Use the following command to initiate the login.

```bash
terramate cloud login
```
If you want to login with GitHub instead, use:

```bash
terramate cloud login --github
```
## 7: Sync stacks to Terramate Cloud

After setting up your Terramate Cloud organization, let's sync the stacks configured in your repository to Terramate Cloud.
The easiest way to sync your stacks is to run a drift detection workflow in all stacks and sync the result to Terramate Cloud:

```bash
terramate run \
  --sync-drift-status \
  --terraform-plan-file=drift.tfplan \
  --continue-on-error \
  -- \
  terraform plan -detailed-exitcode -out drift.tfplan
```

In a nutshell, the command above runs a `terraform plan` in all your stacks and sends the result to Terramate Cloud.

::: info
This works because Terramate CLI extracts data such as metadata, resources, Git metadata, and more from the created plans
and the environment in which it's running, sanitizes it locally and syncs the result to Terramate Cloud. This makes
Terramate extremely secure since no sensitive information, such as credentials or certificates, will ever be synced to
Terramate Cloud.
:::

If the plans don't contain any changes, Terramate will simply create an inventory of all infrastructure configured in
Terramate Cloud. If the plans changes, Terramate will additionally create drift alerts.

And that's it. You just learned how to onboard Terramate to your Terraform repository in less than 5 minutes.
Next, you can onboard your CI/CD platform by using our [CI/CD pipeline workflows](/ci-cd/index.md).

## 8: Next Steps

- [Setup CI/CD:](/ci-cd/index.md) Configure your CI/CD to sync pull requests previews, deployments and automated drift detection workflows.
- [Terramate App for Slack:](/integrations/slack) Receive alerts and notifications in Slack.
- [Link Accounts:](/settings/account-linking) Link different accounts such as GitHub or GitLab with your Terramate Cloud profile to enable auto-assignment for alerts.
- [Manage Environments](/environments/) Standardize multi-environment delivery with components, bundles, and environments.
- [Terramate Community](https://terramate.io/discord): Join the Terramate Community on Discord to receive or contribute any help.
