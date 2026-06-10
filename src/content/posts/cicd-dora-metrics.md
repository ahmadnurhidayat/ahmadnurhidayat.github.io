---
title: "DORA Metrics — Measuring Software Delivery Performance"
description: "Use the four DORA metrics — Deployment Frequency, Lead Time, MTTR, and Change Failure Rate — to measure and improve your software delivery performance."
date: 2025-05-28
tags: [cicd, dora, metrics, devops, performance, engineering-excellence]
draft: false
canonicalUrl: "https://docs.beyondyou.my.id/docs/01-knowledge-base/cicd/dora-matrix"
---

How do you measure whether your engineering organization is actually getting better at delivering software? The DORA (DevOps Research and Assessment) metrics provide a research-backed framework. These four key metrics have been validated across thousands of organizations as predictors of software delivery and operational performance.

## Key Takeaways

- **Deployment Frequency**: How often you deploy to production — elite performers deploy multiple times per day
- **Lead Time for Changes**: Time from code committed to code running in production — elite: under 1 hour
- **Mean Time to Recovery (MTTR)**: Time to restore service after an incident — elite: under 1 hour
- **Change Failure Rate**: Percentage of deployments causing failure — elite: 0–15%
- These metrics correlate with organizational performance: better delivery → better business outcomes

## Quick Overview

The DORA metrics form a balanced scorecard. Deployment Frequency and Lead Time measure **speed** (throughput). MTTR and Change Failure Rate measure **stability**. The key insight from the research is that speed and stability are not trade-offs — elite performers excel at both simultaneously. Fast deployments are enabled by good practices (automated testing, small batch sizes, trunk-based development) that also reduce failure rates.

Implementing DORA metrics requires instrumenting your delivery pipeline: track commit timestamps, deployment timestamps, and incident data. Most CI/CD platforms (GitHub, GitLab, CircleCI) can export this data, and tools like LinearB, Faros, and CodeClimate specialize in DORA visualization.

---

**Read the full guide:** [DORA Metrics — Measuring Software Delivery Performance →](https://docs.beyondyou.my.id/docs/01-knowledge-base/cicd/dora-matrix) — includes measurement strategies, dashboard examples, and how to use DORA metrics for continuous improvement.
