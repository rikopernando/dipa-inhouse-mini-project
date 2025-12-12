# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**CineTrack: Movie & Series Explorer** - A Next.js application demonstrating senior-level frontend development with TypeScript, React Query, and Atomic Design pattern. The app displays popular movies/series using The Movie Database (TMDB) API.

## Common Commands

### Development

```bash
# Start development server (http://localhost:3000)
yarn dev

# Build for production
yarn build

# Start production server
yarn start

# Run linter
yarn lint

# Run linter with auto-fix
yarn lint:fix

# Format all files with Prettier
yarn format

# Check if files are formatted correctly
yarn format:check
```

### Package Management

This project uses **Yarn** as the package manager (yarn.lock is present, not package-lock.json).

## Architecture & Code Structure

### Design Pattern: Atomic Design

The project follows Atomic Design methodology for component organization:

```
/src/
├── /components/
│   ├── /ui/         # shadcn/ui components (Button, Card, Input, etc.)
│   ├── /atoms/      # Custom basic building blocks (Text, Icon, etc.)
│   ├── /molecules/  # Simple component groups (MovieCard, SearchInput)
│   ├── /organisms/  # Complex components (MovieList, Header, Footer)
│   ├── /templates/  # Page-level layouts (BaseLayout)
│   └── /providers/  # React context providers (ReactQueryProvider)
├── /hooks/
│   ├── /query/      # React Query hooks (useGetMovies.ts, etc.)
│   └── /utility/    # Custom utility hooks (useDebounce.ts, etc.)
├── /api/            # Service layer with Axios instances
├── /types/          # TypeScript interfaces and types
├── /lib/            # Utility functions (cn from shadcn/ui)
└── /app/            # Next.js App Router pages
```

### Data Fetching Strategy

- **React Query (@tanstack/react-query)** is required for all API calls - provides caching, loading states, and error handling
- **Axios** for HTTP client in service layer
- Custom hooks pattern: `useGetPopularMovies`, `useSearchMovies`, etc.
- All API interactions should be abstracted into `/api/` service functions

### State Management

- Use React Query for server state (API data)
- Use React hooks (useState, useContext) for UI state
- No global state library (Redux/Zustand) needed for this project

### TypeScript Requirements

- All components must have explicit prop types
- API responses must have corresponding interfaces in `/types/`
- Avoid `any` types - use proper type definitions

### Styling & UI Components

- **Tailwind CSS v4** with PostCSS plugin (@tailwindcss/postcss)
- **shadcn/ui** for pre-built accessible components (New York style)
  - Icon library: lucide-react
  - Installed components: Card, Button, Input, Skeleton, Badge, Separator, Alert
  - Uses class-variance-authority (cva) for component variants
  - Utility function: `cn()` from lib/utils.ts for className merging
- Responsive design required (mobile-first approach)
- Dark mode support using Tailwind's dark: variants and CSS variables
- Geist Sans and Geist Mono fonts configured via next/font

### Key Technical Requirements

