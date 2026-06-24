---
title: "Split-Horizon DNS Forwarding (BIND9, dnsmasq, Unbound)"
description: "Configure split-horizon DNS to resolve internal and external hostnames differently — essential for hybrid cloud and multi-network environments."
date: 2025-07-01
tags: [dns, networking, bind9, dnsmasq, unbound, system, split-horizon]
draft: false
canonicalUrl: "https://docs.beyondyou.my.id/docs/01-knowledge-base/system/split-horizon-dns-forwarding"
---

Split-horizon DNS (also called split-view or split-brain DNS) serves different DNS records depending on where the query comes from. Internal clients get private IPs; external clients get public IPs. This is fundamental for hybrid cloud architectures, VPN setups, and any environment where the same hostname needs to resolve differently inside and outside the network.

## Key Takeaways

- Split-horizon DNS provides different DNS answers based on the client's source network or domain pattern
- **Forward-only mode** eliminates zone file management — the server only proxies to upstream resolvers
- BIND9 uses `view` clauses or zone-level `type forward` for conditional routing
- dnsmasq uses `server=/domain/ip` directives for lightweight conditional forwarding
- Unbound uses `forward-zone` blocks with access control for hardened environments

## Forward-Only Architecture

Instead of hosting authoritative zone files, a forward-only split-horizon server acts as an intelligent edge router:

1. Client queries `internal.example.com`
2. Forwarder matches the domain pattern
3. Query is proxied to the private DNS resolver (`10.0.0.1`)
4. Response is cached and returned to the client

For public queries (`www.example.com`), the forwarder routes to public resolvers (`8.8.8.8`). No private IPs ever leak to external resolvers.

## Best Practices

| Practice | Why It Matters |
| :--- | :--- |
| Always set `no-resolv` (dnsmasq) | Prevents bypassing your forwarding rules via `/etc/resolv.conf` |
| Restrict `access-control` (Unbound) | Don't allow open recursion from untrusted networks |
| Enable log rotation | Prevents DNS log files from filling disk |
| Use `forward first` in BIND9 global options | Allows fallback to recursion if forwarders fail |
| Set bounded cache TTLs | Prevents stale records from persisting indefinitely |

**Read the full guide:** [Split-Horizon DNS Forwarding →](https://docs.beyondyou.my.id/docs/01-knowledge-base/system/split-horizon-dns-forwarding) — includes complete BIND9, dnsmasq, and Unbound configurations, verification steps, troubleshooting matrix, and production hardening checklist.
