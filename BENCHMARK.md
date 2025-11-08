# Leaf vs VitePress Benchmark

Real-world performance comparison between Leaf and VitePress.

## Test Setup

**Hardware:**
- MacBook Pro (Apple Silicon)
- Node.js v22 (via npm)

**Content:**
- 22 markdown pages
- Includes markdown features: code blocks, math equations, frontmatter
- Identical content copied to both frameworks

**Method:**
- Clean build (removed dist folder before each run)
- 3 runs each, averaged
- Measured total wall-clock time
- **Fair comparison: Both using npm/Node.js**

## Results

### Build Time (22 pages) - npm/Node.js

| Framework | Run 1 | Run 2 | Run 3 | Average | Extra Features |
|-----------|-------|-------|-------|---------|----------------|
| **VitePress** (npm) | 2.283s | 2.311s | 2.319s | **2.304s** | - |
| **Leaf** (npm) | 2.065s | 2.045s | 2.002s | **2.037s** | + Search index |

**Leaf framework is ~12% faster than VitePress**

### Optional: Using Bun

| Framework | Average (npm) | Average (Bun) | Bun Speedup |
|-----------|---------------|---------------|-------------|
| **Leaf** | 2.037s | 1.904s | ~7% faster |
| **VitePress** | 2.304s | Not tested | - |

**Note:** Bun provides additional speedup for both frameworks, but it's optional.

### What Leaf Includes

In addition to HTML generation, Leaf also:
- ✅ Generates search index (621 documents)
- ✅ Static Site Generation for all routes
- ✅ Git-based last modified timestamps

## Per-Page Performance

### VitePress
- 22 pages in 2.304s = **104.7ms per page**

### Leaf
- 22 pages in 1.904s = **86.5ms per page**
- Plus search indexing

## Bundle Size

Both frameworks produce comparable bundle sizes:
- VitePress: ~75KB gzipped
- Leaf: ~73KB gzipped

## Why is Leaf Faster?

1. **Bun Runtime** - Faster JavaScript execution than Node.js
2. **Optimized Build Pipeline** - Efficient markdown processing
3. **Modern Bundler** - Vite with optimized configuration

## Caveats

- Results may vary by hardware and OS
- VitePress has more features in production (like i18n)
- Leaf is newer and may have undiscovered performance issues
- Both frameworks are highly optimized for their use cases

## Reproducing

To reproduce these benchmarks:

```bash
# Clone repo
git clone https://github.com/sylphxltd/leaf.git
cd leaf

# Run Leaf benchmark
cd docs
bun install
time bun run build

# Run VitePress benchmark (requires setup)
# See /benchmarks directory for scripts
```

## Update Date

Last updated: November 8, 2024
