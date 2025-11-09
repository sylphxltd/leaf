---
title: Advanced Features
order: 7
---

# Advanced Features

Unlock the full power of Leaf with advanced techniques and integrations.

## Custom React Components in MDX

Leaf supports full MDX, letting you use React components anywhere in your documentation.

### Inline Components

```mdx
import { Button } from '@/components/Button'

# My Page

Click this button: <Button>Click Me</Button>

Continue with regular markdown...
```

### Interactive Demos

Create live, interactive examples:

```tsx
// components/Counter.tsx
import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg">
      <button
        onClick={() => setCount(c => c - 1)}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        -
      </button>
      <span className="text-2xl font-bold">{count}</span>
      <button
        onClick={() => setCount(c => c + 1)}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        +
      </button>
    </div>
  )
}
```

Use in your docs:

```mdx
import { Counter } from '@/components/Counter'

# Interactive Example

Try it yourself:

<Counter />

This is a live React component!
```

### Code Playground

Build interactive code editors:

```tsx
// components/CodePlayground.tsx
import { useState } from 'react'
import { zen, set, useStore } from '@sylphx/zen'

interface Props {
  initialCode: string
  title?: string
}

export function CodePlayground({ initialCode, title }: Props) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState('')

  const runCode = () => {
    try {
      // ⚠️ WARNING: eval() is unsafe with user input
      // This example is for demonstration only
      // In production, use a sandboxed runtime or iframe
      const result = eval(code)
      setOutput(String(result))
    } catch (e) {
      setOutput(`Error: ${e.message}`)
    }
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      {title && (
        <div className="bg-muted px-4 py-2 font-semibold">
          {title}
        </div>
      )}
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full p-4 font-mono text-sm"
        rows={6}
      />
      <div className="flex gap-2 p-2 bg-muted">
        <button
          onClick={runCode}
          className="px-4 py-2 bg-primary text-white rounded"
        >
          Run
        </button>
      </div>
      {output && (
        <div className="p-4 bg-background border-t">
          <div className="font-mono text-sm">{output}</div>
        </div>
      )}
    </div>
  )
}
```

## State Management with Zen

Use Sylphx Zen for interactive documentation:

### Basic Store

```tsx
import { zen, set, useStore } from '@sylphx/zen'

// Create a global store
const themeStore = zen({
  mode: 'light' as 'light' | 'dark',
  fontSize: 16
})

// Use in component
export function ThemeControls() {
  const { mode, fontSize } = useStore(themeStore)

  return (
    <div>
      <button onClick={() => set(themeStore, { mode: mode === 'light' ? 'dark' : 'light' })}>
        Toggle: {mode}
      </button>
      <input
        type="range"
        min={12}
        max={24}
        value={fontSize}
        onChange={(e) => set(themeStore, { fontSize: Number(e.target.value) })}
      />
      <span>Size: {fontSize}px</span>
    </div>
  )
}
```

### Computed Values

```tsx
import { zen, derive, useStore } from '@sylphx/zen'

const store = zen({ count: 0 })

// Derived state
const doubled = derive(store, (state) => state.count * 2)

export function ComputedExample() {
  const { count } = useStore(store)
  const doubledValue = useStore(doubled)

  return (
    <div>
      <p>Count: {count}</p>
      <p>Doubled: {doubledValue}</p>
    </div>
  )
}
```

## Custom Markdown Plugins

Extend markdown processing with custom remark/rehype plugins.

### Custom Remark Plugin

Transform markdown AST:

```ts
// plugins/remark-custom-directive.ts
import { visit } from 'unist-util-visit'
import type { Plugin } from 'unified'

export const remarkCustomDirective: Plugin = () => {
  return (tree) => {
    visit(tree, 'paragraph', (node) => {
      // Transform custom syntax
      // Example: ::youtube[VIDEO_ID] -> embedded player
    })
  }
}
```

Add to config:

