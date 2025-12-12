import { AlertCircle, LucideIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface EmptyStateProps {
  title?: string;
  message: string;
  icon?: LucideIcon;
}

/**
 * EmptyState displays empty/no-results messages in a consistent format
 * Reusable across the application for empty data scenarios
 */
export function EmptyState({
  title = 'No Results',
  message,
  icon: Icon = AlertCircle,
}: EmptyStateProps) {
  return (
    <Alert>
      <Icon className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
