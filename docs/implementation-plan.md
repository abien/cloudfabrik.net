# AI Journey Logbook - Implementierungsplan

## Projekt-Übersicht

**Ziel:** Statisches Logbuch zur Dokumentation einer "AI Journey" aus Sicht eines System Engineers.
**Tech Stack:** Astro (SSG) + Tailwind CSS + Shiki (Syntax Highlighting)
**Design:** One Dark Pro Theme (VS Code)
**Hosting:** Cloudflare Pages

---

## Profildaten

- **Alias:** abien
- **E-Mail:** abien@cloudfabrik.net (obfuskiert: `a***@c*********.net`)
- **GitHub:** https://github.com/abien/
- **LinkedIn:** https://www.linkedin.com/in/alexanderbien/
- **Bio:** 25+ Jahre IT-Infrastruktur & Ops-Erfahrung. Aktuell CIO @ Symgenius GmbH & Co. KG
- **Profilbild:** input/headshot1582733442625.jpg

---

## Farbschema (One Dark Pro)

| Verwendung | Farbe | Hex |
|------------|-------|-----|
| Background (Main) | Dunkelgrau | `#282c34` |
| Background (Editor/Sidebar) | Dunkler | `#21252b` |
| Border | Grau | `#3e4451` |
| Text (Standard) | Hellgrau | `#abb2bf` |
| Text (Muted) | Grau | `#5c6370` |
| Primary (Blau) | Blau | `#61afef` |
| Syntax Green | Grün | `#98c379` |
| Syntax Purple | Lila | `#c678dd` |
| Syntax Orange | Orange | `#d19a66` |
| Statusbar Background | Blau | `#61afef` |
| Statusbar Text | Dunkel | `#111a21` |

---

## Kategorien (Namespaces)

1. `AI/ML` - KI und Machine Learning
2. `DevOps` - CI/CD, Automation, Tooling
3. `Systems` - Betriebssysteme, Low-Level
4. `Web` - Frontend, Backend, APIs
5. `Infra` - Cloud, Networking, Hardware

---

## Seitenstruktur

```
/                    → Startseite (Home)
/til/[slug]          → Einzelner Artikel
/archive             → Chronologisches Archiv
```

---

## PHASE 1: Projekt-Setup

### Task 1.1: Astro-Projekt initialisieren
**Priorität:** Hoch | **Geschätzte Zeit:** 15 Min

```bash
npm create astro@latest ai-logbook -- --template minimal --typescript strict
cd ai-logbook
```

**Erwartete Verzeichnisstruktur:**
```
ai-logbook/
├── src/
│   ├── pages/
│   ├── layouts/
│   ├── components/
│   └── content/
├── public/
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

### Task 1.2: Dependencies installieren
**Priorität:** Hoch | **Geschätzte Zeit:** 5 Min

```bash
npm install @astrojs/tailwind tailwindcss
npm install -D @tailwindcss/typography
```

---

### Task 1.3: Tailwind CSS konfigurieren
**Priorität:** Hoch | **Geschätzte Zeit:** 20 Min

**Datei: `tailwind.config.mjs`**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bg-main': '#282c34',
        'bg-editor': '#21252b',
        'bg-hover': '#2c313a',
        'border': '#3e4451',
        'text-primary': '#abb2bf',
        'text-muted': '#5c6370',
        'text-bright': '#ffffff',
        'accent': '#61afef',
        'syntax-green': '#98c379',
        'syntax-purple': '#c678dd',
        'syntax-orange': '#d19a66',
        'syntax-red': '#e06c75',
        'statusbar-bg': '#61afef',
        'statusbar-text': '#111a21',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'Consolas', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#abb2bf',
            '--tw-prose-headings': '#ffffff',
            '--tw-prose-links': '#61afef',
            '--tw-prose-code': '#61afef',
            '--tw-prose-pre-bg': '#21252b',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
```

---

### Task 1.4: Astro-Konfiguration anpassen
**Priorität:** Hoch | **Geschätzte Zeit:** 15 Min

**Datei: `astro.config.mjs`**
```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://ai-logbook.example.com', // Später anpassen
  integrations: [tailwind()],
  markdown: {
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: true,
    },
  },
  build: {
    assets: '_assets',
  },
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
```

---

### Task 1.5: Lokale Fonts einrichten
**Priorität:** Hoch | **Geschätzte Zeit:** 30 Min

**Schritte:**
1. JetBrains Mono herunterladen: https://www.jetbrains.com/lp/mono/
2. Inter herunterladen: https://rsms.me/inter/

