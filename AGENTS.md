# cloudfabrik.net - Agent Guidelines

## Project Overview

- **Framework**: Astro 5.x (SSG)
- **Styling**: Tailwind CSS 3.x + One Dark Pro theme
- **Language**: TypeScript (strict mode)
- **Content**: Markdown with Astro Content Collections
- **Icons**: Lucide (@lucide/astro, local)
- **Fonts**: Inter + JetBrains Mono (@fontsource, local)

## Commands

```bash
npm run dev       # Dev server at localhost:4321
npm run build     # Build to ./dist/
npm run preview   # Preview production build
```

**No test framework** - verify changes via `npm run build`.

## Project Structure

```
src/
├── components/      # Reusable .astro components
├── layouts/         # BaseLayout, ArticleLayout
├── pages/           # index, archive, til/[...slug]
├── content/til/     # Markdown articles
├── styles/          # global.css
└── utils/           # TypeScript utilities
public/              # Static assets
```

## Code Style - Astro Components

```astro
---
// 1. External imports
import { getCollection } from 'astro:content';
import { IconName } from '@lucide/astro';

// 2. Internal imports
import BaseLayout from '../layouts/BaseLayout.astro';
import { formatDate } from '../utils/date';

// 3. Props interface (always define)
interface Props {
  title: string;
  optional?: boolean;
}

// 4. Destructure with defaults
const { title, optional = false } = Astro.props;

// 5. Logic
const data = await getCollection('til');
---

<BaseLayout title={title}>
  <slot />
</BaseLayout>
```

## Code Style - TypeScript

```typescript
export type Category = 'AI/ML' | 'DevOps' | 'Systems' | 'Web' | 'Infra';

export function functionName(param: ParamType): ReturnType {
  // Implementation
}

const map: Record<Category, string> = { ... };
```

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `Header.astro` |
| Pages | kebab-case | `[...slug].astro` |
| Utilities | camelCase | `formatDate` |
| CSS classes | kebab-case | `bg-main` |
| Types | PascalCase | `Category` |

## Tailwind Colors (One Dark Pro)

```
bg-main (#282c34)       bg-editor (#21252b)     bg-hover (#2c313a)
border (#3e4451)        text-primary (#abb2bf)  text-muted (#5c6370)
text-bright (#ffffff)   accent (#61afef)        syntax-green (#98c379)
syntax-purple (#c678dd) syntax-orange (#d19a66) syntax-red (#e06c75)
```

## Content Schema

```yaml
---
title: "Article Title"
description: "Brief description"
pubDate: 2026-01-24
updatedDate: 2026-01-25  # optional
category: "AI/ML"        # AI/ML | DevOps | Systems | Web | Infra
tags: ["tag1", "tag2"]
draft: false             # optional
---
```

## Patterns

### Conditional Classes
```astro
<div class:list={['base', isActive && 'active', { 'cond': bool }]}>
```

### Conditional Rendering
```astro
{condition && <Component />}
{items.map((item) => <Item {item} />)}
```

### Date Functions
- `formatDate()` - ISO format (2026-01-24)
- `formatDateDisplay()` - Human format (Jan 24, 2026)
- Avoid `getRelativeTime()` for SSG (freezes at build)

## Constraints

1. **No External Requests** - All assets local (GDPR)
2. **No Type Suppression** - Never `@ts-ignore` or `as any`
3. **TypeScript Strict** - Uses `astro/tsconfigs/strict`
4. **SSG Only** - Static generation at build time

## Before Submitting

1. `npm run build` must succeed
2. No TypeScript errors
3. Imports correctly organized
4. Update `astro.config.mjs` site URL before deploy

## Rules

- Edit existing components before creating new
- Prefer Tailwind utilities over custom CSS
- Follow frontmatter schema exactly
- Keep all assets local (fonts, icons, images)
