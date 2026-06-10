# Ahmad Nurhidayat — Personal Website

A modern personal website and technical blog built with [Astro](https://astro.build/) and [Tailwind CSS](https://tailwindcss.com/), featuring an Uber-inspired black & white design system.

**[ahmadnurhidayat.github.io](https://ahmadnurhidayat.github.io)** · **[docs.beyondyou.my.id](https://docs.beyondyou.my.id)**

## 🚀 Features

- 🖤 **Uber-inspired design system** — Black & white duet, pill-shaped interactive elements, sentence-case display typography, strict two-color brand system
- 🌓 **Light-first with dark mode** — Light mode by default, dark mode via system preference or toggle
- 📱 **Fully responsive** — Mobile-first, 1200px max-width container, collapsible nav
- ⚡ **Static site generation** — Astro 5 with static output, zero JavaScript by default
- 📝 **Content collections** — 43+ blog posts and 9 projects managed as type-safe Markdown collections
- 🔗 **Cross-linked with docs** — Two-way navigation bridge to [docs.beyondyou.my.id](https://docs.beyondyou.my.id) (50+ technical guides)
- 🔒 **Security-first CI/CD** — TruffleHog, Gitleaks, Trivy, and CodeQL scanning on every PR
- 🎨 **Interactive micro-animations** — Pill press states (`active:scale`), hover transitions, smooth scroll

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Astro 5](https://astro.build/) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) with `@tailwindcss/typography` |
| **Content** | Astro Content Collections (Markdown + Zod schemas) |
| **Language** | TypeScript |
| **Package manager** | [pnpm](https://pnpm.io/) 11 |
| **Deployment** | GitHub Pages via Actions |
| **CI/CD** | GitHub Actions — CI, Security Scanning, CodeQL, Dependabot |
| **Design system** | Uber Base Web — custom design tokens per `DESIGN.md` |

## 📂 Project Structure

```
/
├── .github/
│   ├── dependabot.yml              # Automated dependency updates
│   └── workflows/
│       ├── ci.yaml                 # Type check → build → validate → PR comment
│       ├── security.yaml           # TruffleHog + Gitleaks + Trivy
│       ├── codeql.yml              # CodeQL SAST (weekly)
│       └── deploy.yml              # GitHub Pages deployment
├── public/
│   ├── avatar.png
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── PostCard.astro          # Blog post card (tags, date, read-more)
│   │   ├── ProjectCard.astro       # Project card (image, pinned badge, tags)
│   │   └── DocsCard.astro          # External docs link card
│   ├── content/
│   │   ├── config.ts               # Zod schemas for posts & projects
│   │   ├── posts/                  # 43 blog posts (Markdown)
│   │   └── projects/               # 9 projects (Markdown)
│   ├── data/
│   │   └── featured-docs.ts        # Curated docs.beyondyou.my.id features
│   ├── layouts/
│   │   └── BaseLayout.astro        # Nav, footer, theme toggle, mobile menu
│   ├── pages/
│   │   ├── about.astro             # CV, experience, certs, tech stack
│   │   ├── index.astro             # Homepage (hero, projects, posts)
│   │   ├── posts/
│   │   │   ├── index.astro         # Post listing
│   │   │   └── [slug].astro        # Dynamic post page (mermaid, lightbox)
│   │   └── projects/
│   │       ├── index.astro         # Project listing
│   │       └── [slug].astro        # Dynamic project page
│   └── styles/
│       └── global.css              # Uber design system — pills, cards, prose
├── DESIGN.md                       # Full Uber Base Web design specification
├── tailwind.config.mjs             # Custom tokens (colors, typography, radius, shadows)
├── astro.config.mjs
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json
```

## 🧞 Commands

All commands use `pnpm`.

| Command           | Action                                       |
|-------------------|----------------------------------------------|
| `pnpm install`    | Install dependencies                         |
| `pnpm dev`        | Start local dev server at `localhost:4321`   |
| `pnpm build`      | Build production site to `./dist/`           |
| `pnpm preview`    | Preview build locally before deploying       |
| `pnpm astro check`| Run TypeScript type checking                 |

## 📝 Adding Content

### Blog Post

Create a new `.md` file in `src/content/posts/`:

```markdown
---
title: "Your Post Title"
description: "A brief description for SEO and cards"
date: 2025-06-15
tags: [kubernetes, devops, cicd]
draft: false
canonicalUrl: "https://docs.beyondyou.my.id/docs/01-knowledge-base/..."  # optional
---

Write your content in Markdown. Mermaid diagrams are supported via code blocks.
```

### Project

Create a new `.md` file in `src/content/projects/`:

```markdown
---
title: "Your Project Title"
description: "Brief description for cards"
year: "2025"
tags: [kubernetes, argocd, gitops]
pinned: false
link: "https://external-demo.com"     # optional
github: "https://github.com/..."      # optional
image: "/images/projects/thumb.png"   # optional
canonicalUrl: "https://docs.beyondyou.my.id/docs/..."  # optional
---

Write your project case study in Markdown.
```

### Content Schema

All fields are validated via Zod schemas defined in `src/content/config.ts`:
- **Posts**: `title`, `description`, `date`, `tags`, `draft`, `image`, `canonicalUrl`
- **Projects**: `title`, `description`, `year`, `tags`, `draft`, `pinned`, `link`, `github`, `image`, `canonicalUrl`

## 🔒 Security & CI/CD

Every push and pull request triggers a multi-layered security pipeline:

| Stage | Tool | What It Checks |
|---|---|---|
| **Type safety** | `astro check` | TypeScript validation |
| **Secret scan** | TruffleHog | Verified credential leaks in git history |
| **Pattern scan** | Gitleaks | Hardcoded secret patterns (keys, tokens) |
| **SCA** | Trivy | CRITICAL/HIGH CVEs + IaC misconfigurations |
| **SAST** | CodeQL | JavaScript/TypeScript vulnerabilities |
| **Build** | `astro build` | Production build + output validation |

All scans post results as PR comments and upload SARIF reports to GitHub's Security tab. Dependabot keeps dependencies updated weekly.

## 🚀 Deployment

Pushes to `main` trigger automatic deployment to GitHub Pages via `.github/workflows/deploy.yml`. The workflow:
1. Installs pnpm (version auto-detected from `packageManager`)
2. Installs dependencies (`--frozen-lockfile`)
3. Builds the production site
4. Validates output (page count, total size)
5. Deploys to GitHub Pages

## 🎨 Design System

This site follows the **Uber Base Web** design system documented in [`DESIGN.md`](./DESIGN.md):

- **Two-color system** — Black (`#000000`) and white (`#ffffff`) only; no accent colors
- **Pill geometry** — `rounded-pill` (999px) on every interactive element
- **Sentence-case display** — Inter weight 700, never letter-spaced, never all-caps
- **No default shadows** — Flat Level 0 cards; shadow reserved for elevated form cards
- **Alternating band rhythm** — White → black promo → white → black footer
- **Interactive micro-interactions** — `active:scale-[0.97]` press states, 250ms transitions

### Token Reference

| Token | Value | Use |
|---|---|---|
| `primary` | `#000000` | CTAs, footer fill |
| `canvas` | `#ffffff` | Page background |
| `canvas-soft` | `#efefef` | Gray pills, form inputs |
| `ink-body` | `#5e5e5e` | Secondary text |
| `ink-mute` | `#4b4b4b` | Footer links, muted text |
| `ink-light` | `#afafaf` | Placeholders |
| `interactive` | `#276EF1` | Links, focus rings, selection |
| `rounded-pill` | `999px` | Buttons, chips, badges |
| `rounded-card` | `16px` | All cards |

## 🔗 Integration with docs.beyondyou.my.id

The personal site and [docs.beyondyou.my.id](https://docs.beyondyou.my.id) form a **hub-and-spoke** architecture:

- **Personal site** → discovery layer: blog posts, project showcases, professional profile
- **Docs site** → deep reference: 50+ technical guides, interview prep, hands-on labs
- Each blog post includes a `canonicalUrl` linking to the authoritative docs version
- Navigation and footer include two-way cross-links between both domains

## 📄 License

MIT
