export interface FeaturedDoc {
  title: string;
  description: string;
  slug: string;
  category: string;
  categoryColor: 'purple' | 'blue' | 'orange' | 'teal';
}

export const DOCS_BASE_URL = 'https://docs.beyondyou.my.id';

export const featuredDocs: FeaturedDoc[] = [
  {
    title: 'How AWS PrivateLink Works',
    description: 'Deep dive into AWS PrivateLink architecture — how VPC endpoints route traffic privately without traversing the public internet.',
    slug: '01-knowledge-base/aws/privatelink',
    category: 'Knowledge Base',
    categoryColor: 'purple',
  },
  {
    title: 'CI/CD Best Practices & Core Principles',
    description: 'Production-proven CI/CD patterns: fail-fast pipelines, trunk-based development, artifact promotion, and deployment strategies.',
    slug: '01-knowledge-base/cicd/best-practices',
    category: 'Knowledge Base',
    categoryColor: 'purple',
  },
  {
    title: 'Kubernetes Control Plane Under the Hood',
    description: 'How kube-apiserver, etcd, controller-manager, and scheduler work together — internal request flows and failure modes.',
    slug: '01-knowledge-base/k8s/kubernetes-under-the-hood',
    category: 'Knowledge Base',
    categoryColor: 'purple',
  },
  {
    title: 'Setting Up Custom SSH Configurations for Multi-Account GitHub',
    description: 'Manage multiple GitHub identities with SSH config host aliases, per-account keys, and enterprise multi-identity workflows.',
    slug: '01-knowledge-base/system/custom-ssh-config',
    category: 'Knowledge Base',
    categoryColor: 'purple',
  },
  {
    title: 'Monitoring MongoDB with Prometheus & Grafana',
    description: 'Production MongoDB monitoring using mongodb_exporter — least-privilege users, Prometheus scrape configs, and Grafana dashboards.',
    slug: '01-knowledge-base/observability/mongodb-exporter',
    category: 'Knowledge Base',
    categoryColor: 'purple',
  },
  {
    title: 'Cloud Platform Engineering Interview Prep',
    description: 'Curated Q&A covering Kubernetes, Terraform, CI/CD, and AWS — structured cheat sheets for platform engineering interviews.',
    slug: '02-interview-prep/00-index',
    category: 'Interview Prep',
    categoryColor: 'blue',
  },
  {
    title: 'Platform Engineering Hands-On Labs',
    description: 'Step-by-step tutorials: Crossplane compositions, Backstage setup, GitOps with ArgoCD, and building a full Internal Developer Platform.',
    slug: '03-labs/00-index',
    category: 'Hands-On Labs',
    categoryColor: 'orange',
  },
  {
    title: 'Professional Profile — Ahmad Nurhidayat',
    description: 'Career experience, certifications, and technical achievements in Cloud, DevOps, and Platform Engineering.',
    slug: '99-cv/ahmad-nurhidayat',
    category: 'CV',
    categoryColor: 'teal',
  },
];
