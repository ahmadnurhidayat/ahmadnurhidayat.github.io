---
title: "Kubernetes CSI — Container Storage Interface"
description: "How the Container Storage Interface (CSI) enables pluggable storage in Kubernetes — from PersistentVolume provisioning to volume snapshots and resizing."
date: 2025-09-01
tags: [kubernetes, storage, csi, persistent-volumes, ebs, efs]
draft: false
canonicalUrl: "https://docs.beyondyou.my.id/docs/01-knowledge-base/k8s/how-csi-works"
---

Before CSI, adding new storage backends to Kubernetes required modifying the core codebase (in-tree drivers). CSI decoupled storage from Kubernetes, enabling any storage vendor to provide a driver that works with any Kubernetes distribution. Understanding how CSI orchestrates volume provisioning, attachment, and mounting is essential for running stateful workloads.

## Key Takeaways

- CSI standardizes how external storage systems integrate with Kubernetes — no in-tree code needed
- The CSI driver consists of controller plugins (provisioning, snapshotting) and node plugins (mount, format)
- Communication happens over gRPC via Unix domain sockets between the kubelet and the CSI driver
- CSI supports dynamic provisioning, snapshots, cloning, volume expansion, and topology-aware scheduling
- Cloud providers (AWS EBS, GCP PD) and storage vendors (NetApp, Pure) all provide CSI drivers

## Quick Overview

When a pod requests a PersistentVolumeClaim, the CSI provisioner creates the volume on the backend storage system. The external-attacher then attaches it to the node. When the pod is scheduled to a specific node, the kubelet calls the CSI node plugin to stage (mount to a global path) and publish (mount to the pod-specific path) the volume.

The CSI specification has evolved significantly — CSI 1.0 provided basic provisioning; later versions added snapshots, volume cloning, ephemeral volumes, and volume health monitoring. The sidecar pattern (external-provisioner, external-attacher, external-snapshotter) handles the Kubernetes API interactions while the CSI driver focuses on storage operations.

---

**Read the full guide:** [Kubernetes CSI — Container Storage Interface →](https://docs.beyondyou.my.id/docs/01-knowledge-base/k8s/how-csi-works) — includes CSI architecture diagrams, driver deployment guides, and troubleshooting volume issues.
