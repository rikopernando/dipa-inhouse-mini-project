# 🤝 Contributing to CineTrack

First off, thank you for considering contributing to CineTrack! It's people like you that make CineTrack such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our commitment to creating a welcoming and inclusive environment. Please be respectful and constructive in your interactions.

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

**Bug Report Template:**

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:

1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**

- OS: [e.g. macOS, Windows, Linux]
- Browser: [e.g. Chrome 120, Safari 17]
- Node version: [e.g. 20.10.0]
- Yarn version: [e.g. 1.22.19]

**Additional context**
Add any other context about the problem here.
```

### ✨ Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

**Enhancement Template:**

```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is. Ex. I'm always frustrated when [...]

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.
```

### 💻 Pull Requests

1. **Fork the repository**

   ```bash
   # Fork via GitHub UI, then clone your fork
   git clone https://github.com/YOUR_USERNAME/dipa-inhouse-mini-project.git
   cd dipa-inhouse-mini-project
   ```

2. **Create a branch**

   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

3. **Make your changes**
   - Write clean, readable code
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test your changes**

   ```bash
   # Run the dev server
   yarn dev

   # Build the project
   yarn build

   # Check for linting errors
   yarn lint
   ```

5. **Commit your changes**

   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

   **Commit Message Convention:**
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `style:` Code style changes (formatting, etc.)
   - `refactor:` Code refactoring
   - `perf:` Performance improvements
   - `test:` Adding or updating tests
   - `chore:` Maintenance tasks

6. **Push to your fork**

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill out the PR template

## Development Setup

### Prerequisites

- Node.js 18.17 or later
- Yarn 1.22 or later
- TMDB API key

### Setup Steps

1. **Clone and install**

   ```bash
   git clone https://github.com/YOUR_USERNAME/dipa-inhouse-mini-project.git
   cd dipa-inhouse-mini-project
   yarn install
   ```

2. **Environment setup**

   ```bash
   cp .env.example .env.local
   # Add your TMDB API key to .env.local
   ```

3. **Run development server**

   ```bash
   yarn dev
   ```

4. **Setup git hooks**
   ```bash
   yarn prepare
   ```

## Coding Guidelines

### TypeScript

- Always use TypeScript
- Define proper types/interfaces
- Avoid `any` type
- Use type inference when obvious

**Good:**

```typescript
interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  // ...
}
```

**Bad:**

```typescript
export function MovieCard({ movie }: any) {
  // ...
}
```

### React Components

#### Component Structure

```typescript
'use client'; // Only if needed

import { useState } from 'react';
import { ComponentName } from '@/components/...';

export interface ComponentProps {
  // Props definition
}

/**
 * Component description
 *
 * @example
 * <Component prop="value" />
 */
