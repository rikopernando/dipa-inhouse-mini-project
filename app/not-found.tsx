import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion } from 'lucide-react';

/**
 * Custom 404 Not Found Page
 * Displayed when a user navigates to a non-existent route
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/not-found
 */
export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6 text-center">
        {/* 404 Icon */}
        <div className="flex justify-center">
          <div className="bg-muted rounded-full p-6">
            <FileQuestion className="text-muted-foreground h-12 w-12" />
          </div>
        </div>

        {/* 404 Message */}
        <div className="space-y-2">
          <h1 className="text-6xl font-bold tracking-tight">404</h1>
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
          <p className="text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <Button asChild size="lg">
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
