---
title: "Tempo Distributed on Kubernetes — Helm Production Guide"
description: "Production Tempo deployment with GCS storage, OTLP/Jaeger/Zipkin receivers, metrics generator, and vParquet4."
date: 2026-06-26
tags: [observability, tempo, grafana, helm, kubernetes, tracing]
draft: false
canonicalUrl: "https://docs.beyondyou.my.id/docs/01-knowledge-base/observability/tempo-helm-production.md"
---

Tempo is Grafana's distributed tracing backend. This guide covers a production Helm deployment with GCS storage, multi-protocol receivers (OTLP, Jaeger, Zipkin), and the metrics generator for RED metrics from traces.

A misconfigured Tempo deployment silently drops traces. Without proper storage tuning and ingestion limits, you'll lose critical observability data during peak traffic.

## Key Takeaways

- vParquet4 block format for optimal query performance and storage efficiency
- Metrics generator derives RED (rate, error, duration) metrics from traces automatically
- Multi-protocol ingestion with OTLP, Jaeger, and Zipkin receivers for diverse instrumentation

## What's Covered

| Section | Description |
| :--- | :--- |
| **Helm Chart** | Production values.yaml for Tempo on GKE with GCS backend |
| **Storage** | GCS bucket config, block retention, and compaction |
| **Receivers** | OTLP, Jaeger, Zipkin configuration with processor pipeline |
| **Metrics Generator** | Service graphs, span metrics, and Prometheus remote write |
| **Search** | TraceQL search configuration and backend caching |
| **Grafana Linking** | Datasource setup with Loki-to-Tempo trace ID injection |

### Receiver Protocol Comparison

| Protocol | Use Case |
| :--- | :--- |
| OTLP | OpenTelemetry SDK instrumentation (preferred) |
| Jaeger | Legacy Jaeger client libraries |
| Zipkin | Zipkin-instrumented services |

---

**Read the full guide:** [Tempo Distributed on Kubernetes — Helm Production Guide →](https://docs.beyondyou.my.id/docs/01-knowledge-base/observability/tempo-helm-production.md) — includes Helm values reference, GCS setup, metrics generator config, and Grafana datasource linking.
