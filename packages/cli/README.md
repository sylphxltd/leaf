# @sylphx/leaf-cli

> 🚀 Command-line interface for Leaf documentation framework

## Installation

```bash
# npm
npm install -D @sylphx/leaf-cli

# yarn
yarn add -D @sylphx/leaf-cli

# bun (recommended)
bun add -D @sylphx/leaf-cli
```

## Usage

```bash
# Start development server
bunx leaf dev

# Build for production
bunx leaf build

# Preview production build
bunx leaf preview
```

## Commands

- `leaf dev` - Start development server with hot reload
- `leaf build` - Build static site for production
- `leaf preview` - Preview production build locally

## Configuration

Create `leaf.config.ts` in your project root:

```typescript
import { defineConfig } from '@sylphx/leaf';

export default defineConfig({
  title: 'My Documentation',
  description: 'Awesome docs',
  theme: {
    nav: [
      { text: 'Guide', link: '/guide' },
      { text: 'API', link: '/api' }
    ]
  }
});
```

## Features

- ⚡ Fast development with hot reload
- 📦 Zero configuration required
- 🎨 Beautiful default theme
- 🔍 Local search included
- 📱 Mobile responsive
- 🌙 Dark mode support

## License

MIT © [Sylphx](https://github.com/sylphxltd)