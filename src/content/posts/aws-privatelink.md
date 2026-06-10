---
title: "How AWS PrivateLink Works"
description: "Deep dive into AWS PrivateLink architecture — how VPC endpoints route traffic privately without traversing the public internet, and when to use Interface vs Gateway endpoints."
date: 2025-08-01
tags: [aws, networking, privatelink, vpc-endpoints, security]
draft: false
canonicalUrl: "https://docs.beyondyou.my.id/docs/01-knowledge-base/aws/privatelink"
---

AWS PrivateLink is one of the most important yet often misunderstood networking features in AWS. It enables private connectivity between VPCs and AWS services without exposing traffic to the internet — critical for security-sensitive workloads and compliance requirements. Understanding when to use Interface Endpoints versus Gateway Endpoints is essential for any cloud architect.

## Key Takeaways

- PrivateLink provides private IP connectivity to AWS services and third-party SaaS through VPC Endpoints
- Interface Endpoints use AWS PrivateLink technology and create elastic network interfaces (ENIs) in your VPC subnets
- Gateway Endpoints are specific to S3 and DynamoDB — they use route table entries, not ENIs, and are free
- Traffic between your VPC and the endpoint never leaves the AWS network — no internet gateway, NAT, or VPN required
- Endpoint policies provide fine-grained IAM-based access control directly on the endpoint

## Quick Overview

An Interface Endpoint creates one or more ENIs in your chosen subnets. Each ENI gets a private IP address from the subnet's CIDR range. When your application resolves the AWS service DNS name (e.g., `ec2.amazonaws.com`), Route 53 Resolver returns the ENI private IP instead of the public IP. Traffic flows directly to the endpoint ENI, which is backed by AWS PrivateLink.

Gateway Endpoints work differently — they add a route to your VPC route table with a prefix list as the destination and the endpoint as the target. They're simpler, more scalable, and free, but limited to S3 and DynamoDB.

---

**Read the full guide:** [How AWS PrivateLink Works →](https://docs.beyondyou.my.id/docs/01-knowledge-base/aws/privatelink) — includes detailed traffic flow diagrams, endpoint policy examples, and cross-account access patterns.