**Verzeichnis erstellen:**
```
public/
└── fonts/
    ├── JetBrainsMono-Regular.woff2
    ├── JetBrainsMono-Medium.woff2
    ├── JetBrainsMono-Bold.woff2
    ├── Inter-Regular.woff2
    ├── Inter-Medium.woff2
    ├── Inter-Bold.woff2
    └── Inter-Black.woff2
```

**Datei: `src/styles/fonts.css`**
```css
@font-face {
  font-family: 'JetBrains Mono';
  src: url('/fonts/JetBrainsMono-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'JetBrains Mono';
  src: url('/fonts/JetBrainsMono-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Black.woff2') format('woff2');
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}
```

---

### Task 1.6: Lokale Icons einrichten (Lucide)
**Priorität:** Hoch | **Geschätzte Zeit:** 20 Min

```bash
npm install lucide-astro
```

**Verwendung in Komponenten:**
```astro
---
import { Terminal, Search, Github, Linkedin, Home, Lightbulb, RefreshCw, Archive } from 'lucide-astro';
---
<Terminal class="w-5 h-5" />
```

**Icon-Mapping für die Seite:**

| Zweck | Lucide Icon |
|-------|-------------|
| Logo/Terminal | `Terminal` |
| Suche | `Search` |
| GitHub | `Github` |
| LinkedIn | `Linkedin` |
| Home | `Home` |
| TIL | `Lightbulb` |
| Updated | `RefreshCw` |
| Archive | `Archive` |
| Settings | `Settings` |
| Edit | `Pencil` |
| Calendar | `Calendar` |
| Clock | `Clock` |
| User | `User` |
| Share | `Share2` |
| Bookmark | `Bookmark` |
| Link | `Link` |
| ChevronRight | `ChevronRight` |
| Code | `Code` |
| Copy | `Copy` |
| Git Branch | `GitBranch` |
| Sync | `RefreshCw` |
| Warning | `AlertTriangle` |
| Check | `CheckCircle` |

---

### Task 1.7: Profilbild kopieren und optimieren
**Priorität:** Mittel | **Geschätzte Zeit:** 10 Min

```bash
mkdir -p public/images
cp input/headshot1582733442625.jpg public/images/profile.jpg
```

Astro optimiert das Bild automatisch bei Verwendung von `<Image />`.

---

## PHASE 2: Content Collections Setup

### Task 2.1: Content Collection Schema definieren
**Priorität:** Hoch | **Geschätzte Zeit:** 20 Min

**Datei: `src/content.config.ts`**
```typescript
import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const til = defineCollection({
  loader: glob({ pattern: '**/*.md', base: "./src/content/til" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(['AI/ML', 'DevOps', 'Systems', 'Web', 'Infra']),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { til };
```

---

### Task 2.2: Content-Verzeichnis erstellen
**Priorität:** Hoch | **Geschätzte Zeit:** 5 Min

```bash
mkdir -p src/content/til
```

---

### Task 2.3: Demo-Artikel erstellen (10 Stück)
**Priorität:** Mittel | **Geschätzte Zeit:** 45 Min

**Verzeichnis: `src/content/til/`**

Die folgenden 10 Demo-Artikel sollen erstellt werden:

1. **implementing-rag-with-pinecone.md** (AI/ML)
   - Titel: "Implementing RAG with Pinecone and LlamaIndex"
   - Thema: Production-ready RAG Pipeline Setup

2. **kubernetes-sidecar-containers.md** (DevOps)
   - Titel: "Kubernetes Sidecar Containers in v1.29"
   - Thema: Native Sidecar Support in K8s

3. **rust-ownership-cell-types.md** (Systems)
   - Titel: "Rust Ownership and Cell Types"
   - Thema: Interior Mutability mit Cell/RefCell

4. **vector-database-indexing.md** (AI/ML)
   - Titel: "Vector Database Indexing: HNSW vs IVF"
   - Thema: ANN-Algorithmen Vergleich

5. **prometheus-metric-types.md** (DevOps)
   - Titel: "Prometheus Metric Types Explained"
   - Thema: Counter, Gauge, Histogram, Summary

6. **fastapi-background-tasks.md** (Web)
   - Titel: "FastAPI Background Tasks and Celery Integration"
   - Thema: Async Processing Patterns

7. **terraform-state-management.md** (Infra)
   - Titel: "Terraform State Management Best Practices"
   - Thema: Remote Backend, Locking, Workspaces

8. **docker-multi-stage-builds.md** (DevOps)
   - Titel: "Docker Multi-Stage Builds for Production"
   - Thema: Image Size Optimization

9. **llm-inference-optimization.md** (AI/ML)
   - Titel: "LLM Inference Optimization Techniques"
   - Thema: Quantization, vLLM, Batching

