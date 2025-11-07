# VitePress vs ReactPress - 功能對比與實現計劃

## VitePress 核心功能分析

### 🎯 必須實現的核心功能

#### 1. **File-Based Routing** (最重要)
- **VitePress**: 自動從 `docs/` 目錄生成路由
- **Status**: 🚧 部分實現
- **Priority**: P0 (Critical)
- **Details**:
  - `/docs/guide/index.md` → `/guide/`
  - `/docs/api/reference.md` → `/api/reference`
  - Clean URLs (without `.html`)
  - Rewrites support

#### 2. **Markdown 擴展**
- **VitePress**: 完整的 Markdown-it + Vue 組件
- **Status**: ✅ 基礎實現 (MDX)
- **Priority**: P0
- **Features**:
  - ✅ Frontmatter
  - ✅ Syntax highlighting (rehype-highlight)
  - ✅ Tables, GFM
  - 🚧 Line highlighting in code blocks
  - 🚧 Line numbers
  - 🚧 Code groups / tabs
  - 🚧 Custom containers (:::tip, :::warning)
  - 🚧 Vue components in markdown

#### 3. **Theme System**
- **VitePress**: 默認主題 + 完全自定義
- **Status**: ✅ 基礎實現
- **Priority**: P0
- **Components**:
  - ✅ Layout
  - ✅ Header with nav
  - ✅ Sidebar
  - ✅ Dark mode (Zen)
  - 🚧 Footer
  - 🚧 Hero section (home page)
  - 🚧 Features grid
  - 🚧 DocFooter (prev/next links)
  - 🚧 Outline (table of contents)

#### 4. **Search**
- **VitePress**: Local search + Algolia
- **Status**: ❌ 未實現
- **Priority**: P1 (High)
- **Options**:
  - Local search (client-side, no backend)
  - Algolia DocSearch integration
  - Flexsearch implementation

#### 5. **SSG/SSR** (Static Site Generation)
- **VitePress**: 預渲染 HTML + 客戶端水化
- **Status**: ❌ 未實現
- **Priority**: P0 (Critical)
- **Features**:
  - Pre-render all pages to HTML
  - Client-side hydration
  - Fast initial load
  - SEO optimization

#### 6. **Configuration System**
- **VitePress**: `.vitepress/config.ts`
- **Status**: ✅ 基礎實現
- **Priority**: P0
- **Config Options**:
  - ✅ Site metadata (title, description)
  - ✅ Theme config (nav, sidebar)
  - 🚧 Clean URLs
  - 🚧 Rewrites
  - 🚧 Build options
  - 🚧 Markdown config
  - 🚧 Vite config passthrough

#### 7. **Internationalization (i18n)**
- **VitePress**: 多語言支持
- **Status**: ❌ 未實現
- **Priority**: P2 (Medium)
- **Features**:
  - Language switcher
  - Localized routing
  - Locale-specific sidebars

### 🚀 性能相關

#### 8. **Build Performance**
- **VitePress Benchmark**: Instant HMR (<100ms)
- **ReactPress Status**: ✅ Vite HMR
- **Improvements Needed**:
  - 🚧 Optimize bundle size
  - 🚧 Code splitting
  - 🚧 Image optimization
  - 🚧 CSS extraction

#### 9. **Runtime Performance**
- **VitePress**: SPA navigation after initial load
- **Status**: 🚧 需要實現
- **Features**:
  - Client-side routing
  - Prefetching
  - Lazy loading

### 📦 開發體驗

#### 10. **Developer Experience**
- **VitePress**: Zero-config, instant start
- **Status**: 🚧 部分實現
- **Features**:
  - ✅ TypeScript support
  - ✅ Hot Module Replacement
  - 🚧 Error overlay
  - 🚧 Dev toolbar
  - 🚧 Live preview

### 🎨 進階功能

#### 11. **Custom Containers**
```markdown
::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a danger alert
:::
```

#### 12. **Code Block Features**
- Line highlighting: ```js{1,4,6-8}
- Line numbers: ```js:line-numbers
- Focus/Diff: // [!code focus]
- Code groups/tabs
- Import code snippets

#### 13. **Team Pages**
- Team member cards
- Social links
- Profile images

#### 14. **Last Updated Timestamp**
- Git-based timestamps
- Frontmatter override

#### 15. **Edit Link**
- "Edit this page on GitHub"
- Configurable per page

### 🔌 擴展性

#### 16. **Plugin System**
- **VitePress**: Vite plugins + custom hooks
- **Status**: 🚧 基礎實現
- **Hooks**:
  - buildEnd
  - transformHead
  - transformHtml
  - transformPageData

#### 17. **Custom Components**
- **VitePress**: Vue components anywhere
- **Status**: ✅ React components (MDX)

---

## ReactPress 實現計劃

### Phase 1: 核心功能 (P0 - Week 1-2)

#### 1.1 修復 Dev Server ✅
- [x] Fix fsevents issue
- [x] Simplify config loading
- [ ] Test hot reload

#### 1.2 File-Based Routing 🎯
```typescript
// Auto-generate routes from /docs
/docs/index.mdx → /
/docs/guide/getting-started.mdx → /guide/getting-started
/docs/api/zen.mdx → /api/zen
```

**Implementation:**
- Glob pattern matching
- Dynamic route generation
- Route metadata extraction
- Clean URLs

