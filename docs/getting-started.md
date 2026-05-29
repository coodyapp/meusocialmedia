# Getting Started

## Prerequisites

| Tool | Version |
|------|---------|
| [mise](https://mise.jdx.dev/) | latest |
| Node.js | 24.14.1 (managed by mise) |
| pnpm | 10.33.0 (managed by mise) |

## Setup

```bash
# Clone the repository
git clone https://github.com/coodyapp/meusocialmedia.git
cd meusocialmedia

# Install tool versions (Node + pnpm via mise)
mise install

# Install all workspace dependencies
pnpm install
```

## Development

```bash
# Run all three apps in parallel
pnpm dev

# Or run individually
pnpm dev:www   # http://localhost:5173 — landing page
pnpm dev:app   # http://localhost:5174 — main application
pnpm dev:api   # http://localhost:8787 — API (Cloudflare Worker via wrangler)
```

## Environment Variables

### apps/www and apps/app

Create `.env.local` in each app directory:

```env
VITE_API_URL=http://localhost:8787
```

### apps/api

Create `apps/api/.dev.vars` (gitignored):

```env
JWT_SECRET=your-local-secret-here
STRIPE_SECRET_KEY=sk_test_xxx
```

## Running Tests

```bash
# Run all tests once
pnpm test

# Watch mode
pnpm test:watch

# Run tests for a specific app
cd apps/api && pnpm test
```

## Database (D1)

```bash
# Apply migrations locally
cd apps/api
pnpm db:migrate

# Apply migrations to remote (production)
wrangler d1 migrations apply meusocialmedia-db --remote

# Open Drizzle Studio (local DB GUI)
pnpm db:studio
```

## Building

```bash
# Build all apps
pnpm build

# Build individually
pnpm build:www
pnpm build:app
pnpm build:api
```

## NX Commands

```bash
# Visualize project dependency graph
pnpm graph

# Run only affected projects (since last commit)
pnpm affected:build
pnpm affected:test
pnpm affected:lint
```
