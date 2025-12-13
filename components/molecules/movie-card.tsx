import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';

import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Typography } from '@/components/atoms/typography';
import { getImageUrl } from '@/api/config';
import type { Movie } from '@/types/movie';
import { extractYear, formatRating } from '@/lib/movie-utils';

interface MovieCardProps {
  movie: Movie;
}

/**
 * MovieCard displays a single movie's information in a card format
 * Includes poster image, title, rating, and release date
 * Memoized to prevent unnecessary re-renders
 */
function MovieCardComponent({ movie }: MovieCardProps) {
  const posterUrl = getImageUrl(movie.poster_path, 'w500');
  const rating = formatRating(movie.vote_average);
  const releaseYear = extractYear(movie.release_date);

  return (
    <Link
      href={`/movies/${movie.id}`}
      className="group block h-full"
      aria-label={`View details for ${movie.title}`}
    >
      <Card className="h-full gap-0 overflow-hidden rounded-lg py-0 transition-all hover:scale-[1.02] hover:shadow-lg">
        <CardHeader className="gap-0 p-0">
          <div className="bg-muted relative aspect-[2/3] w-full overflow-hidden">
            <Image
              src={posterUrl}
              alt={`${movie.title} poster`}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={false}
            />
          </div>
        </CardHeader>
        <CardFooter className="flex flex-col items-start gap-2 p-4">
          <div className="flex items-center gap-1">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" aria-hidden="true" />
              <span className="font-medium">{rating}</span>
              <span className="sr-only">out of 10</span>
            </Badge>
            <Typography variant="muted">・</Typography>
            <Typography variant="muted">{releaseYear}</Typography>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

/**
 * Memoized MovieCard - only re-renders when movie.id changes
 * Improves performance in large lists
 */
export const MovieCard = memo(MovieCardComponent, (prevProps, nextProps) => {
  return prevProps.movie.id === nextProps.movie.id;
});
