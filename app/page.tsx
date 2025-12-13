import { fetchPopularMovies } from '@/api/movies';
import { MovieGrid } from '@/components/organisms/movie-grid';
import { HeroSection } from '@/components/molecules/hero-section';
import { PageSection } from '@/components/molecules/page-section';
import { EmptyState } from '@/components/atoms/empty-state';
import { PAGE_CONTENT, ERROR_MESSAGES } from '@/lib/constants';
import type { Movie } from '@/types/movie';

/**
 * Enable ISR (Incremental Static Regeneration)
 * Revalidate every 30 minutes (1800 seconds)
 */
export const revalidate = 1800;

/**
 * Home Page (Server Component with ISR)
 * Pre-rendered at build time and revalidated every 30 minutes
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

      <PageSection title={PAGE_CONTENT.HOME.SECTIONS.TRENDING.TITLE}>
        {moviesList.length > 0 ? (
          <MovieGrid movies={moviesList} />
        ) : (
          <EmptyState title="No Movies Found" message={ERROR_MESSAGES.MOVIES.EMPTY_STATE} />
        )}
      </PageSection>
    </div>
  );
}
