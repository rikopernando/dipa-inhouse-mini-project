import { Star, Calendar, Clock, TrendingUp } from 'lucide-react';

import { Typography } from '@/components/atoms/typography';
import { PAGE_CONTENT } from '@/lib/constants';

export interface MovieMetaInfoProps {
  /**
   * Movie rating (0-10)
   */
  rating: string;
  /**
   * Number of votes
   */
  voteCount: number;
  /**
   * Release year
   */
  year: string;
  /**
   * Runtime formatted as "Xh Ym"
   */
  runtime: string;
  /**
   * Popularity score
   */
  popularity: string;
}

/**
 * Movie Meta Information Component
 * Displays rating, year, runtime, and popularity in a compact row
 */
export function MovieMetaInfo({
  rating,
  voteCount,
  year,
  runtime,
  popularity,
}: MovieMetaInfoProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Rating */}
      <div className="flex items-center gap-2">
        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        <Typography variant="large">{rating}</Typography>
        <Typography variant="muted">
          ({voteCount} {PAGE_CONTENT.MOVIE_DETAIL.LABELS.VOTES})
        </Typography>
      </div>

      {/* Release Year */}
      <div className="text-muted-foreground flex items-center gap-2">
        <Calendar className="h-4 w-4" />
        <Typography variant="small">{year}</Typography>
      </div>

      {/* Runtime */}
      <div className="text-muted-foreground flex items-center gap-2">
        <Clock className="h-4 w-4" />
        <Typography variant="small">{runtime}</Typography>
      </div>

      {/* Popularity */}
      <div className="text-muted-foreground flex items-center gap-2">
        <TrendingUp className="h-4 w-4" />
        <Typography variant="small">
          {PAGE_CONTENT.MOVIE_DETAIL.LABELS.POPULARITY}: {popularity}
        </Typography>
      </div>
    </div>
  );
}
