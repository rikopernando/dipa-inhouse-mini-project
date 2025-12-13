import Link from 'next/link';
import { ErrorState } from '@/components/atoms/error-state';
import { ArrowLeft } from 'lucide-react';
import { PAGE_CONTENT } from '@/lib/constants';

/**
 * Movie Not Found Page
 * Displayed when a movie cannot be found
 */
export default function MovieNotFound() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="text-muted-foreground hover:text-primary mb-6 inline-flex items-center gap-2 text-sm transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        {PAGE_CONTENT.MOVIE_DETAIL.BACK_LINK}
      </Link>
      <ErrorState
        title={PAGE_CONTENT.MOVIE_DETAIL.ERROR.TITLE}
        message={PAGE_CONTENT.MOVIE_DETAIL.ERROR.MESSAGE}
      />
    </div>
  );
}
