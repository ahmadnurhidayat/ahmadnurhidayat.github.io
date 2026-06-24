---
title: "Thanos on Kubernetes — Global Prometheus with Helm"
description: "Deploy Thanos for unlimited Prometheus retention, global query view, and high availability across clusters using Bitnami Helm chart."
date: 2025-07-01
tags: [monitoring, thanos, prometheus, kubernetes, helm, observability, s3]
draft: false
canonicalUrl: "https://docs.beyondyou.my.id/docs/01-knowledge-base/observability/thanos-helm"
---

Prometheus is excellent for real-time monitoring, but it has limitations: data is ephemeral (local disk only), no global cross-cluster view, and no built-in deduplication for HA pairs. Thanos adds a layer on top of Prometheus that solves all three — unlimited retention via object storage, a global query endpoint across multiple clusters, and automatic deduplication of HA pairs.

## Key Takeaways

- Thanos is **non-invasive** — runs as a sidecar alongside existing Prometheus, no migration required
- **Unlimited retention** via object storage (S3, GCS, MinIO) instead of expensive SSD/EBS
- **Global query view** — query metrics from multiple Prometheus instances in a single PromQL endpoint
- **Automatic downsampling** — 5m resolution for 30–90d, 1h resolution for 90d–365d
- **Bitnami Helm chart** deploys all components (Sidecar, Store Gateway, Query, Compactor) declaratively

## Architecture in 30 Seconds

```
Prometheus (with Thanos Sidecar)
    ├── Scrape targets → store locally (6h retention)
    └── Upload blocks to S3/GCS every 2h

Store Gateway ← reads historical data from S3
Query ← fans out to Sidecars + Store Gateway
Compactor ← downsamples old data (singleton)
```

Grafana points to **Thanos Query** (port 9090) instead of Prometheus — it returns data from both recent (Sidecar) and historical (Store Gateway) sources transparently.

## Quick Start

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm install thanos bitnami/thanos \
  --namespace monitoring \
  --create-namespace \
  --set objstoreConfig.type=S3 \
  --set objstoreConfig.config.bucket=thanos-metrics \
  --set objstoreConfig.config.endpoint=s3.ap-southeast-1.amazonaws.com \
  --set sidecar.enabled=true \
  --set storegateway.enabled=true \
  --set query.enabled=true
```

For production, use a `values.yaml` with full configuration — the guide covers S3/GCS/MinIO setup, sharded Store Gateway, Query Frontend caching, and Compactor retention policies.

---

**Read the full guide:** [Thanos on Kubernetes with Helm →](https://docs.beyondyou.my.id/docs/01-knowledge-base/observability/thanos-helm) — includes complete Helm values, component deep dive, object storage config, downsampling lifecycle, multi-cluster federation, and production best practices.
