# Contributing

## Development Workflow

We follow trunk-based development with short-lived feature branches.

### Branch Strategy

```
main          — production, always deployable
develop       — integration branch (optional)
feature/xxx   — short-lived feature branches
fix/xxx       — bug fixes
```

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(api): add post scheduling endpoint
fix(www): hero section not rendering on mobile
chore(deps): update hono to 4.7.11
docs(architecture): add data flow diagram
test(api): add auth route integration tests
```

### Pull Request Process

1. Create a branch from `main`
2. Implement changes following our code style
3. Write tests for new behavior
4. Ensure CI passes (`pnpm typecheck && pnpm lint && pnpm test && pnpm build`)
5. Open a PR — CI runs automatically
6. Get at least one review
7. Squash and merge

## Code Style

- **TypeScript strict mode** — no `any`, no `ts-ignore` without comment
- **Tailwind CSS** — utility classes only, no custom CSS unless absolutely necessary
- **No barrel files** unless the package is a published library
- **Named exports** preferred over default exports (except for pages/routes)
- **Component naming**: PascalCase files for components, kebab-case for utilities

## Testing

Every PR should include tests for new behavior. We use Vitest across the monorepo.

```bash
# Run tests for affected projects only
pnpm affected:test

# Run tests with coverage
cd apps/api && vitest run --coverage
```

## Adding a New shadcn Component

Components live in `packages/ui/src/components/ui/`:

```bash
# From repo root
cd packages/ui
pnpm dlx shadcn@latest add [component-name]
# Update src/index.ts to export the new component
```

## Adding a New Shared Utility

Add to `packages/utils/src/`:
1. Create the file
2. Export from `packages/utils/src/index.ts`
3. Write tests in `packages/utils/src/__tests__/`
