import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GridLayoutProps {
  children: ReactNode;
  className?: string;
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
    large?: number;
  };
  gap?: 'sm' | 'md' | 'lg';
}

/**
 * GridLayout provides a consistent, responsive grid pattern
 * Default: 2 cols (mobile) → 3 (tablet) → 4 (desktop) → 5 (large)
 */
export function GridLayout({
  children,
  className,
  cols = {
    mobile: 2,
    tablet: 3,
    desktop: 4,
    large: 5,
  },
  gap = 'md',
}: GridLayoutProps) {
  const gapClasses = {
    sm: 'gap-x-2 gap-y-4',
    md: 'gap-x-2 gap-y-4',
    lg: 'gap-x-2 gap-y-4',
  };

  // Using safelist-compatible classes for Tailwind JIT
  const getGridColsClass = () => {
    const { mobile = 2, tablet = 3, desktop = 4, large = 5 } = cols;

    // Map numbers to Tailwind class names using object lookup
    const gridColsMap = {
      mobile: {
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
        5: 'grid-cols-5',
      },
      tablet: {
        2: 'sm:grid-cols-2',
        3: 'sm:grid-cols-3',
        4: 'sm:grid-cols-4',
        5: 'sm:grid-cols-5',
      },
      desktop: {
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-3',
        4: 'md:grid-cols-4',
        5: 'md:grid-cols-5',
      },
      large: {
        2: 'lg:grid-cols-2',
        3: 'lg:grid-cols-3',
        4: 'lg:grid-cols-4',
        5: 'lg:grid-cols-5',
      },
    };

    const mobileClass = gridColsMap.mobile[mobile as keyof typeof gridColsMap.mobile];
    const tabletClass = gridColsMap.tablet[tablet as keyof typeof gridColsMap.tablet];
    const desktopClass = gridColsMap.desktop[desktop as keyof typeof gridColsMap.desktop];
    const largeClass = gridColsMap.large[large as keyof typeof gridColsMap.large];

    return `${mobileClass} ${tabletClass} ${desktopClass} ${largeClass}`;
  };

  return (
    <div className={cn('grid', getGridColsClass(), gapClasses[gap], className)}>{children}</div>
  );
}
