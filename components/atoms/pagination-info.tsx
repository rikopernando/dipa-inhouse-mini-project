import { Typography } from '@/components/atoms/typography';
import { PAGE_CONTENT, PAGINATION_CONFIG } from '@/lib/constants';
import { formatNumber } from '@/lib/utils';

export interface PaginationInfoProps {
  /**
   * Current page number (1-indexed)
   */
  currentPage: number;
  /**
   * Total number of pages
   */
  totalPages: number;
  /**
   * Total number of results
   */
  totalResults: number;
}

/**
 * Pagination Info Component
 * Displays "Showing X-Y of Z results"
 */
export function PaginationInfo({ currentPage, totalResults }: PaginationInfoProps) {
  const itemsPerPage = PAGINATION_CONFIG.ITEMS_PER_PAGE;
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalResults);

  if (totalResults === 0) {
    return null;
  }

  return (
    <Typography variant="muted" className="text-center text-sm">
      {PAGE_CONTENT.HOME.PAGINATION.SHOWING} {startItem}-{endItem} {PAGE_CONTENT.HOME.PAGINATION.OF}{' '}
      {formatNumber(totalResults)} {PAGE_CONTENT.HOME.PAGINATION.RESULTS}
    </Typography>
  );
}
