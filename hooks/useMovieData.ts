import { useSearchMovies } from '@/hooks/query/useSearchMovies';
import { useGetPopularMovies } from '@/hooks/query/useGetPopularMovies';
import type { Movie } from '@/types/movie';

export interface MovieDataResult {
  movies: Movie[];
  totalPages: number;
  totalResults: number;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export interface UseMovieDataParams {
  isSearchActive: boolean;
  debouncedSearchTerm: string;
  currentPage: number;
  initialMovies: Movie[];
  initialTotalPages: number;
  initialTotalResults: number;
}

/**
 * Custom hook to manage movie data (search or popular)
 * Handles data fetching logic and determines which data to display
 *
 * @param params - Configuration for data fetching
 * @returns Movie data with loading and error states
 */
export function useMovieData({
  isSearchActive,
  debouncedSearchTerm,
  currentPage,
  initialMovies,
  initialTotalPages,
  initialTotalResults,
}: UseMovieDataParams): MovieDataResult {
  // Fetch search results if searching
  const {
    data: searchData,
    isLoading: isSearchLoading,
    isError: isSearchError,
    error: searchError,
  } = useSearchMovies(debouncedSearchTerm, currentPage);

  // Fetch popular movies for pagination
  // Only fetch if NOT searching AND NOT on page 1 (page 1 uses ISR initialMovies)
  const {
    data: popularData,
    isLoading: isPopularLoading,
    isError: isPopularError,
    error: popularError,
  } = useGetPopularMovies(currentPage, !isSearchActive && currentPage > 1);

  // Determine which data to use
  if (isSearchActive) {
    // Use search data
    return {
      movies: searchData?.results || [],
      totalPages: searchData?.total_pages || 1,
      totalResults: searchData?.total_results || 0,
      isLoading: isSearchLoading,
      isError: isSearchError,
      error: searchError,
    };
  } else if (currentPage === 1) {
    // Use ISR data from server (no fetch needed!)
    return {
      movies: initialMovies,
      totalPages: initialTotalPages,
      totalResults: initialTotalResults,
      isLoading: false,
      isError: false,
      error: null,
    };
  } else {
    // Fetch from React Query for pages 2+
    return {
      movies: popularData?.results || [],
      totalPages: popularData?.total_pages || 1,
      totalResults: popularData?.total_results || 0,
      isLoading: isPopularLoading,
      isError: isPopularError,
      error: popularError,
    };
  }
}
