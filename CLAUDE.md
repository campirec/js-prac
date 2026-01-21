# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a pnpm-based monorepo for JavaScript/TypeScript practice using Vite as the build tool. The workspace uses a centralized dependency management strategy where shared development dependencies (TypeScript, Vite, @types/node) are installed at the root level and inherited by all workspace packages.

## Architecture

- **Monorepo Structure**: pnpm workspace with packages under `packages/*/`
- **Shared Dependencies**: All packages use root-level devDependencies (typescript, vite, @types/node)
- **TypeScript Configuration**: Root `tsconfig.json` provides base config, individual packages extend it
- **Workspace Pattern**: `pnpm-workspace.yaml` defines `packages/*` pattern

## Common Commands

### Development
```bash
# Run all packages in parallel
pnpm dev

# Run specific package
pnpm --filter <package-name> dev

# Example: run the app package
pnpm --filter @js-prac/app dev
```

### Building
```bash
# Build all packages
pnpm build

# Build specific package
pnpm --filter <package-name> build
```

### Dependency Management
```bash
# Add dependency to specific package
pnpm --filter <package-name> add <package>

# Add dev dependency to root (affects all packages)
pnpm add -D -w <package>

# Add dev dependency to specific package
pnpm --filter <package-name> add -D <package>

# List all packages in workspace
pnpm list --depth 0
```

### Cleanup
```bash
# Clean all build artifacts and node_modules
pnpm clean
```

## Adding New Packages

1. Create package directory under `packages/`
2. Initialize with `package.json` (set `private: true` for workspace packages)
3. Optionally extend root TypeScript config with `extends: "../../tsconfig.json"`
4. Run `pnpm install` to register the package

For Vite apps, use:
```bash
pnpm create vite packages/<app-name> -- --template <template-name>
```

Available templates: `vanilla`, `vanilla-ts`, `vue-ts`, `react-ts`, `preact-ts`, `lit-ts`, `svelte-ts`

## Key Files

- `pnpm-workspace.yaml`: Defines workspace package pattern
- `tsconfig.json`: Root TypeScript configuration
- `package.json`: Root package with shared devDependencies and workspace scripts
