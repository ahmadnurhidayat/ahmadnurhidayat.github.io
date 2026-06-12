---
title: "KEDA — Event-Driven Autoscaling on Kubernetes"
description: "Deep dive into KEDA (Kubernetes Event-Driven Autoscaler) — architecture, ScaledObject CRDs, CloudWatch scaler with EKS IRSA, load testing, and production considerations."
date: 2026-06-12
tags: [kubernetes, autoscaling, keda, eks, hpa, event-driven, cloudwatch]
draft: false
canonicalUrl: "https://docs.beyondyou.my.id/docs/01-knowledge-base/k8s/keda-event-driven-autoscaling"
---

KEDA extends the Horizontal Pod Autoscaler with 60+ built-in scalers for external event sources — CloudWatch, Kafka, SQS, Prometheus, and more. It does not replace HPA; it feeds HPA with metrics from sources that the standard Kubernetes metrics pipeline cannot reach.

## Key Takeaways

- KEDA consists of three components: operator (polls external sources), metrics server (exposes `external.metrics.k8s.io`), and admission webhooks (validates ScaledObject configs)
- `ScaledObject` maps a Deployment to an event source; `ScaledJob` creates Jobs per event — both are CRDs
- On EKS, KEDA uses IRSA for AWS scaler authentication — no long-lived credentials needed
- Scale-up is fast (one polling interval, default 30s); scale-down is slow (cooldown period, default 300s) — this prevents flapping
- Scale-to-zero is supported but requires explicit opt-in and is best suited for batch/job workloads

## Quick Overview

The `keda-operator` watches `ScaledObject` resources, creates backing HPAs, and polls external sources at a configurable interval. Metric values are served through `keda-operator-metrics-apiserver` via the Kubernetes external metrics API — the HPA consumes them transparently. Admission webhooks validate configurations and prevent duplicate ScaledObjects from targeting the same Deployment.

A typical AWS CloudWatch scaler queries ALB `RequestCountPerTarget` and scales a Deployment when the value exceeds a threshold. During load testing with `hey`, scale-up from 1 to 10 pods completes within ~3 minutes, and scale-down takes ~5 minutes of cooldown.

---

**Read the full guide:** [KEDA — Kubernetes Event-Driven Autoscaling →](https://docs.beyondyou.my.id/docs/01-knowledge-base/k8s/keda-event-driven-autoscaling) — includes complete YAML examples, CloudWatch Metrics Insights expressions, IRSA setup with Terraform, scaler reference table, production monitoring with Prometheus, and a failure mode runbook.
