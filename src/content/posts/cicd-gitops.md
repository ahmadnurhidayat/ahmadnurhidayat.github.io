---
title: "GitOps — Git as the Source of Truth"
description: "Implement GitOps with Argo CD or Flux — use Git as the single source of truth for declarative infrastructure and application configuration."
date: 2025-06-12
tags: [gitops, cicd, argocd, flux, kubernetes, declarative]
draft: false
canonicalUrl: "https://docs.beyondyou.my.id/docs/01-knowledge-base/cicd/gitops"
---

GitOps extends the CI/CD pipeline with a powerful principle: Git is the single source of truth for both application code AND deployment configuration. Instead of running `kubectl apply` from a CI pipeline, a GitOps operator running inside the cluster continuously reconciles the desired state in Git with the actual state in the cluster. This provides auditability, drift detection, and simplified rollbacks.

## Key Takeaways

- GitOps operators (Argo CD, Flux) run inside Kubernetes and continuously reconcile Git state with cluster state
- The Git repository becomes the declarative API for your entire infrastructure
- Every change is version-controlled, auditable, and reversible — `git revert` becomes your rollback mechanism
- Pull-based deployment: the operator pulls from Git, rather than CI pushing to the cluster
- Drift detection: if someone manually changes a resource in the cluster, the operator reverts it to match Git

## Quick Overview

In a GitOps workflow, the CI pipeline builds the application (Docker image, Helm chart) and pushes it to a registry. It then updates the deployment manifest in a separate Git repository — typically updating an image tag in a Helm values file. A GitOps operator (Argo CD) monitors that repository, detects the change, and applies it to the cluster.

This separation of concerns — CI builds, GitOps deploys — is powerful. The CI pipeline never needs direct cluster access. The GitOps operator has cluster access but never runs arbitrary code. This drastically improves security posture and provides a clear audit trail of every deployment.

---

**Read the full guide:** [GitOps — Git as the Source of Truth →](https://docs.beyondyou.my.id/docs/01-knowledge-base/cicd/gitops) — includes Argo CD setup, multi-cluster patterns, and comparison with traditional push-based CI/CD.
