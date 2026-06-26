---
title: "Grafana Alloy Migration — Replace Promtail with Alloy"
description: "Step-by-step migration from Promtail to Grafana Alloy for log collection and trace ingestion in Kubernetes."
date: 2026-06-26
tags: [observability, grafana, alloy, promtail, loki, kubernetes]
draft: false
canonicalUrl: "https://docs.beyondyou.my.id/docs/01-knowledge-base/observability/grafana-alloy-migration-promtail.md"
---

Grafana Alloy is the unified telemetry collector that replaces Promtail, Tempo, and Mimir agents. This guide covers a practical migration path from Promtail to Alloy in Kubernetes, including config conversion and validation.

The migration is straightforward but has pitfalls — Promtail pipeline stages don't always map 1:1 to Alloy components, and log labeling differences can cause silent data loss. This guide covers the common traps.

## Key Takeaways

- Alloy is a single binary replacing Promtail, Tempo Agent, and Mimir Agent
- Promtail pipeline stages map directly to Alloy's `loki.process` component
- Rollback is simple — keep Promtail DaemonSet disabled but ready during validation

## What's Covered

| Section | Description |
| :--- | :--- |
| **Config Migration** | Convert Promtail YAML pipelines to Alloy River config syntax |
| **Deployment** | Replace Promtail DaemonSet with Alloy DaemonSet in Kubernetes |
| **Pipeline Mapping** | Stage-by-stage conversion: labels, regex, drops, and transformations |
| **Validation** | Verify log labels, pipeline behavior, and Loki ingestion correctness |
| **Observability** | Monitor Alloy itself via Prometheus metrics and self-scraping |
| **Rollback** | Step-by-step procedure to revert to Promtail if issues arise |

### Migration Phases

| Phase | Action |
| :--- | :--- |
| 1 | Deploy Alloy alongside Promtail (dual-write) |
| 2 | Validate log labels and pipeline output in Loki |
| 3 | Switch traffic to Alloy and disable Promtail |
| 4 | Remove Promtail DaemonSet after validation period |

---

**Read the full guide:** [Grafana Alloy Migration — Replace Promtail with Alloy →](https://docs.beyondyou.my.id/docs/01-knowledge-base/observability/grafana-alloy-migration-promtail.md) — includes Promtail-to-Alloy config mapping, Helm values, and production rollout strategy.
