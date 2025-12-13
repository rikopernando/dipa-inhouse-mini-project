import { useQuery } from '@tanstack/react-query';
import { searchMovies } from '@/api/movies';
import { API_CONFIG } from '@/lib/constants';
import type { MovieResponse } from '@/types/movie';

/**
 * React Query hook to search for movies
 * @param query - Search query string
 * @param page - Page number for pagination (default: 1)
 * @returns Query result with movie search results, loading and error states
 */
export const useSearchMovies = (query: string, page: number = 1) => {
  return useQuery<MovieResponse, Error>({
    queryKey: ['searchMovies', query, page],
    queryFn: () => searchMovies(query, page),
    staleTime: API_CONFIG.STALE_TIME,
    enabled: query.trim().length > 0, // Only search if query is not empty
  });
};
