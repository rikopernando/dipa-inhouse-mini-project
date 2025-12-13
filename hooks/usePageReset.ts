import { useEffect, useRef } from 'react';

/**
 * Custom hook to reset page to 1 when a value changes
 * Prevents cascading renders by tracking previous value with ref
 *
 * @param value - Value to watch for changes
 * @param onReset - Callback to reset page
 *
 * @example
 * const [page, setPage] = useState(1);
 * const [searchTerm, setSearchTerm] = useState('');
 * usePageReset(searchTerm, () => setPage(1));
 */
export function usePageReset(value: string, onReset: () => void): void {
  const prevValueRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    // Only reset if value actually changed (not on initial mount)
    if (prevValueRef.current !== undefined && prevValueRef.current !== value) {
      onReset();
    }
    prevValueRef.current = value;
  }, [value, onReset]);
}
