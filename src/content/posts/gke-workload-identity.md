---
title: "Migrating to GKE Workload Identity"
description: "Replace static service account keys with GKE Workload Identity — federate Kubernetes service accounts with Google Cloud IAM for secure, automated credential management."
date: 2025-04-28
tags: [gcp, gke, identity, security, workload-identity, iam]
draft: false
canonicalUrl: "https://docs.beyondyou.my.id/docs/01-knowledge-base/gcp/gke-workload-identity"
---

Static service account keys are a security liability — they never expire, they're easy to leak, and they're difficult to rotate. GKE Workload Identity eliminates keys entirely by federating Kubernetes service accounts with Google Cloud IAM, allowing pods to automatically obtain short-lived credentials. Migrating from the old node-based service account model is one of the highest-impact security improvements you can make on GKE.

## Key Takeaways

- Workload Identity maps a Kubernetes service account to a Google Cloud IAM service account using annotations
- Pods receive short-lived OAuth2 tokens — no static keys to manage, rotate, or leak
- The GKE metadata server proxies token requests, ensuring only matching pods can impersonate the IAM SA
- Migration path: create new IAM SA, annotate K8s SA, update workloads, remove node-level permissions
- Works with GCP client libraries and the Google Cloud CLI out of the box

## Quick Overview

Workload Identity uses a pool of IAM service accounts managed by GKE. When a pod annotated with `iam.gke.io/gcp-service-account` makes a GCP API call, the GKE metadata server intercepts the request, validates the pod's Kubernetes identity, and exchanges it for a short-lived IAM token scoped to the configured service account.

The migration from node-level permissions follows a clear path: (1) Enable Workload Identity on the cluster, (2) create a GCP IAM service account with only the needed permissions, (3) create a Kubernetes service account with the Workload Identity annotation, (4) update deployments to use the new K8s SA, (5) remove broad IAM permissions from the node service account.

---

**Read the full guide:** [Migrating to GKE Workload Identity →](https://docs.beyondyou.my.id/docs/01-knowledge-base/gcp/gke-workload-identity) — includes step-by-step migration, IAM policy examples, and troubleshooting common issues.
