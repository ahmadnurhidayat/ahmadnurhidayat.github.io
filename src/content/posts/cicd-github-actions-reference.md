---
title: "GitHub Actions — CI/CD Pipeline Reference"
description: "A comprehensive reference for building production-grade CI/CD pipelines with GitHub Actions — OIDC authentication, matrix builds, caching, and reusable workflows."
date: 2025-06-05
tags: [cicd, github-actions, automation, pipeline, oidc, docker]
draft: false
canonicalUrl: "https://docs.beyondyou.my.id/docs/01-knowledge-base/cicd/github-actions-reference"
---

GitHub Actions has become the default CI/CD platform for millions of developers, but most pipelines barely scratch the surface of its capabilities. Production-grade pipelines need OIDC-based authentication (no long-lived secrets), efficient caching, matrix builds, and reusable workflows to scale across repositories.

## Key Takeaways

- **OIDC authentication**: Authenticate to AWS, GCP, or Azure using OpenID Connect — no need to store cloud credentials as GitHub secrets
- **Matrix builds**: Test across multiple OS, runtime, and dependency versions in parallel
- **Dependency caching**: Cache npm, pip, Maven, or Docker layers to dramatically speed up builds
- **Reusable workflows**: Define pipeline patterns once and call them across repositories — DRY at the CI/CD level
- **Environments & approvals**: Use GitHub Environments for protected deployment gates with required reviewers

## Quick Overview

A production GitHub Actions pipeline typically uses a multi-job workflow: lint → test → build → deploy. Each job runs in a clean runner with explicit permissions. The build job produces artifacts (Docker images, packages) that the deploy job consumes. OIDC eliminates the need for static cloud credentials — the GitHub OIDC provider issues short-lived tokens that your cloud provider trusts.

For multi-repository organizations, reusable workflows are transformative. Define a `deploy-to-eks.yml` workflow once in a central `.github` repository, and every service repository calls it with parameters. Changes to the deployment process are made in one place and picked up by all services.

---

**Read the full guide:** [GitHub Actions — CI/CD Pipeline Reference →](https://docs.beyondyou.my.id/docs/01-knowledge-base/cicd/github-actions-reference) — includes complete workflow examples, OIDC setup for AWS & GCP, and Docker layer caching strategies.
