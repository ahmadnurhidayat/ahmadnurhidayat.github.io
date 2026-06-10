---
title: "EC2 Instance Scheduler — Automating Start/Stop to Reduce Costs"
description: "Implement automated scheduling for EC2 and RDS instances to shut down non-production resources during off-hours and cut cloud costs."
date: 2025-07-02
tags: [aws, ec2, cost-optimization, finops, automation, lambda]
draft: false
canonicalUrl: "https://docs.beyondyou.my.id/docs/01-knowledge-base/aws/ec2-instance-scheduler"
---

One of the fastest ways to reduce AWS costs is simply turning off resources when they're not needed. Development, staging, and QA environments don't need to run 24/7. The AWS Instance Scheduler provides a fully automated, tag-driven solution that can save 50–70% on non-production compute costs.

## Key Takeaways

- The AWS Instance Scheduler uses Lambda and CloudWatch Events to start/stop EC2 and RDS instances on a defined schedule
- Resources are tagged with schedule names — no complex configuration per instance
- Supports custom schedules (e.g., 9am–6pm weekdays) with timezone awareness
- Can hibernate instances to preserve in-memory state during off-hours
- Works across multiple accounts and regions from a central deployment

## Quick Overview

The Instance Scheduler deploys as a CloudFormation stack containing a Lambda function, DynamoDB table for configuration storage, and CloudWatch Events rules for periodic triggering. You define schedules as JSON configuration — specifying time periods, days of the week, and timezone. Instances are tagged with a schedule name key, and the scheduler automatically applies the start/stop actions.

For enterprise deployments, the scheduler can be deployed once in a shared services account and manage resources across the entire AWS Organization.

---

**Read the full guide:** [EC2 Instance Scheduler →](https://docs.beyondyou.my.id/docs/01-knowledge-base/aws/ec2-instance-scheduler) — includes deployment steps, schedule configuration examples, and multi-account setup.
