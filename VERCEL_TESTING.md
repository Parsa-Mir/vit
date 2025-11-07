# Testing with Vercel CLI

This guide explains how to test your Vercel deployment locally before pushing to production.

## Prerequisites

Vercel CLI is already installed globally. If you need to reinstall:
```bash
bun install -g vercel
```

## Testing Scripts

### 1. Quick Vercel Dev (recommended)
```bash
bun run vercel:dev
```
This starts Vercel's local development environment that simulates the production environment.

### 2. Build & Preview
```bash
bun run vercel:preview
```
This builds your project first, then runs Vercel dev with the built assets.

### 3. Production Build Test
```bash
bun run vercel:build
```
This runs the production build and creates a `.vercel` folder with build output.

## First Time Setup

The first time you run `vercel dev`, you'll be asked to:
1. Login to Vercel (if not already logged in)
2. Link your project to a Vercel project (or create a new one)
3. Configure project settings

You can skip linking by running:
```bash
vercel dev --yes
```

## What Gets Tested

- ✅ Static files served from `dist/` (simulated CDN)
- ✅ API routes at `/api/*` using Bun runtime
- ✅ SPA routing (client-side navigation)
- ✅ Build process and configuration

## Testing Endpoints

Once running (typically on http://localhost:3000):

- **Frontend**: http://localhost:3000
- **API Health**: http://localhost:3000/api/hello
- **API with params**: http://localhost:3000/api/hello/yourname

## Deploying to Vercel

After testing locally:

```bash
# Preview deployment
vercel

# Production deployment
vercel --prod
```

## Troubleshooting

If you encounter issues:

1. **Clean build**: `rm -rf .vercel dist && bun run build`
2. **Check Vercel status**: `vercel --version`
3. **Re-link project**: `vercel link`

