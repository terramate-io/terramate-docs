---
title: Account Linking Section | Terramate Cloud
description: Learn how to link your Google, GitHub, GitLab and Microsoft accounts with your Terramate Cloud account to sync data between the different platforms.
---

# Account Linking

Some Terramate Cloud features like [Pull Requests Previews](../previews/index.md), [Deployment Insights](../deployments/index.md),
[Drift Detection](../drift/index.md) and [Alerts](../alerts/index.md) require you to link your GitLab, GitHub, Microsoft
and Slack accounts to function properly.

For example, for Terramate to understand what Pull Requests opened in GitHub are associated with your Terramate Cloud account,
you need to establish an account mapping between your Terramate Cloud and your GitHub user.

For that Terramate allows you to connect the following platforms to your Terramate Cloud account:

- **GitHub:** Links your GitHub to your Terramate Cloud User so that Pull Request Previews, Deployments, and detected
  Drift for repositories managed on GitHub can be associated with your Terramate Cloud User.
- **GitLab:** Links your GitLab to your Terramate Cloud User so that Pull Request Previews, Deployments, and detected
  Drift for repositories managed on GitHub can be associated with your Terramate Cloud User.
- **Slack (***coming soon***)**: Links your Slack to your Terramate Cloud so that the Slack Bot provided by the
  [Slack App integration](../integrations/slack.md) can send you direct messages about failed deployments or detected
  drift that is owned by you.

Account linking can be done in the [profile section](./index.md) of your Terramate Cloud account. It's recommended to link
the accounts for all third-party platforms used with Terramate Cloud.

![Terramate Cloud Profile Account Linking](../assets/profile/terramate-cloud-profile-account-linking.png "Terramate Cloud Profile Account Linking")
