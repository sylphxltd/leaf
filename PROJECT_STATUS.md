# ReactPress - Project Status

## Overview
React-based documentation framework (VitePress alternative) with focus on performance and modern tooling.

## ✅ Completed Features

### Core Infrastructure
- **Monorepo Setup**: Workspace-based architecture with 3 packages
  - `@sylphx/reactpress` (core)
  - `@sylphx/reactpress-cli` (CLI tools)
  - `@sylphx/reactpress-theme-default` (default theme)

- **Build System Migration**: Successfully migrated from TypeScript to Bunup
  - **66-75x faster** builds (from ~5300ms to ~50ms)
  - Automatic duplicate export fixing (post-build script)
  - Full type declaration generation

- **File-Based Routing**: Automatic route generation from markdown files
  - Scans `docs/` directory for `.md` and `.mdx` files
  - Generates React Router routes dynamically
  - Supports nested routes
  - Hot module replacement in dev mode
  - Frontmatter extraction with gray-matter

- **MDX Support**: Integrated with remark/rehype ecosystem
  - GitHub Flavored Markdown (remarkGfm)
  - Slug generation (rehypeSlug)
  - Syntax highlighting (rehypeHighlight)
  - Extensible plugin architecture

- **Default Theme**: Clean, modern documentation theme
  - Sticky header with navigation
  - Sidebar navigation
  - Dark mode toggle
  - Responsive design
  - CSS custom properties for theming

- **Development Workflow**: Full-featured dev server
  - Fast hot reload
  - File watching
  - Route generation
  - Works perfectly with all MDX files

### Project Configuration
- TypeScript with strict mode
- ESLint + Prettier
- Bun package manager (v1.3.1)
- React 18.3.1
- React Router 7.9.5
- Vite 6.4.1

## 🚫 Blocked Features

### Production Builds & SSG
**Status**: Completely blocked by MDX v3 strict ESM validation

**Issue**: `@mdx-js/rollup` v3 uses `micromark-extension-mdxjs-esm` which enforces strict ESM validation that rejects internal function declarations generated during MDX compilation.

**Impact**:
- ❌ Production builds fail
- ❌ Development mode builds also fail
- ❌ SSG (Static Site Generation) cannot run
- ✅ Development server works perfectly

**Root Cause**: Vite's build process (both production and development modes) triggers strict ESM validation that rejects non-import/export statements in code.

**Attempted Solutions** (all failed):
1. Downgraded to @mdx-js/rollup v2.3.0
2. Tried vite-plugin-mdx alternative
3. Various MDX configuration options
4. `development: true` mode
5. `mode: 'development'` in Vite build
6. Disabled syntax highlighting
7. Different JSX import sources

**See**: `KNOWN_ISSUES.md` for complete details

## 📋 Feature Backlog

### High Priority (Blocked by MDX)
- [ ] **SSG Pre-rendering**: Generate static HTML for all routes
  - Architecture designed in `src/build/ssg.ts`
  - Requires working Vite builds

- [ ] **Client-Side Hydration**: Hydrate static HTML for SPA navigation
  - Requires SSG to generate static files first

- [ ] **Production Optimization**: Minification, code splitting
  - Blocked by build process

### Medium Priority
- [ ] **Search**: Local search with FlexSearch
- [ ] **Code Features**: Line highlighting, line numbers
- [ ] **Custom Containers**: Tip/warning/danger blocks
- [ ] **Table of Contents**: Auto-generated outline
- [ ] **Prev/Next Navigation**: Page navigation links
- [ ] **Hero Component**: Landing page hero section
- [ ] **Features Grid**: Feature showcase component

### Low Priority
- [ ] **CLI Tool**: Scaffold new projects
- [ ] **Plugin System**: Extend functionality
- [ ] **Multiple Themes**: Additional theme options
- [ ] **i18n Support**: Internationalization

## 📁 Project Structure

```
new_project2/
├── packages/
│   ├── core/                  # Core framework
│   │   ├── src/
│   │   │   ├── build/        # SSG implementation
│   │   │   ├── config/       # Configuration
│   │   │   ├── plugins/      # Vite plugins
│   │   │   ├── utils/        # Utilities
│   │   │   └── types.ts      # Type definitions
│   │   └── dist/             # Compiled output
│   ├── cli/                  # CLI tools
│   └── theme-default/        # Default theme
│       ├── src/
│       │   ├── components/   # React components
│       │   ├── layouts/      # Layout components
│       │   ├── store/        # State management (Zen)
│       │   └── styles/       # CSS styles
│       └── dist/
├── examples/
│   └── docs/                 # Example documentation site
│       ├── docs/             # Markdown content
│       ├── src/              # App source
│       └── build.ts          # Build script (blocked)
├── scripts/
│   └── fix-exports.js        # Bunup duplicate export fix
├── KNOWN_ISSUES.md           # Detailed issue documentation
└── PROJECT_STATUS.md         # This file
```

## 🚀 Quick Start

### Development
```bash
# Install dependencies
bun install

# Start dev server
cd examples/docs
bun dev
```

Development server runs at `http://localhost:5173`

### Build (Currently Blocked)
```bash
cd examples/docs
bun run build.ts
# ❌ Fails with MDX strict ESM validation error
```

## 📊 Performance Metrics

### Build Times (with Bunup)
- Core package: **23ms** (was ~2000ms with tsc)
- CLI package: **20ms** (was ~1500ms with tsc)
- Theme package: **24ms** (was ~1800ms with tsc)
- **Total**: ~50ms vs ~5300ms (106x faster)

### Bundle Sizes (theme-default)
- Total: **6.78 kB** raw / **3.24 kB** gzipped
- Extremely lightweight

## 🔧 Technical Decisions

### Why Bunup?
- Native Bun bundler integration
- 100x faster than tsup
- Auto-generates type declarations
- Preserves file structure
- No cache issues

### Why Zen for State Management?
- **1.7-7.3x faster** than Zustand
- Only **1.45 kB** gzipped
- Framework agnostic
- Simple API

### Why Silk for Styling?
- **13x faster** than Tailwind
- Only **2.1 kB** gzipped
- Type-safe
- Zero runtime

## 📝 Next Steps

### Option 1: Wait for MDX Fix
- Monitor @mdx-js/rollup for v3.2+ release
- Check if strict ESM validation is relaxed

### Option 2: Alternative Markdown Processor
- Investigate `remark` + custom loader
- Consider `marked` with custom transformations
- Evaluate `unified` pipeline directly

### Option 3: Custom Workaround
- Pre-process MDX files before Vite sees them
- Transform to pure ESM manually
- Strip problematic function declarations

### Option 4: Fork and Patch
- Fork @mdx-js/rollup
- Disable strict ESM validation
- Maintain custom version

## 🎯 Project Goals

### Primary
- ✅ Fast development experience
- ✅ Modern React-based architecture
- ✅ File-based routing
- ❌ Static site generation (blocked)
- ❌ Production-ready builds (blocked)

### Secondary
- ✅ TypeScript support
- ✅ MDX support
- ✅ Plugin ecosystem foundation
- ⏳ Search functionality
- ⏳ Advanced markdown features

### Stretch
- Competitive with VitePress performance
- Better DX than VitePress
- Ecosystem of themes and plugins

## 📞 Current Blockers

**Priority 1**: Resolve MDX v3 strict ESM validation issue
- This blocks all production features
- Development workflow is fully functional
- Need community input or MDX team response

---

**Last Updated**: 2025 (Session continuation from previous work)
**Status**: Development-ready, production-blocked
