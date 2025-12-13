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
 * Home Page (Server Component with ISR)
 * Pre-rendered at build time and revalidated every 30 minutes
 * Includes client-side search functionality
 */
export default async function Home() {
  // Fetch popular movies on server with ISR
  let moviesList: Movie[] = [];

  try {
    const data = await fetchPopularMovies(1);
    moviesList = data.results;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <HeroSection
        title={PAGE_CONTENT.HOME.HERO.TITLE}
        description={PAGE_CONTENT.HOME.HERO.DESCRIPTION}
      />

      <SearchableMovieSection initialMovies={moviesList} />
    </div>
  );
}
