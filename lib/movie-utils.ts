/**
 * Movie utility functions
 * Helper functions for formatting and transforming movie data
 */

/**
 * Format runtime in minutes to "Xh Ym" format
 * @param runtime - Runtime in minutes
 * @returns Formatted runtime string or "N/A"
 */
export function formatRuntime(runtime: number | null | undefined): string {
  if (!runtime || runtime === 0) {
    return 'N/A';
  }
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes}m`;
}

/**
 * Format currency amount with dollar sign and locale string
 * @param amount - Currency amount
 * @param fallback - Fallback text if amount is 0 or null
 * @returns Formatted currency string or fallback
 */
export function formatCurrency(
  amount: number | null | undefined,
  fallback = 'Not disclosed',
): string {
  if (!amount || amount === 0) {
    return fallback;
  }
  return `$${amount.toLocaleString()}`;
}

/**
 * Format rating to 1 decimal place
 * @param rating - Rating value
 * @returns Formatted rating string
 */
export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

/**
 * Extract year from release date
 * @param releaseDate - Release date string (YYYY-MM-DD)
 * @returns Year string or "N/A"
 */
export function extractYear(releaseDate: string | null | undefined): string {
  if (!releaseDate) {
    return 'N/A';
  }
  return new Date(releaseDate).getFullYear().toString();
}

/**
 * Format popularity to whole number
 * @param popularity - Popularity value
 * @returns Formatted popularity string
 */
export function formatPopularity(popularity: number): string {
  return popularity.toFixed(0);
}
