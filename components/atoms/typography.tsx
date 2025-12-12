import { createElement, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Typography component variants using CVA
 * Provides consistent text styling across the application
 */
const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight lg:text-3xl',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight lg:text-2xl',
      h5: 'scroll-m-20 text-lg font-semibold tracking-tight',
      h6: 'scroll-m-20 text-base font-semibold tracking-tight',
      p: 'leading-7',
      lead: 'text-xl text-muted-foreground',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
      muted: 'text-sm text-muted-foreground',
      code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
    },
  },
  defaultVariants: {
    variant: 'p',
  },
});

export interface TypographyProps extends VariantProps<typeof typographyVariants> {
  /**
   * The HTML element to render
   * By default, it maps to the variant (h1 renders <h1>, p renders <p>, etc.)
   * Can be overridden for semantic flexibility
   */
  as?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'span'
    | 'div'
    | 'blockquote'
    | 'code'
    | 'small';
  /**
   * Content to display
   */
  children: ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Typography component for consistent text styling
 *
 * @example
 * // Heading
 * <Typography variant="h1">Page Title</Typography>
 *
 * @example
 * // Paragraph
 * <Typography variant="p">Regular paragraph text</Typography>
 *
 * @example
 * // Override HTML element
 * <Typography variant="h2" as="h1">Looks like h2, but renders as h1</Typography>
 *
 * @example
 * // Muted text
 * <Typography variant="muted">Secondary information</Typography>
 */
export function Typography({ variant, as, className, children, ...props }: TypographyProps) {
  // Map variant to default HTML element
  const defaultElement: Record<string, TypographyProps['as']> = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    p: 'p',
    lead: 'p',
    large: 'div',
    small: 'small',
    muted: 'p',
    code: 'code',
    blockquote: 'blockquote',
  };

  const element = as || defaultElement[variant || 'p'] || 'p';

  return createElement(
    element,
    {
      className: cn(typographyVariants({ variant }), className),
      ...props,
    },
    children,
  );
}
