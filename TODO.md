# Hytale Server Modding Documentation - Astro Wiki

> **Project Goal:** Host comprehensive, searchable modding documentation on Astro/Starlight
> **Current Phase:** Astro Migration Complete - Quality Improvements
> **Platform:** Astro + Starlight documentation theme
> **Source:** `HytaleServer-sources.jar` (extracted to `extracted/`)
> **Last Updated:** 2026-01-19

---

## Project Structure

```
docs/
├── astro.config.mjs          # Astro + Starlight configuration
├── package.json              # npm dependencies
├── tsconfig.json             # TypeScript config
├── public/                   # Static assets (favicon, images)
├── src/
│   ├── content/
│   │   └── docs/             # All documentation (markdown)
│   │       ├── getting-started/
│   │       ├── core-concepts/
│   │       ├── api-reference/
│   │       ├── tutorials/
│   │       └── appendix/
│   ├── styles/
│   │   └── custom.css        # Custom Hytale theme
│   └── content.config.ts     # Content collection config
├── extracted/                # Source code for reference
├── CLAUDE.md                 # Contributor guide
└── TODO.md                   # This file
```

---

## Development Commands

```bash
# Start development server (hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Astro Migration Checklist

### Completed
- [x] Initialize Astro with Starlight template
- [x] Configure sidebar navigation
- [x] Move all 42 markdown files to `src/content/docs/`
- [x] Add frontmatter to all markdown files
- [x] Create custom Hytale theme CSS
- [x] Configure site metadata
- [x] Build successfully (44 pages)
- [x] Search indexing working (Pagefind)

### Remaining
- [ ] Deploy to hosting (Vercel/Netlify/GitHub Pages)
- [ ] Add custom logo/branding
- [ ] Configure site URL for sitemap
- [ ] Add Open Graph meta tags for social sharing

---

## Content Quality Tasks

### Phase 1: Code Example Verification
| Task | Status |
|------|--------|
| Create test plugin project | `[ ]` Not started |
| Verify Getting Started examples | `[ ]` Not started |
| Verify Core Concepts examples | `[ ]` Not started |
| Verify API Reference examples | `[ ]` Not started |
| Add missing imports to examples | `[ ]` Not started |

### Phase 2: Cross-Reference Improvements
| Task | Status |
|------|--------|
| Add "See Also" sections | `[ ]` Not started |
| Link related concepts | `[ ]` Not started |
| Verify internal links work | `[ ]` Not started |

### Phase 3: Consistency Pass
| Task | Status |
|------|--------|
| Standardize code formatting | `[ ]` Not started |
| Standardize method docs | `[ ]` Not started |
| Consistent terminology | `[ ]` Not started |
| Verify package paths | `[ ]` Not started |

---

## Documentation Statistics

| Category | Files | Pages | Status |
|----------|-------|-------|--------|
| Getting Started | 4 | 4 | Verified |
| Core Concepts | 4 | 4 | Verified |
| API Reference | 32 | 32 | Verified |
| Tutorials | 1 | 1 | In Progress |
| Appendix | 1 | 1 | Verified |
| Homepage | 1 | 1 | Complete |
| **Total** | **43** | **44** | - |

---

## Adding New Documentation

### 1. Create Markdown File

```bash
# Create new file in appropriate directory
touch src/content/docs/api-reference/new-topic/overview.md
```

### 2. Add Frontmatter

```markdown
---
title: "Topic Title"
description: "Brief description for SEO"
---

# Topic Title

Content here...
```

### 3. Update Sidebar (if needed)

Edit `astro.config.mjs` to add the new page to navigation:

```javascript
{
  label: 'New Topic',
  collapsed: true,
  items: [
    { label: 'Overview', slug: 'api-reference/new-topic/overview' },
  ],
},
```

### 4. Build and Test

```bash
npm run build
npm run preview
```

---

## Verification Tags

Use these tags at the top of markdown files:

```markdown
<!-- [VERIFIED: 2026-01-19] -->     # Confirmed accurate
<!-- [NEEDS-REVIEW] -->             # Needs accuracy check
<!-- [INCOMPLETE] -->               # Missing content
<!-- [EXAMPLE-NEEDED] -->           # Needs code example
```

---

## Hosting Options

### GitHub Pages (Free)
```bash
# Add to astro.config.mjs:
site: 'https://username.github.io',
base: '/repo-name',
```

### Vercel (Recommended)
- Connect GitHub repo
- Auto-deploys on push

### Netlify
- Connect GitHub repo
- Configure build: `npm run build`, publish: `dist`

---

## Working Notes

### Updating Navigation
The sidebar is configured in `astro.config.mjs`. Use `autogenerate` for auto-generated sections or manual `items` arrays for explicit ordering.

### Custom Components
Starlight provides built-in components:
- `<Card>` and `<CardGrid>` for feature grids
- `<Tabs>` and `<TabItem>` for tabbed content
- `<Steps>` for numbered instructions
- `<Aside>` for callouts (note, tip, caution, danger)

### Styling
Edit `src/styles/custom.css` for theme customization. CSS variables defined in `:root` control colors, fonts, and spacing.
