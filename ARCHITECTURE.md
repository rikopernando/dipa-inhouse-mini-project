# 🏗️ Architecture Documentation

## Overview

CineTrack is built following modern React and Next.js best practices, utilizing the App Router architecture with a focus on performance, maintainability, and developer experience.

## Architecture Principles

### 1. Atomic Design Pattern

Components are organized following Brad Frost's Atomic Design methodology:

- **Atoms** - Basic building blocks (Typography, ErrorState, etc.)
- **Molecules** - Simple component groups (MovieCard, SearchInput, etc.)
- **Organisms** - Complex UI sections (Header, SearchableMovieSection, etc.)

### 2. Separation of Concerns

- **API Layer** (`/api`) - All external API interactions
- **Components** (`/components`) - Pure UI components
- **Hooks** (`/hooks`) - Reusable logic and state management
- **Lib** (`/lib`) - Utility functions and constants
- **Types** (`/types`) - TypeScript type definitions

### 3. Server-First Architecture

Leveraging Next.js 15 App Router for:

- Server Components by default
- Client Components only when necessary ('use client')
- ISR for optimal performance
- SSG for static content

## Data Flow

### Home Page (Popular Movies)

```
Server (ISR) → fetchPopularMovies() → Initial Data
     ↓
Client Component → useMovieData hook
     ↓
React Query (pages 2+) → Cached Data
     ↓
UI Rendering
```

### Search Flow

```
User Input → Debounce (300ms) → useSearchMovies hook
     ↓
React Query → TMDB API
     ↓
Cached Results → UI Update
```

### Movie Detail Page

```
Build Time → generateStaticParams() → Pre-render 20 movies
     ↓
Runtime → ISR (1 hour revalidation)
     ↓
fetchMovieDetail() → Movie Data
     ↓
UI Rendering
```

## Component Architecture

### SearchableMovieSection (Organism)

The main feature component demonstrating our architecture:

```typescript
// Custom hooks for separation of concerns
const debouncedSearchTerm = useDebounce(searchTerm, 300);
const isSearchActive = useMemo(/* ... */);

// Data fetching abstraction
const { movies, totalPages, isLoading, isError } = useMovieData({
  isSearchActive,
  debouncedSearchTerm,
  currentPage,
  initialMovies,
});

// Page management
usePageReset(debouncedSearchTerm, handleResetPage);
useScrollToSection(sectionRef, [currentPage], options);

// Event handlers with stable references
const handlePageChange = useCallback((page: number) => {
  setCurrentPage(page);
}, []);
```

**Key Features:**

- Memoized computed values (useMemo)
- Stable function references (useCallback)
- Custom hooks for complex logic
- Optimistic UI updates

## State Management Strategy

### Server State (React Query)

Used for all API data:

- Popular movies
- Search results
- Movie details

**Configuration:**

```typescript
{
  staleTime: 5 minutes,
  cacheTime: 10 minutes,
  refetchOnWindowFocus: false
}
```

### Client State (React useState)

Used for UI state:

- Search term
- Current page
- Theme preference (next-themes)

### URL State

- Movie ID (dynamic routes)
- Page number (future: query params)

## Performance Optimizations

### 1. ISR (Incremental Static Regeneration)

**Home Page:**

- Pre-rendered at build time
- Revalidates every 30 minutes
- Zero client-side fetches on first page

**Movie Details:**

- Top 20 movies pre-rendered
- Revalidates every 1 hour
- On-demand generation for other movies

### 2. Data Fetching Optimization

```typescript
// Page 1: Use ISR data (no fetch)
if (currentPage === 1) {
  return {
    movies: initialMovies,
    isLoading: false,
  };
}

// Pages 2+: Conditional fetching
useGetPopularMovies(currentPage, !isSearchActive && currentPage > 1);
```

### 3. Image Optimization

```typescript
// next.config.ts
{
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  }
}
```

### 4. Debouncing

Search input debounced by 300ms to reduce API calls:

```typescript
const debouncedSearchTerm = useDebounce(searchTerm, 300);
```

### 5. Component Memoization

```typescript
// MovieCard is memoized
export const MovieCard = memo(MovieCardComponent, (prevProps, nextProps) => {
  return prevProps.movie.id === nextProps.movie.id;
});
```

## Error Handling

### Error Boundaries

