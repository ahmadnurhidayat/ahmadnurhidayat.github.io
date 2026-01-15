---
title: "GKE Workload Identity Configuration"
description: "Complete guide to configuring Workload Identity for secure, keyless authentication between GKE workloads and Google Cloud services."
year: "2025"
tags: ["GKE", "Kubernetes", "Google Cloud", "IAM", "Security", "DevOps"]
github: "https://github.com/ahmadnurhidayat"
image: "/images/projects/gke-workload-identity.png"
pinned: true
---

# GKE Workload Identity Configuration

A comprehensive implementation guide for configuring **Workload Identity** in Google Kubernetes Engine (GKE) to enable secure, keyless authentication for your workloads accessing Google Cloud services.

![GKE Workload Identity](/images/projects/workload-identity.svg)

## Project Overview

This project documents the complete process of setting up Workload Identity, the recommended way for applications running on GKE to access Google Cloud services securely. It allows Kubernetes Service Accounts (KSA) to act as Google Cloud Service Accounts (GSA), eliminating the need to manage service account keys.

### Why Use Workload Identity?

| Traditional Approach (JSON Keys) | Workload Identity |
|----------------------------------|-------------------|
| Manual key rotation required | Automatic credential management |
| Keys can be leaked or stolen | No keys to manage or leak |
| Keys stored in Kubernetes Secrets | Credentials obtained dynamically |
| Difficult to audit | Full Cloud Audit Logs support |
| Security risk if compromised | Short-lived, auto-rotated tokens |

### Key Benefits

-   **Enhanced Security**: No service account keys to manage, rotate, or risk leaking
-   **Simplified Management**: Direct IAM binding between Kubernetes and GCP
-   **Audit Trail**: All access is logged in Cloud Audit Logs
-   **Least Privilege**: Fine-grained access control per workload
-   **Automatic Rotation**: Credentials are short-lived and automatically refreshed

## Prerequisites

### Required Permissions

You need the following IAM roles:

-   `roles/container.admin` (or `roles/container.clusterAdmin`)
-   `roles/iam.serviceAccountAdmin`
-   `roles/iam.serviceAccountUser`

### Cluster Requirements

-   GKE cluster version 1.12 or later (1.20+ recommended)
-   VPC-native cluster (alias IPs enabled)
-   Workload Identity enabled on cluster and node pools

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         GKE Cluster                             │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                        Node Pool                          │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │                       Pod                           │  │  │
│  │  │  ┌─────────────────┐    ┌─────────────────────────┐ │  │  │
│  │  │  │   Application   │────│ Kubernetes Service      │ │  │  │
│  │  │  │                 │    │ Account (KSA)           │ │  │  │
│  │  │  └─────────────────┘    └───────────┬─────────────┘ │  │  │
│  │  └─────────────────────────────────────│───────────────┘  │  │
│  └────────────────────────────────────────│──────────────────┘  │
└───────────────────────────────────────────│─────────────────────┘
                                            │
                                            │ IAM Policy Binding
                                            │ (Workload Identity User)
                                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Google Cloud IAM                            │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              GCP Service Account (GSA)                    │  │
│  │  Permissions: storage.objectViewer, pubsub.publisher...  │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                                            │
                                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Google Cloud Services                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │  Cloud   │  │  Pub/Sub │  │ BigQuery │  │  Secret  │        │
│  │ Storage  │  │          │  │          │  │ Manager  │        │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘        │
└─────────────────────────────────────────────────────────────────┘
```

### Component Relationships

```
PROJECT_ID.svc.id.goog[NAMESPACE/KSA_NAME]
           │              │        │
           │              │        └── Kubernetes Service Account name
           │              └── Kubernetes namespace
           └── Workload Identity Pool (auto-created)
```

## Implementation Steps

### Step 1: Set Environment Variables

```bash
# Set your project and cluster information
export PROJECT_ID="your-project-id"
export CLUSTER_NAME="your-cluster-name"
export CLUSTER_ZONE="asia-southeast1-a"
export NAMESPACE="production"
export KSA_NAME="my-app-ksa"
export GSA_NAME="my-app-gsa"
```

### Step 2: Enable Required APIs

```bash
gcloud services enable \
    container.googleapis.com \
    iam.googleapis.com \
    iamcredentials.googleapis.com \
    --project=$PROJECT_ID
