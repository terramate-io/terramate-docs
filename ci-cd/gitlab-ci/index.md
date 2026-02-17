---
title: How to use Terramate to automate and orchestrate Terraform in GitLab CI
description: Learn how to use Terramate to configure custom GitOps workflows to automate and orchestrate Terraform and OpenTofu in GitLab CI.
---

# Automating Terramate in GitLab CI

GitLab CI adds continuous integration to GitLab repositories to automate your software builds, tests, and deployments. Automating Terraform with CI/CD enforces configuration best practices, promotes collaboration, and automates the Terraform workflow.

Terramate integrates seamlessly with GitLab CI to automate and orchestrate IaC tools like Terraform and OpenTofu.

::: info
To associate deployments triggered in GitLab CI/CD with your Terramate Cloud user, connect your GitLab user to your Terramate Cloud account. Learn to link your accounts in the [account linking](/settings/account-linking.md) documentation.
:::

## Terramate Blueprints

This page explains the workflow setup and authentication flows common in the following workflows.

To jump directly to the Blueprints, follow the links below:

- [Deployment Workflow Blueprints](./deployment-workflow.md)
- [Drift Check Workflow Blueprints](./drift-check-workflow.md)
- [Pull Request Preview Workflow Blueprints](./preview-workflow.md)

Please read the following sections to understand the shared details among these workflows.

## Installing the necessary packages

The workflows in these examples use the `google/cloud-sdk:alpine` docker image based on a minimal Alpine image and include the `gcloud` packages.

In addition to installing Terraform and Terramate, you need other packages for the workflows to work.

GitLab support in Terramate Cloud was introduced in [Terramate CLI version 0.9.1](https://github.com/terramate-io/terramate/releases/tag/v0.9.1), so it's the minimum version required.

```yaml
.setup:
  script:
    - apk add unzip git bash curl jq
    - wget https://releases.hashicorp.com/terraform/1.9.0/terraform_1.9.0_linux_amd64.zip -O /tmp/terraform.zip
    - unzip /tmp/terraform.zip -d /tmp
    - mv /tmp/terraform /bin
    - wget https://github.com/terramate-io/terramate/releases/download/v0.9.1/terramate_0.9.1_linux_x86_64.tar.gz -O /tmp/terramate.tar.gz
    - tar xzf /tmp/terramate.tar.gz -C /tmp
    - mv /tmp/terramate /bin
```

## Code Checkout

For the Terramate Change Detection to work, the Git history is needed to compare the current commit with previous commits.

Here is the code snippet that sets the required variables to make it happen:

```yaml
.common:
  variables:
    GIT_STRATEGY: clone # clone entire repo instead of using fetch
    GIT_DEPTH: 0 # avoid shallow clone to give terramate all the info it needs
```

## Terramate Cloud integration

In order for all the Terramate Cloud features to work properly, a Gitlab [project access token](https://docs.gitlab.com/ee/user/project/settings/project_access_tokens.html) with `read_api` scope is needed. Terramate uses this token to pull information from the Gitlab API about Merge Requests, deployments, and other related details.

Once a token is created, create a [masked CICD variable](https://docs.gitlab.com/ee/ci/variables/#mask-a-cicd-variable) called `GITLAB_TOKEN` with the token value.

In addition to the token, Terramate needs an ID Token to authenticate to Terramate Cloud. This assumes you already added the required Gitlab trust in your Terramate Cloud organization settings.

The ID Token can be created with the following code:
```yaml
.id_tokens:
  id_tokens:
    TM_GITLAB_ID_TOKEN:
      aud: api.terramate.io
```

## OIDC Setup

Configure the `id_tokens` attribute in the GitLab CI workflow to enable authentication to the cloud provider (in this example, Google Cloud) using OIDC.

```yaml
.id_tokens:
  id_tokens:
    GITLAB_OIDC_TOKEN:
      aud: https://gitlab.com
```

*NOTE:* The URL in the `aud` (audience) attribute can be different if using a self-managed GitLab installation. The example above is only valid for GitLab SaaS.

For more info about OIDC configuration between GitLab and Google Cloud, see the link below:
- [Configuring OpenID Connect in Google Cloud](https://docs.gitlab.com/ee/ci/cloud_services/google_cloud/)

## Authenticating to Google Cloud

Search for `CHANGEME` to adjust needed values for your use case.

This assumes a Workload Identity Pool and Provider named `gitlab-ci`.

```yaml
.auth:
  script:
    - echo ${GITLAB_OIDC_TOKEN} > `pwd`/.ci_job_jwt_file
    - gcloud iam workload-identity-pools create-cred-config projects/<CHANGEME:project_id>/locations/global/workloadIdentityPools/gitlab-ci/providers/gitlab-ci
      --service-account="<CHANGEME:service_account_email>"
      --output-file=`pwd`/.gcp_temp_cred.json
      --credential-source-file=`pwd`/.ci_job_jwt_file
    - gcloud auth login --cred-file=`pwd`/.gcp_temp_cred.json
    - export GOOGLE_APPLICATION_CREDENTIALS=`pwd`/.gcp_temp_cred.json
```

<br/><br/>

# Main CI file

Create the `.gitlab-ci.yml` at the root of your project with the following content:

```yaml
include:
  - local: 'gitlab-ci/*.yml'

default:
  image: google/cloud-sdk:alpine

stages:
  - plan
  - apply
```

The following is a file created under `gitlab-ci/.common.yml` containing all the components described above:
```yaml
.setup:
  script:
    - apk add unzip git bash curl jq
    - wget https://releases.hashicorp.com/terraform/1.5.7/terraform_1.5.7_linux_amd64.zip -O /tmp/terraform.zip
    - unzip /tmp/terraform.zip -d /tmp
    - mv /tmp/terraform /bin
    - wget https://github.com/terramate-io/terramate/releases/download/v0.9.1/terramate_0.9.1_linux_x86_64.tar.gz -O /tmp/terramate.tar.gz
    - tar xzf /tmp/terramate.tar.gz -C /tmp
    - mv /tmp/terramate /bin

.id_tokens:
  id_tokens:
    GITLAB_OIDC_TOKEN:
      aud: https://gitlab.com
    TM_GITLAB_ID_TOKEN:
      aud: api.terramate.io

.auth:
  script:
    - echo ${GITLAB_OIDC_TOKEN} > `pwd`/.ci_job_jwt_file
    - gcloud iam workload-identity-pools create-cred-config projects/<CHANGEME:project_id>/locations/global/workloadIdentityPools/gitlab-ci/providers/gitlab-ci
      --service-account="<CHANGEME:service_account_email>"
      --output-file=`pwd`/.gcp_temp_cred.json
      --credential-source-file=`pwd`/.ci_job_jwt_file
    - gcloud auth login --cred-file=`pwd`/.gcp_temp_cred.json
    - export GOOGLE_APPLICATION_CREDENTIALS=`pwd`/.gcp_temp_cred.json

.common:
  variables:
    GIT_STRATEGY: clone # clone entire repo instead of using fetch
    GIT_DEPTH: 0 # avoid shallow clone to give terramate all the info it needs
```
