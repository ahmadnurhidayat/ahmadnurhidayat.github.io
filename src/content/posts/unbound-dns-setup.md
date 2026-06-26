---
title: "Unbound DNS — Best Practice Setup"
description: "Modular Unbound DNS resolver configuration with forwarding zones, caching, access control, and management best practices."
date: 2026-06-26
tags: [dns, networking, unbound, system, infrastructure]
draft: false
canonicalUrl: "https://docs.beyondyou.my.id/docs/01-knowledge-base/system/unbound-dns-setup.md"
---

Unbound is a lightweight, high-performance DNS resolver that's ideal for internal infrastructure. This guide covers a modular setup with split forwarding zones, caching optimization, and access control for production environments.

Most DNS guides stop at "install and configure." This one goes further — covering split-horizon forwarding for private zones, aggressive caching for performance, and systemd hardening for security.

## Key Takeaways

- Split forwarding zones for internal (private) and external (public) DNS resolution
- Caching tuning with prefetch and aggressive NSEC for performance
- Access control lists to restrict recursive queries and prevent abuse

## What's Included

| Section | Description |
| :--- | :--- |
| **Modular Config** | Split config files for server, forward zones, and access control |
| **Forwarding Zones** | Route internal queries to private resolvers, external to public DNS |
| **Caching** | TTL-based caching, prefetch, aggressive NSEC, and cache size tuning |
| **Security** | ACLs, rate limiting, DNSSEC validation, and response rate limiting |
| **Systemd Hardening** | PrivateTmp, ProtectSystem, CapabilityBoundingSet for defense in depth |
| **Monitoring** | Prometheus metrics export and health check integration |

### Quick Reference

| Command | Purpose |
| :--- | :--- |
| `unbound-checkconf` | Validate config syntax |
| `unbound-control stats_noreset` | View resolver statistics |
| `dig @127.0.0.1 example.com` | Test resolution locally |

---

**Read the full guide:** [Unbound DNS — Best Practice Setup →](https://docs.beyondyou.my.id/docs/01-knowledge-base/system/unbound-dns-setup.md) — includes full Unbound config files, systemd hardening, and multi-environment forwarding strategy.
