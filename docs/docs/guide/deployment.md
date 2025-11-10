---
title: Deployment
order: 5
---

# Deployment

Deploy your Leaf documentation site to production in minutes.

## Build Your Site

First, build your static site:

```bash
bun run build
```

This generates optimized static files in the `dist` directory:
- Pre-rendered HTML for instant loading
- Minified CSS and JavaScript
- Search index for local search
- Optimized assets

## Deployment Platforms

### Vercel <Badge type="tip" text="RECOMMENDED" />

The easiest way to deploy Leaf is with Vercel:

**1. Install Vercel CLI:**

```bash
bun install -g vercel
```

**2. Deploy:**

```bash
vercel
```

**vercel.json configuration:**

::: code-group

```json [vercel.json]
{
  "buildCommand": "bun run build",
  "outputDirectory": "dist",
  "installCommand": "bun install",
  "framework": null
}
```

:::

**GitHub Integration:**

1. Push your code to GitHub
2. Import project in Vercel dashboard
3. Set build command: `bun run build`
4. Set output directory: `dist`
5. Deploy!

::: tip Auto Deployments
Vercel automatically deploys when you push to your main branch.
:::

### Netlify

Deploy to Netlify in two ways:

**Option 1: Netlify CLI**

```bash
# Install Netlify CLI
bun install -g netlify-cli

# Deploy
netlify deploy --prod
```

**Option 2: Git Integration**

Create `netlify.toml`:

```toml [netlify.toml]
[build]
  command = "bun run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Then connect your Git repository in Netlify dashboard.

### GitHub Pages

Deploy to GitHub Pages using GitHub Actions:

**1. Create workflow file:**

```yaml [.github/workflows/deploy.yml]
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest

      - name: Install dependencies
        run: bun install

      - name: Build
        run: bun run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v3
```

**2. Enable GitHub Pages:**
- Go to repository Settings → Pages
- Source: GitHub Actions

**3. Configure base path** (if using project site):

```ts [leaf.config.ts]
export default defineConfig({
  base: '/your-repo-name/', // For project pages
  // ...
});
```

### Cloudflare Pages

**Option 1: Wrangler CLI**

```bash
# Install Wrangler
bun install -g wrangler

# Deploy
wrangler pages deploy dist
```

**Option 2: Git Integration**

1. Connect your Git repository in Cloudflare Pages dashboard
2. Set build command: `bun run build`
3. Set output directory: `dist`
4. Deploy!

**cloudflare-pages.toml:**

```toml [cloudflare-pages.toml]
[build]
  command = "bun run build"
  destination = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Docker

Create a containerized deployment:

**Dockerfile:**

```dockerfile [Dockerfile]
FROM oven/bun:1 AS builder

WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf:**

```nginx [nginx.conf]
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Build and run:**

```bash
# Build image
docker build -t my-docs .

# Run container
docker run -p 8080:80 my-docs
```

## Environment Variables

Set environment variables for your deployment:

```bash
# Build-time variables
VITE_SITE_URL=https://docs.example.com
VITE_GA_ID=G-XXXXXXXXXX
```

**Access in your config:**

```ts [leaf.config.ts]
export default defineConfig({
  siteUrl: import.meta.env.VITE_SITE_URL,
  // ...
});
```

## Custom Domain

### Vercel

1. Go to project Settings → Domains
2. Add your custom domain
3. Configure DNS:
   ```
   CNAME  docs.example.com  cname.vercel-dns.com
   ```

### Netlify

1. Go to Site Settings → Domain Management
2. Add custom domain
3. Configure DNS:
   ```
   CNAME  docs.example.com  your-site.netlify.app
   ```

### Cloudflare Pages

1. Go to project → Custom Domains
2. Add your domain
3. DNS is automatically configured if using Cloudflare DNS

## Performance Optimization

### Enable Compression

Most platforms enable gzip/brotli automatically, but verify:

**Vercel/Netlify:** ✅ Enabled by default

**Custom Server (nginx):**

```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
gzip_comp_level 6;
```

### CDN Configuration

Configure caching headers:

**_headers file (Netlify):**

```
# Cache static assets for 1 year
/assets/*
  Cache-Control: public, max-age=31536000, immutable

# Cache HTML for 1 hour
/*.html
  Cache-Control: public, max-age=3600
```

**vercel.json:**

```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## Analytics

### Google Analytics

Add to your `leaf.config.ts`:

```ts
export default defineConfig({
  head: [
    [
      'script',
      { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX' }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');`
    ]
  ]
});
```

### Plausible Analytics

```ts
export default defineConfig({
  head: [
    [
      'script',
      {
        defer: true,
        'data-domain': 'yourdomain.com',
        src: 'https://plausible.io/js/script.js'
      }
    ]
  ]
});
```

## Health Checks

Add a health check endpoint:

**public/health.json:**

```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

Access at: `https://yourdomain.com/health.json`

## Troubleshooting

### 404 Errors on Routes

Ensure your server redirects all routes to `index.html` for SPA routing.

**Netlify:** Add `_redirects` file:
```
/*  /index.html  200
```

**Vercel:** Automatically configured

**Nginx:**
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### Build Failures

**Out of Memory:**

Increase Node memory limit:
```json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' bun run build"
  }
}
```

**Missing Dependencies:**

Ensure all dependencies are in `dependencies`, not `devDependencies`:
```bash
bun add @sylphx/leaf @sylphx/leaf-theme-default
```

### Asset Loading Issues

Check your `base` path configuration:

```ts
// For root domain: https://docs.example.com
export default defineConfig({
  base: '/',
});

// For subdirectory: https://example.com/docs/
export default defineConfig({
  base: '/docs/',
});
```

## Continuous Deployment

### Auto-deploy on Git Push

All platforms support automatic deployment:

1. **Vercel/Netlify/Cloudflare:** Connect Git repo in dashboard
2. **GitHub Pages:** Use workflow file (see above)
3. Every push to main branch triggers deployment

### Preview Deployments

**Vercel/Netlify:** Automatic preview for pull requests

**Cloudflare Pages:** Preview for all branches

## Security

### Content Security Policy

Add CSP headers:

**_headers (Netlify):**

```
/*
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline';
```

### HTTPS

All platforms provide free SSL:
- ✅ Vercel: Automatic
- ✅ Netlify: Automatic
- ✅ Cloudflare Pages: Automatic
- ✅ GitHub Pages: Automatic

## Next Steps

- Set up [Analytics](#analytics)
- Configure [Custom Domain](#custom-domain)
- Enable [Preview Deployments](#preview-deployments)
- Add [Health Checks](#health-checks)

## Support

Having deployment issues? Check:
- [GitHub Issues](https://github.com/sylphxltd/leaf/issues)
- [Platform Documentation](#deployment-platforms)
- [Troubleshooting](#troubleshooting)
