---
title: "Mounting JSON Service Account Credentials via Kubernetes Secrets"
description: "Securely mount JSON service account key files into pods using Kubernetes Secrets — proper volume mounts, permissions, and rotation strategies."
date: 2025-09-25
tags: [kubernetes, secrets, security, service-accounts, volumes]
draft: false
canonicalUrl: "https://docs.beyondyou.my.id/docs/01-knowledge-base/k8s/secrets-json-mount"
---

While workload identity (IRSA, Workload Identity) is the modern approach, many real-world integrations still require JSON service account key files. Mounting these securely in Kubernetes requires careful attention to file permissions, volume mount paths, and rotation strategies. A naive approach — embedding the key in a ConfigMap or environment variable — is a security anti-pattern.

## Key Takeaways

- Always use Kubernetes Secrets (not ConfigMaps) for service account JSON keys
- Mount secrets as volumes, not environment variables — volumes can be updated without pod restart
- Set appropriate file permissions using `defaultMode` on the Secret volume
- Use `subPath` mounts to avoid symlink-based secret updates affecting running applications
- Implement secret rotation: update the Secret, then restart pods (or use a sidecar that watches for changes)

## Quick Overview

The secure pattern: create the Secret from the JSON key file using `kubectl create secret generic sa-key --from-file=key.json`. Mount it in the pod spec as a volume with `defaultMode: 0400` (owner read-only). The application reads the key from the mounted path. This keeps the credential out of environment variables (which are often logged) and out of the container image.

For rotation, update the Secret with the new key. Pods using the volume mount will see the updated file content within ~60 seconds (the kubelet sync period). Applications should re-read the key file periodically or watch for changes. A sidecar that watches the mount path and signals the main process on change is the most robust approach.

---

**Read the full guide:** [Mounting JSON Service Account Credentials via Secrets →](https://docs.beyondyou.my.id/docs/01-knowledge-base/k8s/secrets-json-mount) — includes volume mount examples, rotation automation, and comparison with workload identity approaches.
