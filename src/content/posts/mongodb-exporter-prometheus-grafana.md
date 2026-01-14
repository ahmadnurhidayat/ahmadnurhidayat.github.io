---
title: "MongoDB Monitoring with Prometheus and Grafana"
description: "Complete guide to setting up mongodb_exporter for monitoring MongoDB performance and health using Prometheus and Grafana."
date: 2025-01-14
tags: ["mongodb", "prometheus", "grafana", "monitoring", "devops"]
---

# MongoDB Monitoring with Prometheus and Grafana

![MongoDB Exporter](/images/posts/mongodb-exporter.svg)

Monitoring MongoDB performance and health is crucial for maintaining database reliability and efficiency. One of the best ways to achieve this is by using **mongodb_exporter**, which allows Prometheus to collect MongoDB metrics and visualize them with Grafana.

This guide will cover setting up `mongodb_exporter` using Docker and Systemd, integrating it with Prometheus, and visualizing data in Grafana.

## Prerequisites

Before getting started, ensure you have:

- A running **MongoDB** instance
- **Docker** installed (if using Docker setup)
- **Prometheus** and **Grafana** installed

## User Setup for MongoDB Exporter

To ensure MongoDB Exporter has the required permissions, create a dedicated user (`mongodb_exporter`) with the following roles:

```json
{
   "role": "clusterMonitor",
   "db": "admin"
},
{
   "role": "read",
   "db": "local"
}
```

These roles allow the exporter to:

- **Monitor cluster-wide metrics** (`clusterMonitor` role)
- **Read local database statistics** (`read` role on `local` database)

### Creating the MongoDB Exporter User

Connect to MongoDB and run the following command:

```javascript
use admin
db.createUser({
   user: "mongodb_exporter",
   pwd: "your-secure-password",
   roles: [
      { role: "clusterMonitor", db: "admin" },
      { role: "read", db: "local" }
   ]
})
```

> **Important**: Replace `your-secure-password` with a strong, unique password.

## Setting Up mongodb_exporter

### Option 1: Using Docker

To run `mongodb_exporter` using Docker, execute the following command:

```bash
docker run -d -p 9216:9216 percona/mongodb_exporter:0.42 \
  --mongodb.uri=mongodb://<username>:<password>@127.0.0.1:27017/admin?authSource=admin
```

This command runs the exporter and exposes it on port `9216`, allowing Prometheus to scrape MongoDB metrics.

### Option 2: Using Systemd

#### Step 1: Download and Install mongodb_exporter

```bash
# Download the exporter
wget https://github.com/percona/mongodb_exporter/releases/download/v0.42.0/mongodb_exporter-0.42.0.linux-amd64.tar.gz

# Extract the archive
tar -xvf mongodb_exporter-0.42.0.linux-amd64.tar.gz

# Move to the extracted directory
cd mongodb_exporter-0.42.0.linux-amd64

# Copy binary to system path
sudo cp mongodb_exporter /usr/local/bin/
```

#### Step 2: Create a Systemd Service File

Create the service file:

```bash
sudo nano /etc/systemd/system/mongodb_exporter.service
```

Add the following configuration:

```ini
[Unit]
Description=MongoDB Exporter
Wants=network-online.target
After=network-online.target

[Service]
User=<username>
Group=<username>
Type=simple
ExecStart=/usr/local/bin/mongodb_exporter \
    --mongodb.uri=mongodb://<username>:<password>@<host>:27017/admin?authSource=admin \
    --web.listen-address=":9216" \
    --mongodb.direct-connect \
    --mongodb.global-conn-pool \
    --collect-all \
    --collector.replicasetstatus \
    --collector.dbstats \
    --collector.topmetrics \
    --mongodb.connect-timeout-ms=180
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

> **Note**: Replace `<username>`, `<password>`, and `<host>` with your actual values.

#### Step 3: Start and Enable the Service

```bash
# Reload systemd daemon
sudo systemctl daemon-reload

# Start the service
sudo systemctl start mongodb_exporter

# Enable on boot
sudo systemctl enable mongodb_exporter

# Check status
sudo systemctl status mongodb_exporter
```

## Configuring Prometheus

### Step 1: Edit Prometheus Configuration

Add the MongoDB exporter target to your `prometheus.yml`:

```yaml
scrape_configs:
  - job_name: 'mongodb'
    static_configs:
      - targets: ['localhost:9216', 'host:9216']
```

### Step 2: Restart Prometheus

```bash
sudo systemctl restart prometheus
```

## Visualizing Metrics in Grafana

### Import a MongoDB Dashboard

1. Navigate to **Dashboards** > **Import**
2. Use an existing dashboard ID from [Grafana Labs](https://grafana.com/grafana/dashboards/)
   - Recommended: Search for "MongoDB" dashboards
   - Popular options include dashboard IDs like `2583` or `12079`
3. Select your **Prometheus** data source
4. Click **Import**

Once configured, you can monitor MongoDB performance with real-time metrics and alerts.

### Key Metrics to Monitor

| Metric | Description |
|--------|-------------|
| `mongodb_connections` | Current number of connections |
| `mongodb_opcounters_total` | Database operations count |
| `mongodb_ss_mem_resident` | Resident memory usage |
| `mongodb_rs_members_health` | Replica set member health |
| `mongodb_dbstats_dataSize` | Database data size |

## Exporter Flags Reference

| Flag | Description |
|------|-------------|
| `--mongodb.uri` | MongoDB connection URI |
| `--web.listen-address` | Address to listen on for metrics |
| `--mongodb.direct-connect` | Direct connection mode |
| `--collect-all` | Enable all collectors |
| `--collector.replicasetstatus` | Collect replica set status |
| `--collector.dbstats` | Collect database statistics |
| `--collector.topmetrics` | Collect top metrics |

## Troubleshooting

### Common Issues

1. **Connection refused**: Ensure MongoDB is accessible from the exporter
2. **Authentication failed**: Verify the user credentials and roles
3. **Metrics not appearing**: Check if port `9216` is open and accessible

### Verify Exporter is Running

```bash
# Check metrics endpoint
curl http://localhost:9216/metrics
```

## Conclusion

This guide provides a step-by-step approach to setting up `mongodb_exporter` with Prometheus and Grafana for MongoDB monitoring. With this setup, you can track database performance, resource utilization, and health metrics effectively.

### Next Steps

- Set up alerting rules in Prometheus for critical metrics
- Create custom Grafana dashboards for your specific use case
- Configure log aggregation for complete observability

---

*For more information, refer to the [official mongodb_exporter repository](https://github.com/percona/mongodb_exporter).*
