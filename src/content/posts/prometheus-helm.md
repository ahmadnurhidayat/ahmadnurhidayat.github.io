---
title: "Prometheus on Kubernetes — kube-prometheus-stack Helm (v3.12)"
description: "Deploy the full Prometheus monitoring stack on Kubernetes with kube-prometheus-stack Helm chart — Prometheus v3.12, Grafana, Alertmanager, and Operator."
date: 2025-07-01
tags: [monitoring, prometheus, grafana, kubernetes, helm, alertmanager, operator, observability]
draft: false
canonicalUrl: "https://docs.beyondyou.my.id/docs/01-knowledge-base/observability/prometheus-helm"
---

The `kube-prometheus-stack` Helm chart is the standard way to deploy Prometheus on Kubernetes. It bundles Prometheus v3.12, Grafana, Alertmanager, Prometheus Operator, Node Exporter, and kube-state-metrics into a single package. One `helm install` gives you end-to-end cluster monitoring.

## Key Takeaways

- **Prometheus v3.12** (stable) / **v3.5.4** (LTS) — latest features and security fixes
- **Operator pattern** — create `ServiceMonitor` and `PrometheusRule` CRDs, Prometheus auto-reconfigures
- **Built-in dashboards** — 20+ pre-configured Grafana dashboards for Kubernetes
- **Alertmanager HA** — 3 replicas with quorum-based routing
- **Production-ready** — PVC persistence, resource limits, admission webhooks

## Quick Start

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install kube-prom prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace \
  --set prometheus.prometheusSpec.retention=15d \
  --set prometheus.prometheusSpec.storageSpec.volumeClaimTemplate.spec.resources.requests.storage=50Gi \
  --set alertmanager.alertmanagerSpec.replicas=3
```

For production, use a full `values.yaml` with HA replicas, PVC storage, Alertmanager routing, and Grafana dashboard provisioning. The guide covers ServiceMonitor/PrometheusRule CRD patterns, storage sizing, and operational best practices.

---

**Read the full guide:** [Prometheus on Kubernetes with Helm →](https://docs.beyondyou.my.id/docs/01-knowledge-base/observability/prometheus-helm) — includes complete Helm values, CRD examples, Alertmanager configuration, Grafana integration, and production checklist.
