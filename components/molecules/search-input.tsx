'use client';

import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PAGE_CONTENT } from '@/lib/constants';
import { cn } from '@/lib/utils';

export interface SearchInputProps {
  /**
   * Current search value
   */
  value: string;
  /**
   * Callback when search value changes
   */
  onChange: (value: string) => void;
  /**
   * Callback when search is cleared
   */
  onClear: () => void;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Placeholder text
   */
  placeholder?: string;
}

/**
 * Search Input Component
 * Input field with search icon and clear button
 */
export function SearchInput({
  value,
  onChange,
  onClear,
  className,
  placeholder = PAGE_CONTENT.HOME.SEARCH.PLACEHOLDER,
}: SearchInputProps) {
  return (
    <div className={cn('relative', className)} role="search">
      <label htmlFor="search-movie" className="sr-only">
        Search for movies and TV series
      </label>
      <Search
        className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
        aria-hidden="true"
      />
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        id="search-movie"
        name="search-movie"
        onChange={(e) => onChange(e.target.value)}
        className="pr-10 pl-10"
        aria-label="Search for movies and TV series"
        autoComplete="off"
      />
      {value && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="absolute top-1/2 right-1 h-7 w-7 -translate-y-1/2 p-0"
          aria-label={PAGE_CONTENT.HOME.SEARCH.CLEAR}
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </Button>
      )}
    </div>
  );
}
