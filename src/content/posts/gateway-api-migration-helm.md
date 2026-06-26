---
title: "Gateway API Migration — Helm Chart for Ingress to Gateway API"
description: "Automate Ingress to Gateway API migration with a Helm chart that creates HTTPRoutes and HealthCheckPolicies for multiple apps."
date: 2026-06-26
tags: [kubernetes, gateway-api, helm, networking, gke, migration]
draft: false
canonicalUrl: "https://docs.beyondyou.my.id/docs/01-knowledge-base/kubernetes/gateway-api-migration-helm.md"
---

Migrating dozens of Ingress resources to Gateway API manually is error-prone. This guide presents a Helm chart that automates the migration — generating HTTPRoutes, HealthCheckPolicies, and GCPBackendPolicies for multiple applications from a single values file.

Without automation, teams forget HealthCheckPolicies, misconfigure section names, and leave stale Ingress resources behind. This chart enforces consistency and prevents common migration pitfalls.

## Key Takeaways

- Templated Helm chart generates Gateway API resources for N applications from one values file
- HealthCheckPolicy and GCPBackendPolicy included by default — no forgotten security policies
- Blue-green migration strategy with Ingress and Gateway API running in parallel

## What's Covered

| Section | Description |
| :--- | :--- |
| **Helm Chart** | Chart structure with templates for HTTPRoute, HealthCheckPolicy, GCPBackendPolicy |
| **Values Config** | Multi-app configuration with per-service hostnames, ports, and health checks |
| **Migration Strategy** | Parallel Ingress + Gateway API with DNS-based traffic shifting |
| **Validation** | Automated checks for route acceptance and health check status |
| **Rollback** | Quick revert procedure if issues are discovered post-migration |
| **Cleanup** | Post-migration Ingress resource removal and annotation cleanup |

### Values File Example

```yaml
apps:
  - name: api-gateway
    hostname: api.example.id
    port: 8080
    healthPath: /actuator/health
  - name: web-frontend
    hostname: www.example.id
    port: 3000
    healthPath: /healthz
```

---

**Read the full guide:** [Gateway API Migration — Helm Chart for Ingress to Gateway API →](https://docs.beyondyou.my.id/docs/01-knowledge-base/kubernetes/gateway-api-migration-helm.md) — includes full Helm chart source code, migration playbook, and rollback procedures.
