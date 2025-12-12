import { AlertCircle, WifiOff, ServerCrash } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  NetworkError,
  APIError,
  NotFoundError,
  UnauthorizedError,
  RateLimitError,
} from '@/lib/errors';

interface ErrorStateProps {
  title?: string;
  message?: string;
  error?: Error | null;
}

/**
 * ErrorState displays error messages in a consistent, user-friendly format
 * Supports different error types with appropriate icons
 * Reusable across the application for any error scenario
 */
export function ErrorState({ title = 'Error', message, error }: ErrorStateProps) {
  // Determine which icon to render based on error type
  const renderIcon = () => {
    if (error instanceof NetworkError) {
      return <WifiOff className="h-4 w-4" />;
    }
    if (error instanceof APIError) {
      return <ServerCrash className="h-4 w-4" />;
    }
    return <AlertCircle className="h-4 w-4" />;
  };

  // Get user-friendly error title
  const getTitle = () => {
    if (title) return title;
    if (error instanceof NetworkError) return 'Network Error';
    if (error instanceof NotFoundError) return 'Not Found';
    if (error instanceof UnauthorizedError) return 'Unauthorized';
    if (error instanceof RateLimitError) return 'Too Many Requests';
    if (error instanceof APIError) return 'Server Error';
    return 'Error';
  };

  const displayTitle = getTitle();
  const displayMessage = message || error?.message || 'Something went wrong. Please try again.';

  return (
    <Alert variant="destructive">
      {renderIcon()}
      <AlertTitle>{displayTitle}</AlertTitle>
      <AlertDescription>{displayMessage}</AlertDescription>
    </Alert>
  );
}
