import { Typography } from '@/components/atoms/typography';
import { cn } from '@/lib/utils';

export interface HeroSectionProps {
  /**
   * Main heading text
   */
  title: string;
  /**
   * Supporting description text
   */
  description: string;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Hero Section Component
 * Displays a prominent heading and description for page introductions
 */
export function HeroSection({ title, description, className }: HeroSectionProps) {
  return (
    <div className={cn('mb-8 md:mb-12', className)}>
      <Typography variant="h1" className="mb-4">
        {title}
      </Typography>
      <Typography variant="lead" className="text-muted-foreground max-w-2xl">
        {description}
      </Typography>
    </div>
  );
}
