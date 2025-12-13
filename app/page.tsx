import type { Metadata } from 'next';
import { fetchPopularMovies } from '@/api/movies';
import { HeroSection } from '@/components/molecules/hero-section';
import { SearchableMovieSection } from '@/components/organisms/searchable-movie-section';
import { PAGE_CONTENT } from '@/lib/constants';
import type { Movie } from '@/types/movie';

/**
 * Enable ISR (Incremental Static Regeneration)
 * Revalidate every 30 minutes (1800 seconds)
 */
export const revalidate = 1800;

/**
 * Page-specific metadata
 */
export const metadata: Metadata = {
  title: 'Popular Movies & Series',
  description:
    'Browse the most popular movies and TV series. Discover trending content, search through thousands of titles, and find your next favorite movie or show.',
  openGraph: {
    title: 'Popular Movies & Series | CineTrack',
    description:
      'Browse the most popular movies and TV series. Discover trending content and find your next favorite movie or show.',
  },
};

/**
 * Home Page (Server Component with ISR)
 * Pre-rendered at build time and revalidated every 30 minutes
 * Includes client-side search functionality
 */
export default async function Home() {
  // Fetch popular movies on server with ISR
  let moviesList: Movie[] = [];
  let initialTotalPages = 1;
  let initialTotalResults = 0;

  try {
    const data = await fetchPopularMovies(1);
    moviesList = data.results;
    initialTotalPages = data.total_pages;
    initialTotalResults = data.total_results;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
  }

  return (
    <div className="container mx-auto px-4 py-4 lg:px-6 lg:py-8">
      <HeroSection
        title={PAGE_CONTENT.HOME.HERO.TITLE}
        description={PAGE_CONTENT.HOME.HERO.DESCRIPTION}
      />

      <SearchableMovieSection
        initialMovies={moviesList}
        initialTotalPages={initialTotalPages}
        initialTotalResults={initialTotalResults}
      />
    </div>
  );
}