```
app/error.tsx (Root)
  ↓
Try/Catch in Server Components
  ↓
React Query Error States
  ↓
ErrorState Component
```

### Error Recovery

1. **Root Error Boundary** - Catches all React errors
2. **Not Found** - Custom 404 page
3. **API Errors** - Handled by React Query with retry logic
4. **Network Errors** - User-friendly error messages

## Routing Structure

```
/ (Home)
  ├── ISR: 30 minutes
  ├── Server Component
  └── Client: SearchableMovieSection

/movies/[id] (Movie Detail)
  ├── ISR: 1 hour
  ├── SSG: Top 20 movies
  ├── Server Component
  └── Dynamic: On-demand generation
```

## Styling Architecture

### Tailwind CSS Configuration

- Custom theme via CSS variables
- Dark mode support (class-based)
- Responsive design utilities

### Component Styling Strategy

1. **Utility-First** - Tailwind classes directly in JSX
2. **CVA (Class Variance Authority)** - For component variants
3. **CSS Variables** - For theme colors
4. **Responsive** - Mobile-first approach

### Theme System

```css
:root {
  /* Light theme variables */
}

.dark {
  /* Dark theme variables */
}
```

Managed by `next-themes`:

- Persistent theme selection
- System preference detection
- No flash on page load

## Type Safety

### Type Definitions

```typescript
// types/movie.ts
export interface Movie {
  id: number;
  title: string;
  // ... all TMDB fields
}

export interface MovieResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}
```

### Generic Hooks

```typescript
export function useScrollToSection<T extends HTMLElement>(
  ref: RefObject<T | null>,
  deps: React.DependencyList,
  options: UseScrollToSectionOptions = {},
): void;
```

## Security Considerations

### Environment Variables

- API keys in `.env.local` (gitignored)
- `NEXT_PUBLIC_*` prefix for client-side vars
- Server-side API calls when possible

### API Rate Limiting

- React Query caching reduces calls
- ISR reduces server load
- Debouncing prevents spam

### Content Security

- Next.js automatic XSS protection
- Image optimization via Next.js Image
- No dangerouslySetInnerHTML usage

## Testing Strategy (Future)

### Recommended Testing Pyramid

```
E2E Tests (Playwright)
  ↓
Integration Tests (React Testing Library)
  ↓
Unit Tests (Jest + RTL)
```

### Key Areas to Test

1. **Components**
   - MovieCard rendering
   - Pagination logic
   - Search functionality

2. **Hooks**
   - useDebounce behavior
   - useMovieData logic
   - usePageReset edge cases

3. **API**
   - Mock TMDB responses
   - Error handling
   - Rate limiting

## Build Process

### Development

```bash
yarn dev
  ↓
Next.js Dev Server (Turbopack)
  ↓
Hot Module Replacement
  ↓
TypeScript Type Checking
  ↓
ESLint
```

### Production

```bash
yarn build
  ↓
TypeScript Compilation
  ↓
Static Page Generation
  ↓
ISR Setup
  ↓
Image Optimization
  ↓
Code Splitting
  ↓
Minification
```

## Deployment Architecture

### Vercel (Recommended)

```
Git Push → GitHub
  ↓
Vercel Build
  ↓
Edge Network Distribution
  ↓
ISR at Edge
  ↓
Automatic Scaling
```

### Key Features:

- Zero-config deployment
- Edge Functions
- Image Optimization CDN
- Analytics
- Preview deployments

## Future Considerations

### Scalability

- Add Redis for caching
- Implement virtual scrolling for large lists
- Add service worker for offline support

### Monitoring

- Error tracking (Sentry)
- Performance monitoring (Vercel Analytics)
- User analytics (Google Analytics)

### Features

- User authentication
- Favorites/Watchlist
- Reviews and ratings
- Social sharing

## Best Practices Implemented

✅ **TypeScript** - Full type safety
✅ **ESLint** - Code quality
✅ **Atomic Design** - Component organization
✅ **Custom Hooks** - Logic reusability
✅ **Memoization** - Performance optimization
✅ **Error Boundaries** - Graceful error handling
✅ **Accessibility** - WCAG compliance
✅ **SEO** - Meta tags and Open Graph
✅ **ISR** - Optimal data freshness
✅ **React Query** - Smart data fetching

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [TMDB API Documentation](https://developer.themoviedb.org/docs)
