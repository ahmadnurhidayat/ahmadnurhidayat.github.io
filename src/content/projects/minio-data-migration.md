---
title: "MinIO Data Migration Guide"
description: "Step-by-step guide for migrating MinIO object storage data between servers with minimal downtime and data integrity."
year: "2025"
tags: ["MinIO", "Object Storage", "Data Migration", "S3", "DevOps"]
github: "https://github.com/ahmadnurhidayat"
image: "/images/projects/minio.svg"
pinned: false
---

# MinIO Data Migration Guide

A comprehensive guide for migrating **MinIO data service** from one server to another, ensuring minimal downtime and complete data integrity throughout the process.

## Project Overview

MinIO is a high-performance, distributed object storage system compatible with **Amazon S3**. This guide covers the essential steps for successfully migrating a MinIO instance, including preparation, data transfer, configuration migration, validation, and post-migration cleanup.

### Migration Goals

-   **Zero data loss** during the transfer process
-   **Minimal downtime** for production environments
-   **Preserve permissions** and file metadata
-   **Seamless transition** for connected applications

## Pre-Migration Checklist

Before starting the migration, verify the following:

| Requirement | Description |
|-------------|-------------|
| **Downtime Window** | Schedule maintenance window for migration |
| **Storage Capacity** | Ensure destination has sufficient disk space |
| **Backup** | Complete backup of MinIO data |
| **Network** | Verify connectivity between source and destination |

## Implementation Steps

### Step 1: Prepare the Servers

**On the Source Server:**

Identify the MinIO data directory (typically specified with `--data` flag):

```bash
# Check MinIO service configuration
cat /etc/default/minio
```

**On the Destination Server:**

Install MinIO and create the data directory:

```bash
# Download and install MinIO
wget https://dl.min.io/server/minio/release/linux-amd64/minio
chmod +x minio
sudo mv minio /usr/local/bin/

# Create data directory
sudo mkdir -p /mnt/data

# Set proper permissions
sudo chown -R minio-user:minio-group /mnt/data
```

### Step 2: Stop MinIO on Source Server

Stop the service to prevent data inconsistency:

```bash
# For systemd service
sudo systemctl stop minio

# For Docker container
docker stop minio-container
```

### Step 3: Transfer Data

Use `rsync` for efficient data transfer with progress monitoring:

```bash
# Transfer data from source to destination
rsync -avz --progress /mnt/data/ destination-server:/mnt/data/
```

**rsync flags explained:**

| Flag | Description |
|------|-------------|
| `-a` | Archive mode (preserves permissions, timestamps) |
| `-v` | Verbose output |
| `-z` | Compress during transfer |
| `--progress` | Show transfer progress |

### Step 4: Migrate Configuration

Transfer MinIO configuration files:

```bash
# Configuration typically in ~/.minio or /etc/minio
rsync -avz ~/.minio/ destination-server:~/.minio/
rsync -avz /etc/default/minio destination-server:/etc/default/minio
```

Ensure proper permissions on destination:

```bash
# On destination server
sudo chmod 600 ~/.minio/certs/*
```

### Step 5: Start MinIO on Destination

**Standalone instance:**

```bash
minio server /mnt/data/
```

**Using systemd:**

```bash
# Ensure service file is configured
sudo systemctl daemon-reload
sudo systemctl start minio
sudo systemctl enable minio
```

**Docker environment:**

```bash
docker run -d \
  --name minio-container \
  -v /mnt/data:/data \
  -p 9000:9000 \
  -p 9001:9001 \
  minio/minio server /data --console-address ":9001"
```

### Step 6: Update DNS & Networking

Update configurations based on your setup:

```nginx
# Example: Nginx reverse proxy update
upstream minio {
    server new-server-ip:9000;
}

server {
    listen 443 ssl;
    server_name minio.example.com;
    
    location / {
        proxy_pass http://minio;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Step 7: Verify Migration

**Access Web Console:**

Navigate to `http://new-server:9001` and verify buckets are intact.

**Using MinIO Client (mc):**

```bash
# Configure mc alias
mc alias set myminio http://new-server:9000 ACCESS_KEY SECRET_KEY

# List all buckets
mc ls myminio

# Check bucket contents
mc ls myminio/my-bucket

# Perform upload test
mc cp testfile.txt myminio/my-bucket/

# Perform download test
mc cp myminio/my-bucket/testfile.txt ./downloaded.txt
```

## Architecture Overview

```
┌──────────────────────────────────────────────────────────────┐
│                    MinIO Migration Flow                      │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌─────────────┐          rsync           ┌─────────────┐   │
│   │   SOURCE    │ ───────────────────────► │ DESTINATION │   │
│   │   SERVER    │                          │   SERVER    │   │
│   ├─────────────┤                          ├─────────────┤   │
│   │ /mnt/data/  │                          │ /mnt/data/  │   │
│   │   bucket1/  │ ════════════════════════►│   bucket1/  │   │
│   │   bucket2/  │                          │   bucket2/  │   │
│   │   bucket3/  │                          │   bucket3/  │   │
│   └─────────────┘                          └─────────────┘   │
│                                                              │
│   ┌─────────────┐          copy            ┌─────────────┐   │
│   │   ~/.minio/ │ ───────────────────────► │   ~/.minio/ │   │
│   │   (config)  │                          │   (config)  │   │
│   └─────────────┘                          └─────────────┘   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## Post-Migration Tasks

### Cleanup

```bash
# On source server (after verification)
sudo rm -rf /mnt/data/*  # Only if decommissioning

# Or keep as backup/secondary node
```

### Set Up Replication (Optional)

Configure bucket replication for redundancy:

```bash
# Add replication rule
mc replicate add myminio/my-bucket \
  --remote-bucket backup-bucket \
  --replicate "delete,delete-marker,existing-objects"
```

### Monitoring Setup

Enable Prometheus metrics:

```bash
# Start MinIO with Prometheus endpoint
minio server /mnt/data --console-address ":9001"

# Scrape config for Prometheus
# Add to prometheus.yml:
scrape_configs:
  - job_name: 'minio'
    static_configs:
      - targets: ['minio-server:9000']
    metrics_path: /minio/v2/metrics/cluster
```

## Technologies Used

-   **Storage**: MinIO Server
-   **Transfer**: rsync, scp
-   **Client**: MinIO Client (mc)
-   **Containerization**: Docker (optional)
-   **Monitoring**: Prometheus, Grafana

## Best Practices

1.  **Always backup** before migration
2.  **Test connectivity** between servers first
3.  **Use compression** for large transfers over slow networks
4.  **Verify checksums** after transfer completion
5.  **Monitor disk I/O** during migration
6.  **Have a rollback plan** ready

## Conclusion

Migrating MinIO data between servers requires careful planning and execution to ensure data integrity and service continuity. By following this step-by-step guide, you can minimize downtime and avoid common pitfalls during the migration process.

For more information, refer to the [official MinIO documentation](https://min.io/docs/minio/linux/index.html).
