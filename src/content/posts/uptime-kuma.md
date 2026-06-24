---
title: "Uptime Kuma — Self-Hosted Monitoring & Status Pages"
description: "Deploy Uptime Kuma for uptime monitoring, SSL checks, and public status pages — self-hosted alternative to UptimeRobot and Pingdom."
date: 2025-07-01
tags: [monitoring, uptime-kuma, observability, self-hosted, status-page, docker, kubernetes]
draft: false
canonicalUrl: "https://docs.beyondyou.my.id/docs/01-knowledge-base/observability/uptime-kuma"
---

Uptime Kuma is a self-hosted monitoring tool that tracks uptime, response time, and SSL certificate expiry for your services. It's a zero-cost, data-sovereign alternative to commercial solutions like UptimeRobot, Pingdom, or StatusPage.io.

## Key Takeaways

- Self-hosted with full data ownership — no cloud dependency
- Supports HTTP, TCP, DNS, Docker, and push (heartbeat) monitors
- Built-in status pages with custom domains, incident management, and subscription
- 90+ notification providers (Telegram, Slack, email, webhooks, PagerDuty)
- Lightweight — single Docker container or Kubernetes Deployment with SQLite backend

## Quick Start (Docker)

```yaml
version: "3.8"
services:
  uptime-kuma:
    image: louislam/uptime-kuma:1
    restart: unless-stopped
    ports:
      - "3001:3001"
    volumes:
      - uptime-kuma-data:/app/data
```

Access the dashboard at `http://localhost:3001`, complete the setup wizard, and start adding monitors. For production, place behind an HTTPS reverse proxy and restrict dashboard access to internal networks.

## When to Use Uptime Kuma

| Scenario | Why |
| :--- | :--- |
| Homelab / small team | Zero cost, simple setup |
| Compliance requirements | Data stays on-premise |
| Multi-cloud monitoring | Monitors endpoints across any provider |
| Customer-facing status page | Built-in, branded status pages |

---

**Read the full guide:** [Uptime Kuma — Self-Hosted Monitoring →](https://docs.beyondyou.my.id/docs/01-knowledge-base/observability/uptime-kuma) — includes Docker Compose setup, Kubernetes deployment (Deployment + PVC + probes), monitor type reference, notification configuration, status page setup, and production best practices.
