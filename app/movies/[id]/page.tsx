import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchMovieDetail, fetchPopularMovies } from '@/api/movies';
import { Typography } from '@/components/atoms/typography';
import { Card } from '@/components/ui/card';
import { getImageUrl } from '@/api/config';
import { ArrowLeft } from 'lucide-react';
import { MovieMetaInfo } from '@/components/molecules/movie-meta-info';
import { MovieStats } from '@/components/molecules/movie-stats';
import { GenreList } from '@/components/molecules/genre-list';
import {
  formatRuntime,
  formatCurrency,
  formatRating,
  extractYear,
  formatPopularity,
} from '@/lib/movie-utils';
import { PAGE_CONTENT } from '@/lib/constants';

interface MovieDetailPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Generate static params for popular movies (SSG)
 * Pre-generates the top 20 popular movies at build time
 */
export async function generateStaticParams() {
  try {
    const data = await fetchPopularMovies(1);
    // Pre-generate first 20 popular movies
    return data.results.slice(0, 20).map((movie) => ({
      id: movie.id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

/**
 * Enable ISR (Incremental Static Regeneration)
 * Revalidate every 1 hour (3600 seconds)
 */
export const revalidate = 3600;

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: MovieDetailPageProps) {
  const { id } = await params;
  const movieId = parseInt(id, 10);

  try {
    const movie = await fetchMovieDetail(movieId);
    return {
      title: `${movie.title} - CineTrack`,
      description: movie.overview || `Watch ${movie.title} and explore detailed information`,
    };
  } catch {
    return {
      title: 'Movie Not Found - CineTrack',
      description: 'The requested movie could not be found',
    };
  }
}

/**
 * Movie Detail Page (Server Component with SSG/ISR)
 * Displays comprehensive information about a specific movie with Netflix-style layout
 */
export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  const { id } = await params;
  const movieId = parseInt(id, 10);

  // Fetch movie data on server
  let movie;
  try {
    movie = await fetchMovieDetail(movieId);
  } catch (error) {
    console.error('Error fetching movie:', error);
    notFound();
  }

  // Prepare data using utility functions
  const posterUrl = getImageUrl(movie.poster_path, 'w500');
  const backdropUrl = getImageUrl(movie.backdrop_path, 'original');
  const rating = formatRating(movie.vote_average);
  const year = extractYear(movie.release_date);
  const runtime = formatRuntime(movie.runtime);
  const popularity = formatPopularity(movie.popularity);
  const budget = formatCurrency(movie.budget);
  const revenue = formatCurrency(movie.revenue);

  return (
    <div>
      {/* Backdrop Hero Section (Netflix-style) */}
      {movie.backdrop_path && (
        <div className="relative h-[400px] w-full md:h-[500px]">
          {/* Backdrop Image */}
          <Image
            src={backdropUrl}
            alt={movie.title}
            fill
            className="object-cover"
            priority
            quality={90}
          />
          {/* Gradient Overlays */}
          <div className="from-background via-background/60 absolute inset-0 bg-gradient-to-t to-transparent" />
          <div className="from-background/80 to-background/80 absolute inset-0 bg-gradient-to-r via-transparent" />
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4">
        {/* Hero Content (overlaps backdrop with negative margin) */}
        <div className={movie.backdrop_path ? 'relative z-10 -mt-32 md:-mt-40' : 'pt-8'}>
          {/* Back Button */}
          <Link
            href="/"
            className="text-muted-foreground hover:text-primary mb-6 inline-flex items-center gap-2 text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {PAGE_CONTENT.MOVIE_DETAIL.BACK_LINK}
          </Link>

          {/* Poster + Details Grid */}
          <div className="grid gap-8 md:grid-cols-[300px_1fr]">
            {/* Poster */}
            <div>
              <Card className="overflow-hidden shadow-2xl">
                <div className="relative aspect-[2/3] w-full">
                  <Image
                    src={posterUrl}
                    alt={movie.title}
                    fill
                    className="object-cover"
                    sizes="300px"
                    priority
                  />
                </div>
              </Card>
            </div>

            {/* Movie Details */}
            <div className="space-y-6">
              {/* Title and Tagline */}
              <div>
                <Typography variant="h1" className="mb-2">
                  {movie.title}
                </Typography>
                {movie.tagline && (
                  <Typography variant="lead" className="text-muted-foreground italic">
                    &quot;{movie.tagline}&quot;
                  </Typography>
                )}
              </div>

              {/* Meta Information */}
              <MovieMetaInfo
                rating={rating}
                voteCount={movie.vote_count}
                year={year}
                runtime={runtime}
                popularity={popularity}
              />

              {/* Genres */}
              <GenreList genres={movie.genres} />

              {/* Overview */}
              <div>
                <Typography variant="h5" className="mb-3">
                  {PAGE_CONTENT.MOVIE_DETAIL.SECTIONS.OVERVIEW}
                </Typography>
                <Typography variant="p" className="leading-relaxed">
                  {movie.overview || PAGE_CONTENT.MOVIE_DETAIL.PLACEHOLDERS.NO_OVERVIEW}
                </Typography>
              </div>

              {/* Additional Stats */}
              <MovieStats
                status={movie.status}
                language={movie.original_language}
                budget={budget}
                revenue={revenue}
              />
            </div>
          </div>
        </div>

        {/* Bottom Spacing */}
        <div className="pb-12" />
      </div>
    </div>
  );
}
