import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { getImageUrl } from '@/api/config';
import type { Movie } from '@/types/movie';

interface MovieCardProps {
  movie: Movie;
}

/**
 * MovieCard displays a single movie's information in a card format
 * Includes poster image, title, rating, and release date
 */
export function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = getImageUrl(movie.poster_path, 'w500');
  const rating = movie.vote_average.toFixed(1);
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  return (
    <Link href={`/movies/${movie.id}`} className="group block h-full">
      <Card className="h-full overflow-hidden transition-all hover:scale-[1.02] hover:shadow-lg">
        <CardHeader className="p-0">
          <div className="bg-muted relative aspect-[2/3] w-full overflow-hidden">
            <Image
              src={posterUrl}
              alt={movie.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="mb-2 line-clamp-2 text-lg leading-tight font-semibold">{movie.title}</h3>
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <span>{releaseYear}</span>
          </div>
        </CardContent>
        <CardFooter className="px-4 pt-0 pb-4">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{rating}</span>
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
