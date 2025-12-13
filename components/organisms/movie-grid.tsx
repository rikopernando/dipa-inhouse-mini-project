import { MovieCard } from '@/components/molecules/movie-card';
import { GridLayout } from '@/components/atoms/grid-layout';
import { GRID_CONFIG } from '@/lib/constants';
import type { Movie } from '@/types/movie';

export interface MovieGridProps {
  /**
   * Array of movies to display
   */
  movies: Movie[];
}

/**
 * Movie Grid Component (Server Component)
 * Renders a grid of movies - receives data as props
 * Used for server-side rendering with ISR
 */
export function MovieGrid({ movies }: MovieGridProps) {
  return (
    <GridLayout cols={GRID_CONFIG.MOVIE_GRID}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </GridLayout>
  );
}
