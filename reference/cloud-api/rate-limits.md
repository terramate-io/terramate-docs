---
title: Rate Limits
description: Rate limiting behavior for the Terramate Cloud API.
---

# Rate Limits

To keep the API responsive for all tenants, Terramate Cloud applies request limits.

## Behavior

- Rate limiting is enforced per API key
- Exceeded requests return `429 Too Many Requests`
- Clients should back off and retry with jitter

## Recommended retry strategy

1. Start with a short delay (for example, 250ms to 1s)
2. Exponentially increase delay on repeated `429`
3. Cap retry window to avoid unbounded waits

## Example response headers

```text
X-RateLimit-Limit: 120
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1739140800
Retry-After: 2
```

## Client implementation tips

- Batch write operations where possible
- Avoid tight polling loops; prefer event-driven workflow triggers
- Cache stable reads in CI jobs
- Spread high-volume jobs over time windows
