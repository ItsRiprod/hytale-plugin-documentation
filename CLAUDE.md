# Hytale Server Modding Docs - Contributor Guide

## Quick Commands

```bash
npm run dev      # Start dev server (http://localhost:4322/)
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## Project Structure

```
docs/
├── astro.config.mjs          # Site config, sidebar navigation
├── src/
│   ├── content/docs/         # All documentation (markdown/mdx)
│   └── styles/custom.css     # Theme customization
├── public/                   # Static assets (favicon, images)
└── extracted/                # Source code reference (~5,218 Java files)
```

---

## Adding Documentation

1. Create file in `src/content/docs/`
2. Add frontmatter:
   ```markdown
   ---
   title: "Page Title"
   ---
   ```
3. Add to sidebar in `astro.config.mjs` if needed
4. Run `npm run build` to verify

---

## Editing Files

| To change... | Edit this file |
|--------------|----------------|
| Site title, sidebar | `astro.config.mjs` |
| Colors, fonts, spacing | `src/styles/custom.css` |
| Homepage | `src/content/docs/index.mdx` |
| Any doc page | `src/content/docs/**/*.md` |

---

## Starlight Components (MDX only)

```mdx
import { Card, CardGrid, Aside, Tabs, TabItem } from '@astrojs/starlight/components';

<Aside type="note">Note content</Aside>
<Aside type="tip">Tip content</Aside>
<Aside type="caution">Caution content</Aside>
<Aside type="danger">Danger content</Aside>

<CardGrid>
  <Card title="Title" icon="rocket">Content</Card>
</CardGrid>

<Tabs>
  <TabItem label="Tab 1">Content</TabItem>
  <TabItem label="Tab 2">Content</TabItem>
</Tabs>
```

---

## Installed Plugins

Currently configured in `astro.config.mjs`:

| Plugin | Purpose | Status |
|--------|---------|--------|
| `starlight-image-zoom` | Click-to-zoom on images | Active |
| `starlight-links-validator` | Catches broken links at build time | Active |

**Evaluated but not installed:**

| Plugin | Reason |
|--------|--------|
| `remark-mermaidjs` | Requires Playwright, incompatible with Cloudflare Workers |
| `pagefind` | Built-in search disabled due to SSR/Workers incompatibility |
| `starlight-blog` | Not needed - no changelog section planned |
| `starlight-openapi` | Not applicable - no REST API docs |
| `starlight-typedoc` | Not applicable - Java codebase |

**To add plugins:**
1. `npm install plugin-name`
2. Add to `integrations` or `plugins` array in `astro.config.mjs`
3. Document in this table

---

## Code Example Standards

- Include all imports
- No placeholders (`...`, `// TODO`)
- Keep examples minimal but complete
- Use patterns from `extracted/com/hypixel/hytale/builtin/` as reference

---

## Source Code Reference

Key packages in `extracted/com/hypixel/hytale/`:

| Package | Purpose |
|---------|---------|
| `server/core/plugin/` | Plugin system |
| `server/core/event/` | Events |
| `server/core/command/` | Commands |
| `component/` | ECS components |
| `builtin/` | Reference plugin implementations |

---

## Troubleshooting

**"title: Required"** - Add frontmatter with title

**"Entry not found"** - Check slug in `astro.config.mjs` matches file path

**Components not rendering** - Use `.mdx` extension, not `.md`

**Clear cache:**
```bash
rm -rf node_modules/.astro && npm run dev
```
