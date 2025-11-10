---
title: Configuration
description: How to configure Leaf for your documentation site
---

# Configuration

Leaf is configured through a `leaf.config.ts` file in your project root.

## Config File

Create a `leaf.config.ts` file:

```typescript
import { defineConfig } from "@sylphx/leaf";

export default defineConfig({
  title: "My Site",
  description: "My documentation site",
  base: "/",
  theme: {
    nav: [],
    sidebar: []
  }
});
```

## Core Options

### title

- **Type:** `string`
- **Default:** `"Leaf"`

The title of your site. This appears in the browser tab and site header.

```typescript
export default defineConfig({
  title: "My Documentation"
});
```

### description

- **Type:** `string`
- **Default:** `""`

The description of your site for SEO purposes.

```typescript
export default defineConfig({
  description: "Comprehensive documentation for my project"
});
```

### base

- **Type:** `string`
- **Default:** `"/"`

The base URL path for your site. Use this if deploying to a subdirectory.

```typescript
export default defineConfig({
  base: "/docs/"  // Site will be at example.com/docs/
});
```

## Theme Configuration

### theme.nav

- **Type:** `NavItem[]`

Navigation menu items displayed in the header.

```typescript
interface NavItem {
  text: string;
  link?: string;
  items?: NavItem[];  // For dropdown menus
}

export default defineConfig({
  theme: {
    nav: [
      { text: "Guide", link: "/guide" },
      { text: "API", link: "/api" },
      {
        text: "More",
        items: [
          { text: "GitHub", link: "https://github.com/..." },
          { text: "Discord", link: "https://discord.gg/..." }
        ]
      }
    ]
  }
});
```

### theme.sidebar

- **Type:** `SidebarItem[] | SidebarConfig`

Sidebar navigation structure.

**Simple Array:**

```typescript
export default defineConfig({
  theme: {
    sidebar: [
      {
        text: "Getting Started",
        items: [
          { text: "Introduction", link: "/" },
          { text: "Installation", link: "/installation" }
        ]
      },
      {
        text: "Advanced",
        items: [
          { text: "Configuration", link: "/config" }
        ]
      }
    ]
  }
});
```

**Multi-Sidebar (Path-Based):**

```typescript
export default defineConfig({
  theme: {
    sidebar: {
      "/guide/": [
        {
          text: "Guide",
          items: [
            { text: "Getting Started", link: "/guide/" }
          ]
        }
      ],
      "/api/": [
        {
          text: "API Reference",
          items: [
            { text: "Config", link: "/api/config" }
          ]
        }
      ]
    }
  }
});
```

**Auto-Generated Sidebar:**

Leaf can automatically generate sidebar from your file structure:

```typescript
import { defineConfig, generateSidebar } from "@sylphx/leaf";

const sidebar = await generateSidebar("./docs");

export default defineConfig({
  theme: {
    sidebar
  }
});
```

### theme.logo

- **Type:** `string`

Path to your logo image.

```typescript
export default defineConfig({
  theme: {
    logo: "/logo.svg"
  }
});
```

### theme.socialLinks

- **Type:** `SocialLink[]`

Social media links displayed in the header.

```typescript
interface SocialLink {
  icon: "github" | "twitter" | "discord" | "linkedin";
  link: string;
}

export default defineConfig({
  theme: {
    socialLinks: [
      { icon: "github", link: "https://github.com/..." },
      { icon: "twitter", link: "https://twitter.com/..." }
    ]
  }
});
```

## Markdown Configuration

### markdown.remarkPlugins

- **Type:** `Plugin[]`

Custom remark plugins to process markdown.

```typescript
import remarkMath from "remark-math";

export default defineConfig({
  markdown: {
    remarkPlugins: [remarkMath]
  }
});
```

### markdown.rehypePlugins

- **Type:** `Plugin[]`

Custom rehype plugins to process HTML output.

```typescript
import rehypeKatex from "rehype-katex";

export default defineConfig({
  markdown: {
    rehypePlugins: [rehypeKatex]
  }
});
```

## Build Options

### outDir

- **Type:** `string`
- **Default:** `"dist"`

Output directory for built files.

```typescript
export default defineConfig({
  outDir: "build"
});
```

## Full Example

Here's a complete configuration example:

```typescript
import { defineConfig } from "@sylphx/leaf";

export default defineConfig({
  title: "Leaf",
  description: "Modern React documentation framework",
  base: "/",

  theme: {
    logo: "/logo.svg",

    nav: [
      { text: "Guide", link: "/guide" },
      { text: "API", link: "/api" },
      { text: "Examples", link: "/examples" },
      {
        text: "Links",
        items: [
          { text: "GitHub", link: "https://github.com/..." },
          { text: "Discord", link: "https://discord.gg/..." }
        ]
      }
    ],

    sidebar: [
      {
        text: "Introduction",
        items: [
          { text: "What is Leaf?", link: "/" },
          { text: "Getting Started", link: "/getting-started" }
        ]
      },
      {
        text: "Guide",
        items: [
          { text: "Installation", link: "/guide/installation" },
          { text: "Configuration", link: "/guide/configuration" },
          { text: "Markdown", link: "/guide/markdown" }
        ]
      }
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/..." }
    ]
  },

  markdown: {
    remarkPlugins: [],
    rehypePlugins: []
  }
});
```

## TypeScript Support

Leaf provides full TypeScript support with type checking and IntelliSense:

```typescript
import { defineConfig, type LeafConfig } from "@sylphx/leaf";

const config: LeafConfig = {
  title: "My Site",
  // TypeScript will provide autocomplete and type checking
};

export default defineConfig(config);
```

## Next Steps

- [Learn about Markdown features](/guide/markdown)
- [Customize the theme](/guide/theming)
- [API Reference](/api/config)
