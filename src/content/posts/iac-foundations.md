---
title: "IaC Paradigms, Patterns & Decisions"
description: "Understanding the foundations of Infrastructure as Code — declarative vs imperative, mutable vs immutable, and when to use Terraform, Pulumi, or CloudFormation."
date: 2025-06-10
tags: [terraform, iac, infrastructure, patterns, pulumi, cloudformation]
draft: false
canonicalUrl: "https://docs.beyondyou.my.id/docs/01-knowledge-base/iac/foundations"
---

Infrastructure as Code is a de facto requirement for modern cloud operations, but choosing the right approach isn't straightforward. Declarative or imperative? Terraform or Pulumi? Mutable or immutable infrastructure? The answers depend on your team's skills, your infrastructure complexity, and your operational requirements.

## Key Takeaways

- **Declarative IaC** (Terraform, CloudFormation): You declare desired state; the tool figures out how to achieve it
- **Imperative IaC** (Pulumi with code, Ansible to some degree): You write the sequence of steps to reach desired state
- **Mutable infrastructure**: Resources are updated in place — faster but can drift
- **Immutable infrastructure**: Resources are replaced rather than modified — prevents drift but slower to deploy
- State management is the hardest problem in IaC — it tracks the mapping between code and real-world resources

## Quick Overview

The three dominant IaC paradigms are: (1) **DSL-based declarative** (Terraform/HCL, CloudFormation/YAML) — purpose-built languages optimized for infrastructure; (2) **General-purpose language** (Pulumi with TypeScript/Python, CDK) — leverage existing programming skills; (3) **Configuration management** (Ansible, Chef) — procedural approach better suited for VM configuration than cloud resource provisioning.

Most organizations standardize on Terraform for cloud resource provisioning due to its provider ecosystem, strong community, and platform-agnostic approach. Pulumi is gaining traction with teams that prefer writing infrastructure in TypeScript or Python.

---

**Read the full guide:** [IaC Paradigms, Patterns & Decisions →](https://docs.beyondyou.my.id/docs/01-knowledge-base/iac/foundations) — includes paradigm comparisons, decision frameworks, and migration strategies between IaC tools.
