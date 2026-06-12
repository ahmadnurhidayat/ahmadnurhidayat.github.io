---
title: "Karpenter on EKS — Automatic Node Provisioning at Scale"
description: "Why Karpenter has replaced Cluster Autoscaler as the default node scheduler on EKS — group-less scaling, built-in consolidation, and how to configure NodePools and EC2NodeClass for production workloads."
date: 2026-06-11
tags: [kubernetes, aws, eks, karpenter, autoscaling, node-provisioning, spot-instances]
draft: false
canonicalUrl: "https://docs.beyondyou.my.id/docs/01-knowledge-base/aws/karpenter-eks"
---

Karpenter is an open-source, group-less node provisioning system for Kubernetes that has been the **default recommended node scheduler** for new EKS clusters since May 2026. It replaces Cluster Autoscaler by treating every pod as an individual scheduling decision against a broad menu of instance types — no more homogeneous node groups.

## Key Takeaways

- Karpenter is **group-less** — it mixes instance types freely within a single NodePool, bin-packing pods across the cheapest available instances
- **Built-in consolidation** continuously optimizes costs by deleting empty nodes or replacing underutilized nodes with cheaper instances
- Two CRDs: **NodePool** (`karpenter.sh/v1`) defines compute requirements and policies; **EC2NodeClass** (`karpenter.k8s.aws/v1`) defines AWS-specific configuration (subnets, SGs, AMI, IAM role)
- Supports **spot, on-demand, and reserved** capacity in the same pool — with automatic fallback when spot is unavailable
- **Disruption budgets** control deprovisioning speed — add schedule-based budgets to prevent disruption during business hours
- Migrating from Cluster Autoscaler is incremental — both can coexist during the transition window

## Quick Overview

Karpenter's architecture is simple compared to Cluster Autoscaler. Instead of multiple ASGs with fixed instance types, you define:

1. **NodePool** — what kind of compute you need (instance families, capacity type, taints, limits, max age)
2. **EC2NodeClass** — what AWS infrastructure to use (subnets, security groups, AMI, IAM role, disk size)

When a pod is unschedulable, Karpenter evaluates all NodePools, bin-packs the pod's resource requests against available instance types, picks the cheapest fit, and provisions it directly via EC2 API. No ASG, no launch template coordination, no node group management.

The Disruption Controller continuously evaluates the cluster — removing empty nodes, replacing expensive instances with cheaper ones, handling spot interruptions, and rolling nodes when configurations change.

---

**Read the full guide:** [Karpenter on EKS — Complete Reference →](https://docs.beyondyou.my.id/docs/01-knowledge-base/aws/karpenter-eks) — includes full YAML examples for NodePool, EC2NodeClass, disruption budgets, multi-NodePool patterns (spot+on-demand, GPU, environment isolation), production best practices for security/cost/reliability, and migration steps from Cluster Autoscaler.