export function Component({ prop }: ComponentProps) {
  // Hooks
  const [state, setState] = useState();

  // Event handlers
  const handleClick = () => {
    // ...
  };

  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

#### Naming Conventions

- **Components:** PascalCase (`MovieCard`, `SearchInput`)
- **Hooks:** camelCase with 'use' prefix (`useMovieData`, `useDebounce`)
- **Utilities:** camelCase (`formatDate`, `getImageUrl`)
- **Constants:** UPPER_SNAKE_CASE (`API_CONFIG`, `GRID_CONFIG`)
- **Types/Interfaces:** PascalCase (`Movie`, `MovieResponse`)

#### File Organization

```
component-name.tsx         # Component file
  ├── Imports
  ├── Types/Interfaces
  ├── Component definition
  └── Export
```

### Styling

#### Tailwind CSS

- Use Tailwind utility classes
- Follow mobile-first approach
- Group related classes
- Use the `cn()` utility for conditional classes

**Good:**

```typescript
<div className={cn(
  "flex items-center gap-4",
  "rounded-lg border p-4",
  isActive && "bg-primary text-primary-foreground"
)}>
```

**Bad:**

```typescript
<div className="flex items-center gap-4 rounded-lg border p-4 bg-primary text-primary-foreground">
```

### Custom Hooks

#### Hook Structure

```typescript
import { useState, useEffect } from 'react';

/**
 * Hook description
 *
 * @param param - Parameter description
 * @returns Return value description
 *
 * @example
 * const value = useCustomHook(param);
 */
export function useCustomHook(param: string) {
  const [state, setState] = useState();

  useEffect(() => {
    // Side effects
  }, [param]);

  return state;
}
```

### API Integration

#### Fetch Functions

```typescript
export async function fetchData(): Promise<ResponseType> {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_CONFIG.ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  return response.json();
}
```

#### React Query Hooks

```typescript
export const useGetData = (param: string) => {
  return useQuery<ResponseType, Error>({
    queryKey: ['dataKey', param],
    queryFn: () => fetchData(param),
    staleTime: API_CONFIG.STALE_TIME,
  });
};
```

## Component Organization (Atomic Design)

### Atoms

- Simple, reusable UI elements
- No dependencies on other components
- Examples: Typography, ErrorState, GridLayout

### Molecules

- Combination of atoms
- Self-contained functionality
- Examples: MovieCard, SearchInput, Pagination

### Organisms

- Complex UI sections
- May contain atoms and molecules
- Examples: Header, SearchableMovieSection, MovieHero

## Testing (Future)

When testing is implemented, follow these guidelines:

### Unit Tests

```typescript
import { render, screen } from '@testing-library/react';
import { MovieCard } from './movie-card';

describe('MovieCard', () => {
  it('renders movie title', () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('Movie Title')).toBeInTheDocument();
  });
});
```

### Integration Tests

- Test component interactions
- Mock API calls
- Test user flows

## Documentation

### Code Comments

- Add JSDoc comments for components and functions
- Explain complex logic
- Document API expectations

### Documentation Files

When updating features, update relevant docs:

- `README.md` - Overview and getting started
- `ARCHITECTURE.md` - Architecture decisions
- `docs/API.md` - API integration details

## Performance Guidelines

### Optimization Checklist

- ✅ Use `React.memo` for expensive components
- ✅ Use `useCallback` for event handlers
- ✅ Use `useMemo` for expensive calculations
- ✅ Lazy load components when appropriate
- ✅ Optimize images with Next.js Image
- ✅ Implement proper loading states
- ✅ Use ISR/SSG when possible

### Example

```typescript
// Memoize expensive component
export const ExpensiveComponent = memo(Component, (prev, next) => {
  return prev.id === next.id;
});

// Stable callback reference
const handleClick = useCallback(() => {
  doSomething(param);
}, [param]);

// Expensive calculation
const value = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);
```

## Accessibility Guidelines

### Requirements

- ✅ Semantic HTML
- ✅ ARIA labels where needed
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ Screen reader support
- ✅ Color contrast (WCAG AA)

### Example

```typescript
<button
  onClick={handleClick}
  aria-label="Close dialog"
  className="..."
>
  <X className="h-4 w-4" aria-hidden="true" />
</button>
```

## Git Workflow

### Branch Naming

- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/what-changed` - Documentation
- `refactor/what-changed` - Refactoring
- `perf/what-improved` - Performance

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Examples:**

```
feat(search): add debounced search input

Implements 300ms debounce to reduce API calls during search.
Improves performance and stays within TMDB rate limits.

Closes #123
```

```
fix(pagination): correct page reset on search

Fixed issue where page number wasn't resetting when
performing a new search, causing incorrect results.

Fixes #456
```

## Review Process

### Pull Request Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated if needed
- [ ] No console errors or warnings
- [ ] Builds successfully (`yarn build`)
- [ ] Linting passes (`yarn lint`)
- [ ] Tested in development
- [ ] Screenshots added (if UI changes)

### Review Criteria

Reviewers will check:

1. **Code Quality** - Clean, readable, maintainable
2. **Functionality** - Works as expected
3. **Performance** - No performance regressions
4. **Accessibility** - Meets accessibility standards
5. **Documentation** - Adequate comments and docs
6. **Testing** - Proper error handling

## Questions?

Feel free to:

- Open an issue for questions
- Join discussions
- Reach out to maintainers

## Recognition

Contributors will be recognized in:

- GitHub contributors list
- Release notes (for significant contributions)

Thank you for contributing! 🎉