10. **ssh-hardening-guide.md** (Infra)
    - Titel: "SSH Hardening Guide for Production Servers"
    - Thema: Security Best Practices

---

## PHASE 3: Layout & Komponenten

### Task 3.1: Base Layout erstellen
**Priorität:** Hoch | **Geschätzte Zeit:** 30 Min

**Datei: `src/layouts/BaseLayout.astro`**

Enthält:
- HTML-Grundstruktur mit `<html class="dark">`
- Meta-Tags für SEO
- Font-Imports (lokal)
- Globale Styles
- Slot für Content

---

### Task 3.2: Header-Komponente erstellen
**Priorität:** Hoch | **Geschätzte Zeit:** 45 Min

**Datei: `src/components/Header.astro`**

Elemente:
- Terminal-Icon + "AI_LOGBOOK://HOME" Branding
- Such-Dummy Input (Platzhalter für spätere Implementierung)
- Settings/Notifications Icons (dekorativ)

Styling:
- `bg-bg-editor` Background
- `border-b border-border`
- Sticky `top-0 z-50`

---

### Task 3.3: Sidebar-Komponente erstellen
**Priorität:** Hoch | **Geschätzte Zeit:** 60 Min

**Datei: `src/components/Sidebar.astro`**

Elemente:
- Profilbereich:
  - Profilbild (rounded, border)
  - Alias "abien"
  - E-Mail obfuskiert "a***@g**.net"
- Navigation:
  - 0x00_Home (aktiv-State)
  - 0x01_TIL
  - 0x02_Updated
  - 0x03_Archive
- Social Links:
  - GitHub
  - LinkedIn

Props:
- `currentPage: string` für aktiven State

---

### Task 3.4: Statusbar (Footer) Komponente erstellen
**Priorität:** Hoch | **Geschätzte Zeit:** 45 Min

**Datei: `src/components/Statusbar.astro`**

Elemente (Links):
- Git Branch Icon + "main*"
- Sync Icon + "SYNC_OK"
- Warning Icon + "0 Errors"

Elemente (Rechts):
- Last Build Timestamp (dynamisch aus Build-Zeit)
- "Spaces: 4"
- "UTF-8"

Dynamische Werte:
- Build-Zeit via `new Date().toISOString()` zur Build-Zeit

Styling:
- `h-6 bg-statusbar-bg text-statusbar-text`
- `text-[10px] font-mono`

---

### Task 3.5: TIL-Tabellen-Komponente erstellen
**Priorität:** Hoch | **Geschätzte Zeit:** 45 Min

**Datei: `src/components/TilTable.astro`**

Props:
- `entries: CollectionEntry<'til'>[]`
- `limit?: number` (default: 10)

Spalten:
- ID (Hex-Format, z.B. "0x4F2")
- Log_Entry_Title (Link zum Artikel)
- Namespace (Kategorie-Badge mit Farbe)
- Delta (relative Zeit, z.B. "2h ago")

Kategorie-Farben:
- AI/ML: `bg-accent/10 text-accent border-accent/20`
- DevOps: `bg-syntax-purple/10 text-syntax-purple border-syntax-purple/20`
- Systems: `bg-syntax-orange/10 text-syntax-orange border-syntax-orange/20`
- Web: `bg-syntax-green/10 text-syntax-green border-syntax-green/20`
- Infra: `bg-syntax-red/10 text-syntax-red border-syntax-red/20`

---

### Task 3.6: Updated-Grid-Komponente erstellen
**Priorität:** Mittel | **Geschätzte Zeit:** 40 Min

**Datei: `src/components/UpdatedGrid.astro`**

Props:
- `entries: CollectionEntry<'til'>[]`
- `excludeIds?: string[]` (IDs die bereits in TIL angezeigt werden)
- `limit?: number` (default: 10)

Darstellung:
- 2-Spalten Grid auf Desktop
- Karten mit:
  - "MODIFIED: Xm ago"
  - Titel
  - Beschreibung (2 Zeilen, truncated)

---

### Task 3.7: Artikel-Layout erstellen
**Priorität:** Hoch | **Geschätzte Zeit:** 60 Min

**Datei: `src/layouts/ArticleLayout.astro`**

Struktur:
- Header (wiederverwendet)
- 3-Spalten Layout:
  - Links: TOC (Table of Contents)
  - Mitte: Artikel-Content
  - Rechts: Autoren-Info + Share
- Footer/Statusbar

TOC-Komponente:
- Automatisch generiert aus Headings
- Aktiver State beim Scrollen (optional, kann später hinzugefügt werden)
- Reading Progress Bar

