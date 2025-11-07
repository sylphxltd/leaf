# ReactPress

> A React-based documentation framework. The VitePress alternative.

**ReactPress** is a fast, lightweight documentation framework built with React, designed to challenge VitePress.

## Features

- ⚡ **Blazingly Fast**: Built on Vite + Bun, faster than VitePress
- 🪶 **Ultra Lightweight**: Using Silk (500B) + Zen (1.45KB)
- ⚛️ **React Ecosystem**: Full React ecosystem support
- 💪 **Type Safe**: 100% TypeScript
- 🎨 **Customizable**: Zero-runtime CSS with Silk
- 📦 **Monorepo**: Complete toolchain

## Project Structure

```
packages/
  ├── core/           - Core framework logic
  ├── cli/            - CLI tools
  ├── theme-default/  - Default theme
  └── create-reactpress/ - Scaffolding tool

examples/
  └── docs/           - Example docs site (Sylphx products documentation)
```

## Tech Stack

- **Runtime**: Bun
- **Build Tool**: Vite
- **Framework**: React 18
- **State Management**: Zen (@sylphx/zen)
- **Styling**: Silk (@sylphx/silk)
- **Data Processing**: Craft (@sylphx/craft)
- **Linting**: Biome
- **Testing**: Vitest

## Quick Start

### Development

```bash
# Install dependencies
bun install

# Start development server
bun dev

# Build all packages
bun run build

# Lint code
bun run lint:fix
```

### Using ReactPress

```bash
# Install CLI
bun add -D @sylphx/reactpress-cli

# Start development server
bunx reactpress dev

# Build for production
bunx reactpress build

# Preview build
bunx reactpress preview
```

## Configuration

Create `reactpress.config.ts`:

```typescript
import { defineConfig } from '@sylphx/reactpress';

export default defineConfig({
  title: 'My Docs',
  description: 'My awesome documentation',
  theme: {
    nav: [
      { text: 'Guide', link: '/guide' },
      { text: 'API', link: '/api' }
    ],
    sidebar: [
      { text: 'Introduction', link: '/' },
      { text: 'Getting Started', link: '/getting-started' }
    ]
  }
});
```

## Comparison with VitePress

| Feature | ReactPress | VitePress |
|---------|-----------|-----------|
| Framework | React | Vue |
| Runtime | Bun | Node.js |
| Styling | Silk (500B) | CSS Modules |
| State Management | Zen (1.45KB) | Vue Composition |
| Build Speed | ⚡⚡⚡ | ⚡⚡ |
| Bundle Size | Ultra Small | Small |

## Core Packages

### @sylphx/reactpress

Core framework providing:
- Configuration management
- Route generation from MDX files
- Vite plugin integration
- Type definitions

### @sylphx/reactpress-cli

Command-line interface:
- `reactpress dev` - Start development server
- `reactpress build` - Build for production
- `reactpress preview` - Preview production build

### @sylphx/reactpress-theme-default

Default theme featuring:
- Responsive layout
- Dark mode support (Zen state management)
- Sidebar navigation
- MDX content rendering
- Code syntax highlighting

## Example Site

The `examples/docs` directory contains a complete documentation site showcasing:
- Zen - State management library
- Craft - Immutable data manipulation
- Silk - CSS-in-TypeScript framework

Run the example:
```bash
cd examples/docs
bun dev
```

## Architecture

### Core Design

1. **Zero-config by default**: Works out of the box with sensible defaults
2. **File-based routing**: Automatic route generation from `docs/**/*.mdx`
3. **Plugin system**: Extensible via Vite plugins
4. **Theme customization**: Override default theme components

### Build Process

```
MDX Files → Route Generation → Vite Build → Static Site
```

### State Management

Uses **Zen** for:
- Theme toggling (light/dark mode)
- Global application state
- Reactive updates across components

## Development

### Building Packages

```bash
# Build core
cd packages/core && bun run build

# Build CLI
cd packages/cli && bun run build

# Build theme
cd packages/theme-default && bun run build
```

### Project Status

🚧 **Work in Progress**

Current status:
- ✅ Core framework structure
- ✅ CLI tool with dev/build/preview commands
- ✅ Default theme with React components
- ✅ MDX support with rehype/remark plugins
- ✅ Example documentation site
- 🚧 Theme styling (Silk CSS-in-JS integration in progress)
- 🚧 Complete routing implementation
- 🚧 Build optimization

## Roadmap

- [ ] Complete Silk CSS-in-JS integration
- [ ] Dynamic route generation
- [ ] Search functionality
- [ ] I18n support
- [ ] Performance optimizations
- [ ] Plugin system
- [ ] Theme marketplace
- [ ] Deployment guides

## Why ReactPress over VitePress?

1. **React Ecosystem**: Access to the entire React ecosystem and component libraries
2. **Modern Runtime**: Bun offers faster installs and execution
3. **Lightweight Core**: Minimal dependencies with Sylphx tools
4. **Type Safety**: First-class TypeScript support throughout
5. **Flexibility**: React's component model for maximum customization

## Contributing

We welcome contributions! This is an open-source project built to demonstrate:
- Modern tooling (Bun, Vite, Biome)
- Monorepo architecture
- React-based static site generation
- Integration of Sylphx tools

## Team

Made with ❤️ by [Sylphx](https://github.com/sylphxltd)

## License

MIT

---

## Getting Help

- GitHub Issues: [Report bugs or request features](https://github.com/sylphxltd/reactpress/issues)
- GitHub Org: [@sylphxltd](https://github.com/sylphxltd)
- npm Org: [@sylphx](https://www.npmjs.com/org/sylphx)
