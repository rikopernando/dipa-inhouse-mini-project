import { Typography } from '@/components/atoms/typography';
import { cn } from '@/lib/utils';

export interface PageSectionProps {
  /**
   * Section title (optional)
   */
  title?: string;
  /**
   * Section content
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Title variant
   */
  titleVariant?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * Page Section Component
 * Reusable section wrapper with optional title and consistent spacing
 */
export function PageSection({ title, children, className, titleVariant = 'h2' }: PageSectionProps) {
  return (
    <section className={cn(className)}>
      {title && (
        <Typography variant={titleVariant} className="mb-6">
          {title}
        </Typography>
      )}
      {children}
    </section>
  );
}
