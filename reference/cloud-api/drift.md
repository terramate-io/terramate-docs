---
title: Drift API
description: Drift endpoints in the Terramate Cloud API.
---

# Drift API

Drift endpoints expose drift detection outcomes synchronized from your Terramate workflows.

## List drift findings

### Endpoint

`GET /v1/drift`

### Query parameters

| Name | Type | Description |
| --- | --- | --- |
| `status` | `string` | Filter by drift status (`drifted`, `healthy`) |
| `repository` | `string` | Filter by repository |
| `stack_id` | `string` | Filter by stack |

### Request example

```sh
curl -X GET "https://cloud.terramate.io/api/v1/drift?status=drifted" \
  -H "Authorization: Bearer $TERRAMATE_CLOUD_API_KEY"
```

### Response example

```json
{
  "data": [
    {
      "id": "drift_001",
      "stack_id": "stack_01",
      "status": "drifted",
      "detected_at": "2026-02-10T12:34:56Z"
    }
  ]
}
```

## Get drift finding details

### Endpoint

`GET /v1/drift/{drift_id}`

### Response example

```json
{
  "id": "drift_001",
  "stack_id": "stack_01",
  "status": "drifted",
  "summary": "Security group rule differs from desired state."
}
```

## Errors

See [Errors](/reference/cloud-api/errors).
