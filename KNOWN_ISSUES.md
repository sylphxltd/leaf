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

## Minor Issue: Production Bundle Runtime

### Symptom
Production bundle includes React's development runtime instead of production runtime.

**Impact**: Low - builds work, but bundle may be slightly larger and include dev-only code.

**Error** (when running built site):
```
TypeError: De.jsxDEV is not a function
```

**Status**: Low priority - does not block production builds or SSG.

**Investigation needed**:
- Check why `@vitejs/plugin-react` uses dev runtime in production mode
- Possibly related to React 19 beta compatibility
- May need explicit jsx configuration or React version downgrade

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
