---
title: "Pod Disruption Budgets in GKE with Spot VMs"
description: "Best practices for configuring Pod Disruption Budgets on GKE when using Spot VMs to balance cost savings with workload reliability."
date: 2025-04-22
tags: [gcp, gke, kubernetes, spot-vms, pdb, reliability, cost-optimization]
draft: false
canonicalUrl: "https://docs.beyondyou.my.id/docs/01-knowledge-base/gcp/gke-pdb-spot-vms"
---

Spot VMs on GKE can slash compute costs by 60-91%, but they come with a catch: Google can preempt them at any time with just 30 seconds notice. Pod Disruption Budgets (PDBs) are your primary tool for ensuring that involuntary disruptions don't take down your entire workload. Used correctly, they enable workloads to survive Spot VM preemptions gracefully.

## Key Takeaways

- Spot VMs can be preempted at any time — always configure PDBs for critical workloads on spot node pools
- PDBs set the minimum number of available pods during voluntary disruptions — use `minAvailable` or `maxUnavailable`
- Combine PDBs with pod anti-affinity to spread pods across different spot VMs and zones
- GKE's node termination handler gracefully drains nodes before preemption
- Use `kubectl describe pdb` to verify your PDB status and pod disruption allowance

## Quick Overview

A PDB specifies how many pods of a Deployment must remain available during voluntary disruptions (like node drains). For example, `minAvailable: 2` on a 3-replica Deployment ensures at least 2 pods are always running. During a node preemption, GKE drains the node — the PDB ensures not all pods are evicted simultaneously.

For Spot VM workloads, combine PDBs with topology spread constraints and pod anti-affinity rules to distribute pods across multiple nodes and zones. This way, when one spot VM is preempted, only a fraction of your pods are affected, and the remaining pods maintain service availability while replacements are scheduled.

---

**Read the full guide:** [Pod Disruption Budgets in GKE with Spot VMs →](https://docs.beyondyou.my.id/docs/01-knowledge-base/gcp/gke-pdb-spot-vms) — includes PDB configuration examples, node termination handling, and cost optimization strategies.
