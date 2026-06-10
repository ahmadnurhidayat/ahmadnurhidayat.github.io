---
title: "Kubernetes Control Plane Internals"
description: "What happens when you run kubectl apply? A deep dive into the Kubernetes control plane — API server, etcd, scheduler, and controller manager internals."
date: 2025-09-15
tags: [kubernetes, control-plane, etcd, kube-apiserver, architecture, internals]
draft: false
canonicalUrl: "https://docs.beyondyou.my.id/docs/01-knowledge-base/k8s/kubernetes-under-the-hood"
---

Most Kubernetes users interact with the control plane through `kubectl` without understanding what happens behind the scenes. But when things go wrong — slow API responses, etcd failures, scheduling problems — understanding the control plane internals becomes essential. Each component has specific responsibilities, failure modes, and scaling characteristics.

## Key Takeaways

- **kube-apiserver** is the front door — all operations go through it; it's stateless and horizontally scalable
- **etcd** is the brain — stores all cluster state; requires careful disk, network, and quorum management
- **kube-scheduler** assigns pods to nodes based on resource requirements, affinity rules, and taints/tolerations
- **kube-controller-manager** runs reconciliation loops that continuously drive actual state toward desired state
- The watch mechanism enables efficient state synchronization — components watch etcd for changes rather than polling

## Quick Overview

When you run `kubectl apply -f deployment.yaml`, the request flows through authentication, authorization, and admission control at the API server. If accepted, the Deployment object is persisted to etcd. The Deployment controller detects the new object, creates a ReplicaSet, and that ReplicaSet's controller creates Pod objects. The scheduler notices unscheduled Pods and assigns them to nodes. Each node's kubelet detects assigned Pods and starts containers.

This entire chain is driven by watch events — each component watches etcd for resources it cares about and reacts. This event-driven, level-triggered architecture makes the control plane eventually consistent and self-healing.

---

**Read the full guide:** [Kubernetes Control Plane Internals →](https://docs.beyondyou.my.id/docs/01-knowledge-base/k8s/kubernetes-under-the-hood) — includes detailed component interaction diagrams, etcd management, and troubleshooting control plane issues.
