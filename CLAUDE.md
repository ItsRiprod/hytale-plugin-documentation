# Hytale Server Modding Documentation - Contributor Guide

## Project Overview

This is an **Astro-powered documentation wiki** for Hytale server plugin development. The documentation is built using [Starlight](https://starlight.astro.build/), Astro's official documentation theme.

### Quick Commands

```bash
npm run dev      # Start dev server with hot reload (localhost:4321)
npm run build    # Build production site to dist/
npm run preview  # Preview production build locally
```

---

## Project Structure

```
docs/
├── astro.config.mjs          # Site config, sidebar navigation
├── package.json              # Dependencies
├── src/
│   ├── content/
│   │   └── docs/             # ALL documentation lives here
│   │       ├── getting-started/
│   │       ├── core-concepts/
│   │       ├── api-reference/
│   │       ├── tutorials/
│   │       └── appendix/
│   ├── styles/
│   │   └── custom.css        # Hytale theme customization
│   └── content.config.ts     # Content schema
├── public/                   # Static assets (favicon, images)
├── extracted/                # Source code reference (~5,218 Java files)
├── CLAUDE.md                 # This file
└── TODO.md                   # Task tracking
```

---

## Documentation Workflow

### Adding New Documentation

1. **Create the markdown file** in `src/content/docs/`:
   ```bash
   touch src/content/docs/api-reference/new-topic/overview.md
   ```

2. **Add required frontmatter**:
   ```markdown
   ---
   title: "Your Page Title"
   ---

   <!-- [VERIFIED: 2026-01-19] -->

   # Your Page Title

   Content here...
   ```

3. **Update sidebar** in `astro.config.mjs`:
   ```javascript
   {
     label: 'New Topic',
     collapsed: true,
     items: [
       { label: 'Overview', slug: 'api-reference/new-topic/overview' },
     ],
   },
   ```

4. **Build and verify**:
   ```bash
   npm run build
   ```

### Editing Existing Documentation

1. Find the file in `src/content/docs/`
2. Edit the markdown content
3. Run `npm run dev` to preview changes
4. Build to verify: `npm run build`

---

## Source Material

**Location:** `extracted/com/hypixel/hytale/`
**Total Files:** ~5,218 Java files across ~932 packages

### Key Package Reference

| Package | Purpose | Doc Location |
|---------|---------|--------------|
| `server/core/plugin/` | Plugin system | `getting-started/` |
| `server/core/event/` | Events | `core-concepts/event-system.md` |
| `server/core/command/` | Commands | `core-concepts/commands.md` |
| `component/` | ECS | `core-concepts/ecs-overview.md` |
| `server/core/universe/` | World system | `api-reference/world/` |
| `protocol/` | Networking | `api-reference/networking/` |
| `server/core/permissions/` | Permissions | `api-reference/permissions/` |
| `codec/` | Serialization | `api-reference/serialization/` |
| `server/core/modules/physics/` | Physics | `api-reference/physics/` |
| `builtin/` | Reference plugins | `tutorials/builtin-plugins.md` |

---

## Documentation Standards

### Frontmatter (Required)

Every markdown file must have frontmatter:

```markdown
---
title: "Page Title"
---
```

Optional fields:
```markdown
---
title: "Page Title"
description: "SEO description"
sidebar:
  order: 1
  badge:
    text: 'New'
    variant: 'tip'
---
```

### Verification Tags

Place at the top of content (after frontmatter):

```markdown
<!-- [VERIFIED: 2026-01-19] -->     # Confirmed accurate
<!-- [NEEDS-REVIEW] -->             # Needs accuracy check
<!-- [INCOMPLETE] -->               # Missing content
<!-- [EXAMPLE-NEEDED] -->           # Needs code example
```

### File Structure Template

```markdown
---
title: "Topic Name"
---

<!-- [VERIFIED: 2026-01-19] -->

# Topic Name

Brief description of what this covers.

## Package Location

`com.hypixel.hytale.path.to.package`

## Overview

Architecture explanation.

## Core Classes

### ClassName

Description.

**Methods:**
| Method | Return | Description |
|--------|--------|-------------|
| `methodName()` | `Type` | What it does |

## Usage Examples

```java
import com.hypixel.hytale.path.ClassName;

// Complete example with imports
```

## Related Documentation

- [Related Topic](/api-reference/related/overview/)
```

### Code Example Requirements

1. **Include imports** - Every example must show necessary imports
2. **Be compilable** - No `...` or placeholders
3. **Be practical** - Match patterns from builtin plugins
4. **Be concise** - Minimal code to demonstrate the point

---

## Starlight Components

Use these in `.mdx` files for enhanced formatting:

### Cards

```mdx
import { Card, CardGrid } from '@astrojs/starlight/components';

<CardGrid>
  <Card title="Title" icon="rocket">
    Description text
  </Card>
</CardGrid>
```

### Callouts

```mdx
import { Aside } from '@astrojs/starlight/components';

<Aside type="note">Note content</Aside>
<Aside type="tip">Tip content</Aside>
<Aside type="caution">Caution content</Aside>
<Aside type="danger">Danger content</Aside>
```

### Tabs

```mdx
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
  <TabItem label="Gradle">Gradle content</TabItem>
  <TabItem label="Maven">Maven content</TabItem>
</Tabs>
```

---

## Quality Checklist

Before marking documentation complete:

### Accuracy
- [ ] Class names match source code
- [ ] Method signatures are correct
- [ ] Package paths are accurate
- [ ] Code examples compile

### Completeness
- [ ] Frontmatter with title
- [ ] Package location stated
- [ ] All public methods documented
- [ ] At least one working example

### Usability
- [ ] Clear introduction
- [ ] Practical examples
- [ ] Cross-references to related docs
- [ ] No TODO/placeholder text

### Final Steps
- [ ] Add `[VERIFIED: YYYY-MM-DD]` tag
- [ ] Run `npm run build` successfully
- [ ] Update TODO.md if needed

---

## Built-in Plugin Reference

Use these as examples when documenting APIs:

| Plugin | Location | Key Patterns |
|--------|----------|--------------|
| WeatherPlugin | `builtin/weather/` | Components, systems, commands |
| FluidPlugin | `builtin/fluid/` | Block states, fluid simulation |
| MountPlugin | `builtin/mounts/` | Entity relationships, packets |
| TeleportPlugin | `builtin/teleport/` | Commands, location handling |
| CraftingPlugin | `builtin/crafting/` | Recipes, inventory events |

### Finding Usage Examples

```bash
# Search builtin plugins for API usage
grep -r "ClassName" extracted/com/hypixel/hytale/builtin/
```

---

## Common Patterns

### Plugin Registration
```java
public class MyPlugin extends JavaPlugin {
    public MyPlugin(JavaPluginInit init) {
        super(init);
    }

    @Override
    protected void setup() {
        getEventRegistry().register(PlayerConnectEvent.class, this::onConnect);
        getCommandRegistry().register(new MyCommand());
    }
}
```

### Event Handling
```java
getEventRegistry().register(
    EventPriority.EARLY,
    PlayerChatEvent.class,
    event -> {
        if (event.getMessage().contains("banned")) {
            event.setCancelled(true);
        }
    }
);
```

### Command Creation
```java
public class GreetCommand extends AbstractPlayerCommand<GreetCommand> {
    public GreetCommand() {
        super("greet", "Greets the player");
    }

    @Override
    protected void execute(CommandContext context, Player player) {
        context.sendSuccess("Hello, " + player.getUsername() + "!");
    }
}
```

---

## Troubleshooting

### Build Errors

**"title: Required"** - Add frontmatter with title to the markdown file

**"Entry not found"** - Check that the slug in `astro.config.mjs` matches the file path

**"Component not found"** - Use `.mdx` extension for files with Starlight components

### Dev Server Issues

```bash
# Clear cache and rebuild
rm -rf node_modules/.astro
npm run dev
```
