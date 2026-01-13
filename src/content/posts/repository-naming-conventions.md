---
title: "Repository Naming Conventions Best Practices"
description: "A comprehensive guide to establishing clear and consistent naming conventions for repositories to enhance collaboration and code discoverability."
date: 2025-01-13
tags: ["git", "devops", "best-practices", "collaboration"]
---

# Repository Naming Conventions Best Practices

![Repository Convention](/images/posts/repository-convention.svg)

Establishing clear and consistent naming conventions for repositories is essential for maintaining organization, enhancing collaboration, and improving code discoverability across development teams.

## General Naming Rules

### Format Guidelines

All repository names should follow these principles:

- **Lowercase only**: Use lowercase letters throughout
- **Slug-case**: Separate words with hyphens (`-`)
- **No special characters**: Avoid underscores, dots, or spaces
- **Descriptive**: Names should convey purpose at a glance

### Naming Structure

The recommended pattern follows this structure:

```
{project}-{type}-{service-name}-{variant}
```

This format allows team members to quickly identify the repository's purpose and its role within the larger project.

---

## Backend Projects

Backend repositories can be categorized based on their purpose—either as a general API or as a microservice.

### General Backend

| Pattern | Example | Use Case |
|---------|---------|----------|
| `{project}-general-api` | `ecommerce-general-api` | Non-microservice backend applications |

### Microservice Backend

| Pattern | Example | Use Case |
|---------|---------|----------|
| `{project}-service-{name}-api` | `ecommerce-service-user-api` | API for specific service |
| `{project}-service-{name}-cron` | `ecommerce-service-user-cron` | Scheduled tasks for service |
| `{project}-service-{name}-worker` | `ecommerce-service-order-worker` | Background job processor |

**Examples in practice:**

```
ecommerce-service-user-api
ecommerce-service-payment-api
ecommerce-service-notification-cron
ecommerce-service-inventory-worker
```

---

## Frontend Projects

Frontend repositories should clearly indicate they serve the web application layer.

| Pattern | Example | Use Case |
|---------|---------|----------|
| `{project}-fe` | `ecommerce-fe` | Main frontend application |
| `{project}-{service}-fe` | `ecommerce-admin-fe` | Service-specific frontend |
| `{project}-fe-{framework}` | `ecommerce-fe-react` | Framework-specific (if multiple) |

---

## Mobile Projects

Mobile repository names should specify the platform or framework being used.

| Pattern | Example | Use Case |
|---------|---------|----------|
| `{project}-mobile-flutter` | `ecommerce-mobile-flutter` | Flutter cross-platform app |
| `{project}-mobile-ios` | `ecommerce-mobile-ios` | Native iOS application |
| `{project}-mobile-android` | `ecommerce-mobile-android` | Native Android application |
| `{project}-mobile-rn` | `ecommerce-mobile-rn` | React Native application |

---

## Desktop Projects

Desktop applications should indicate their development framework or technology.

| Pattern | Example | Use Case |
|---------|---------|----------|
| `{project}-desktop-electron` | `analytics-desktop-electron` | Electron-based app |
| `{project}-desktop-dotnet` | `inventory-desktop-dotnet` | .NET desktop app |
| `{project}-desktop-tauri` | `notes-desktop-tauri` | Tauri-based app |

---

## Fullstack Projects

Fullstack repositories combine both frontend and backend components.

| Pattern | Example | Use Case |
|---------|---------|----------|
| `{project}-app` | `blog-app` | Monolithic fullstack application |
| `{project}-fullstack` | `dashboard-fullstack` | Combined frontend + backend |

---

## Template Repositories

Template repositories serve as starter kits for various frameworks and technologies.

| Pattern | Example | Use Case |
|---------|---------|----------|
| `{framework}-template` | `vue-template` | Framework starter |
| `{framework}-{type}-template` | `nestjs-api-template` | Specific type starter |
| `{framework}-fullstack-template` | `laravel-fullstack-template` | Complete stack template |

**Popular examples:**

```
nextjs-template
nestjs-api-template
fastapi-api-template
vue-admin-template
react-dashboard-template
laravel-fullstack-template
```

---

## Infrastructure & DevOps

| Pattern | Example | Use Case |
|---------|---------|----------|
| `{project}-infra` | `ecommerce-infra` | Infrastructure as Code |
| `{project}-helm-charts` | `ecommerce-helm-charts` | Kubernetes Helm charts |
| `{project}-docker` | `ecommerce-docker` | Docker configurations |
| `{project}-ci` | `ecommerce-ci` | CI/CD pipelines |

---

## Quick Reference Table

| Project Type | Pattern | Example |
|-------------|---------|---------|
| General API | `{project}-general-api` | `myapp-general-api` |
| Microservice | `{project}-service-{name}-api` | `myapp-service-auth-api` |
| Frontend | `{project}-fe` | `myapp-fe` |
| Mobile | `{project}-mobile-{platform}` | `myapp-mobile-flutter` |
| Desktop | `{project}-desktop-{framework}` | `myapp-desktop-electron` |
| Fullstack | `{project}-app` | `myapp-app` |
| Template | `{framework}-{type}-template` | `react-admin-template` |
| Infrastructure | `{project}-infra` | `myapp-infra` |

---

## Benefits of Standardized Naming

Adopting consistent naming conventions offers several advantages:

### 1. Clarity
Clear names help team members quickly identify the purpose and functionality of a repository, facilitating easier onboarding and collaboration.

### 2. Organization
A structured convention keeps repositories organized, especially in larger projects with multiple services.

### 3. Discoverability
Uniformity makes it easier for developers to search for and locate relevant repositories.

### 4. Efficiency
With clear names, developers spend less time figuring out project structures and more time writing code.

### 5. Automation
Consistent patterns enable automated tooling for CI/CD, documentation, and monitoring.

---

## Implementation Tips

1. **Document your conventions**: Create a CONTRIBUTING.md in your organization's main repository
2. **Use repository templates**: Set up templates that follow naming conventions
3. **Automate enforcement**: Use GitHub/GitLab webhook or pre-commit hooks to validate names
4. **Review existing repos**: Gradually rename legacy repositories to match conventions
5. **Team buy-in**: Ensure all team members understand and agree to the conventions

---

By implementing these repository naming conventions, development teams can maintain a well-organized codebase that enhances collaboration, improves efficiency, and promotes better understanding across all members.
