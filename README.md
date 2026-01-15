# Ahmad Nurhidayat - Personal Website

A modern personal website built with [Astro](https://astro.build/) and [Tailwind CSS](https://tailwindcss.com/).

## 🚀 Features

- ✨ Modern dark theme design
- 📱 Fully responsive
- ⚡ Fast static site generation with Astro
- 🎨 Styled with Tailwind CSS
- 📝 Content collections for easy markdown management

## 🛠️ Tech Stack

- **Framework:** Astro
- **Styling:** Tailwind CSS
- **Content:** Markdown with Content Collections
- **Deployment:** GitHub Pages

## 📂 Project Structure

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── PostCard.astro
│   │   └── ProjectCard.astro
│   ├── content/
│   │   ├── config.ts           # Content collections schema
│   │   ├── posts/              # Blog posts (markdown)
│   │   │   └── [posts].md
│   │   └── projects/           # Projects (markdown)
│   │       └── [projects].md
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── about.astro
│   │   ├── index.astro
│   │   ├── posts/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro    # Dynamic post page
│   │   └── projects/
│   │       ├── index.astro
│   │       └── [slug].astro    # Dynamic project page
│   └── styles/
│       └── global.css
└── package.json
```

## 🧞 Commands

| Command           | Action                                       |
|-------------------|----------------------------------------------|
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start local dev server at `localhost:4321`   |
| `npm run build`   | Build production site to `./dist/`           |
| `npm run preview` | Preview build locally before deploying       |

## 📝 Adding Content

### Adding a New Post

Create a new markdown file in `src/content/posts/`:

```markdown
---
title: "Your Post Title"
description: "A brief description of your post"
date: 2024-01-20
tags: ["tag1", "tag2"]
---

# Your Post Title

Write your content here using markdown...
```

### Adding a New Project

Create a new markdown file in `src/content/projects/`:

```markdown
---
title: "Your Project Title"
description: "A brief description of your project"
year: "2024"
tags: ["tag1", "tag2"]
github: "https://github.com/ahmadnurhidayat/repo"
link: "https://link.com"
---

# Your Project Title

Write your project details here using markdown...
```

## 🚀 Deployment

This site is automatically deployed to GitHub Pages when you push to the `main` branch via GitHub Actions.

## 📄 License

MIT License
