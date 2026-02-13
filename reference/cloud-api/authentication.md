---
title: Authentication
description: Authentication methods for the Terramate Cloud API.
---

# Authentication

Terramate Cloud API requests are authenticated with API keys.

## Credentials

- Create and manage keys in [Settings > API Keys](/settings/api-keys)
- Send the key in the `Authorization` header as a bearer token
- Use separate keys per environment and pipeline

## Header format

```http
Authorization: Bearer <YOUR_TERRAMATE_CLOUD_API_KEY>
```

## Example request

```sh
curl -X GET "https://cloud.terramate.io/api/v1/stacks" \
  -H "Authorization: Bearer $TERRAMATE_CLOUD_API_KEY" \
  -H "Content-Type: application/json"
```

## Security best practices

- Store keys in CI/CD secret stores, never in source control
- Scope keys by organization and workflow where possible
- Rotate keys regularly and after incident response
- Revoke keys immediately when no longer needed

## Related

- [Errors](/reference/cloud-api/errors)
- [Rate Limits](/reference/cloud-api/rate-limits)
