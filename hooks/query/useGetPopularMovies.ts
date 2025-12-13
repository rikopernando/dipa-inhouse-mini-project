import { useQuery } from '@tanstack/react-query';
import { fetchPopularMovies } from '@/api/movies';
import { API_CONFIG } from '@/lib/constants';
import type { MovieResponse } from '@/types/movie';

/**
 * React Query hook to fetch popular movies from TMDB
 * @param page - Page number for pagination (default: 1)
 * @param enabled - Whether to enable the query (default: true)
 * @returns Query result with popular movies data, loading and error states
 */
export const useGetPopularMovies = (page: number = 1, enabled: boolean = true) => {
  return useQuery<MovieResponse, Error>({
    queryKey: ['popularMovies', page],
    queryFn: () => fetchPopularMovies(page),
    staleTime: API_CONFIG.STALE_TIME,
    enabled: enabled,
  });
};