```ts
// leaf.config.ts
import { remarkCustomDirective } from './plugins/remark-custom-directive'

export default defineConfig({
  markdown: {
    remarkPlugins: [remarkCustomDirective]
  }
})
```

### Custom Rehype Plugin

Transform HTML AST:

```ts
// plugins/rehype-auto-link.ts
import { visit } from 'unist-util-visit'
import type { Plugin } from 'unified'
import type { Element } from 'hast'

export const rehypeAutoLink: Plugin = () => {
  return (tree) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'h2' || node.tagName === 'h3') {
        // Add anchor links to headings
        node.children.unshift({
          type: 'element',
          tagName: 'a',
          properties: {
            href: `#${node.properties?.id}`,
            className: ['anchor-link']
          },
          children: [{ type: 'text', value: '#' }]
        })
      }
    })
  }
}
```

## Custom Containers

Create custom container types beyond tip/warning/danger:

```ts
// plugins/remark-custom-containers.ts
import { visit } from 'unist-util-visit'
import type { Plugin } from 'unified'

export const remarkCustomContainers: Plugin = () => {
  return (tree) => {
    visit(tree, 'containerDirective', (node: any) => {
      if (node.name === 'demo') {
        // Transform :::demo -> custom demo container
        node.data = {
          hName: 'div',
          hProperties: {
            className: ['demo-container']
          }
        }
      }
    })
  }
}
```

Use in markdown:

```md
::: demo
Your demo content here
:::
```

## API Integration

Fetch and display external data:

```tsx
// components/GitHubStats.tsx
import { useEffect, useState } from 'react'

interface Repo {
  stars: number
  forks: number
  openIssues: number
}

export function GitHubStats({ repo }: { repo: string }) {
  const [stats, setStats] = useState<Repo | null>(null)

  useEffect(() => {
    fetch(`https://api.github.com/repos/${repo}`)
      .then(r => r.json())
      .then(data => setStats({
        stars: data.stargazers_count,
        forks: data.forks_count,
        openIssues: data.open_issues_count
      }))
  }, [repo])

  if (!stats) return <div>Loading...</div>

  return (
    <div className="grid grid-cols-3 gap-4 p-4 border rounded-lg">
      <div className="text-center">
        <div className="text-3xl font-bold">{stats.stars}</div>
        <div className="text-sm text-muted-foreground">Stars</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold">{stats.forks}</div>
        <div className="text-sm text-muted-foreground">Forks</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold">{stats.openIssues}</div>
        <div className="text-sm text-muted-foreground">Issues</div>
      </div>
    </div>
  )
}
```

```mdx
import { GitHubStats } from '@/components/GitHubStats'

# Project Stats

<GitHubStats repo="sylphxltd/leaf" />
```

## Dynamic Imports

Load components only when needed:

```tsx
import { lazy, Suspense } from 'react'

const HeavyChart = lazy(() => import('@/components/HeavyChart'))

export function ChartSection() {
  return (
    <Suspense fallback={<div>Loading chart...</div>}>
      <HeavyChart data={...} />
    </Suspense>
  )
}
```

## Custom Theme

Create a custom theme package:

### 1. Create Theme Package

```
my-theme/
├── package.json
├── src/
│   ├── index.tsx
│   ├── layouts/
│   │   └── Layout.tsx
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   └── styles/
│       └── index.css
```

### 2. Implement Layout

```tsx
// src/layouts/Layout.tsx
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function Layout({ children }: Props) {
  return (
    <div className="min-h-screen">
      <header>{/* Custom header */}</header>
      <main>{children}</main>
      <footer>{/* Custom footer */}</footer>
    </div>
  )
}
```

### 3. Export Theme

```tsx
// src/index.tsx
export { Layout } from './layouts/Layout'
export { Header } from './components/Header'
export { Sidebar } from './components/Sidebar'
```

### 4. Use Custom Theme

```ts
// leaf.config.ts
export default defineConfig({
  theme: '@my-org/my-theme'
})
```

## Build-Time Data

Generate data at build time:

```ts
// .leaf/buildData.ts
export async function buildData() {
  // Fetch data during build
  const response = await fetch('https://api.example.com/data')
  const data = await response.json()

  // Write to public dir
  await Bun.write(
    'public/generated-data.json',
    JSON.stringify(data, null, 2)
  )
}
```

Access in components:

```tsx
export function DataDisplay() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('/generated-data.json')
      .then(r => r.json())
      .then(setData)
  }, [])

  return <div>{/* Display data */}</div>
}
```

## Analytics Integration

### Custom Event Tracking

```tsx
// utils/analytics.ts
export function trackEvent(name: string, props?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, props)
  }
}

