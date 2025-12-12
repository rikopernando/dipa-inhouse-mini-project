'use client';

import { useGetPopularMovies } from '@/hooks/query/useGetPopularMovies';
import { MovieCard } from '@/components/molecules/movie-card';
import { MovieCardSkeleton } from '@/components/molecules/movie-card-skeleton';
import { ErrorState } from '@/components/atoms/error-state';
import { EmptyState } from '@/components/atoms/empty-state';
import { GridLayout } from '@/components/atoms/grid-layout';
import { GRID_CONFIG, LOADING_CONFIG, ERROR_MESSAGES } from '@/lib/constants';

interface MovieListProps {
  page?: number;
}

/**
 * MovieList displays a grid of popular movies
 * Handles loading, error, and empty states using reusable components
 */
export function MovieList({ page = 1 }: MovieListProps) {
  const { data, isLoading, isError, error } = useGetPopularMovies(page);

  // Loading state - show skeleton loaders
  if (isLoading) {
    return (
      <GridLayout cols={GRID_CONFIG.MOVIE_GRID}>
        {Array.from({ length: LOADING_CONFIG.SKELETON_COUNT }).map((_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
      </GridLayout>
    );
  }

  // Error state
  if (isError) {
    return (
      <ErrorState
        title="Error Loading Movies"
        message={ERROR_MESSAGES.MOVIES.LOAD_ERROR}
        error={error}
      />
    );
  }

  // Empty state
  if (!data || data.results.length === 0) {
    return <EmptyState title="No Movies Found" message={ERROR_MESSAGES.MOVIES.EMPTY_STATE} />;
  }

  // Success state - render movie grid
  return (
    <GridLayout cols={GRID_CONFIG.MOVIE_GRID}>
      {data.results.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </GridLayout>
  );
}
