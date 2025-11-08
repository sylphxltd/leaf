---
title: Config API
description: Complete API reference for Leaf configuration
---

# Config API

Complete reference for Leaf configuration options.

## defineConfig

Helper function for type-safe configuration:

```typescript
import { defineConfig } from "@sylphx/leaf";

export default defineConfig({
  // Your config here
});
```

**Type Signature:**

```typescript
function defineConfig(config: LeafConfig): LeafConfig;
```

## LeafConfig

Main configuration interface:

```typescript
interface LeafConfig {
  // Site metadata
  title?: string;
  description?: string;
  base?: string;
  lang?: string;

  // Theme configuration
  theme?: ThemeConfig;

  // Markdown configuration
  markdown?: MarkdownConfig;

  // Build configuration
  outDir?: string;
  srcDir?: string;

  // Search configuration
  search?: SearchConfig;

  // Plugin configuration
  plugins?: Plugin[];
}
```

## Site Metadata

### title

- **Type:** `string`
- **Default:** `"Leaf"`

Site title used in page titles and metadata.

```typescript
export default defineConfig({
  title: "My Documentation"
});
```

Appears as: `Page Title | My Documentation`

### description

- **Type:** `string`
- **Default:** `""`

Site description for SEO and social sharing.

```typescript
export default defineConfig({
  description: "Comprehensive documentation for my awesome project"
});
```

### base

- **Type:** `string`
- **Default:** `"/"`

Base URL path for the site. Important for deployment to subdirectories.

```typescript
export default defineConfig({
  base: "/docs/"
});
```

**URL Resolution:**

- `/` → `https://example.com/docs/`
- `/guide` → `https://example.com/docs/guide`
- `/api/config` → `https://example.com/docs/api/config`

### lang

- **Type:** `string`
- **Default:** `"en"`

Site language for HTML `lang` attribute.

```typescript
export default defineConfig({
  lang: "en"  // or "zh", "ja", "es", etc.
});
```

## ThemeConfig

Theme configuration options:

```typescript
interface ThemeConfig {
  logo?: string;
  nav?: NavItem[];
  sidebar?: SidebarItem[] | SidebarConfig;
  socialLinks?: SocialLink[];
  footer?: FooterConfig;
  editLink?: EditLinkConfig;
  lastUpdated?: boolean | LastUpdatedConfig;
}
```

### theme.logo

- **Type:** `string`

Path to logo image.

```typescript
export default defineConfig({
  theme: {
    logo: "/logo.svg"
  }
});
```

### theme.nav

- **Type:** `NavItem[]`

Navigation menu items.

```typescript
interface NavItem {
  text: string;
  link?: string;
  items?: NavItem[];
  activeMatch?: string;
}
```

**Example:**

```typescript
export default defineConfig({
  theme: {
    nav: [
      { text: "Guide", link: "/guide", activeMatch: "^/guide/" },
      { text: "API", link: "/api" },
      {
        text: "More",
        items: [
          { text: "Changelog", link: "/changelog" },
          { text: "GitHub", link: "https://github.com/..." }
        ]
      }
    ]
  }
});
```

### theme.sidebar

- **Type:** `SidebarItem[] | SidebarConfig`

Sidebar navigation structure.

```typescript
interface SidebarItem {
  text: string;
  link?: string;
  items?: SidebarItem[];
  collapsed?: boolean;
}

interface SidebarConfig {
  [path: string]: SidebarItem[];
}
```

