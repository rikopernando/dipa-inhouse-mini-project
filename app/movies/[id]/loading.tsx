import { MovieDetailSkeleton } from '@/components/molecules/movie-detail-skeleton';

/**
 * Movie Detail Loading State
 * Displayed while movie data is being fetched
 */
export default function MovieDetailLoading() {
  return <MovieDetailSkeleton />;
}
