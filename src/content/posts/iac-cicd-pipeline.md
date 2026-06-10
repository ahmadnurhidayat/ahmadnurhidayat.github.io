---
title: "IaC CI/CD: Terraform & Terragrunt Pipelines"
description: "Build automated CI/CD pipelines for infrastructure code — plan on PR, apply on merge, with Terragrunt for multi-environment DRY configurations."
date: 2025-06-25
tags: [terraform, terragrunt, cicd, infrastructure, automation, iac]
draft: false
canonicalUrl: "https://docs.beyondyou.my.id/docs/01-knowledge-base/iac/cicd"
---

Infrastructure as Code without CI/CD is just documentation. Automating Terraform through pipelines — plan on pull request, apply on merge — provides confidence that infrastructure changes are reviewed, tested, and consistently applied. Terragrunt adds DRY configuration management on top, reducing duplication across environments.

## Key Takeaways

- Pipeline stages: `fmt` → `validate` → `plan` (on PR) → `apply` (on merge to main)
- Terragrunt reduces environment duplication by generating backend and provider configurations from shared templates
- Plan output should be posted as a PR comment for review — infrastructure changes get the same rigor as code changes
- State is managed per environment and per component to limit blast radius
- OIDC authentication eliminates the need for static cloud credentials in CI/CD

## Quick Overview

A typical Terraform CI/CD pipeline in GitHub Actions runs `terraform fmt -check` and `terraform validate` on every push. On a pull request, it runs `terraform plan` and posts the output as a PR comment. When the PR merges, it runs `terraform apply -auto-approve` against the plan. For multi-environment setups, the pipeline targets different directories or Terragrunt configurations based on the branch or trigger.

Terragrunt simplifies this by using a `terragrunt.hcl` hierarchy. Root configurations define common settings (remote state backend, provider versions). Child configurations in environment directories inherit these automatically, keeping configurations DRY while maintaining separate state files per component and environment.

---

**Read the full guide:** [IaC CI/CD: Terraform & Terragrunt Pipelines →](https://docs.beyondyou.my.id/docs/01-knowledge-base/iac/cicd) — includes complete GitHub Actions workflow, Terragrunt directory structures, and plan/apply patterns.