**Single Sidebar:**

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
      }
    ]
  }
});
```

**Multiple Sidebars:**

```typescript
export default defineConfig({
  theme: {
    sidebar: {
      "/guide/": [
        { text: "Introduction", link: "/guide/" }
      ],
      "/api/": [
        { text: "Config", link: "/api/config" }
      ]
    }
  }
});
```

### theme.socialLinks

- **Type:** `SocialLink[]`

Social media links.

```typescript
interface SocialLink {
  icon: "github" | "twitter" | "discord" | "linkedin";
  link: string;
}
```

**Example:**

```typescript
export default defineConfig({
  theme: {
    socialLinks: [
      { icon: "github", link: "https://github.com/user/repo" },
      { icon: "twitter", link: "https://twitter.com/username" }
    ]
  }
});
```

### theme.footer

- **Type:** `FooterConfig`

Footer configuration.

```typescript
interface FooterConfig {
  message?: string;
  copyright?: string;
}
```

**Example:**

```typescript
export default defineConfig({
  theme: {
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024 Your Name"
    }
  }
});
```

### theme.editLink

- **Type:** `EditLinkConfig`

"Edit this page" link configuration.

```typescript
interface EditLinkConfig {
  pattern: string;
  text?: string;
}
```

**Example:**

```typescript
export default defineConfig({
  theme: {
    editLink: {
      pattern: "https://github.com/user/repo/edit/main/docs/:path",
      text: "Edit this page on GitHub"
    }
  }
});
```

The `:path` placeholder is replaced with the page's file path.

### theme.lastUpdated

- **Type:** `boolean | LastUpdatedConfig`
- **Default:** `false`

Display last updated timestamp for each page based on Git history.

```typescript
interface LastUpdatedConfig {
  text?: string;
  formatOptions?: Intl.DateTimeFormatOptions;
}
```

**Example (simple):**

```typescript
export default defineConfig({
  theme: {
    lastUpdated: true
  }
});
```

**Example (with custom options):**

```typescript
export default defineConfig({
  theme: {
    lastUpdated: {
      text: "Last modified",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "short"
      }
    }
  }
});
```

::: tip
The lastUpdated timestamp is extracted from Git commit history. Make sure your repository has commit history for accurate timestamps.
:::

## MarkdownConfig

Markdown processing configuration:

```typescript
interface MarkdownConfig {
  remarkPlugins?: RemarkPlugin[];
  rehypePlugins?: RehypePlugin[];
  highlight?: HighlightConfig;
  math?: MathConfig;
  mermaid?: MermaidConfig;
}

// Plugin types
type RemarkPlugin = UnifiedPlugin | [UnifiedPlugin, ...any[]];
type RehypePlugin = UnifiedPlugin | [UnifiedPlugin, ...any[]];
```

### markdown.remarkPlugins

- **Type:** `RemarkPlugin[]`

Custom [remark](https://github.com/remarkjs/remark) plugins to process markdown AST.

**Simple usage:**

```typescript
import remarkMath from "remark-math";

export default defineConfig({
  markdown: {
    remarkPlugins: [remarkMath]
  }
});
```

**With options:**

```typescript
import { remarkCustomPlugin } from "./plugins";

export default defineConfig({
  markdown: {
    remarkPlugins: [
      [remarkCustomPlugin, { option1: true, option2: "value" }]
    ]
  }
});
```

::: tip Type Safety
Leaf exports `RemarkPlugin` type for better TypeScript inference:
```typescript
import type { RemarkPlugin } from "@sylphx/leaf";
```
:::

### markdown.rehypePlugins

- **Type:** `RehypePlugin[]`

Custom [rehype](https://github.com/rehypejs/rehype) plugins to process HTML AST.

**Simple usage:**

```typescript
import rehypeKatex from "rehype-katex";

export default defineConfig({
  markdown: {
    rehypePlugins: [rehypeKatex]
  }
});
```

**With options:**

```typescript
import { rehypeCustomPlugin } from "./plugins";

