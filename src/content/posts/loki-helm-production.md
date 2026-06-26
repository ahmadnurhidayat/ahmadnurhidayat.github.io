---
title: "Loki Distributed on Kubernetes — Helm Production Guide"
description: "Production Loki deployment with GCS backend, SimpleScalable mode, retention policies, and optimized ingestion limits."
date: 2026-06-26
tags: [observability, loki, grafana, helm, kubernetes, gcp]
draft: false
canonicalUrl: "https://docs.beyondyou.my.id/docs/01-knowledge-base/observability/loki-helm-production.md"
---

Running Loki in production on Kubernetes requires careful tuning of storage, ingestion, and compaction. This guide covers a production Loki deployment using the Helm chart with GCS backend, SimpleScalable mode, and optimized retention.

The default Helm values assume small-scale evaluation. Without tuning ingestion limits, chunk sizing, and compaction, you'll hit OOM kills on the ingester and ballooning storage costs.

## Key Takeaways

- SimpleScalable mode balances simplicity and performance for most production workloads
- GCS backend with bucket lifecycle policies for cost-effective long-term storage
- Ingestion limits and chunk sizing tuned to prevent OOM and reduce storage costs

## What's Covered

| Section | Description |
| :--- | :--- |
| **Helm Chart** | Production values.yaml for Loki SimpleScalable on GKE |
| **Storage** | GCS bucket config, retention policies, and compaction settings |
| **Ingestion** | Rate limits, chunk sizing, and WAL configuration |
| **Scaling** | Read/write component autoscaling and horizontal scaling strategy |
| **Retention** | Per-tenant retention, deletion API, and bucket lifecycle rules |
| **Grafana Integration** | Datasource configuration and explore query optimization |

### Key Metrics to Watch

| Metric | Warning Threshold |
| :--- | :--- |
| `loki_ingester_streams_created_total` | Rapid growth indicates label explosion |
| `loki_ingester_chunk_entries` | High count means small chunks, wasted I/O |
| `loki_compactor_blocks_compactee_total` | Falling behind indicates storage pressure |

---

**Read the full guide:** [Loki Distributed on Kubernetes — Helm Production Guide →](https://docs.beyondyou.my.id/docs/01-knowledge-base/observability/loki-helm-production.md) — includes Helm values reference, GCS IAM setup, retention tuning, and Grafana integration.
