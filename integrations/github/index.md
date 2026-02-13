---
title: App for GitHub | Integrations | Terramate Cloud
description: Learn how to install and use the Terramate App for GitHub to integrate your GitHub and Terramate Cloud Organizations.
---

# Integration with GitHub

Terramate Cloud integrates with GitHub by providing an [App for GitHub](https://github.com/apps/terramate-cloud) that
can be installed in your personal GitHub account or your GitHub organization. Installing our App for GitHub allows you to
use features such as **rendered plan previews** in Pull Requests, automated **Pull Request approvals**,
**status checks**, **policies**, and more.

## Features

Using the App for GitHub to integrate Terramate Cloud and GitHub enables several features:

### Rendered Plans

For every new plan preview created with Terramate CLI, the App for GitHub will provide a rendered version of each plan
inside Pull Requests, clearly highlighting destructive changes. This allows your team to better understand changes introduced
in Pull Requests without having to understand complex Terraform and OpenTofu plans.

![Rendered Plans](../../cloud/assets/integrations/rendered-plans.png "Rendered Plans")

Each rendered comes with a link to the Pull Request preview in Terramate Cloud,  allowing you to see the ASCII Plan, logs
from GitHub Actions and more.

![Previews in Terramate Cloud](../../cloud/assets/integrations/pull-request-integration.png "Previews in Terramate Cloud")

## Setting up the integration

To install the App for GitHub, please navigate to the integrations page of your Terramate Cloud organization and click on
the ***App for GitHub*** in the ***available integrations*** section to start the installation process.

![Integrations Page](../../cloud/assets/integrations/overview.png "Integrations Page")

Next, you will be able to see the details of the App for GitHub.

![App for GitHub Details](../../cloud/assets/integrations/github-app-details.png "App for GitHub Details")

By pressing the ***Connect Integration*** button, you will be forwarded to GitHub.
Please choose your GitHub Organization or personal account to connect Terramate Cloud to and select whether to connect
Terramate Cloud to all or a selected range of repositories.

![App for GitHub Choose Repositories](../../cloud/assets/integrations/github-app-choose-repositories.png "App for GitHub Choose Repositories")

That's it! Terramate Cloud will now listen to incoming events from GitHub and enrich your Pull Requests with rendered plans,
status checks and more.

## Uninstall the App for GitHub

To uninstall the App for GitHub, navigate to the integration page in your Terramate Cloud account and open the App for GitHub
integration page.

![Installed App for GitHub Details](../../cloud/assets/integrations/installed-github-app-details.png "Installed App for GitHub Details")

Pressing the ***Disconnect Integration*** will forward you to the app settings page of your personal or organizational GitHub account. Press ***Uninstall*** to remove the Terramate Cloud App for GitHub and to unlink GitHub and Terramate Cloud.
