---
title: "Prometheus Metric Types Explained"
description: "A practical guide to counters, gauges, histograms, and summaries with real-world examples."
pubDate: 2026-01-20
category: "DevOps"
tags: ["prometheus", "monitoring", "metrics", "observability"]
---

# Prometheus Metric Types Explained

Four metric types, infinite confusion. Let me break it down.

## Counter - Only Goes Up

```python
from prometheus_client import Counter

requests_total = Counter(
    'http_requests_total',
    'Total HTTP requests',
    ['method', 'endpoint', 'status']
)

requests_total.labels(method='GET', endpoint='/api', status='200').inc()
```

Use for: Request counts, error counts, bytes processed

## Gauge - Goes Up and Down

```python
from prometheus_client import Gauge

active_connections = Gauge(
    'active_connections',
    'Currently active connections'
)

active_connections.inc()
active_connections.dec()
active_connections.set(42)
```

Use for: Temperature, memory usage, queue size

## Histogram - Distribution Buckets

```python
from prometheus_client import Histogram

request_latency = Histogram(
    'http_request_duration_seconds',
    'Request latency in seconds',
    buckets=[0.01, 0.05, 0.1, 0.5, 1.0, 5.0]
)

with request_latency.time():
    process_request()
```

Use for: Latency percentiles, size distributions

## Summary - Client-Side Quantiles

Generally avoid. Histograms are more flexible and aggregatable.

## Quick Reference

| Type | Aggregatable | Use Case |
|------|--------------|----------|
| Counter | Yes | Events |
| Gauge | Limited | Current state |
| Histogram | Yes | Latency/sizes |
| Summary | No | Avoid |
