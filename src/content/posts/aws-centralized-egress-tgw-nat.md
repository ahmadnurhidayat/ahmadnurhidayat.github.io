---
title: "Centralized Egress — Transit Gateway & NAT Gateway"
description: "Designing a scalable centralized egress architecture on AWS using Transit Gateway and NAT Gateway for outbound traffic from multiple VPCs."
date: 2025-06-15
tags: [aws, networking, vpc, architecture, transit-gateway, nat]
draft: false
canonicalUrl: "https://docs.beyondyou.my.id/docs/01-knowledge-base/aws/centralized-egress-tgw-nat"
---

Managing outbound internet access across dozens or hundreds of VPCs is one of the most common networking challenges in enterprise AWS environments. The naive approach — one NAT Gateway per VPC — quickly becomes expensive and operationally complex. Centralized egress solves this by routing all outbound traffic through a dedicated egress VPC.

## Key Takeaways

- Centralized egress reduces cost by consolidating NAT Gateways into a single egress VPC
- Transit Gateway provides the routing backbone, connecting spoke VPCs to the egress VPC
- Route tables in spoke VPCs direct 0.0.0.0/0 traffic to the Transit Gateway, which forwards to the egress VPC
- NAT Gateway in the egress VPC handles all internet-bound traffic for the entire organization
- Multi-AZ NAT Gateway deployment ensures high availability for outbound connectivity

## Quick Overview

The centralized egress pattern uses a hub-and-spoke model. One or more egress VPCs (the hub) host NAT Gateways across multiple Availability Zones. Spoke VPCs route all internet-bound traffic (0.0.0.0/0) through Transit Gateway attachments to the egress VPC. The egress VPC's route table then sends traffic to the NAT Gateway, which performs source NAT before forwarding packets to the internet.

For inspection requirements, you can insert AWS Network Firewall or Gateway Load Balancer with third-party appliances between the Transit Gateway and NAT Gateway. This enables centralized security inspection without modifying spoke VPC configurations.

---

**Read the full guide:** [Centralized Egress — Transit Gateway & NAT Gateway →](https://docs.beyondyou.my.id/docs/01-knowledge-base/aws/centralized-egress-tgw-nat) — includes detailed architecture diagrams, route table configurations, and production deployment patterns.
