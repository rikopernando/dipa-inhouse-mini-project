# 🎬 CineTrack

A modern, high-performance movie discovery application built with Next.js 15, featuring server-side rendering, real-time search, and a beautiful dark mode.

## ✨ Features

### Core Features

- 🎥 **Popular Movies Discovery** - Browse trending and popular movies with ISR (Incremental Static Regeneration)
- 🔍 **Real-time Search** - Search through thousands of movies with debounced input
- 📄 **Pagination** - Navigate through movie results with smart pagination controls
- 🎨 **Movie Details** - View comprehensive movie information including ratings, genres, and descriptions
- 🌓 **Dark Mode** - Toggle between light, dark, and system themes
- 📱 **Responsive Design** - Optimized for all screen sizes

### Technical Features

- ⚡ **ISR Optimization** - 30-minute revalidation for popular movies (zero client-side fetches on page 1)
- 🚀 **SSG for Movie Details** - 1-hour revalidation with build-time pre-rendering
- 🎯 **Smart Data Fetching** - React Query with 5-minute stale time and caching
- ♿ **Accessibility** - WCAG compliant with keyboard navigation and screen reader support
- 🎭 **Error Boundaries** - Graceful error handling with user-friendly fallbacks
- 🔗 **SEO Optimized** - Dynamic metadata, Open Graph tags, and Twitter Cards
- 🖼️ **Image Optimization** - Next.js Image component with AVIF/WebP formats

## 🛠️ Tech Stack

