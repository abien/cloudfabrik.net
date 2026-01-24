---
title: "Docker Multi-Stage Builds for Production"
description: "Reducing image sizes by 90% with multi-stage builds and best practices for secure containers."
pubDate: 2026-01-17
category: "DevOps"
tags: ["docker", "containers", "security", "optimization"]
---

# Docker Multi-Stage Builds for Production

Your Docker images are too big. Let's fix that.

## Before: 1.2GB Image

```dockerfile
FROM python:3.11
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]
```

## After: 120MB Image

```dockerfile
FROM python:3.11 AS builder
WORKDIR /app
RUN pip install --user --no-cache-dir -r requirements.txt

FROM python:3.11-slim
WORKDIR /app

COPY --from=builder /root/.local /root/.local
COPY app.py .

RUN useradd -m appuser && chown -R appuser:appuser /app
USER appuser

ENV PATH=/root/.local/bin:$PATH
CMD ["python", "app.py"]
```

## Go Example (Even Better)

```dockerfile
FROM golang:1.21 AS builder
WORKDIR /app
COPY go.* ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o server

FROM scratch
COPY --from=builder /app/server /server
ENTRYPOINT ["/server"]
```

## Size Comparison

| Approach | Image Size |
|----------|------------|
| Python (naive) | 1.2GB |
| Python (multi-stage) | 120MB |
| Go (multi-stage) | 15MB |
| Go (scratch) | 8MB |

Every megabyte costs money in registry storage and pull time.
