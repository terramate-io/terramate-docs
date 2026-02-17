---
title: Stacks API
description: Stacks endpoints in the Terramate Cloud API.
---

# Stacks API

Use stacks endpoints to query stack inventory and stack-level status synchronized from Terramate CLI workflows.

## List stacks

### Endpoint

`GET /v1/stacks`

### Query parameters

| Name | Type | Description |
| --- | --- | --- |
| `repository` | `string` | Filter by repository slug |
| `status` | `string` | Filter by stack health status |
| `cursor` | `string` | Pagination cursor |
| `limit` | `integer` | Page size |

### Request example

```sh
curl -X GET "https://cloud.terramate.io/api/v1/stacks?repository=infra-live&limit=50" \
  -H "Authorization: Bearer $TERRAMATE_CLOUD_API_KEY"
```

### Response example

```json
{
  "data": [
    {
      "id": "stack_01",
      "name": "prod/network",
      "status": "healthy",
      "repository": "infra-live"
    }
  ],
  "next_cursor": null
}
```

## Get stack details

### Endpoint

`GET /v1/stacks/{stack_id}`

### Response example

```json
{
  "id": "stack_01",
  "name": "prod/network",
  "status": "healthy",
  "last_deployment_id": "dep_123"
}
```

## Errors

See [Errors](/reference/cloud-api/errors).