Autoren-Sidebar:
- Profilbild
- Name: "abien"
- Rolle: "CIO @ Symgenius"
- Bio (kurz)
- Share-Buttons (dekorativ)

---

### Task 3.8: Code-Block-Komponente erstellen
**Priorität:** Mittel | **Geschätzte Zeit:** 30 Min

**Datei: `src/components/CodeBlock.astro`**

Features:
- Dateiname-Header (optional)
- Farbige Punkte (rot, gelb, grün) wie macOS Terminal
- Copy-Button
- Shiki Syntax Highlighting (automatisch via Astro)

---

### Task 3.9: Archiv-Liste-Komponente erstellen
**Priorität:** Mittel | **Geschätzte Zeit:** 30 Min

**Datei: `src/components/ArchiveList.astro`**

Props:
- `entries: CollectionEntry<'til'>[]`

Darstellung:
- Einfache Liste
- Pro Eintrag: Datum | Icon | Titel
- Hover-State mit Chevron

---

## PHASE 4: Seiten erstellen

### Task 4.1: Startseite (Home) erstellen
**Priorität:** Hoch | **Geschätzte Zeit:** 45 Min

**Datei: `src/pages/index.astro`**

Inhalt:
- BaseLayout mit Header + Sidebar
- Section "[01] TODAY_I_LEARNED (10_RECENT)" mit TilTable
- Section "[02] RECENTLY_UPDATED (NON_TIL)" mit UpdatedGrid
- Statusbar

Daten-Fetching:
```typescript
import { getCollection } from 'astro:content';

const allPosts = await getCollection('til', ({ data }) => !data.draft);
const sortedByDate = allPosts.sort((a, b) => 
  b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
);
const recentTil = sortedByDate.slice(0, 10);

const sortedByUpdate = allPosts
  .filter(p => p.data.updatedDate)
  .sort((a, b) => b.data.updatedDate!.valueOf() - a.data.updatedDate!.valueOf());
const recentUpdated = sortedByUpdate
  .filter(p => !recentTil.includes(p))
  .slice(0, 10);
```

---

### Task 4.2: Artikel-Seite (Dynamic Route) erstellen
**Priorität:** Hoch | **Geschätzte Zeit:** 45 Min

**Datei: `src/pages/til/[...slug].astro`**

Features:
- getStaticPaths für alle Artikel
- ArticleLayout verwenden
- Markdown-Content rendern
- Breadcrumb: Home / TIL / [slug]
- Meta-Tags (Titel, Datum, Tags)
- Previous/Next Navigation

---

### Task 4.3: Archiv-Seite erstellen
**Priorität:** Mittel | **Geschätzte Zeit:** 30 Min

**Datei: `src/pages/archive.astro`**

Inhalt:
- Einfaches Layout (Header, kein Sidebar)
- Überschrift "LOG ARCHIVE"
- Hinweis "Press Ctrl+F to search"
- ArchiveList mit allen Artikeln
- Statusbar

---

## PHASE 5: Utilities & Helpers

### Task 5.1: Datum-Formatierung Helper erstellen
**Priorität:** Mittel | **Geschätzte Zeit:** 20 Min

**Datei: `src/utils/date.ts`**

Funktionen:
```typescript
// Relative Zeit (z.B. "2h ago", "3d ago")
export function getRelativeTime(date: Date): string

// ISO Format (z.B. "2026-01-24")
export function formatDate(date: Date): string

// Build-Zeit für Statusbar
export function getBuildTime(): string
```

---

### Task 5.2: ID-Generator Helper erstellen
**Priorität:** Niedrig | **Geschätzte Zeit:** 10 Min

**Datei: `src/utils/id.ts`**

```typescript
// Generiert Hex-ID basierend auf Index
export function generateHexId(index: number, offset: number = 0x4F0): string {
  return `0x${(offset + index).toString(16).toUpperCase()}`;
}
```

---

### Task 5.3: E-Mail Obfuskierung Helper erstellen
**Priorität:** Niedrig | **Geschätzte Zeit:** 10 Min

**Datei: `src/utils/email.ts`**

```typescript
// Obfuskiert E-Mail für Anzeige
export function obfuscateEmail(email: string): string {
  const [local, domain] = email.split('@');
  const [domainName, tld] = domain.split('.');
  return `${local[0]}***@${domainName[0]}**.${tld}`;
}
// "abien@cloudfabrik.net" → "a***@c*********.net"
```

---

## PHASE 6: SEO & Performance

### Task 6.1: Meta-Tags Komponente erstellen
**Priorität:** Mittel | **Geschätzte Zeit:** 30 Min

