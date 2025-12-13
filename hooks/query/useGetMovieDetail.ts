import { useQuery } from '@tanstack/react-query';
import { fetchMovieDetail } from '@/api/movies';
import { API_CONFIG } from '@/lib/constants';
import type { MovieDetail } from '@/types/movie';

/**
 * React Query hook to fetch movie details by ID
 * @param movieId - TMDB movie ID
 * @returns Query result with movie detail data, loading and error states
 */
export const useGetMovieDetail = (movieId: number) => {
  return useQuery<MovieDetail, Error>({
    queryKey: ['movieDetail', movieId],
    queryFn: () => fetchMovieDetail(movieId),
    staleTime: API_CONFIG.STALE_TIME,
    enabled: !!movieId, // Only fetch if movieId is truthy
  });
};
