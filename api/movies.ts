import { handleAPIError } from '@/lib/errors';
import type { MovieResponse, MovieDetail } from '@/types/movie';

import { movieApi } from './config';

/**
 * Fetch popular movies from TMDB
 * @param page - Page number for pagination (default: 1)
 * @returns Promise with movie list response
 * @throws {APIError} When API request fails
 * @throws {NetworkError} When network connection fails
 */
export const fetchPopularMovies = async (page: number = 1): Promise<MovieResponse> => {
  try {
    const response = await movieApi.get<MovieResponse>('/movie/popular', {
      params: { page },
    });
    return response.data;
  } catch (error) {
    handleAPIError(error, '/movie/popular');
  }
};

/**
 * Fetch movie details by ID
 * @param movieId - TMDB movie ID
 * @returns Promise with detailed movie information
 * @throws {APIError} When API request fails
 * @throws {NotFoundError} When movie is not found
 * @throws {NetworkError} When network connection fails
 */
export const fetchMovieDetail = async (movieId: number): Promise<MovieDetail> => {
  try {
    const response = await movieApi.get<MovieDetail>(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    handleAPIError(error, `/movie/${movieId}`);
  }
};

/**
 * Search for movies by title
 * @param query - Search query string
 * @param page - Page number for pagination (default: 1)
 * @returns Promise with movie search results
 * @throws {APIError} When API request fails
 * @throws {NetworkError} When network connection fails
 */
export const searchMovies = async (query: string, page: number = 1): Promise<MovieResponse> => {
  try {
    const response = await movieApi.get<MovieResponse>('/search/movie', {
      params: { query, page },
    });
    return response.data;
  } catch (error) {
    handleAPIError(error, '/search/movie');
  }
};
