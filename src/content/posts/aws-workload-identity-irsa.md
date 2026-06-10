---
title: "Workload Identity & IRSA on EKS"
description: "Implement fine-grained IAM roles for Kubernetes pods using IAM Roles for Service Accounts (IRSA) on Amazon EKS — no more sharing instance profiles."
date: 2025-08-15
tags: [aws, eks, iam, security, irsa, kubernetes, workload-identity]
draft: false
canonicalUrl: "https://docs.beyondyou.my.id/docs/01-knowledge-base/aws/workload-identity-irsa"
---

Before IRSA, granting IAM permissions to Kubernetes pods meant attaching policies to the node's instance profile — every pod on that node got the same permissions. IRSA changed the game by enabling fine-grained, per-pod IAM roles using OIDC federation. This is the gold standard for workload identity on EKS.

## Key Takeaways

- IRSA uses an OIDC provider associated with the EKS cluster to federate Kubernetes service accounts with IAM roles
- Each pod can assume a unique IAM role — no more broad node-level permissions
- Trust policies use the service account name and namespace to scope access precisely
- The EKS Pod Identity Agent is a newer, simpler alternative to IRSA (no OIDC setup required)
- Both approaches follow AWS best practice: use temporary credentials, never long-term access keys

## Quick Overview

IRSA works by creating an OIDC identity provider in IAM that trusts the EKS cluster's OIDC issuer. When a pod annotated with a service account starts, the EKS control plane injects a projected service account token. The AWS SDK in the pod exchanges this Kubernetes token for temporary IAM credentials via `sts:AssumeRoleWithWebIdentity`.

The trust policy on the IAM role specifies conditions like `system:serviceaccount:<namespace>:<service-account-name>`, ensuring only matching pods can assume the role. This follows the principle of least privilege at the pod level.

---

**Read the full guide:** [Workload Identity & IRSA on EKS →](https://docs.beyondyou.my.id/docs/01-knowledge-base/aws/workload-identity-irsa) — includes step-by-step setup, trust policy examples, and migration from instance profiles to IRSA.
