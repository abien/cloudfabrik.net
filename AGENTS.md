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
npm run astro -- check   # Type check content + TS
```

**No lint/test framework** - verify changes via `npm run build` or `npm run astro -- check`.

### Single Test / Focused Checks
- There is no test runner or lint script. Use `npm run astro -- check` for type/content validation.
- For component-level changes, run `npm run build` to validate SSG output.

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

### Imports
- Order: external → internal → local assets
- One blank line between groups
- Use relative paths for local modules; no absolute aliases

### Formatting
- Use single quotes in TS/Astro unless the file already uses double quotes
- 2 spaces for indentation, no tabs
- Keep JSX/Astro props in a single line unless it hurts readability
- Favor small, composable blocks over nested logic

### Types
- Prefer explicit return types for exported functions
- Avoid type assertions (`as`) unless required by API contracts
- Keep unions and enums in a shared util when reused

### Error Handling
- Prefer safe fallbacks for content data (see category/icon helpers)
- Throw only when a failure is unrecoverable or should break the build
- Avoid silent failures; log in build-time only if necessary

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `Header.astro` |
| Pages | kebab-case | `[...slug].astro` |
| Utilities | camelCase | `formatDate` |
| CSS classes | kebab-case | `bg-main` |
| Types | PascalCase | `Category` |

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

### Component Patterns
- Use `class:list` for conditional classes
- Use inline boolean render (`condition && <Component />`) or `.map` for lists
- Use `formatDate()` for ISO and `formatDateDisplay()` for display
- Avoid `getRelativeTime()` for SSG (freezes at build)

### Content Collections
- Schema is enforced in `src/content.config.ts`
- Use `z.coerce.date()` for date fields
- Keep `draft` and `tags` defaults aligned with schema

## Constraints

1. **No External Requests** - All assets local (GDPR)
2. **No Type Suppression** - Never `@ts-ignore` or `as any`
3. **TypeScript Strict** - Uses `astro/tsconfigs/strict`
4. **SSG Only** - Static generation at build time

## Cursor/Copilot Rules

- No `.cursor/rules`, `.cursorrules`, or `.github/copilot-instructions.md` found in this repo.

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
