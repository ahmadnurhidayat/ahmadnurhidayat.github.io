---
title: "Split-Horizon DNS Forwarding (BIND9, dnsmasq, Unbound)"
description: "Configure split-horizon DNS to resolve internal and external hostnames differently — essential for hybrid cloud and multi-network environments."
date: 2025-03-10
tags: [dns, networking, bind9, dnsmasq, unbound, system, split-horizon]
draft: false
canonicalUrl: "https://docs.beyondyou.my.id/docs/01-knowledge-base/system/split-horizon-dns-forwarding"
---

Split-horizon DNS (also called split-view or split-brain DNS) serves different DNS records depending on where the query comes from. Internal clients get private IPs; external clients get public IPs. This is fundamental for hybrid cloud architectures, VPN setups, and any environment where the same hostname needs to resolve differently inside and outside the network.

## Key Takeaways

- Split-horizon DNS provides different DNS answers based on the client's source network or IP range
- Internal clients resolve to private IPs (RFC 1918); external clients resolve to public IPs
- BIND9 implements this via `view` clauses that match client subnets
- dnsmasq uses conditional forwarding with `server=/domain/internal-dns-ip` directives
- Unbound supports split-horizon through `stub-zone` and `forward-zone` configurations with access control

## Quick Overview

In BIND9, split-horizon is implemented through `view` statements. Each view has an `match-clients` directive that selects which clients see this view. The internal view contains zone data with private IPs; the external view contains the same zones but with public IPs. Queries from internal subnets match the internal view; everything else falls through to the external view.

For simpler setups, dnsmasq's conditional forwarding is easier: forward `*.internal.example.com` to an internal DNS server, and resolve everything else through public DNS. This is perfect for development environments, homelabs, and small office networks where BIND9's complexity isn't justified.

---

**Read the full guide:** [Split-Horizon DNS Forwarding →](https://docs.beyondyou.my.id/docs/01-knowledge-base/system/split-horizon-dns-forwarding) — includes complete BIND9, dnsmasq, and Unbound configuration examples with troubleshooting guides.
