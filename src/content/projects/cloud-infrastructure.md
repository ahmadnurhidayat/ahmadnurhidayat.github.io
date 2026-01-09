---
title: "Cloud Infrastructure Setup"
description: "Multi-cloud infrastructure setup using Terraform and Ansible for high availability and disaster recovery."
year: "2023"
tags: ["terraform", "ansible", "aws", "gcp", "infrastructure"]
github: "https://github.com/ahmadnurhidayat"
image: "/images/projects/cloud.svg"
pinned: true
---

# Cloud Infrastructure Setup

A multi-cloud infrastructure project implementing high availability and disaster recovery patterns.

## Project Overview

This project establishes a robust cloud infrastructure that spans multiple cloud providers, ensuring:

- **High Availability**: 99.9% uptime SLA
- **Disaster Recovery**: Cross-region failover capability
- **Cost Optimization**: Resource rightsizing and reserved capacity
- **Security**: Defense in depth approach

## Infrastructure Components

### Terraform Modules

```hcl
module "vpc" {
  source = "./modules/vpc"
  
  cidr_block = "10.0.0.0/16"
  availability_zones = ["us-east-1a", "us-east-1b", "us-east-1c"]
  
  tags = {
    Environment = "production"
    Project     = "cloud-infra"
  }
}

module "kubernetes" {
  source = "./modules/kubernetes"
  
  cluster_name = "production-cluster"
  vpc_id       = module.vpc.vpc_id
  subnet_ids   = module.vpc.private_subnet_ids
  
  node_groups = {
    general = {
      instance_types = ["t3.large"]
      min_size       = 2
      max_size       = 10
    }
  }
}
```

## Key Achievements

| Metric | Before | After |
|--------|--------|-------|
| Deployment Time | 2 hours | 15 minutes |
| Infrastructure Cost | $5,000/mo | $3,500/mo |
| Recovery Time | 4 hours | 30 minutes |
| Uptime | 99.5% | 99.9% |

## Technologies

- **IaC**: Terraform, Ansible
- **Cloud**: AWS, GCP
- **Containers**: Kubernetes, Docker
- **Monitoring**: Prometheus, Grafana
- **CI/CD**: GitHub Actions

---

*This is a sample project. Update with your actual project details.*