// Usage in component
import { trackEvent } from '@/utils/analytics'

export function DownloadButton() {
  return (
    <button
      onClick={() => {
        trackEvent('download_clicked', { item: 'whitepaper' })
        // Download logic
      }}
    >
      Download
    </button>
  )
}
```

### Page View Tracking

```tsx
// .leaf/router.tsx
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackEvent } from '@/utils/analytics'

export function AnalyticsTracker() {
  const location = useLocation()

  useEffect(() => {
    trackEvent('page_view', {
      page_path: location.pathname,
      page_title: document.title
    })
  }, [location])

  return null
}
```

## SEO Optimization

### Dynamic Meta Tags

```tsx
// components/SEO.tsx
import { Helmet } from 'react-helmet-async'

interface Props {
  title: string
  description: string
  image?: string
  url?: string
}

export function SEO({ title, description, image, url }: Props) {
  const siteUrl = 'https://docs.example.com'
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl
  const ogImage = image || `${siteUrl}/og-image.png`

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* OpenGraph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={fullUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  )
}
```

### Structured Data

```tsx
export function ArticleSchema({ article }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    datePublished: article.date,
    author: {
      '@type': 'Person',
      name: article.author
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

## Performance Optimization

### Image Optimization

```tsx
// components/OptimizedImage.tsx
import { useState, useEffect } from 'react'

interface Props {
  src: string
  alt: string
  width?: number
  height?: number
}

export function OptimizedImage({ src, alt, width, height }: Props) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative">
      {!loaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={loaded ? 'opacity-100' : 'opacity-0'}
      />
    </div>
  )
}
```

### Code Splitting

```tsx
// Split heavy components
const ChartComponent = lazy(() => import('./ChartComponent'))
const VideoPlayer = lazy(() => import('./VideoPlayer'))

// Use with suspense
<Suspense fallback={<Spinner />}>
  <ChartComponent />
</Suspense>
```

## Testing Documentation

### Visual Regression Testing

```ts
// tests/visual.spec.ts
import { test, expect } from '@playwright/test'

test('homepage looks correct', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveScreenshot('homepage.png')
})

test('dark mode works', async ({ page }) => {
  await page.goto('/')
  await page.click('[data-theme-toggle]')
  await expect(page).toHaveScreenshot('homepage-dark.png')
})
```

### Link Checking

```ts
// scripts/check-links.ts
import { readdir } from 'fs/promises'
import { glob } from 'fast-glob'

async function checkLinks() {
  const files = await glob('docs/**/*.{md,mdx}')

  for (const file of files) {
    const content = await Bun.file(file).text()
    const links = content.match(/\[.*?\]\((.*?)\)/g) || []

    for (const link of links) {
      // Check if link is valid
    }
  }
}

checkLinks()
```

## Next Steps

Ready to build something amazing?

- Explore [Custom Components](#custom-react-components-in-mdx)
- Try [State Management](#state-management-with-zen)
- Create [Custom Plugins](#custom-markdown-plugins)
- Build [Interactive Demos](#interactive-demos)

## Examples Repository

Check out advanced examples:

```bash
git clone https://github.com/sylphxltd/leaf-examples
cd leaf-examples/advanced
```

Examples include:
- Interactive API documentation
- Component library docs
- Multi-language site
- Blog with categories
- Knowledge base with search
