---
title: "Pre-commit & Policy-as-Code for Infrastructure"
description: "Shift-left infrastructure validation with pre-commit hooks and policy-as-code — catch misconfigurations before they reach production."
date: 2025-07-05
tags: [terraform, iac, policy-as-code, validation, security, opa, tflint]
draft: false
canonicalUrl: "https://docs.beyondyou.my.id/docs/01-knowledge-base/iac/pre-commit-and-validation"
---

Catching infrastructure misconfigurations in production is expensive. Pre-commit hooks and policy-as-code tools catch errors before they leave your machine — validating formatting, security policies, and compliance rules at the earliest possible stage. This shift-left approach prevents security incidents and reduces the feedback loop from minutes to seconds.

## Key Takeaways

- **Pre-commit hooks** run `terraform fmt`, `tflint`, and `terraform validate` before code is committed
- **tflint** catches Terraform-specific issues: deprecated syntax, invalid instance types, missing required tags
- **Checkov / tfsec** scan for security misconfigurations: open security groups, unencrypted S3 buckets, over-privileged IAM
- **Open Policy Agent (OPA)** with Rego policies enforces custom organizational rules (naming conventions, required tags)
- **Infracost** estimates cost impact in the PR before resources are created

## Quick Overview

The validation pipeline layers defenses: **pre-commit** catches syntax and style issues locally; **CI checks** run security scanners and policy engines on every pull request; **pre-apply** validation in the pipeline confirms the plan against policies before deployment. Each layer catches different categories of error at the appropriate stage.

A practical setup uses `pre-commit` framework with hooks for: `terraform-fmt` (formatting), `tflint` (best practices), `checkov` (security), and `terraform-validate` (syntax). In CI, the same tools run again plus OPA for custom organizational policies. The result: infrastructure code gets the same rigorous review as application code.

---

**Read the full guide:** [Pre-commit & Policy-as-Code for Infrastructure →](https://docs.beyondyou.my.id/docs/01-knowledge-base/iac/pre-commit-and-validation) — includes pre-commit config examples, Rego policy templates, and CI integration.
