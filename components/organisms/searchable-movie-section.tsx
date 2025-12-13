'use client';

import { useState } from 'react';
import { SearchInput } from '@/components/molecules/search-input';
import { MovieCard } from '@/components/molecules/movie-card';
import { MovieCardSkeleton } from '@/components/molecules/movie-card-skeleton';
import { ErrorState } from '@/components/atoms/error-state';
import { EmptyState } from '@/components/atoms/empty-state';
import { GridLayout } from '@/components/atoms/grid-layout';
import { PageSection } from '@/components/molecules/page-section';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearchMovies } from '@/hooks/query/useSearchMovies';
import { GRID_CONFIG, LOADING_CONFIG, ERROR_MESSAGES, PAGE_CONTENT } from '@/lib/constants';
import type { Movie } from '@/types/movie';

export interface SearchableMovieSectionProps {
  /**
   * Initial popular movies from server (ISR)
   */
  initialMovies: Movie[];
}

/**
 * Searchable Movie Section Component (Client Component)
 * Displays popular movies by default, with search functionality
 * Uses debouncing to reduce API calls during search
 */
export function SearchableMovieSection({ initialMovies }: SearchableMovieSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Only fetch search results if there's a debounced search term
  const { data: searchData, isLoading, isError, error } = useSearchMovies(debouncedSearchTerm);

  // Determine which movies to display
  const isSearchActive = debouncedSearchTerm.trim().length > 0;
  const movies = isSearchActive ? searchData?.results || [] : initialMovies;
  const sectionTitle = isSearchActive
    ? PAGE_CONTENT.HOME.SECTIONS.SEARCH_RESULTS.TITLE
    : PAGE_CONTENT.HOME.SECTIONS.TRENDING.TITLE;

  // Handle clear search
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <>
      {/* Search Input */}
      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        onClear={handleClearSearch}
        className="mb-8"
      />

      {/* Movie Section */}
      <PageSection title={sectionTitle}>
        {/* Loading State (only show during search) */}
        {isLoading && isSearchActive && (
          <GridLayout cols={GRID_CONFIG.MOVIE_GRID}>
            {Array.from({ length: LOADING_CONFIG.SKELETON_COUNT }).map((_, index) => (
              <MovieCardSkeleton key={index} />
            ))}
          </GridLayout>
        )}

        {/* Error State */}
        {isError && isSearchActive && (
          <ErrorState
            title="Error Searching Movies"
            message={ERROR_MESSAGES.SEARCH.SEARCH_ERROR}
            error={error}
          />
        )}

        {/* Empty Search Results */}
        {!isLoading && !isError && isSearchActive && movies.length === 0 && (
          <EmptyState title="No Results" message={ERROR_MESSAGES.SEARCH.NO_RESULTS} />
        )}

        {/* Movie Grid (Popular or Search Results) */}
        {!isLoading && movies.length > 0 && (
          <GridLayout cols={GRID_CONFIG.MOVIE_GRID}>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </GridLayout>
        )}
      </PageSection>
    </>
  );
}
