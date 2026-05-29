# Architecture

## Overview

meusocialmedia is a social media management platform built as a pnpm + NX monorepo deployed entirely on Cloudflare's edge infrastructure.

```
┌─────────────────────────────────────────────────────────────┐
│                     Cloudflare Network                       │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  CF Pages    │  │  CF Pages    │  │   CF Workers     │  │
│  │  www.*       │  │  app.*       │  │   api.*          │  │
│  │              │  │              │  │                  │  │
│  │ Landing page │  │ React SPA    │  │ Hono REST API    │  │
│  │ Vite + React │  │ TanStack     │  │                  │  │
│  └──────────────┘  └──────────────┘  └────────┬─────────┘  │
│                                               │             │
│                         ┌──────────────────────┤            │
│                         │                      │            │
│                   ┌─────▼─────┐    ┌───────────▼────────┐  │
│                   │  CF D1    │    │     CF R2           │  │
│                   │ SQLite DB │    │  Object Storage     │  │
│                   └───────────┘    └────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Monorepo Structure

```
meusocialmedia/
├── apps/
│   ├── www/          # Landing page — www.meusocialmedia.com.br
│   ├── app/          # Main SPA — app.meusocialmedia.com.br
│   └── api/          # REST API — api.meusocialmedia.com.br
├── packages/
│   ├── ui/           # Shared shadcn/ui components + Tailwind tokens
│   ├── types/        # Shared TypeScript types
│   └── utils/        # Shared utilities (format, validation, env)
├── docs/             # Documentation
└── .github/
    └── workflows/    # CI and CD pipelines
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Monorepo | NX 21 + pnpm workspaces |
| Frontend bundler | Vite 6 |
| UI framework | React 19 |
| Language | TypeScript 5.8 (strict) |
| UI components | shadcn/ui + Radix UI |
| Styling | Tailwind CSS v4 (CSS-first) |
| Routing | TanStack Router |
| Data fetching | TanStack Query v5 |
| API framework | Hono v4 |
| Database ORM | Drizzle ORM |
| Validation | Zod |
| Testing | Vitest |
| Runtime versions | Node 24.14.1, pnpm 10.33.0 (via mise) |
| Hosting | Cloudflare Pages (www + app) + Workers (api) |
| Database | Cloudflare D1 (SQLite) |
| Storage | Cloudflare R2 |

## Shared Packages

### `@meusocialmedia/ui`

Contains all shadcn/ui components and the shared Tailwind CSS design tokens. Both `www` and `app` import components from here. The `src/styles/globals.css` file defines all CSS custom properties (colors, radius, etc.) and is imported by each app's `src/styles/globals.css`.

### `@meusocialmedia/types`

TypeScript interfaces for all domain entities: `User`, `Post`, `SocialAccount`, `Subscription`, etc. Shared between frontend apps and the API.

### `@meusocialmedia/utils`

Shared utility functions:
- `formatDate`, `formatCurrency`, `formatNumber` (date-fns + Intl)
- `emailSchema`, `passwordSchema` (Zod schemas)
- `createEnv` (environment variable validation)

## API Design

The API follows REST conventions:
- All responses are JSON with the shape `{ data: T, meta?: PaginationMeta }`
- Errors return `{ code: string, message: string, details?: Record<string, string[]> }`
- Authentication uses session tokens stored in HTTP-only cookies
- All routes except `/health`, `/auth/register`, `/auth/login` require authentication

## Data Flow

```
Browser (app.meusocialmedia.com.br)
    │
    │ fetch(https://api.meusocialmedia.com.br/posts)
    │ Cookie: session=xxx
    ▼
Cloudflare Workers (api)
    │
    │ requireAuth middleware validates session token
    │ createDb(env.DB) → Drizzle D1 query
    ▼
Cloudflare D1 (SQLite database)
```

## Authentication

- Passwords hashed with PBKDF2 via Web Crypto API (available in CF Workers)
- Session tokens are random UUIDs stored in D1
- Sessions set as HTTP-only, Secure, SameSite=Lax cookies
- Token expiry: 30 days
