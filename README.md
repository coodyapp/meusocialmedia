<div align="center">

# meu Social Media

**Agentes de IA para gestão de redes sociais**

[![CI](https://github.com/coodyapp/meusocialmedia/actions/workflows/ci.yaml/badge.svg)](https://github.com/coodyapp/meusocialmedia/actions/workflows/ci.yaml)
[![CD](https://github.com/coodyapp/meusocialmedia/actions/workflows/cd.yaml/badge.svg)](https://github.com/coodyapp/meusocialmedia/actions/workflows/cd.yaml)
[![Node](https://img.shields.io/badge/node-24.14.1-brightgreen?logo=node.js)](https://nodejs.org)
[![pnpm](https://img.shields.io/badge/pnpm-10.33.0-orange?logo=pnpm)](https://pnpm.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)](https://vitejs.dev)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-Workers%20%2B%20Pages%20%2B%20D1%20%2B%20R2-F38020?logo=cloudflare)](https://cloudflare.com)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

[www.meusocialmedia.com.br](https://www.meusocialmedia.com.br) · [app.meusocialmedia.com.br](https://app.meusocialmedia.com.br) · [api.meusocialmedia.com.br](https://api.meusocialmedia.com.br)

</div>

---

## Overview

**meu Social Media** is an AI-powered social media management platform that lets you create, schedule, and analyze content across all major platforms through intelligent agents.

This repository is a **pnpm + NX monorepo** with three apps deployed to Cloudflare's global edge:

| App | URL | Description |
|-----|-----|-------------|
| `apps/www` | [www.meusocialmedia.com.br](https://www.meusocialmedia.com.br) | Marketing landing page |
| `apps/app` | [app.meusocialmedia.com.br](https://app.meusocialmedia.com.br) | Main application |
| `apps/api` | [api.meusocialmedia.com.br](https://api.meusocialmedia.com.br) | REST API |

## Tech Stack

| | Technology |
|---|---|
| **Monorepo** | NX 21 + pnpm workspaces |
| **Frontend** | React 19 + Vite 6 + TypeScript 5.8 |
| **UI** | shadcn/ui + Radix UI + Tailwind CSS v4 |
| **Routing** | TanStack Router |
| **Data fetching** | TanStack Query v5 |
| **API** | Hono v4 on Cloudflare Workers |
| **Database** | Drizzle ORM + Cloudflare D1 |
| **Storage** | Cloudflare R2 |
| **Testing** | Vitest |
| **Tooling** | mise (Node 24.14.1 + pnpm 10.33.0) |

## Quick Start

```bash
# Prerequisites: install mise (https://mise.jdx.dev/)
git clone https://github.com/coodyapp/meusocialmedia.git
cd meusocialmedia
mise install         # sets up Node 24.14.1 + pnpm 10.33.0
pnpm install
pnpm dev             # runs all three apps in parallel
```

See [docs/getting-started.md](docs/getting-started.md) for full setup instructions.

## Project Structure

```
meusocialmedia/
├── apps/
│   ├── www/        # Landing page (Vite + React)
│   ├── app/        # Main app (Vite + React + TanStack)
│   └── api/        # REST API (Hono + Drizzle + D1)
├── packages/
│   ├── ui/         # Shared shadcn/ui components + design tokens
│   ├── types/      # Shared TypeScript types
│   └── utils/      # Shared utilities
└── docs/           # Documentation
```

## Commands

```bash
pnpm dev            # Run all apps in parallel
pnpm build          # Build all apps
pnpm test           # Run all tests
pnpm lint           # Lint all projects
pnpm typecheck      # Type-check all projects
pnpm format         # Format all files

pnpm dev:www        # Dev server — http://localhost:5173
pnpm dev:app        # Dev server — http://localhost:5174
pnpm dev:api        # Dev server — http://localhost:8787

pnpm graph          # Visualize project dependency graph
pnpm affected:test  # Test only affected projects
```

## Documentation

- [Getting Started](docs/getting-started.md)
- [Architecture](docs/architecture.md)
- [Deployment](docs/deployment.md)
- [Contributing](docs/contributing.md)

## CI/CD

Every push triggers the CI pipeline (typecheck → lint → test → build). Merges to `main` automatically deploy to production via Cloudflare.

Required GitHub secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `JWT_SECRET`, `STRIPE_SECRET_KEY`.

See [docs/deployment.md](docs/deployment.md) for first-time Cloudflare setup.

## License

MIT © [Coody App](https://coody.app)