**Datei: `src/components/SEO.astro`**

Props:
- `title: string`
- `description: string`
- `image?: string`
- `article?: boolean`
- `publishedTime?: Date`

Output:
- `<title>`
- `<meta name="description">`
- Open Graph Tags
- Twitter Card Tags
- Canonical URL

---

### Task 6.2: Sitemap generieren
**Priorität:** Mittel | **Geschätzte Zeit:** 15 Min

```bash
npm install @astrojs/sitemap
```

**astro.config.mjs aktualisieren:**
```javascript
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://your-domain.com',
  integrations: [tailwind(), sitemap()],
});
```

---

### Task 6.3: robots.txt erstellen
**Priorität:** Niedrig | **Geschätzte Zeit:** 5 Min

**Datei: `public/robots.txt`**
```
User-agent: *
Allow: /

Sitemap: https://your-domain.com/sitemap-index.xml
```

---

### Task 6.4: 404-Seite erstellen
**Priorität:** Niedrig | **Geschätzte Zeit:** 20 Min

**Datei: `src/pages/404.astro`**

Design:
- One Dark Pro Theme
- Terminal-Style Fehlermeldung
- Link zurück zur Startseite

---

## PHASE 7: Cloudflare Pages Deployment

### Task 7.1: Build-Konfiguration prüfen
**Priorität:** Hoch | **Geschätzte Zeit:** 10 Min

**package.json Scripts:**
```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  }
}
```

---

### Task 7.2: Cloudflare Pages Setup
**Priorität:** Hoch | **Geschätzte Zeit:** 30 Min

**Schritte:**
1. GitHub Repository erstellen und Code pushen
2. Cloudflare Dashboard → Pages → Create Project
3. GitHub Repository verbinden
4. Build-Einstellungen:
   - Framework preset: Astro
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node.js version: 18 (oder höher)

---

### Task 7.3: Custom Domain konfigurieren (optional)
**Priorität:** Niedrig | **Geschätzte Zeit:** 15 Min

**Schritte:**
1. Pages Project → Custom domains
2. Domain hinzufügen
3. DNS-Einträge bei Cloudflare konfigurieren (CNAME)

---

## PHASE 8: Finale Überprüfung

### Task 8.1: Lighthouse Audit
**Priorität:** Mittel | **Geschätzte Zeit:** 20 Min

Zielwerte:
- Performance: > 95
- Accessibility: > 95
- Best Practices: > 95
- SEO: > 95

---

### Task 8.2: Cross-Browser Testing
**Priorität:** Niedrig | **Geschätzte Zeit:** 30 Min

Browser:
- Chrome
- Firefox
- Safari
- Edge

---

### Task 8.3: Mobile Responsiveness
**Priorität:** Mittel | **Geschätzte Zeit:** 30 Min

Breakpoints prüfen:
- Mobile (< 640px): Sidebar collapsed/hidden
- Tablet (640px - 1024px): Angepasstes Layout
- Desktop (> 1024px): Volle 3-Spalten Ansicht

---

## Zusammenfassung

### Geschätzte Gesamtzeit: ~15-20 Stunden

| Phase | Tasks | Zeit |
|-------|-------|------|
| Phase 1: Setup | 7 Tasks | ~2h |
| Phase 2: Content | 3 Tasks | ~1.5h |
| Phase 3: Komponenten | 9 Tasks | ~6h |
| Phase 4: Seiten | 3 Tasks | ~2h |
| Phase 5: Utilities | 3 Tasks | ~1h |
| Phase 6: SEO | 4 Tasks | ~1.5h |
| Phase 7: Deployment | 3 Tasks | ~1h |
| Phase 8: Testing | 3 Tasks | ~1.5h |

### Kritischer Pfad

1. Task 1.1-1.4 (Projekt-Setup)
2. Task 2.1-2.2 (Content Collections)
3. Task 3.1-3.4 (Core Layouts)
4. Task 4.1 (Startseite)
5. Task 7.1-7.2 (Deployment)

### Abhängigkeiten

```
Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 7
                ↓
            Phase 5 (parallel)
                ↓
            Phase 6 (parallel)
                        ↓
                    Phase 8
```

---

## Referenzen

- **Beispiel-Layouts:** `input/main/`, `input/article/`, `input/archive/`
- **Astro Docs:** https://docs.astro.build
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Lucide Icons:** https://lucide.dev/icons
- **JetBrains Mono:** https://www.jetbrains.com/lp/mono/
- **Inter Font:** https://rsms.me/inter/
- **Cloudflare Pages:** https://developers.cloudflare.com/pages/
