# Deployment

## Infrastructure Overview

All apps deploy to Cloudflare's global edge network:

| App | Service | Project Name | URL |
|-----|---------|-------------|-----|
| www | Cloudflare Pages | `meusocialmedia-www` | www.meusocialmedia.com.br |
| app | Cloudflare Pages | `meusocialmedia-app` | app.meusocialmedia.com.br |
| api | Cloudflare Workers | `meusocialmedia-api` | api.meusocialmedia.com.br |

## Required GitHub Secrets

Add these to your GitHub repository Settings → Secrets and variables → Actions:

| Secret | Description |
|--------|-------------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token with Pages + Workers + D1 + R2 permissions |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID |
| `JWT_SECRET` | Random 64-char string for session signing |
| `STRIPE_SECRET_KEY` | Stripe secret key for billing |

## First-Time Cloudflare Setup

### 1. Create D1 Database

```bash
wrangler d1 create meusocialmedia-db
```

Copy the `database_id` from the output and update `apps/api/wrangler.toml`.

### 2. Create R2 Bucket

```bash
wrangler r2 bucket create meusocialmedia-storage
```

### 3. Create Cloudflare Pages Projects

```bash
# Create www Pages project
wrangler pages project create meusocialmedia-www

# Create app Pages project
wrangler pages project create meusocialmedia-app
```

### 4. Configure Custom Domains

In the Cloudflare Dashboard:
- Pages → meusocialmedia-www → Custom domains → `www.meusocialmedia.com.br`
- Pages → meusocialmedia-app → Custom domains → `app.meusocialmedia.com.br`
- Workers → meusocialmedia-api → Triggers → Routes → `api.meusocialmedia.com.br/*`

### 5. Run Initial Migrations

```bash
cd apps/api
wrangler d1 migrations apply meusocialmedia-db --remote
```

## CI/CD Pipeline

### CI (`ci.yaml`)

Triggered on every push and pull request to `main` or `develop`:

1. **Setup** — install deps, cache NX
2. **Typecheck** — `tsc --noEmit` across all projects
3. **Lint** — Prettier format check + ESLint
4. **Test** — Vitest across all projects
5. **Build** — Matrix build: www, app, api (only if checks pass)

### CD (`cd.yaml`)

Triggered on push to `main` (or manually via `workflow_dispatch`):

1. **Build www** → upload artifact
2. **Build app** → upload artifact
3. **Build api** → upload artifact (wrangler dry-run)
4. **Deploy www** → `wrangler pages deploy` to `meusocialmedia-www`
5. **Deploy app** → `wrangler pages deploy` to `meusocialmedia-app`
6. **Deploy api** → D1 migrations + `wrangler deploy`

### Manual Deploy

You can trigger a deploy for a specific app from GitHub Actions → CD → Run workflow.

## Environment Management

### Production Secrets (Workers)

API secrets are injected via Wrangler during deploy:

```bash
wrangler secret put JWT_SECRET
wrangler secret put STRIPE_SECRET_KEY
```

### Pages Environment Variables

Set via Cloudflare Dashboard or:

```bash
wrangler pages env set VITE_API_URL https://api.meusocialmedia.com.br --project-name=meusocialmedia-www
```

## Rollback

Cloudflare Pages keeps a history of all deployments. To roll back:

1. Go to Cloudflare Dashboard → Pages → [project] → Deployments
2. Find the previous deployment
3. Click "Rollback to this deployment"

For Workers, use the `wrangler rollback` command or the dashboard.