#### 1.3 SSG (Static Site Generation) 🎯
```bash
reactpress build
→ dist/
  ├── index.html
  ├── guide/
  │   └── getting-started.html
  └── api/
      └── zen.html
```

**Implementation:**
- Pre-render all routes
- Generate static HTML
- Inject client-side hydration
- Asset optimization

#### 1.4 完善 Theme System
- [ ] Hero component (home page)
- [ ] Features grid
- [ ] Footer component
- [ ] DocFooter (prev/next)
- [ ] Outline (TOC)

### Phase 2: Markdown 擴展 (P0-P1 - Week 2-3)

#### 2.1 Code Block 增強
- [ ] Line highlighting
- [ ] Line numbers
- [ ] Focus/diff markers
- [ ] Code groups/tabs
- [ ] Language labels

#### 2.2 Custom Containers
```markdown
::: tip Title
Content
:::
```
- [ ] tip, warning, danger, info
- [ ] Custom titles
- [ ] Custom classes

#### 2.3 Vue/React 互操作
- [x] MDX components (React)
- [ ] Better component API
- [ ] Scoped styles

### Phase 3: Search 功能 (P1 - Week 3)

#### 3.1 Local Search (推薦)
**Implementation:**
- FlexSearch library
- Build-time indexing
- Client-side search
- Keyboard shortcuts (Cmd+K)

```typescript
// Search index generation
{
  "pages": [
    {
      "title": "Getting Started",
      "path": "/guide/getting-started",
      "content": "...",
      "headers": ["Installation", "Usage"]
    }
  ]
}
```

#### 3.2 Algolia (Optional)
- API key configuration
- DocSearch crawler setup

### Phase 4: i18n 支持 (P2 - Week 4)

```typescript
// config
export default defineConfig({
  locales: {
    root: {
      label: 'English',
      lang: 'en'
    },
    zh: {
      label: '繁體中文',
      lang: 'zh-TW'
    }
  }
})
```

### Phase 5: 性能優化 (P1 - Week 4-5)

#### 5.1 Build Optimization
- [ ] Code splitting
- [ ] Tree shaking
- [ ] Minification
- [ ] CSS extraction
- [ ] Asset hashing

#### 5.2 Runtime Optimization
- [ ] Route prefetching
- [ ] Lazy loading
- [ ] Image optimization
- [ ] Font optimization

### Phase 6: 開發體驗 (P2 - Week 5-6)

#### 6.1 CLI 改進
```bash
reactpress init <project-name>
reactpress dev --port 3000
reactpress build --outDir dist
reactpress preview
```

#### 6.2 Scaffolding Tool
```bash
npm create reactpress@latest
# or
bunx create-reactpress
```

---

## 與 VitePress 的差異化優勢

### ✨ ReactPress 獨特優勢

1. **React 生態**
   - 所有 React 組件庫可用
   - React Server Components (未來)
   - Better TypeScript integration

2. **Bun Runtime**
   - 更快的安裝
   - 更快的開發服務器
   - 原生 TypeScript

3. **Sylphx 工具鏈**
   - **Zen**: 超輕量狀態管理 (1.45KB)
   - **Silk**: 零運行時 CSS (500B)
   - **Craft**: Immutable updates
   - 完全型別安全

4. **現代化架構**
   - ESM-first
   - 更少的構建依賴
   - 清晰的 monorepo 結構

---

## 測試計劃

### 功能測試
- [ ] File-based routing
- [ ] Markdown rendering
- [ ] Code highlighting
- [ ] Search functionality
- [ ] Theme switching
- [ ] SSG output
- [ ] i18n switching

### 性能測試
- [ ] PageSpeed Insights (目標: 95+)
- [ ] Lighthouse scores
- [ ] Bundle size analysis
- [ ] Build time comparison

### 用例測試
- [ ] Zen documentation
- [ ] Craft documentation
- [ ] Silk documentation
- [ ] Migration from VitePress

---

## 成功標準

### Minimum Viable Product (MVP)
1. ✅ File-based routing working
2. ✅ SSG generating static HTML
3. ✅ Search functionality
4. ✅ Dark mode
5. ✅ Code highlighting
6. ✅ Responsive design

### Production Ready
1. ✅ All core features implemented
2. ✅ Performance: 95+ Lighthouse score
3. ✅ Documentation: Complete for all 3 products
4. ✅ Examples: Multiple real-world sites
5. ✅ Tests: >80% coverage
6. ✅ CLI: Full feature parity with VitePress

---

## Timeline

| Phase | Duration | Status |
|-------|----------|--------|
| Phase 1: Core | Week 1-2 | 🚧 In Progress |
| Phase 2: Markdown | Week 2-3 | ⏳ Pending |
| Phase 3: Search | Week 3 | ⏳ Pending |
| Phase 4: i18n | Week 4 | ⏳ Pending |
| Phase 5: Performance | Week 4-5 | ⏳ Pending |
| Phase 6: DX | Week 5-6 | ⏳ Pending |

**Total**: 6 weeks to production-ready v1.0

---

## 立即行動項

### 今天要完成：
1. 🔥 **Fix dev server** (fsevents issue)
2. 🔥 **Implement file-based routing**
3. 🔥 **Create basic SSG**

### 本週要完成：
4. Add Hero + Features components
5. Implement local search
6. Add code block enhancements
7. Create Zen/Craft/Silk docs

### 下週目標：
8. i18n support
9. Performance optimization
10. Polish documentation
