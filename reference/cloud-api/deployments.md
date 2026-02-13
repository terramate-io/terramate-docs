---
title: Deployments API
description: Deployments endpoints in the Terramate Cloud API.
---

# Deployments API

Deployments endpoints represent synchronized deployment runs and their stack outcomes.

## List deployments

### Endpoint

`GET /v1/deployments`

### Query parameters

| Name | Type | Description |
| --- | --- | --- |
| `repository` | `string` | Filter by repository |
| `status` | `string` | Filter by deployment status |
| `from` | `string` | ISO timestamp lower bound |
| `to` | `string` | ISO timestamp upper bound |

### Request example

```sh
curl -X GET "https://cloud.terramate.io/api/v1/deployments?status=failed" \
  -H "Authorization: Bearer $TERRAMATE_CLOUD_API_KEY"
```

### Response example

```json
{
  "data": [
    {
      "id": "dep_123",
      "status": "failed",
      "repository": "infra-live",
      "created_at": "2026-02-10T12:00:00Z"
    }
  ]
}
```

## Get deployment details

### Endpoint

`GET /v1/deployments/{deployment_id}`

### Response example

```json
{
  "id": "dep_123",
  "status": "failed",
  "stacks": [
    {
      "name": "prod/network",
      "status": "ok"
    },
    {
      "name": "prod/app",
      "status": "failed"
    }
  ]
}
```

## Errors

See [Errors](/reference/cloud-api/errors).
