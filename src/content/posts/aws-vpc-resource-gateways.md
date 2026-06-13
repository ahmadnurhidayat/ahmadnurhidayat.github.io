---
title: "VPC Resource Gateways — Implementation Patterns & Use Cases"
description: "Deep dive into VPC Resource Gateways: private RDS access across accounts, overlapping CIDR connectivity, centralized interface endpoints without Transit Gateway, and proxying to public SaaS domains."
date: 2026-06-13
tags: [aws, vpc, networking, privatelink, rds, transit-gateway, resource-gateway]
draft: false
canonicalUrl: "https://docs.beyondyou.my.id/docs/01-knowledge-base/aws/vpc-resource-gateways"
---

VPC Resource Gateways let you expose resources in one VPC to consumers in another without VPC peering, Transit Gateway, or Network Load Balancers. They support ARN-based (RDS), DNS-based (interface endpoints, public FQDNs), and IP-based resource types — addressing four common networking challenges that previously required complex workarounds.

## Key Takeaways

- Resource gateways remove the NLB requirement from the PrivateLink model — no load balancer infrastructure is needed to expose resources
- Four primary use cases: private RDS access, overlapping CIDR connectivity, centralized interface endpoints without TGW, and proxied egress to SaaS public endpoints
- ARN-type configurations auto-manage child resources (RDS reader instances are handled automatically)
- For cross-account access, resource configurations are shared via AWS RAM — the consumer creates a Resource VPC Endpoint
- Resource gateways are cheaper than TGW for endpoint centralization: ~$7/month per resource endpoint vs ~$36/month per TGW attachment

## Quick Overview

The resource gateway lives in the producer VPC and accepts traffic from resource endpoints in consumer VPCs. A resource configuration (ARN, DNS, or IP type) defines what resource is exposed. With Private DNS enabled, applications use the native resource DNS name (e.g., the RDS cluster endpoint) and traffic is transparently routed through the gateway — no code changes, no NAT, no TGW.

For overlapping CIDRs, this is the only native AWS service that works without NAT appliances. For centralized interface endpoints, it replaces the TGW attachment with a lightweight endpoint, reducing costs by ~80%.

---

**Read the full guide:** [VPC Resource Gateways →](https://docs.beyondyou.my.id/docs/01-knowledge-base/aws/vpc-resource-gateways) — includes complete Terraform modules, DNS/PHZ patterns, security group design, SCP guardrails, and a full comparison matrix against TGW, VPC peering, PrivateLink endpoint services, and VPC Lattice.
