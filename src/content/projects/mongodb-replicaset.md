---
title: "MongoDB Replica Set Configuration"
description: "Complete guide to setting up MongoDB replica set for high availability, redundancy, and data consistency across multiple servers."
year: "2025"
tags: ["MongoDB", "Database", "High Availability", "Replication", "DevOps"]
github: "https://github.com/ahmadnurhidayat"
image: "/images/projects/mongodb-replicaset.svg"
pinned: false
---

# MongoDB Replica Set Configuration

A comprehensive implementation guide for configuring MongoDB replica sets to ensure **high availability**, **redundancy**, and **data consistency** for your database infrastructure.

![MongoDB Replicaset](/images/projects/mongodb-replicaset.svg)

## Project Overview

This project documents the complete process of setting up a MongoDB replica set from scratch. A replica set in MongoDB is a group of `mongod` instances that maintain the same data set, providing redundancy and increasing data availability.

### Key Benefits

-   **High Availability**: Automatic failover when the primary node becomes unavailable
-   **Data Redundancy**: Data is replicated across multiple servers
-   **Read Scalability**: Distribute read operations across secondary nodes
-   **Disaster Recovery**: Built-in backup with point-in-time recovery

## Prerequisites

Before beginning the setup, ensure you have:

-   **Three or more servers** with MongoDB installed
-   **Network connectivity** between all servers (port 27017)
-   **SSH access** to all servers
-   **Root or sudo privileges**

## Implementation Steps

### Step 1: Configure Hostnames

Assign meaningful hostnames to each server for easier management:

```bash
# On each server
sudo hostnamectl set-hostname <new-hostname>
sudo nano /etc/hosts
```

Update the `/etc/hosts` file:

```text
127.0.1.1    <new-hostname>
```

### Step 2: MongoDB Configuration

Edit the MongoDB configuration file on each server:

```bash
sudo nano /etc/mongod.conf
```

Configure with the following settings:

```yaml
# mongod.conf
storage:
  dbPath: /var/lib/mongodb

systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log

net:
  port: 27017
  bindIp: 0.0.0.0

processManagement:
  timeZoneInfo: /usr/share/zoneinfo

security:
  authorization: enabled
  keyFile: /etc/mongodb/keyfile.txt

replication:
  replSetName: "rs0"
```

### Step 3: Generate Authentication Key

Create a shared key file for replica set authentication:

```bash
# Generate the key file
openssl rand -base64 756 > /etc/mongodb/keyfile.txt

# Set proper ownership and permissions
sudo chown mongodb:mongodb /etc/mongodb/keyfile.txt
sudo chmod 600 /etc/mongodb/keyfile.txt
```

> **Important**: Copy the same keyfile to all replica set members.

### Step 4: Start MongoDB Service

Restart MongoDB to apply configurations:

```bash
sudo systemctl restart mongod
sudo systemctl status mongod
```

### Step 5: Initialize the Replica Set

Connect to the primary server using `mongosh`:

```bash
mongosh
```

Initialize the replica set:

```javascript
rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "primary-node:27017" },
    { _id: 1, host: "secondary-node:27017" },
    { _id: 2, host: "arbiter-node:27017" }
  ]
});
```

### Step 6: Configure Member Priorities

Reconfigure the replica set with proper priorities and roles:

```javascript
rs.reconfig({
  _id: "rs0",
  members: [
    {
      _id: 0,
      host: "primary-node:27017",
      priority: 2,
      votes: 1
    },
    {
      _id: 1,
      host: "secondary-node:27017",
      priority: 1,
      votes: 1
    },
    {
      _id: 2,
      host: "arbiter-node:27017",
      arbiterOnly: true,
      priority: 0,
      votes: 1
    }
  ]
}, { force: true });
```

### Step 7: Verify Configuration

Check the replica set status:

```javascript
rs.status();
```

You should see output indicating:
-   **PRIMARY**: The main node accepting write operations
-   **SECONDARY**: Nodes replicating data from primary
-   **ARBITER**: Voting member (if configured)

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    MongoDB Replica Set (rs0)                │
├───────────────────┬───────────────────┬─────────────────────┤
│                   │                   │                     │
│   ┌───────────┐   │   ┌───────────┐   │   ┌───────────┐     │
│   │  Primary  │   │   │ Secondary │   │   │  Arbiter  │     │
│   │   Node    │◄──┼───│   Node    │   │   │   Node    │     │
│   │           │   │   │           │   │   │           │     │
│   │priority: 2│   │   │priority: 1│   │   │priority: 0│     │
│   └───────────┘   │   └───────────┘   │   └───────────┘     │
│         │         │         ▲         │         ▲           │
│         │         │         │         │         │           │
│         └─────────┴─────────┴─────────┴─────────┘           │
│                      Replication                            │
└─────────────────────────────────────────────────────────────┘
```

## Monitoring & Maintenance

### Health Check Commands

```javascript
// Check replica set status
rs.status();

// View replica set configuration
rs.conf();

// Check replication lag
rs.printSecondaryReplicationInfo();
```

### Common Operations

| Operation | Command |
|-----------|---------|
| Add member | `rs.add("hostname:27017")` |
| Remove member | `rs.remove("hostname:27017")` |
| Step down primary | `rs.stepDown()` |
| Freeze secondary | `rs.freeze(seconds)` |

## Technologies Used

-   **Database**: MongoDB 6.x / 7.x
-   **Authentication**: Keyfile-based authentication
-   **OS**: Ubuntu 22.04 / Debian 12
-   **Networking**: TCP/IP with TLS (recommended)

## Best Practices

1.  **Use an odd number of voting members** to ensure proper election
2.  **Distribute replicas across availability zones** for disaster recovery
3.  **Enable authentication** with keyfile or x.509 certificates
4.  **Monitor replication lag** to ensure data consistency
5.  **Regular backups** using `mongodump` or filesystem snapshots

## Conclusion

Setting up a MongoDB replica set provides your database with high availability, redundancy, and data consistency. This implementation ensures your MongoDB deployment is resilient and capable of handling failover scenarios automatically.

For more detailed information, refer to the [official MongoDB documentation](https://www.mongodb.com/docs/manual/replication/).
