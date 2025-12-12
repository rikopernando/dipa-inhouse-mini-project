import { useQuery } from '@tanstack/react-query';
import { fetchPopularMovies } from '@/api/movies';
import type { MovieResponse } from '@/types/movie';

/**
 * React Query hook to fetch popular movies from TMDB
 * @param page - Page number for pagination (default: 1)
 * @returns Query result with popular movies data, loading and error states
 */
export const useGetPopularMovies = (page: number = 1) => {
  return useQuery<MovieResponse, Error>({
    queryKey: ['popularMovies', page],
    queryFn: () => fetchPopularMovies(page),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};
