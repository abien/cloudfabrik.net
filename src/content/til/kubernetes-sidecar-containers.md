---
title: "Kubernetes Sidecar Containers in v1.29"
description: "Native sidecar support finally lands in Kubernetes. Here's what changes and why it matters for service meshes."
pubDate: 2026-01-23
category: "DevOps"
tags: ["kubernetes", "sidecar", "istio", "containers"]
---

# Kubernetes Sidecar Containers in v1.29

After years of workarounds, Kubernetes 1.29 introduces native sidecar container support via `restartPolicy: Always` in init containers.

## The Old Way (Hack)

```yaml
spec:
  containers:
    - name: app
      image: myapp:latest
    - name: istio-proxy
      image: istio/proxyv2
```

Problem: No startup/shutdown ordering guarantees.

## The New Way (Native)

```yaml
spec:
  initContainers:
    - name: istio-proxy
      image: istio/proxyv2
      restartPolicy: Always
  containers:
    - name: app
      image: myapp:latest
```

## Why This Matters

1. **Proper lifecycle** - Sidecars start before and stop after main containers
2. **Job support** - Finally works correctly with batch workloads
3. **Resource accounting** - Cleaner resource limits

## Migration Notes

Istio 1.20+ supports this natively. Enable with:

```bash
istioctl install --set values.pilot.env.ENABLE_NATIVE_SIDECARS=true
```
