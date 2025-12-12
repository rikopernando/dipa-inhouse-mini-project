import axios from 'axios';

/**
 * Axios instance configured for TMDB API
 */
export const movieApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TMDB_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
    'Content-Type': 'application/json',
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
  // Fallback to a placeholder gradient for missing images
  if (!path) {
    return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="750"%3E%3Crect width="500" height="750" fill="%23374151"/%3E%3Ctext x="50%25" y="50%25" font-size="24" fill="%239CA3AF" text-anchor="middle" dominant-baseline="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
  }
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};