export default defineConfig({
  markdown: {
    rehypePlugins: [
      [rehypeCustomPlugin, { className: "custom-class" }]
    ]
  }
});
```

::: tip Type Safety
Leaf exports `RehypePlugin` type for better TypeScript inference:
```typescript
import type { RehypePlugin } from "@sylphx/leaf";
```
:::

### markdown.highlight

- **Type:** `HighlightConfig`

Code highlighting configuration.

```typescript
interface HighlightConfig {
  theme?: string;
  lineNumbers?: boolean;
}
```

**Example:**

```typescript
export default defineConfig({
  markdown: {
    highlight: {
      theme: "nord",
      lineNumbers: true
    }
  }
});
```

### markdown.math

- **Type:** `MathConfig`

Math equation configuration.

```typescript
interface MathConfig {
  strict?: boolean;
  throwOnError?: boolean;
}
```

### markdown.mermaid

- **Type:** `MermaidConfig`

Mermaid diagram configuration.

```typescript
interface MermaidConfig {
  theme?: "default" | "dark" | "forest" | "neutral";
  startOnLoad?: boolean;
}
```

## SearchConfig

Search functionality configuration:

```typescript
interface SearchConfig {
  enabled?: boolean;
  maxResults?: number;
  minQueryLength?: number;
  boost?: {
    title?: number;
    heading?: number;
    content?: number;
  };
  exclude?: string[];
}
```

### search.enabled

- **Type:** `boolean`
- **Default:** `true`

Enable/disable search.

### search.maxResults

- **Type:** `number`
- **Default:** `10`

Maximum search results to display.

### search.minQueryLength

- **Type:** `number`
- **Default:** `2`

Minimum query length before searching.

### search.boost

- **Type:** `{ title?: number; heading?: number; content?: number }`

Relevance boost for content types.

### search.exclude

- **Type:** `string[]`

Glob patterns for pages to exclude from search.

## Helper Functions

### loadConfig

Load and resolve configuration:

```typescript
import { loadConfig } from "@sylphx/leaf";

const config = await loadConfig(process.cwd());
```

**Type Signature:**

```typescript
function loadConfig(root: string): Promise<LeafConfig>;
```

### generateSidebar

Auto-generate sidebar from file structure:

```typescript
import { generateSidebar } from "@sylphx/leaf";

const sidebar = await generateSidebar("./docs");
```

**Type Signature:**

```typescript
function generateSidebar(docsDir: string): Promise<SidebarItem[]>;
```

### defineConfigWithTheme

Type-safe config with custom theme:

```typescript
import { defineConfigWithTheme } from "@sylphx/leaf";

interface CustomTheme {
  accentColor?: string;
}

export default defineConfigWithTheme<CustomTheme>({
  title: "My Site",
  theme: {
    accentColor: "#8b5cf6"  // Type-checked!
  }
});
```

## Plugin API

Create custom plugins:

```typescript
interface Plugin {
  name: string;
  setup?: (config: LeafConfig) => void;
  transform?: (code: string, id: string) => string | null;
}
```

**Example:**

```typescript
function myPlugin(): Plugin {
  return {
    name: "my-plugin",
    setup(config) {
      console.log("Plugin setup", config);
    },
    transform(code, id) {
      if (id.endsWith(".md")) {
        return code.replace(/foo/g, "bar");
      }
      return null;
    }
  };
}

export default defineConfig({
  plugins: [myPlugin()]
});
```

## Environment Variables

Access environment variables in config:

```typescript
export default defineConfig({
  base: process.env.BASE_URL || "/",
  theme: {
    footer: {
      copyright: `Copyright © ${new Date().getFullYear()}`
    }
  }
});
```

## TypeScript Support

Full TypeScript support with types:

```typescript
import type { LeafConfig, ThemeConfig } from "@sylphx/leaf";

const themeConfig: ThemeConfig = {
  nav: [
    { text: "Guide", link: "/guide" }
  ]
};

const config: LeafConfig = {
  title: "My Site",
  theme: themeConfig
};

export default defineConfig(config);
```

## Next Steps

- [Markdown Plugins API](/api/markdown-plugins)
- [Theming API](/api/theming)
- [Configuration Guide](/guide/configuration)