```

### Step 3: Enable Workload Identity on Cluster

**For New Cluster:**

```bash
gcloud container clusters create $CLUSTER_NAME \
    --zone=$CLUSTER_ZONE \
    --workload-pool=$PROJECT_ID.svc.id.goog \
    --project=$PROJECT_ID
```

**For Existing Cluster:**

```bash
gcloud container clusters update $CLUSTER_NAME \
    --zone=$CLUSTER_ZONE \
    --workload-pool=$PROJECT_ID.svc.id.goog \
    --project=$PROJECT_ID
```

### Step 4: Enable Workload Identity on Node Pool

```bash
# Get node pool name
gcloud container node-pools list \
    --cluster=$CLUSTER_NAME \
    --zone=$CLUSTER_ZONE \
    --project=$PROJECT_ID

# Update node pool
gcloud container node-pools update NODE_POOL_NAME \
    --cluster=$CLUSTER_NAME \
    --zone=$CLUSTER_ZONE \
    --workload-metadata=GKE_METADATA \
    --project=$PROJECT_ID
```

> **Important**: After updating a node pool, existing nodes will be recreated. This causes brief disruption to workloads.

### Step 5: Create GCP Service Account

```bash
gcloud iam service-accounts create $GSA_NAME \
    --display-name="$GSA_NAME for Workload Identity" \
    --project=$PROJECT_ID
```

### Step 6: Grant IAM Permissions

```bash
# Example: Cloud Storage read access
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$GSA_NAME@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/storage.objectViewer"

# Example: Secret Manager access
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$GSA_NAME@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/secretmanager.secretAccessor"

# Example: Cloud SQL client
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$GSA_NAME@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/cloudsql.client"
```

### Step 7: Create Kubernetes Namespace & Service Account

```bash
# Get cluster credentials
gcloud container clusters get-credentials $CLUSTER_NAME \
    --zone=$CLUSTER_ZONE \
    --project=$PROJECT_ID

# Create namespace
kubectl create namespace $NAMESPACE

# Create KSA
kubectl create serviceaccount $KSA_NAME --namespace $NAMESPACE
```

### Step 8: Create IAM Policy Binding (Link KSA to GSA)

This is the critical step that links the Kubernetes Service Account to the GCP Service Account:

```bash
gcloud iam service-accounts add-iam-policy-binding \
    $GSA_NAME@$PROJECT_ID.iam.gserviceaccount.com \
    --role="roles/iam.workloadIdentityUser" \
    --member="serviceAccount:$PROJECT_ID.svc.id.goog[$NAMESPACE/$KSA_NAME]" \
    --project=$PROJECT_ID
```

### Step 9: Annotate Kubernetes Service Account

```bash
kubectl annotate serviceaccount $KSA_NAME \
    --namespace $NAMESPACE \
    iam.gke.io/gcp-service-account=$GSA_NAME@$PROJECT_ID.iam.gserviceaccount.com
```

### Step 10: Deploy Application

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  namespace: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      serviceAccountName: my-app-ksa  # Reference the KSA here
      containers:
      - name: my-app
        image: gcr.io/your-project-id/my-app:latest
        ports:
        - containerPort: 8080
```

## Verification & Testing

### Verify Configuration

```bash
# Verify KSA annotation
kubectl get serviceaccount $KSA_NAME -n $NAMESPACE -o yaml

# Verify IAM binding
gcloud iam service-accounts get-iam-policy \
    $GSA_NAME@$PROJECT_ID.iam.gserviceaccount.com \
    --project=$PROJECT_ID
```

### Test from Inside Pod

Deploy a test pod and verify:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: workload-identity-test
  namespace: production
spec:
  serviceAccountName: my-app-ksa
  containers:
  - name: test
    image: google/cloud-sdk:slim
    command: ["sleep", "infinity"]
```

```bash
# Exec into the pod
kubectl exec -it workload-identity-test -n $NAMESPACE -- /bin/bash

# Check identity
curl -H "Metadata-Flavor: Google" \
    http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/email
# Expected: my-app-gsa@your-project-id.iam.gserviceaccount.com

# Test gcloud authentication
gcloud auth list

