import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * MovieCardSkeleton displays a loading placeholder for MovieCard
 * Used while fetching movie data from API
 */
export function MovieCardSkeleton() {
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="p-0">
        <Skeleton className="aspect-[2/3] w-full" />
      </CardHeader>
      <CardContent className="p-4">
        <Skeleton className="mb-2 h-6 w-full" />
        <Skeleton className="h-4 w-20" />
      </CardContent>
      <CardFooter className="px-4 pt-0 pb-4">
        <Skeleton className="h-6 w-16" />
      </CardFooter>
    </Card>
  );
}
