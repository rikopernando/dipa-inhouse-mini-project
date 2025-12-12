import { movieApi } from './config';
import type { MovieResponse, MovieDetail } from '@/types/movie';

/**
 * Fetch popular movies from TMDB
 * @param page - Page number for pagination (default: 1)
 * @returns Promise with movie list response
 */
export const fetchPopularMovies = async (page: number = 1): Promise<MovieResponse> => {
  const response = await movieApi.get<MovieResponse>('/movie/popular', {
    params: { page },
  });
  return response.data;
};

/**
 * Fetch movie details by ID
 * @param movieId - TMDB movie ID
 * @returns Promise with detailed movie information
 */
export const fetchMovieDetail = async (movieId: number): Promise<MovieDetail> => {
  const response = await movieApi.get<MovieDetail>(`/movie/${movieId}`);
  return response.data;
};

/**
 * Search for movies by title
 * @param query - Search query string
 * @param page - Page number for pagination (default: 1)
 * @returns Promise with movie search results
 */
export const searchMovies = async (query: string, page: number = 1): Promise<MovieResponse> => {
  const response = await movieApi.get<MovieResponse>('/search/movie', {
    params: { query, page },
  });
  return response.data;
};
