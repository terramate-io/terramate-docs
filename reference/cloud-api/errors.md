---
title: Errors
description: Error model for the Terramate Cloud API.
---

# Errors

Terramate Cloud API uses standard HTTP status codes and structured JSON error responses.

## HTTP status summary

| Status | Meaning |
| --- | --- |
| `200` | Request succeeded |
| `201` | Resource created |
| `400` | Invalid request payload or parameters |
| `401` | Missing or invalid API key |
| `403` | Authenticated but not authorized |
| `404` | Resource not found |
| `409` | Request conflict |
| `429` | Rate limit exceeded |
| `5xx` | Temporary server-side failure |

## Error response shape

```json
{
  "error": {
    "type": "invalid_request_error",
    "code": "invalid_parameter",
    "message": "The field 'stack_id' is required.",
    "request_id": "req_1234567890"
  }
}
```

## Error fields

| Field | Type | Description |
| --- | --- | --- |
| `type` | `string` | Broad category (`invalid_request_error`, `auth_error`, etc.) |
| `code` | `string` | Machine-readable code for programmatic handling |
| `message` | `string` | Human-readable summary of the failure |
| `request_id` | `string` | Correlation id for support and observability |

## Handling guidance

- Retry on `429` and `5xx` with exponential backoff
- Do not retry `400` until request data is fixed
- Rotate or validate credentials on `401`
- Log `request_id` for support investigations
