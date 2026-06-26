---
title: "EMQX Production Deployment via Helm"
description: "Enterprise MQTT broker on Kubernetes with JWT auth, TLS, auto-scaling, backup/recovery, and Prometheus monitoring."
date: 2026-06-26
tags: [messaging, emqx, mqtt, helm, kubernetes, iot]
draft: false
canonicalUrl: "https://docs.beyondyou.my.id/docs/01-knowledge-base/messaging/emqx-helm-production.md"
---

Running EMQX in production on Kubernetes goes beyond a basic Helm install. This guide walks through a production-grade deployment with TLS termination, JWT authentication, autoscaling, and full observability via Prometheus and Grafana.

The default Helm values are designed for evaluation, not production. Without tuning persistence, anti-affinity, resource limits, and authentication, you'll hit OOM kills, data loss, and security gaps in production.

## Key Takeaways

- Helm chart customization for production: persistence, anti-affinity, resource limits, and pod disruption budgets
- TLS and JWT authentication configuration with JWKS endpoint rotation
- Backup and recovery strategy for EMQX data and configuration

## What's Covered

| Section | Description |
| :--- | :--- |
| **Helm Values** | Production-tuned values.yaml with persistence, HA, and resource sizing |
| **Authentication** | JWT auth with HMAC/RSA, JWKS rotation, and ACL integration |
| **TLS Setup** | Certificate management, listener configuration, and mTLS options |
| **Observability** | Prometheus ServiceMonitor, Grafana dashboards, and alerting rules |
| **Scaling** | HPA for stateless components, manual scaling for core cluster |
| **Backup & Recovery** | CronJob-based snapshots, PVC backup, and restore procedures |

### Deployment Checklist

| Step | Task |
| :--- | :--- |
| 1 | Configure persistence and resource limits in values.yaml |
| 2 | Set up TLS certificates and JWT authentication |
| 3 | Deploy with `helm install` and verify pod health |
| 4 | Configure Prometheus scraping and Grafana dashboards |
| 5 | Set up backup CronJob and test restore procedure |

---

**Read the full guide:** [EMQX Production Deployment via Helm →](https://docs.beyondyou.my.id/docs/01-knowledge-base/messaging/emqx-helm-production.md) — includes Helm chart walkthrough, TLS setup, backup CronJobs, and production monitoring configuration.
