---
title: "How Pod Disruption Budgets Work"
description: "Protect your Kubernetes workloads from voluntary disruptions — node drains, cluster upgrades, and spot instance preemptions — with properly configured PDBs."
date: 2025-09-20
tags: [kubernetes, pdb, reliability, scheduling, high-availability]
draft: false
canonicalUrl: "https://docs.beyondyou.my.id/docs/01-knowledge-base/k8s/pod-disruption-budgets"
---

Pod Disruption Budgets (PDBs) are one of the most underutilized reliability features in Kubernetes. They protect your applications from voluntary disruptions — planned node drains during upgrades, cluster autoscaler scale-down, and spot instance terminations. Without PDBs, all replicas of a Deployment can be evicted simultaneously, causing unnecessary downtime.

## Key Takeaways

- PDBs limit the number of pods that can be simultaneously unavailable during voluntary disruptions
- Two modes: `minAvailable` (minimum pods that must stay running) and `maxUnavailable` (maximum pods that can be down)
- PDBs are honored by the Eviction API — `kubectl drain` respects them; `kubectl delete pod` does not
- A common mistake: setting `minAvailable` equal to the replica count, which prevents ALL voluntary evictions including cluster upgrades
- PDBs are per-workload — each Deployment, StatefulSet, or application should have one

## Quick Overview

A PDB is a simple resource: specify a selector matching pods and either `minAvailable` or `maxUnavailable`. For a 3-replica Deployment, `minAvailable: 2` ensures at least 2 pods are always running during voluntary disruptions. The eviction API checks PDBs before evicting pods — if evicting a pod would violate the budget, the eviction is rejected.

This means cluster operations like node drains can take longer than expected if PDBs are too restrictive — `kubectl drain` will wait until the budget allows eviction. This is the correct behavior — it prevents disruption to your workload — but it's important to balance reliability with operational flexibility.

---

**Read the full guide:** [How Pod Disruption Budgets Work →](https://docs.beyondyou.my.id/docs/01-knowledge-base/k8s/pod-disruption-budgets) — includes PDB configuration examples, common mistakes, and integration with cluster autoscaler.
