# cloudfabrik.net

Personal tech blog styled as a VS Code IDE with the One Dark Pro theme. A digital logbook documenting learnings in AI/ML, DevOps, Systems, Web, and Infrastructure.

## Tech Stack

- **Framework**: [Astro](https://astro.build) 5.x (Static Site Generation)
- **Styling**: Tailwind CSS 3.x with One Dark Pro color palette
- **Syntax Highlighting**: Shiki
- **Icons**: Lucide (local, no CDN)
- **Fonts**: Inter + JetBrains Mono (local, GDPR-compliant)

## Features

- IDE-style layout: header, sidebar, content area, statusbar
- Markdown-based content with Astro Content Collections
- Category-based organization (AI/ML, DevOps, Systems, Web, Infra)
- **Automatic GitHub Stars integration**: Scrapes your curated star lists and displays repo details with live star counts
- SEO-optimized with Open Graph support
- Fully static output - no client-side JavaScript required
- GDPR-compliant: all assets served locally

## Commands

```bash
npm install       # Install dependencies
npm run dev       # Start dev server at localhost:4321
npm run build     # Build static site to ./dist/
npm run preview   # Preview production build locally
```

## Configuration

### GitHub Stars Integration

To enable automatic scraping of your GitHub star lists:

1. Create a [GitHub Personal Access Token](https://github.com/settings/tokens):
   - Generate a **fine-grained personal access token**
   - Permissions: `Contents: Read` on public repositories
   - No expiration or set to 90 days

2. Copy `.env.local.example` to `.env.local` and add your token:
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local and add your GITHUB_TOKEN
   ```

The `GitHubStars` component automatically:
- Scrapes your GitHub star lists (e.g., `https://github.com/stars/abien/lists/ai-ml`)
- Fetches live star counts via GitHub GraphQL API
- Updates on every build
- Displays repos in list order

**Usage in components:**
```astro
<GitHubStars limit={10} username="abien" listName="ai-ml" />
```

**Note:** `.env.local` is in `.gitignore` and should never be committed.

## Project Structure

```
src/
├── components/      # Reusable .astro components
├── content/til/     # Markdown articles
├── layouts/         # BaseLayout, ArticleLayout
├── pages/           # index, archive, til/[...slug], 404
├── styles/          # global.css
└── utils/           # TypeScript utilities
public/              # Static assets (images, robots.txt)
docs/                # Implementation documentation
```

## Content

Add new articles to `src/content/til/` with this frontmatter:

```yaml
---
title: "Article Title"
description: "Brief description"
pubDate: 2026-01-24
category: "AI/ML"  # AI/ML | DevOps | Systems | Web | Infra
tags: ["tag1", "tag2"]
---
```

## License

MIT
