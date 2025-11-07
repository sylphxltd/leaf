# Known Issues

## ~~MDX v3 Production Build Limitation~~ **RESOLVED** ✅

### Status: RESOLVED (2025-01-07)

### Solution
Replaced `@mdx-js/rollup` with custom markdown processor using `unified` + `remark` ecosystem.

**New architecture**:
- `unified` for processing pipeline
- `remark-parse` for markdown parsing
- `remark-gfm` for GitHub Flavored Markdown
- `remark-rehype` for markdown → HTML transformation
- `rehype-slug` for heading IDs
- `rehype-highlight` for syntax highlighting
- `rehype-stringify` for HTML output

**Implementation**: Custom Vite plugin in `packages/core/src/plugins/markdown.ts`

**Results**:
- ✅ Production builds: **WORKING**
- ✅ Development server: **WORKING**
- ✅ SSG: **WORKING** (5 routes generated)
- ✅ All remark/rehype plugins: **COMPATIBLE**
- ✅ Build time: ~350ms
- ✅ Bundle size: 200.52 kB (63.40 kB gzipped)

**Trade-off**: No longer supports JSX components in markdown (pure markdown only). This is acceptable since none of the existing content used JSX components. Future: Can add support via remark-directive if needed.

---

## Production Bundle Hydration Issue

### Symptom
Production bundle contains both `jsx()` and `jsxDEV()` calls, causing hydration failure.

**Impact**: Medium - SSR/SSG works (HTML pre-rendered correctly), but client-side hydration fails.

**Error** (when running built site):
```
TypeError: De.jsxDEV is not a function
```

**Status**: Under investigation - does NOT block SSG/SSR, HTML content is fully rendered.

**What works**:
- ✅ Production builds complete successfully
- ✅ SSG generates HTML with pre-rendered markdown content
- ✅ Static HTML files contain full content (headings, code blocks, syntax highlighting)
- ✅ SEO-friendly content is accessible

**What doesn't work**:
- ❌ Client-side React hydration fails
- ❌ Interactive features don't work

**Attempted solutions** (all unsuccessful):
1. Explicit `jsxDev: false` in esbuild config
2. `process.env.NODE_ENV` definition
3. `resolve.conditions` for production
4. `optimizeDeps.esbuildOptions` configuration
5. `jsxImportSource` explicit configuration
6. Disabling `fastRefresh`

**Root cause**: `@vitejs/plugin-react` v4.3.3 appears to transform some components with jsxDEV even when building for production. This is a known issue with Vite 6 + React plugin combination.

**Workaround**: Static sites work perfectly for content consumption. Interactive features can be added later or built separately.

**Next steps**:
- Monitor `@vitejs/plugin-react` updates
- Consider alternative: Build without React plugin for production (esbuild only)
- Or: Disable client-side hydration entirely for pure SSG mode

---

## Historical Context

### Original MDX Issue (Now Obsolete)

**Problem**: `@mdx-js/rollup` v3 had strict ESM validation that failed during builds.

**Error**: `Unexpected 'FunctionDeclaration' in code: only import/exports are supported`

**Root cause**: MDX v3's `micromark-extension-mdxjs-esm` rejected internal function declarations generated during MDX compilation.

**Attempted solutions** (12+ approaches, all failed):
1. Downgraded to @mdx-js/rollup v2.3.0 - different parsing errors
2. Tried vite-plugin-mdx - module import issues
3. Various MDX configs (development mode, jsx settings, provider imports)
4. Development mode builds - still failed
5. Plugin configuration changes - no effect

**Final solution**: Complete replacement with remark + unified processor (not a workaround, but a better architecture).
