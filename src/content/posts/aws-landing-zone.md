---
title: "AWS Landing Zones — Control Tower, AFT & Enterprise Patterns"
description: "Design and deploy a multi-account AWS Landing Zone using Control Tower and AFT to enforce governance, security, and networking at scale."
date: 2025-07-22
tags: [aws, landing-zone, control-tower, governance, multi-account, aft]
draft: false
canonicalUrl: "https://docs.beyondyou.my.id/docs/01-knowledge-base/aws/landing-zone"
---

A well-architected landing zone is the foundation of any enterprise AWS deployment. It provides the multi-account structure, networking baseline, security guardrails, and identity foundation that all subsequent workloads depend on. AWS Control Tower automates much of this setup, while Account Factory for Terraform (AFT) extends it with infrastructure-as-code.

## Key Takeaways

- AWS Control Tower orchestrates multiple services (Organizations, SSO, Config, CloudTrail) into a governed multi-account environment
- The core accounts created are: Management, Log Archive, and Audit — these form the security foundation
- Guardrails are either preventive (SCPs) or detective (Config Rules) and can be mandatory or optional
- Account Factory for Terraform (AFT) enables provisioning custom accounts with Terraform-managed baselines
- Customizations for Control Tower (CfCT) applies CloudFormation templates to accounts on creation or update

## Quick Overview

The landing zone design follows the AWS recommended multi-account strategy. The **Management account** is the root of the organization, managing billing and organization-wide policies. The **Log Archive account** centralizes CloudTrail and Config logs. The **Audit account** provides a restricted view for security and compliance teams. On top of this, OUs (Organizational Units) segment workloads — typically SDLC environments, security boundaries, or business units.

Control Tower sets up the core accounts, enables mandatory guardrails, and provides the Account Factory for creating new member accounts. AFT extends this with Terraform, allowing you to define account baselines as code — including VPCs, IAM roles, and security tooling.

---

**Read the full guide:** [AWS Landing Zones — Control Tower, AFT & Enterprise Patterns →](https://docs.beyondyou.my.id/docs/01-knowledge-base/aws/landing-zone) — includes architecture diagrams, guardrail configurations, and AFT pipeline setup.
