'use client';

import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';

export interface ErrorProps {
  /**
   * Error object thrown by the application
   */
  error: Error & { digest?: string };
  /**
   * Function to reset the error boundary and retry rendering
   */
  reset: () => void;
}

/**
 * Root Error Boundary Component
 * Catches errors in the application and displays a fallback UI
 * Uses Next.js App Router error boundary convention
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/error-handling
 */
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to error reporting service (e.g., Sentry)
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6 text-center">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="bg-destructive/10 rounded-full p-6">
            <AlertCircle className="text-destructive h-12 w-12" />
          </div>
        </div>

        {/* Error Title */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Something went wrong!</h1>
          <p className="text-muted-foreground">
            We encountered an unexpected error while processing your request.
          </p>
        </div>

        {/* Error Details (Development only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-muted rounded-lg p-4 text-left">
            <p className="text-destructive font-mono text-sm break-all">{error.message}</p>
            {error.digest && (
              <p className="text-muted-foreground mt-2 text-xs">Error ID: {error.digest}</p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button onClick={reset} size="lg">
            Try Again
          </Button>
          <Button variant="outline" size="lg" onClick={() => (window.location.href = '/')}>
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
