---
title: "Implementing Grafana Alloy and Migration to New Version using Helm"
description: "A unified telemetry collector designed to streamline observability by consolidating multiple data collection tools into a single solution."
year: "2025"
tags: ["Kubernetes", "Grafana", "Helm", "Observability"]
image: "/images/projects/grafana-alloy.svg"
pinned: true
---

## Introduction

![Grafana Alloy](/images/projects/grafana-alloy.svg)

Grafana Alloy is a unified telemetry collector designed to streamline observability by consolidating multiple data collection tools into a single solution. It supports a wide range of telemetry signals, including logs, metrics, traces, and profiling, with native pipelines for Prometheus, OpenTelemetry, Loki, and Pyroscope.

By simplifying telemetry collection and processing, Grafana Alloy reduces complexity, enhances reliability, and scales efficiently for both application and infrastructure observability. It also offers enterprise-grade features, such as fleet management and workload balancing, making it ideal for large-scale deployments.

Grafana Alloy is an observability solution for Kubernetes that combines metrics, logs, and events into a single platform. This article explains how to implement Grafana Alloy version 1 in a Kubernetes cluster and migrate to the latest version.

## Prerequisites

*   A running Kubernetes cluster.
*   Helm installed.
*   Prometheus and Loki configured as observability data destinations.

## Installing Grafana Alloy v1

### 1. Add the Grafana Helm Repository

```bash
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
```

### 2. Create the Configuration File (values.yaml)

```yaml
cluster:
  name: <cluster-name>
  namespace: <namespace>

externalServices:
  prometheus:
    host: <prometheus-hostname>:<port>
  loki:
    host: <loki-hostname>:<port>
  
metrics:
  enabled: true
  cost:
    enabled: false
  node-exporter:
    enabled: true

logs:
  enabled: true
  pod_logs:
    enabled: true
  cluster_events:
    enabled: true
  node_events:
    enabled: true

traces:
  enabled: false

opencost:
  enabled: false

kube-state-metrics:
  enabled: true

prometheus-node-exporter:
  enabled: true

prometheus-operator-crds:
  enabled: true

grafana-agent: {}
grafana-agent-logs: {}
```

*Note: Use `<port>` if not applicable domain name on endpoint for prometheus server.*

### 3. Install Alloy v1

```bash
helm install grafana-k8s-monitoring grafana/k8s-monitoring --atomic --debug --values --version ^1 values.yaml -n <namespace>
```

## Migrating to the Latest Version of Grafana Alloy

### 1. Check Changes in the Latest Version

Before migrating, check the changelog and official documentation to understand feature and configuration changes.

### 2. Update the Helm Repository

```bash
helm repo update
```

### 3. Update the Configuration (values.yaml)

Latest configuration with additional features and optimizations:

```yaml
cluster:
  name: <cluster-name>

destinations:
  - name: Prometheus
    type: prometheus
    url: http://<hostname>:<port>/api/v1/write
  - name: Loki
    type: loki
    url: http://<hostname>:<port>/loki/api/v1/push

clusterMetrics:
  enabled: true

clusterEvents:
  enabled: true
  collector: alloy-logs
  namespaces:
    - <namespace>

nodeLogs:
  enabled: true

podLogs:
  enabled: true

alloy-singleton:
  enabled: true

alloy-metrics:
  enabled: true

alloy-logs:
  enabled: true

alloy-profiles:
  enabled: false

alloy-receiver:
  enabled: false
```

### 4. Upgrade to the Latest Version

```bash
helm upgrade grafana-k8s-monitoring grafana/k8s-monitoring --atomic --debug --values values.yaml -n <namespace>
```

*   `--atomic`: if set, the installation process deletes the installation on failure. The `--wait` flag will be set automatically if `--atomic` is used.
*   `--values`: specifies values in a YAML file or a URL (can specify multiple).
*   `--debug`: enable verbose output.

### 5. Verify Deployment

Logs after deployment:

```text
NAME: grafana-k8s-monitoring
LAST DEPLOYED: Tue Mar 18 12:07:21 2025
NAMESPACE: monitoring
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
Grafana k8s-monitoring Helm chart deployed!

This chart will install the following components:
* kube-state-metrics (Deployment)
* Node Exporter (DaemonSet)
* Windows Exporter (DaemonSet)
* Grafana Alloy "alloy-metrics" (statefulset, 1 replica)
* Grafana Alloy "alloy-singleton" (deployment, 1 replica)
* Grafana Alloy "alloy-logs" (daemonset)

It will:
* Scrape Kubernetes Cluster metrics and send data to Prometheus.
* Gather Kubernetes Cluster events and send data to Loki.
* Gather logs from Kubernetes Nodes and send data to Loki.
* Gather logs from Kubernetes Pods and send data to Loki.
```

Check if all pods are running correctly:

```bash
kubectl get pods -n monitoring
```

Check Alloy logs to ensure no errors:

```bash
kubectl logs -n monitoring -l app.kubernetes.io/name=alloy
```

## Conclusion

Implementing Grafana Alloy v1 enables better observability in a Kubernetes cluster. Migrating to the latest version ensures improved performance and compatibility with Grafana Alloy’s newest features.
