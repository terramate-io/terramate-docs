---
title: terramate cloud - Command
description: Cloud related commands and concepts.
---

# CLI Authentication

The Terramate CLI is able to automatically detect the Terramate Cloud credentials from the environment using the order of precedence below:

1. [API Keys](#api-keys)
2. [Github OIDC](#github-oidc)
3. [Gitlab OIDC](#gitlab-oidc)
4. [User credential](#user-credential)

If none of the methods below are successful then the cloud features are disabled.

## Github OIDC

If the Github Actions workflow has the `id_token: write` permission then Terramate can automatically issue short-lived OIDC tokens to communicate with Terramate Cloud.

```
jobs:
  my_job:
    permissions:
      id_token: write
```

Additionally you have to set up your Terramate Cloud organization to trust tokens issued by
this repository. Check the [OIDC configuration](../../../../cloud/organization/settings.md#setup-vcs-open-id-connect-oidc) for more details.

For security reasons, this is the recommended method for Github Actions because the tokens are only valid during the pipeline execution.

## Gitlab OIDC

A short-lived Gitlab ID Token can be created with the following code in your `.gitlabci.yml` file:

```yaml
.id_tokens:
  id_tokens:
    TM_GITLAB_ID_TOKEN:
      aud: api.terramate.io
```

It's important to name the variable as `TM_GITLAB_ID_TOKEN`.

**Note:** if you are using the `us` location config (by default it is `eu`), then the `aud` must be set to `us.api.terramate.io`.
Example:

```yaml
.id_tokens:
  id_tokens:
    TM_GITLAB_ID_TOKEN:
      aud: us.api.terramate.io
```

## API Keys

The API key method is the only authentication strategy that works in all possible environments and CI/CD vendors. It can be used as a fallback if you need to run Terramate from a non-conventional CI runner.

For configuring it you just need to export the `TMC_TOKEN` environment variable with the value obtained from the Terramate Cloud settings page. Check the [API keys](../../../../cloud/organization/api-keys.md) page for detailed instructions for creating them.

Examples:

### API keys locally

```bash
$ export TMC_TOKEN=tmco_...
$ terramate cloud info
status: signed in
provider: API Key
organizations: my-org
```

### API Keys in GHA

**Note:** The [Github OIDC](#github-oidc) is a safer way of authenticating from Github Actions but the example below shows how to use API Key if you need. This method is needed in GHA if you run Terramate in a container isolated from the runner environment (eg.: Dagger).

```yaml
jobs:
  cloud-info:
    name: check Terramate Cloud info
    runs-on: ubuntu-latest
    steps:
      - name: Check if Terramate detects credentials
        run: terramate cloud info
        env:
          TMC_TOKEN: ${{ secrets.TMC_TOKEN }}
```

## User credential

The user credential is intended to be used when executing Terramate locally.
It should never be used in CI/CD automations unless you know what you are doing.

Once you authenticate with either `terramate cloud login --google` or `terramate cloud login --github`, a file is created at `~/.terramate.d/credentials.tmrc.json` (this is the default location unless you have `user_terramate_dir` set in your [CLI configuration file](../../../reference/cmdline/index.md#cli-configuration)).
If the file is present, Terramate will use the `id_token` stored in it and automatically refresh token as needed.

