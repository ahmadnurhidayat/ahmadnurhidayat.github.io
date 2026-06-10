---
title: "Kubernetes Networking & CNI — How Container Networking Works"
description: "Deep dive into Kubernetes networking: the CNI specification, how Calico and Cilium implement pod networking, and the Linux primitives that make it all work."
date: 2025-08-25
tags: [kubernetes, networking, cni, calico, cilium, iptables, ebpf]
draft: false
canonicalUrl: "https://docs.beyondyou.my.id/docs/01-knowledge-base/k8s/how-cni-works"
---

Kubernetes networking is built on a deceptively simple requirement — every pod gets its own IP, and pods can communicate across nodes without NAT. The Container Network Interface (CNI) specification defines how plugins implement this, but understanding what happens under the hood — iptables rules, eBPF programs, overlay networks — is essential for debugging and performance optimization.

## Key Takeaways

- The CNI specification defines a standard interface between the container runtime and network plugins
- CNI plugins handle IPAM (IP allocation), network interface creation, and route configuration for each pod
- Calico uses pure L3 routing (BGP or VPC-native) for high performance; Cilium uses eBPF for kernel-level policy enforcement
- Overlay networks (Flannel, Weave) encapsulate pod traffic in VXLAN or Geneve tunnels — simpler but higher overhead
- Network policies are enforced by the CNI plugin, not by kube-proxy — choose a CNI with robust policy support

## Quick Overview

When a pod is created, the container runtime calls the configured CNI plugin. The plugin allocates an IP from its IPAM, creates a veth pair connecting the pod's network namespace to the host, and configures routes so traffic destined for the pod's IP reaches the correct interface. For cross-node traffic, the CNI handles routing — either through an overlay (VXLAN encapsulation) or direct routing (BGP peering between nodes).

Modern CNIs like Cilium replace iptables with eBPF for service load balancing and network policy enforcement, dramatically improving performance and observability at scale. Calico offers a simpler, battle-tested L3 approach that works well in cloud environments with native routing support.

---

**Read the full guide:** [Kubernetes Networking & CNI →](https://docs.beyondyou.my.id/docs/01-knowledge-base/k8s/how-cni-works) — includes packet walkthroughs, CNI plugin comparisons, and troubleshooting common networking issues.
