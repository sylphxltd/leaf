# @sylphx/leaf-theme-default

> 🎨 Default theme for Leaf documentation framework

## Features

- 📱 **Responsive Design** - Mobile-first with hamburger menu
- 🌙 **Dark Mode** - System preference detection + manual toggle
- 🔍 **Local Search** - Built-in fuzzy search with MiniSearch
- 📖 **Auto Navigation** - Generated sidebar and table of contents
- 🎯 **Header Anchors** - Clickable hash links with hover effects
- 💻 **Syntax Highlighting** - Code highlighting with copy buttons
- 🎨 **Beautiful Typography** - Optimized reading experience
- ⚡ **Performance Optimized** - Lightweight and fast

## Installation

This theme is included by default when using `@sylphx/leaf-cli`. No separate installation required.

## Customization

You can customize the theme by overriding components:

```typescript
// leaf.config.ts
import { defineConfig } from '@sylphx/leaf';

export default defineConfig({
  theme: {
    // Customize navigation
    nav: [
      { text: 'Guide', link: '/guide' },
      { text: 'API', link: '/api' }
    ],
    // Customize sidebar
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Configuration', link: '/guide/configuration' }
        ]
      }
    ]
  }
});
```

## Components

The theme includes these main components:

- **Layout** - Main page layout with sidebar and content
- **Header** - Top navigation with search and theme toggle
- **Sidebar** - Collapsible navigation menu
- **TableOfContents** - Page outline with scroll spy
- **Search** - Local search modal
- **ThemeToggle** - Dark/light mode switcher

## Styling

Built with Tailwind CSS and customizable CSS custom properties:

```css
:root {
  --background: 0 0% 99%;
  --foreground: 220 20% 10%;
  --primary: 158 64% 42%;
  /* ... more custom properties */
}
```

## License

MIT © [Sylphx](https://github.com/sylphxltd)