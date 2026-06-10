---
title: "Build Once, Deploy Many"
description: "The fundamental CI/CD principle of immutable artifacts — build your application once, then promote the exact same artifact through all environments."
date: 2025-05-22
tags: [cicd, devops, artifact-management, automation, docker, reliability]
draft: false
canonicalUrl: "https://docs.beyondyou.my.id/docs/01-knowledge-base/cicd/build-once-deploy-many"
---

"Build once, deploy many" is one of the most important principles in CI/CD, yet it's frequently violated. Rebuilding artifacts between environments introduces risk — a different dependency version, a subtle platform difference, or a slightly different build flag can cause production failures that never appeared in staging. An immutable artifact pipeline eliminates this entire class of bugs.

## Key Takeaways

- Build the artifact once (Docker image, JAR, binary) and never rebuild it
- Promote the same artifact through environments by changing only configuration (env vars, secrets, config files)
- Use a container registry (ECR, Artifact Registry) or artifact repository (JFrog, Nexus) as the single source of truth
- Version artifacts with commit SHAs or semantic versions — never use `latest` in production
- Configuration and secrets are injected at runtime, not baked into the artifact

## Quick Overview

The pattern is straightforward: the CI pipeline builds the artifact, tags it with a unique version (e.g., `git-sha-abc123`), pushes it to a registry, and that exact artifact reference flows through all environments. Deployment configurations — environment variables, feature flags, database connection strings — are injected by the deployment platform (Kubernetes ConfigMaps, AWS Parameter Store, HashiCorp Vault).

This approach ensures that what you tested in staging is bit-for-bit identical to what runs in production. If you discover a bug in production, you can reproduce it locally with the exact same artifact and configuration.

---

**Read the full guide:** [Build Once, Deploy Many →](https://docs.beyondyou.my.id/docs/01-knowledge-base/cicd/build-once-deploy-many) — includes artifact promotion workflows, multi-environment pipeline examples, and anti-patterns.
