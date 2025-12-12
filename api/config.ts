import axios from 'axios';

/**
 * Axios instance configured for TMDB API
 */
export const movieApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.NEXT_PUBLIC_TMDB_KEY,
  },
});

/**
 * Base URL for TMDB images
 */
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

/**
 * Get full image URL for TMDB images
 * @param path - Image path from TMDB API
 * @param size - Image size (w500, w780, original, etc.)
 */
export const getImageUrl = (path: string | null, size: string = 'w500'): string => {
  if (!path) return '/placeholder-movie.jpg'; // Fallback for missing images
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};
