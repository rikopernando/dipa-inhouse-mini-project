import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * MovieCardSkeleton displays a loading placeholder for MovieCard
 * Used while fetching movie data from API
 */
export function MovieCardSkeleton() {
  return (
    <Card className="h-full gap-0 overflow-hidden rounded-lg py-0">
      <CardHeader className="gap-0 p-0">
        <Skeleton className="aspect-[2/3] w-full" />
      </CardHeader>
      <CardFooter className="p-4">
        <Skeleton className="h-6 w-16" />
      </CardFooter>
    </Card>
  );
}
