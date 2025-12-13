import { useEffect, RefObject } from 'react';

export interface UseScrollToSectionOptions {
  /**
   * Whether to enable scroll behavior
   */
  enabled?: boolean;
  /**
   * Scroll behavior (smooth or auto)
   */
  behavior?: ScrollBehavior;
  /**
   * Block position (start, center, end, nearest)
   */
  block?: ScrollLogicalPosition;
}

/**
 * Custom hook to scroll to a section when dependencies change
 *
 * @param ref - Ref to the element to scroll to
 * @param deps - Dependencies that trigger the scroll
 * @param options - Scroll options
 *
 * @example
 * const sectionRef = useRef<HTMLDivElement>(null);
 * const [currentPage, setCurrentPage] = useState(1);
 * useScrollToSection(sectionRef, [currentPage], { enabled: true, behavior: 'smooth' });
 */
export function useScrollToSection<T extends HTMLElement>(
  ref: RefObject<T | null>,
  deps: React.DependencyList,
  options: UseScrollToSectionOptions = {},
): void {
  const { enabled = true, behavior = 'smooth', block = 'start' } = options;

  useEffect(() => {
    if (enabled && ref.current) {
      ref.current.scrollIntoView({ behavior, block });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
