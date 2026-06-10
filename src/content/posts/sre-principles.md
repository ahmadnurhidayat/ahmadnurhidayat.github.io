---
title: "SRE — What and Why"
description: "Site Reliability Engineering fundamentals: SLIs, SLOs, error budgets, toil reduction, and how SRE bridges the gap between development and operations."
date: 2025-10-08
tags: [sre, reliability, principles, devops, slo, error-budget]
draft: false
canonicalUrl: "https://docs.beyondyou.my.id/docs/01-knowledge-base/sre/principles"
---

Site Reliability Engineering (SRE) is what happens when you treat operations as a software engineering problem. Born at Google, SRE provides a concrete framework for measuring, managing, and improving service reliability through Service Level Objectives (SLOs), error budgets, and a relentless focus on automating away toil.

## Key Takeaways

- **SLI (Service Level Indicator)**: A quantitative measure of service behavior — latency, error rate, availability, throughput
- **SLO (Service Level Objective)**: The target value for an SLI over a time window — e.g., "99.9% availability over 30 days"
- **Error Budget**: The allowed amount of unreliability — 0.1% for a 99.9% SLO. When the budget is exhausted, feature development freezes until reliability is restored
- **Toil**: Manual, repetitive, automatable operational work — SREs cap toil at 50% of their time
- SRE is not ops renamed — it's a fundamentally different approach based on measurement, automation, and shared ownership

## Quick Overview

SRE operationalizes reliability through the error budget mechanism. If your SLO is 99.9% availability (43 minutes of downtime per month), your error budget is 0.1%. As long as you're within budget, you can ship features. If you exceed the budget, you prioritize reliability work. This creates a healthy tension between development velocity and operational stability — both sides are incentivized to balance.

Toil reduction is the other key pillar. SRE teams automate repetitive tasks (deployments, incident response, capacity planning) and invest engineering time in building self-service platforms so that development teams can own their services without operations bottlenecks.

---

**Read the full guide:** [SRE — What and Why →](https://docs.beyondyou.my.id/docs/01-knowledge-base/sre/principles) — includes SLI/SLO design frameworks, error budget policies, and toil measurement techniques.
