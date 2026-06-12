---
title: "From Ingress to Gateway API in AWS EKS"
description: "Why the Kubernetes Gateway API is replacing traditional Ingress on EKS — separation of concerns between platform and application teams, cleaner multi-tenant routing, and production-ready patterns with the AWS Load Balancer Controller."
date: 2026-06-11
tags: [kubernetes, aws, eks, gateway-api, ingress, networking, platform-engineering]
draft: false
canonicalUrl: "https://docs.beyondyou.my.id/docs/01-knowledge-base/k8s/gateway-api-eks"
---

Traditional Kubernetes Ingress has been the standard way to expose applications for years — but as platforms scale and become multi-tenant, Ingress resources become overloaded with responsibilities. The Gateway API introduces a structured model that separates infrastructure concerns from application routing, and on EKS the AWS Load Balancer Controller provisions real ALBs directly from Gateway resources.

## Key Takeaways

- Traditional Ingress mixes infrastructure, routing, and policies in a single YAML object — platform and application concerns collide
- Gateway API splits this into **Gateway** (infrastructure, owned by platform teams) and **HTTPRoute** (routing, owned by application teams)
- The AWS Load Balancer Controller natively supports Gateway API, automatically provisioning ALBs, listeners, and target groups
- Multiple teams can share a single Gateway/ALB while independently managing their own routes in their own namespaces
- **Gateway API v1.5** (latest stable) adds ListenerSet — teams can now manage their own TLS listeners independently without touching the shared Gateway
- Gateway API doesn't fix bad networking design or application latency — it's a better API model, not a magic platform

## Quick Overview

A Gateway represents the network entry point — in EKS, this becomes a public or internal ALB managed by the platform team. HTTPRoutes define path-based routing rules that application teams own. The separation means:

- The platform team manages TLS certificates (via `LoadBalancerConfiguration` CRD), security policies, and the shared ALB
- Application teams define their own routes (`/payments`, `/orders`, etc.) independently in their own namespaces
- Each team's routes live in their own namespace with no cross-team interference
- The AWS Load Balancer Controller watches Gateway + HTTPRoute resources and reconciles them into actual ALBs, listeners, and target groups
- TLS is configured through the AWS LBC's custom `LoadBalancerConfiguration` CRD — not the standard Gateway API `certificateRefs`

This is the single biggest architectural improvement over traditional Ingress: clear ownership boundaries. **Note:** The AWS LBC implements a subset of Gateway API features — check the full guide for the compatibility matrix.

---

**Read the full guide:** [From Ingress to Gateway API in AWS EKS →](https://docs.beyondyou.my.id/docs/01-knowledge-base/k8s/gateway-api-eks) — includes complete YAML examples for Gateway, HTTPRoute, multi-team routing scenarios, four production patterns, and migration guidance.