# Test GCS access
gsutil ls
```

## Common Use Cases

### Cloud SQL with Workload Identity

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  namespace: production
spec:
  replicas: 2
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      serviceAccountName: cloudsql-app-ksa
      containers:
      - name: my-app
        image: gcr.io/my-project/my-app:latest
        env:
        - name: DB_HOST
          value: "127.0.0.1"
        - name: DB_PORT
          value: "5432"
      - name: cloud-sql-proxy
        image: gcr.io/cloud-sql-connectors/cloud-sql-proxy:2.8.0
        args:
        - "--structured-logs"
        - "--auto-iam-authn"
        - "my-project:region:instance-name"
```

### Cross-Project Access

```bash
# Create GSA in GKE project
gcloud iam service-accounts create $GSA_NAME --project=$PROJECT_A

# Grant permissions in target project
gcloud projects add-iam-policy-binding $PROJECT_B \
    --member="serviceAccount:$GSA_NAME@$PROJECT_A.iam.gserviceaccount.com" \
    --role="roles/storage.objectViewer"

# Create IAM binding
gcloud iam service-accounts add-iam-policy-binding \
    $GSA_NAME@$PROJECT_A.iam.gserviceaccount.com \
    --project=$PROJECT_A \
    --role="roles/iam.workloadIdentityUser" \
    --member="serviceAccount:$PROJECT_A.svc.id.goog[$NAMESPACE/$KSA_NAME]"
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Pod uses node SA instead of Workload Identity | Verify node pool has `--workload-metadata=GKE_METADATA` |
| Permission denied errors | Check IAM binding and GSA permissions |
| Annotation not taking effect | Restart pods with `kubectl rollout restart` |
| Workload Identity Pool not found | Enable Workload Identity on cluster |

### Diagnostic Commands

```bash
# Check cluster Workload Identity status
gcloud container clusters describe $CLUSTER_NAME \
    --zone=$CLUSTER_ZONE \
    --format="value(workloadIdentityConfig.workloadPool)"

# Check node pool metadata mode
gcloud container node-pools list \
    --cluster=$CLUSTER_NAME \
    --zone=$CLUSTER_ZONE \
    --format="table(name,config.workloadMetadataConfig.mode)"
```

## Best Practices

1.  **One Service Account Per Application** - Create dedicated GSA/KSA pairs
2.  **Follow Least Privilege** - Grant only minimum permissions required
3.  **Namespace Isolation** - Use different namespaces for different environments
4.  **Consistent Naming** - Use pattern: `{app-name}-{environment}-{type}`
5.  **Regular Auditing** - Periodically audit Workload Identity bindings
6.  **Never Use Node SA** - Always use Workload Identity for workloads

## Security Considerations

-   **Disable metadata access** for pods that don't need GCP access
-   **Enable Cloud Audit Logs** to track all access
-   **Use conditions** for time-limited access when appropriate
-   **Restrict impersonation** - Limit who can create Workload Identity bindings

## Technologies Used

-   **Platform**: Google Kubernetes Engine (GKE)
-   **Authentication**: Workload Identity Federation
-   **IAM**: Google Cloud IAM
-   **Tools**: gcloud CLI, kubectl

## Quick Reference

```bash
# Enable on cluster
gcloud container clusters update CLUSTER --workload-pool=PROJECT.svc.id.goog

# Enable on node pool
gcloud container node-pools update POOL --workload-metadata=GKE_METADATA

# Create and link accounts
gcloud iam service-accounts create GSA_NAME
kubectl create serviceaccount KSA -n NAMESPACE

gcloud iam service-accounts add-iam-policy-binding GSA@PROJECT.iam... \
    --role="roles/iam.workloadIdentityUser" \
    --member="serviceAccount:PROJECT.svc.id.goog[NAMESPACE/KSA]"

kubectl annotate sa KSA -n NAMESPACE \
    iam.gke.io/gcp-service-account=GSA@PROJECT.iam.gserviceaccount.com

# Verify from pod
curl -H "Metadata-Flavor: Google" \
    http://metadata.google.internal/.../service-accounts/default/email
```

## Conclusion

Workload Identity provides a secure, manageable way for GKE applications to authenticate with Google Cloud services without the risks associated with service account keys. By following this implementation guide, you can ensure your Kubernetes workloads securely access the cloud resources they need.

For more detailed information, refer to the [official GKE Workload Identity documentation](https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity).
