import { Typography } from '@/components/atoms/typography';
import { Card, CardContent } from '@/components/ui/card';
import { PAGE_CONTENT } from '@/lib/constants';

export interface MovieStatsProps {
  /**
   * Movie status (Released, Post Production, etc.)
   */
  status: string;
  /**
   * Original language code
   */
  language: string;
  /**
   * Budget (formatted currency string)
   */
  budget: string;
  /**
   * Revenue (formatted currency string)
   */
  revenue: string;
}

/**
 * Movie Stats Component
 * Displays additional movie statistics in a grid card
 */
export function MovieStats({ status, language, budget, revenue }: MovieStatsProps) {
  return (
    <Card className="py-0 shadow-none">
      <CardContent className="grid gap-4 p-4 md:grid-cols-2 lg:p-6">
        {/* Status */}
        <div>
          <Typography variant="small" className="text-muted-foreground mb-1">
            {PAGE_CONTENT.MOVIE_DETAIL.LABELS.STATUS}
          </Typography>
          <Typography variant="p">{status}</Typography>
        </div>

        {/* Original Language */}
        <div>
          <Typography variant="small" className="text-muted-foreground mb-1">
            {PAGE_CONTENT.MOVIE_DETAIL.LABELS.LANGUAGE}
          </Typography>
          <Typography variant="p">{language.toUpperCase()}</Typography>
        </div>

        {/* Budget */}
        <div>
          <Typography variant="small" className="text-muted-foreground mb-1">
            {PAGE_CONTENT.MOVIE_DETAIL.LABELS.BUDGET}
          </Typography>
          <Typography variant="p">{budget}</Typography>
        </div>

        {/* Revenue */}
        <div>
          <Typography variant="small" className="text-muted-foreground mb-1">
            {PAGE_CONTENT.MOVIE_DETAIL.LABELS.REVENUE}
          </Typography>
          <Typography variant="p">{revenue}</Typography>
        </div>
      </CardContent>
    </Card>
  );
}
