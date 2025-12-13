import { Typography } from '@/components/atoms/typography';
import { Badge } from '@/components/ui/badge';
import { PAGE_CONTENT } from '@/lib/constants';

export interface Genre {
  id: number;
  name: string;
}

export interface GenreListProps {
  /**
   * Array of genres
   */
  genres: Genre[];
  /**
   * Show title above genres (default: true)
   */
  showTitle?: boolean;
}

/**
 * Genre List Component
 * Displays movie genres as badges
 */
export function GenreList({ genres, showTitle = true }: GenreListProps) {
  if (!genres || genres.length === 0) {
    return null;
  }

  return (
    <div>
      {showTitle && (
        <Typography variant="h6" className="mb-2">
          {PAGE_CONTENT.MOVIE_DETAIL.SECTIONS.GENRES}
        </Typography>
      )}
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <Badge key={genre.id} variant="secondary">
            {genre.name}
          </Badge>
        ))}
      </div>
    </div>
  );
}
