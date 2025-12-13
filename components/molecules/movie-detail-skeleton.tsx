import { Skeleton } from '@/components/ui/skeleton';

/**
 * Movie Detail Skeleton Component
 * Loading state for movie detail page with Netflix-style layout
 */
export function MovieDetailSkeleton() {
  return (
    <div>
      {/* Backdrop Skeleton */}
      <div className="relative h-[400px] w-full md:h-[500px]">
        <Skeleton className="h-full w-full" />
      </div>

      {/* Content Skeleton */}
      <div className="container mx-auto px-4">
        {/* Hero Content (overlaps backdrop) */}
        <div className="relative z-10 -mt-32 md:-mt-40">
          <div className="grid gap-8 md:grid-cols-[300px_1fr]">
            {/* Poster Skeleton */}
            <Skeleton className="aspect-[2/3] w-full shadow-2xl" />

            {/* Details Skeleton */}
            <div className="space-y-6 pt-8 md:pt-0">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>

        {/* Additional Content Below */}
        <div className="mt-8 space-y-6 pb-8">
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    </div>
  );
}