### Frontend

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Fonts:** [Geist](https://vercel.com/font) (Sans & Mono)

### State Management & Data Fetching

- **Data Fetching:** [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Theme:** [next-themes](https://github.com/pacocoursey/next-themes)

### Code Quality

- **Linting:** ESLint
- **Git Hooks:** Husky
- **Package Manager:** Yarn

### API

- **Data Source:** [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.17 or later
- **Yarn** 1.22 or later (or npm/pnpm)
- **TMDB API Key** - [Get one here](https://www.themoviedb.org/settings/api)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd dipa-inhouse-mini-project
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Then edit `.env.local` and add your TMDB API key:

```env
# TMDB API Configuration
NEXT_PUBLIC_TMDB_KEY=your_bearer_token_here
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
```

> **Note:** Get your TMDB Bearer Token (not API key) from [TMDB Settings](https://www.themoviedb.org/settings/api)

### 4. Run the development server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## 🏗️ Building for Production

### Build the application

```bash
yarn build
```

### Start the production server

```bash
yarn start
```

### Preview the build

```bash
yarn build && yarn start
```

## 📁 Project Structure

```
dipa-inhouse-mini-project/
├── api/                          # API integration layer
│   ├── config.ts                 # API configuration and image URLs
│   └── movies.ts                 # Movie API endpoints
├── app/                          # Next.js App Router
│   ├── movies/[id]/             # Movie detail page (SSG)
│   │   ├── page.tsx             # Movie detail component
│   │   └── loading.tsx          # Loading skeleton
│   ├── error.tsx                # Root error boundary
│   ├── not-found.tsx            # 404 page
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Home page (ISR)
│   ├── loading.tsx              # Home loading skeleton
│   └── globals.css              # Global styles and theme
├── components/                   # React components (Atomic Design)
│   ├── atoms/                   # Basic building blocks
│   │   ├── error-state.tsx
│   │   ├── empty-state.tsx
│   │   ├── grid-layout.tsx
│   │   ├── pagination-info.tsx
│   │   └── typography.tsx
│   ├── molecules/               # Composite components
│   │   ├── hero-section.tsx
│   │   ├── movie-card.tsx
│   │   ├── movie-card-skeleton.tsx
│   │   ├── movie-detail-skeleton.tsx
│   │   ├── page-section.tsx
│   │   ├── pagination.tsx
│   │   ├── search-input.tsx
│   │   └── theme-toggle.tsx
│   ├── organisms/               # Complex components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── movie-hero.tsx
│   │   ├── movie-info.tsx
│   │   └── searchable-movie-section.tsx
│   ├── providers/               # Context providers
│   │   ├── react-query-provider.tsx
│   │   └── theme-provider.tsx
│   └── ui/                      # shadcn/ui components
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dropdown-menu.tsx
│       ├── input.tsx
│       ├── pagination.tsx
│       └── skeleton.tsx
├── hooks/                        # Custom React hooks
│   ├── query/                   # React Query hooks
│   │   ├── useGetMovieDetail.ts
│   │   ├── useGetPopularMovies.ts
│   │   └── useSearchMovies.ts
│   ├── useDebounce.ts           # Debounce hook
│   ├── useMovieData.ts          # Movie data management
│   ├── usePageReset.ts          # Page reset logic
│   └── useScrollToSection.ts    # Scroll behavior
├── lib/                          # Utility functions
│   ├── constants.ts             # App constants
│   ├── movie-utils.ts           # Movie utility functions
│   └── utils.ts                 # General utilities
├── types/                        # TypeScript types
│   └── movie.ts                 # Movie type definitions
├── .env.example                  # Environment variables template
├── .env.local                    # Local environment variables (gitignored)
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.ts           # Tailwind CSS configuration
└── package.json                 # Dependencies and scripts
```

## 🎯 Key Concepts

### ISR (Incremental Static Regeneration)

- **Home Page:** Revalidates every 30 minutes
- **Movie Details:** Revalidates every 1 hour
- Pre-renders top 20 popular movies at build time

### React Query Configuration

- **Stale Time:** 5 minutes (300,000ms)
- **Caching Strategy:** Automatic cache management
- **Optimistic Updates:** Instant UI feedback

### Performance Optimizations

1. **Zero Client Fetches on Page 1** - Uses ISR data directly
2. **Image Optimization** - AVIF/WebP with responsive sizes
3. **Code Splitting** - Automatic by Next.js
4. **Debounced Search** - 300ms delay to reduce API calls
5. **Memoization** - useCallback and useMemo for stable references

### Accessibility Features

- Skip to main content link
- ARIA labels and roles
- Keyboard navigation
- Screen reader support
- Focus management

## 📝 Available Scripts

```bash
# Development
yarn dev          # Start development server
yarn build        # Build for production
yarn start        # Start production server
yarn lint         # Run ESLint

# Code Quality
yarn prepare      # Setup Husky git hooks
```

## 🌐 API Integration

This project uses [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api) for movie data.

### API Endpoints Used:

- `GET /movie/popular` - Fetch popular movies
- `GET /search/movie` - Search movies
- `GET /movie/{id}` - Get movie details

### Rate Limits:

- 40 requests per 10 seconds (free tier)
- The app implements caching and ISR to minimize API calls

## 🎨 Customization

### Theme

Edit `app/globals.css` to customize colors:

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  /* ... more variables */
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... more variables */
}
```

### Constants

Edit `lib/constants.ts` to modify:

- API configuration
- Grid layouts
- Pagination settings
- Page content

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com/new)
3. Add environment variables:
   - `NEXT_PUBLIC_TMDB_KEY`
   - `NEXT_PUBLIC_TMDB_BASE_URL`
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/your-repo)

### Other Platforms

- **Netlify:** Compatible with Next.js
- **Railway:** Full Next.js support
- **Docker:** Add Dockerfile for containerization

## 📄 Environment Variables

| Variable                    | Description                    | Required | Default                        |
| --------------------------- | ------------------------------ | -------- | ------------------------------ |
| `NEXT_PUBLIC_TMDB_KEY`      | TMDB API Bearer Token          | Yes      | -                              |
| `NEXT_PUBLIC_TMDB_BASE_URL` | TMDB API Base URL              | Yes      | `https://api.themoviedb.org/3` |
| `NEXT_PUBLIC_APP_URL`       | Application URL (for metadata) | No       | `http://localhost:3000`        |

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for the amazing API
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Vercel](https://vercel.com/) for Next.js and hosting platform

---

Built with ❤️ using Next.js 15