1. **Search Debouncing**: Must implement debouncing for search input to limit API calls
2. **Skeleton Loaders**: Required during loading states (not just "Loading..." text)
3. **Error Handling**: Display user-friendly error states and empty states
4. **Environment Variables**:
   - `NEXT_PUBLIC_TMDB_KEY`: Bearer token for TMDB API authentication
   - `NEXT_PUBLIC_TMDB_BASE_URL`: Base URL for TMDB API (defaults to https://api.themoviedb.org/3)
   - All stored in `.env.local`
5. **API Authentication**: Use Authorization Bearer header, not query parameters
6. **Pagination**: Implement using TMDB's `page` query parameter
7. **React Query Devtools**: Should be enabled in development mode

## Code Quality Standards

### ESLint Configuration

- Uses Next.js config with TypeScript support (eslint.config.mjs)
- Flat config format with `defineConfig` and `globalIgnores`
- Extends: `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`

### Prettier Configuration

Configuration file: `.prettierrc`

- Semi: true
- Single quotes: true
- Print width: 100
- Tab width: 2
- Plugin: prettier-plugin-tailwindcss

### Git Hooks (Husky)

The project uses Husky to enforce code quality before commits:

**Pre-commit Hook** (`.husky/pre-commit`):

- Runs `lint-staged` on staged files
- Automatically fixes ESLint issues
- Automatically formats code with Prettier
- Prevents commits with linting errors

**Commit Message Hook** (`.husky/commit-msg`):

- Validates commit messages using `commitlint`
- Enforces Conventional Commits format
- Prevents commits with invalid messages

### Commitlint Configuration

Configuration file: `commitlint.config.js`

**Commit Message Format:** `<type>(<scope>): <subject>`

**Allowed Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code formatting (no logic changes)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Test changes
- `chore`: Build process or tool changes
- `ci`: CI configuration changes
- `revert`: Revert previous commit

**Examples:**

```bash
feat: add movie search functionality
fix(api): resolve image loading issue
docs: update README with setup instructions
refactor(card): extract MovieCard to separate component
```

**Rules:**

- Header max length: 100 characters
- Subject must be lowercase (no upper-case, pascal-case, or start-case)
- Type is required
- Body max line length: 100 characters

### Lint-staged Configuration

Configuration file: `.lintstagedrc.js`

Runs on staged files only:

- `**/*.{ts,tsx,js,jsx}`: ESLint with auto-fix
- `**/*.{ts,tsx,js,jsx,json,css,md}`: Prettier formatting

### Naming Conventions

- **Component Files**: Use kebab-case (e.g., `movie-card.tsx`, `react-query-provider.tsx`)
- **Component Names**: Use PascalCase (e.g., `MovieCard`, `ReactQueryProvider`)
- **Hooks**: Use camelCase with `use` prefix (e.g., `useGetPopularMovies`)
- **Types/Interfaces**: Use PascalCase (e.g., `Movie`, `MovieResponse`)
- **Constants**: Use UPPER_SNAKE_CASE (e.g., `TMDB_IMAGE_BASE_URL`)

### Path Aliases

TypeScript configured with `@/*` alias pointing to root directory.

## Project Goals & Features

### MVP Features (Priority)

1. **F-01**: Homepage listing popular movies/series (React Query caching required)
2. **F-02**: Detail page for individual movies/series (dynamic route `/movies/[id]`)
3. **F-03**: Consistent Header/Footer navigation using Next.js `<Link>`
4. **F-04**: Search functionality with debouncing
5. **F-05**: Pagination with skeleton loaders

### Enhancement Features

1. **A-01**: Error states and empty states
2. **A-02**: Reusable components following Atomic Design
3. **A-03**: Fully responsive design
4. **A-04**: React Query Devtools integration

## Important Notes

- **No package-lock.json**: The package-lock.json file was deleted from git. Always use Yarn for dependency management.
- **TMDB API Configuration**:
  - Uses Bearer token authentication in Authorization header
  - Base URL configurable via environment variable
  - Default: `https://api.themoviedb.org/3`
- **Documentation**: Technical specifications are in `/documents/tech-doc.md` and project definition in `/documents/project-definition-document.md`
- **Component Reusability**: MovieCard and similar components must accept typed props for different use cases
- **Component File Naming**: All component files use kebab-case naming convention
- **Next.js Version**: 16.0.10 with App Router architecture

## Development Workflow

When implementing new features:

1. Define TypeScript interfaces in `/types/` first
2. Create service functions in `/api/` with proper error handling
3. Build React Query hook in `/hooks/query/`
4. Implement components following Atomic Design hierarchy
   - Use shadcn/ui components from `/components/ui/` as building blocks
   - Build custom atoms, molecules, and organisms on top of shadcn/ui primitives
5. Ensure responsive design and loading states
6. Test error scenarios and empty states

### Adding shadcn/ui Components

To add new shadcn/ui components:

```bash
npx shadcn@latest add [component-name]
```

Available components: https://ui.shadcn.com/docs/components
