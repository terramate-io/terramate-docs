---
title: Previews API
description: Preview endpoints in the Terramate Cloud API.
---

# Previews API

Previews endpoints represent pull request preview data synchronized from Terramate CLI.

## List previews

### Endpoint

`GET /v1/previews`

### Query parameters

| Name | Type | Description |
| --- | --- | --- |
| `repository` | `string` | Filter by repository |
| `pull_request` | `string` | Filter by PR identifier |
| `status` | `string` | Filter by preview status |

### Request example

```sh
curl -X GET "https://cloud.terramate.io/api/v1/previews?pull_request=142" \
  -H "Authorization: Bearer $TERRAMATE_CLOUD_API_KEY"
```

### Response example

```json
{
  "data": [
    {
      "id": "prv_100",
      "pull_request": "142",
      "status": "ready",
      "stack_count": 12
    }
  ]
}
```

## Get preview details

### Endpoint

`GET /v1/previews/{preview_id}`

### Response example

```json
{
  "id": "prv_100",
  "status": "ready",
  "changes": {
    "to_add": 14,
    "to_change": 3,
    "to_destroy": 0
  }
}
```

## Errors

See [Errors](/reference/cloud-api/errors).
