---
title: "SRE — Humans and Organizations"
description: "How to structure SRE teams, build an SRE culture, and navigate the organizational challenges of implementing reliability engineering practices."
date: 2025-10-15
tags: [sre, culture, organization, team-structure, devops, reliability]
draft: false
canonicalUrl: "https://docs.beyondyou.my.id/docs/01-knowledge-base/sre/culture-and-structure"
---

Technology is the easy part of SRE. The hard part is people and organizations — how do you structure teams, build psychological safety for incident response, and navigate the tension between feature velocity and reliability? SRE is fundamentally a cultural practice, and without organizational buy-in, even the best tooling won't make your services reliable.

## Key Takeaways

- SRE teams can be structured as: embedded (SREs embedded in dev teams), consulting (central SRE team that consults), or platform (SRE builds self-service platform)
- **Blameless postmortems**: Focus on system improvements, not individual blame — this requires psychological safety
- SRE teams should have a clear charter: what services they support, what their SLOs are, and how handoffs work
- On-call should be sustainable: compensated, limited in frequency, and with adequate tooling and runbooks
- SRE is not a silo — it requires deep collaboration between development, operations, and product teams

## Quick Overview

Google's SRE book describes three team models: **Kitchen Sink** (one SRE team handles everything — doesn't scale), **Infrastructure** (SRE focuses on platform reliability), and **Product/Embedded** (SREs embedded within product teams). Most organizations evolve through these models as they scale — starting with a small central SRE team that gradually embeds into product teams.

The cultural foundations — blameless postmortems, psychological safety, on-call sustainability, and shared ownership — are harder to establish than any technical practice. SRE leaders must model these behaviors and protect their teams from burnout and blame cultures.

---

**Read the full guide:** [SRE — Humans and Organizations →](https://docs.beyondyou.my.id/docs/01-knowledge-base/sre/culture-and-structure) — includes team topology patterns, incident response frameworks, and organizational maturity models.
