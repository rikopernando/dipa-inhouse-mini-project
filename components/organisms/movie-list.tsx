'use client';

import { useGetPopularMovies } from '@/hooks/query/useGetPopularMovies';
import { MovieCard } from '@/components/molecules/movie-card';
import { MovieCardSkeleton } from '@/components/molecules/movie-card-skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface MovieListProps {
  page?: number;
}

/**
 * MovieList displays a grid of popular movies
 * Handles loading, error, and empty states
 */
export function MovieList({ page = 1 }: MovieListProps) {
  const { data, isLoading, isError, error } = useGetPopularMovies(page);

  // Loading state - show skeleton loaders
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
        {Array.from({ length: 20 }).map((_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error Loading Movies</AlertTitle>
        <AlertDescription>
          {error?.message || 'Failed to fetch popular movies. Please try again later.'}
        </AlertDescription>
      </Alert>
    );
  }

  // Empty state
  if (!data || data.results.length === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Movies Found</AlertTitle>
        <AlertDescription>There are no popular movies available at the moment.</AlertDescription>
      </Alert>
    );
  }

  // Success state - render movie grid
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
      {data.results.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
