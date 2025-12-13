'use client';

import { useState, useEffect, useRef } from 'react';
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
import { useSearchMovies } from '@/hooks/query/useSearchMovies';
import { useGetPopularMovies } from '@/hooks/query/useGetPopularMovies';
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
 */
export function SearchableMovieSection({
  initialMovies,
  initialTotalPages,
  initialTotalResults,
}: SearchableMovieSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const sectionRef = useRef<HTMLDivElement>(null);
  const prevSearchTermRef = useRef<string | undefined>(undefined);

  // Determine if we're searching
  const isSearchActive = debouncedSearchTerm.trim().length > 0;

  // Fetch search results if searching
  const {
    data: searchData,
    isLoading: isSearchLoading,
    isError: isSearchError,
    error: searchError,
  } = useSearchMovies(debouncedSearchTerm, currentPage);

  // Fetch popular movies for pagination
  // Only fetch if NOT searching AND NOT on page 1 (page 1 uses ISR initialMovies)
  const {
    data: popularData,
    isLoading: isPopularLoading,
    isError: isPopularError,
    error: popularError,
  } = useGetPopularMovies(currentPage, !isSearchActive && currentPage > 1);

  // Reset to page 1 when search term changes (avoid cascading renders)
  useEffect(() => {
    // Only reset page if search term actually changed (not on initial mount)
    function resetPage() {
      setCurrentPage(1);
    }

    if (
      prevSearchTermRef.current !== undefined &&
      prevSearchTermRef.current !== debouncedSearchTerm
    ) {
      resetPage();
    }
    prevSearchTermRef.current = debouncedSearchTerm;
  }, [debouncedSearchTerm]);

  // Scroll to top when page changes
  useEffect(() => {
    if (PAGINATION_CONFIG.SCROLL_TO_TOP_ON_PAGE_CHANGE && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage]);

  // Determine which data to use
  let movies: Movie[] = [];
  let totalPages = 1;
  let totalResults = 0;
  let isLoading = false;
  let isError = false;
  let error: Error | null = null;

  if (isSearchActive) {
    // Use search data
    movies = searchData?.results || [];
    totalPages = searchData?.total_pages || 1;
    totalResults = searchData?.total_results || 0;
    isLoading = isSearchLoading;
    isError = isSearchError;
    error = searchError;
  } else {
    // Use popular movies (from server for page 1, from query for other pages)
    if (currentPage === 1) {
      // Use ISR data from server (no fetch needed!)
      movies = initialMovies;
      totalPages = initialTotalPages;
      totalResults = initialTotalResults;
    } else {
      // Fetch from React Query for pages 2+
      movies = popularData?.results || [];
      totalPages = popularData?.total_pages || 1;
      totalResults = popularData?.total_results || 0;
      isLoading = isPopularLoading;
      isError = isPopularError;
      error = popularError;
    }
  }

  const sectionTitle = isSearchActive
    ? PAGE_CONTENT.HOME.SECTIONS.SEARCH_RESULTS.TITLE
    : PAGE_CONTENT.HOME.SECTIONS.TRENDING.TITLE;

  // Handle clear search
  const handleClearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div ref={sectionRef}>
      {/* Search Input */}
      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        onClear={handleClearSearch}
        className="mb-8"
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
        {isError && (
          <ErrorState
            title={isSearchActive ? 'Error Searching Movies' : 'Error Loading Movies'}
            message={
              isSearchActive ? ERROR_MESSAGES.SEARCH.SEARCH_ERROR : ERROR_MESSAGES.MOVIES.LOAD_ERROR
            }
            error={error}
          />
        )}

        {/* Empty Results */}
        {!isLoading && !isError && movies.length === 0 && (
          <EmptyState
            title="No Results"
            message={
              isSearchActive ? ERROR_MESSAGES.SEARCH.NO_RESULTS : ERROR_MESSAGES.MOVIES.EMPTY_STATE
            }
          />
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
