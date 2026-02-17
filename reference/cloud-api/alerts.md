---
title: Alerts API
description: Alerts endpoints in the Terramate Cloud API.
---

# Alerts API

Alerts endpoints expose incident and assignment data for deployment and drift issues.

## List alerts

### Endpoint

`GET /v1/alerts`

### Query parameters

| Name | Type | Description |
| --- | --- | --- |
| `status` | `string` | Filter by alert status (`open`, `resolved`) |
| `type` | `string` | Filter by alert type |
| `assignee` | `string` | Filter by assignee id |

### Request example

```sh
curl -X GET "https://cloud.terramate.io/api/v1/alerts?status=open" \
  -H "Authorization: Bearer $TERRAMATE_CLOUD_API_KEY"
```

### Response example

```json
{
  "data": [
    {
      "id": "alt_123",
      "type": "drift_detected",
      "status": "open",
      "assignees": ["usr_01"]
    }
  ]
}
```

## Update alert status

### Endpoint

`PATCH /v1/alerts/{alert_id}`

### Request body

```json
{
  "status": "resolved"
}
```

### Response example

```json
{
  "id": "alt_123",
  "status": "resolved",
  "updated_at": "2026-02-10T12:51:00Z"
}
```

## Errors

See [Errors](/reference/cloud-api/errors).
