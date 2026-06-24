---
title: "Grafana Tempo on Kubernetes — Distributed Tracing with Helm"
description: "Deploy Grafana Tempo for object-storage-based distributed tracing with TraceQL, Metrics Generator, and native Grafana integration."
date: 2025-07-01
tags: [monitoring, tempo, tracing, grafana, kubernetes, helm, opentelemetry, observability]
draft: false
canonicalUrl: "https://docs.beyondyou.my.id/docs/01-knowledge-base/observability/tempo-helm"
---

Grafana Tempo is a distributed tracing backend that stores traces exclusively in object storage — no indexing, no Cassandra, no Elasticsearch. This makes it dramatically cheaper to run at scale compared to Jaeger or Zipkin, while providing fast queries via TraceQL and native Grafana integration.

## Key Takeaways

- **Object-storage-only** — traces stored in S3/GCS/Azure Blob, no indexing overhead
- **TraceQL** — PromQL-like query language for filtering traces by attribute, duration, status
- **Metrics Generator** — derives RED metrics (rate, error, duration) from traces without extra instrumentation
- **Microservices mode** — Distributor, Ingester, Compactor, Querier independently scalable
- **Zone-aware replication** — survives zone failures without data loss

## Architecture in 30 Seconds

```
App → OTel Collector → Tempo Distributor
                            ↓
                      Ingester (3 replicas)
                            ↓ flush blocks
                      S3/GCS (object storage)
                            ↑
                      Compactor (singleton)
                            ↓
                      Query Frontend → Grafana Explore
```

The Distributor receives traces via OTLP, validates, and hash-distributes to Ingesters. Ingester batches traces into blocks and flushes to object storage every ~30 minutes. Compactor merges small blocks and applies retention. Query Frontend splits and caches TraceQL queries across all stores.

## Quick Start

```bash
helm repo add grafana https://grafana.github.io/helm-charts
helm install tempo grafana/tempo \
  --namespace monitoring \
  --create-namespace \
  --set storage.type=s3 \
  --set storage.s3.bucket=tempo-traces \
  --set storage.s3.region=ap-southeast-1 \
  --set distributor.replicas=2 \
  --set ingester.replicas=3 \
  --set compactor.replicas=1
```

For production, configure zone-aware ingester replication, tail-based sampling in the OTel Collector, and Metrics Generator for RED metrics. The guide covers all of this with complete Helm values.

---

**Read the full guide:** [Grafana Tempo on Kubernetes with Helm →](https://docs.beyondyou.my.id/docs/01-knowledge-base/observability/tempo-helm) — includes Helm values, component deep dive, OTLP/Jaeger/Zipkin ingestion, TraceQL queries, Metrics Generator, and production best practices.
