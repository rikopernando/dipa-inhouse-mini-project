'use client';

import { useState, useCallback, useMemo, useRef } from 'react';
import { SearchInput } from '@/components/molecules/search-input';
import { Pagination } from '@/components/molecules/pagination';
import { PaginationInfo } from '@/components/atoms/pagination-info';
import { MovieCard } from '@/components/molecules/movie-card';
import { MovieCardSkeleton } from '@/components/molecules/movie-card-skeleton';
import { ErrorState } from '@/components/atoms/error-state';
import { EmptyState } from '@/components/atoms/empty-state';
import { GridLayout } from '@/components/atoms/grid-layout';
import { PageSection } from '@/components/molecules/page-section';
import { useDebounce } from '@/hooks/useDebounce';
import { useMovieData } from '@/hooks/useMovieData';
import { usePageReset } from '@/hooks/usePageReset';
import { useScrollToSection } from '@/hooks/useScrollToSection';
import {
  GRID_CONFIG,
  LOADING_CONFIG,
  ERROR_MESSAGES,
  PAGE_CONTENT,
  PAGINATION_CONFIG,
} from '@/lib/constants';
import type { Movie } from '@/types/movie';

export interface SearchableMovieSectionProps {
  /**
   * Initial popular movies from server (ISR) for first page
   */
  initialMovies: Movie[];
  /**
   * Total pages from server (for pagination)
   */
  initialTotalPages: number;
  /**
   * Total results from server (for pagination info)
   */
  initialTotalResults: number;
}

/**
 * Searchable Movie Section Component (Client Component)
 * Displays popular movies by default, with search functionality and pagination
 * Uses debouncing to reduce API calls during search
 *
 * Optimized with:
 * - Custom hooks for separation of concerns
 * - useCallback for stable function references
 * - useMemo for computed values
 * - Minimal re-renders
 */
export function SearchableMovieSection({
  initialMovies,
  initialTotalPages,
  initialTotalResults,
}: SearchableMovieSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Debounce search term to reduce API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Memoize computed values
  const isSearchActive = useMemo(
    () => debouncedSearchTerm.trim().length > 0,
    [debouncedSearchTerm],
  );

  const sectionTitle = useMemo(
    () =>
      isSearchActive
        ? PAGE_CONTENT.HOME.SECTIONS.SEARCH_RESULTS.TITLE
        : PAGE_CONTENT.HOME.SECTIONS.TRENDING.TITLE,
    [isSearchActive],
  );

  // Fetch and determine movie data (search or popular)
  const { movies, totalPages, totalResults, isLoading, isError, error } = useMovieData({
    isSearchActive,
    debouncedSearchTerm,
    currentPage,
    initialMovies,
    initialTotalPages,
    initialTotalResults,
  });

  // Reset page to 1 when search term changes
  const handleResetPage = useCallback(() => setCurrentPage(1), []);
  usePageReset(debouncedSearchTerm, handleResetPage);

  // Scroll to top when page changes
  useScrollToSection(sectionRef, [currentPage], {
    enabled: PAGINATION_CONFIG.SCROLL_TO_TOP_ON_PAGE_CHANGE,
    behavior: 'smooth',
    block: 'start',
  });

  // Memoize event handlers to prevent re-renders
  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  // Memoize error title and message
  const errorTitle = useMemo(
    () => (isSearchActive ? 'Error Searching Movies' : 'Error Loading Movies'),
    [isSearchActive],
  );

  const errorMessage = useMemo(
    () => (isSearchActive ? ERROR_MESSAGES.SEARCH.SEARCH_ERROR : ERROR_MESSAGES.MOVIES.LOAD_ERROR),
    [isSearchActive],
  );

  const emptyMessage = useMemo(
    () => (isSearchActive ? ERROR_MESSAGES.SEARCH.NO_RESULTS : ERROR_MESSAGES.MOVIES.EMPTY_STATE),
    [isSearchActive],
  );

  return (
    <div ref={sectionRef}>
      {/* Search Input */}
      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        onClear={handleClearSearch}
        className="mb-6 max-w-sm"
      />

      {/* Movie Section */}
      <PageSection title={sectionTitle}>
        {/* Loading State */}
        {isLoading && (
          <GridLayout cols={GRID_CONFIG.MOVIE_GRID}>
            {Array.from({ length: LOADING_CONFIG.SKELETON_COUNT }).map((_, index) => (
              <MovieCardSkeleton key={index} />
            ))}
          </GridLayout>
        )}

        {/* Error State */}
        {isError && <ErrorState title={errorTitle} message={errorMessage} error={error} />}

        {/* Empty Results */}
        {!isLoading && !isError && movies.length === 0 && (
          <EmptyState title="No Results" message={emptyMessage} />
        )}

        {/* Movie Grid */}
        {!isLoading && !isError && movies.length > 0 && (
          <>
            <GridLayout cols={GRID_CONFIG.MOVIE_GRID}>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </GridLayout>

            {/* Pagination Info */}
            <div className="mt-8">
              <PaginationInfo
                currentPage={currentPage}
                totalPages={totalPages}
                totalResults={totalResults}
              />
            </div>

            {/* Pagination Controls */}
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </PageSection>
    </div>
  );
}
