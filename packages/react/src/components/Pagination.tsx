import React from 'react';

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** Show first/last jump buttons («  »  in addition to ‹ ›) */
  showEdges?: boolean;
  /**
   * `numbered` — page number buttons (Telemetry Trails).
   * `compact` — range summary + arrows only (Tracker / Vehicles / Case tables).
   */
  variant?: 'numbered' | 'compact';
  /** Total items — used by compact variant for "1 – 10 of 47" */
  totalItems?: number;
  /** Page size — used by compact variant */
  pageSize?: number;
  className?: string;
}

function compactRange(page: number, pageSize: number, totalItems: number): string {
  if (totalItems === 0) return '0 of 0';
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);
  return `${start} – ${end} of ${totalItems}`;
}

/** Pager — numbered (Telemetry Trails) or compact with range summary (Tracker / Vehicles) */
export function Pagination({
  page,
  pageCount,
  onPageChange,
  showEdges = true,
  variant = 'numbered',
  totalItems,
  pageSize = 10,
  className = '',
}: PaginationProps) {
  if (variant === 'compact') {
    const total = totalItems ?? pageCount * pageSize;
    return (
      <nav className={`mg-pagination mg-pagination--compact ${className}`.trim()} aria-label="Pagination">
        <span className="mg-pagination__summary">{compactRange(page, pageSize, total)}</span>
        {showEdges && (
          <button
            type="button"
            className="mg-pagination__btn"
            disabled={page === 1}
            onClick={() => onPageChange(1)}
            aria-label="First page"
          >
            «
          </button>
        )}
        <button
          type="button"
          className="mg-pagination__btn"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          ‹
        </button>
        <button
          type="button"
          className="mg-pagination__btn"
          disabled={page === pageCount}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          ›
        </button>
        {showEdges && (
          <button
            type="button"
            className="mg-pagination__btn"
            disabled={page === pageCount}
            onClick={() => onPageChange(pageCount)}
            aria-label="Last page"
          >
            »
          </button>
        )}
      </nav>
    );
  }

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  return (
    <nav className={`mg-pagination ${className}`.trim()} aria-label="Pagination">
      {showEdges && (
        <button type="button" className="mg-pagination__btn" disabled={page === 1} onClick={() => onPageChange(1)} aria-label="First page">
          «
        </button>
      )}
      <button type="button" className="mg-pagination__btn" disabled={page === 1} onClick={() => onPageChange(page - 1)} aria-label="Previous page">
        ‹
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          className="mg-pagination__btn"
          aria-current={p === page ? 'page' : undefined}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}
      <button type="button" className="mg-pagination__btn" disabled={page === pageCount} onClick={() => onPageChange(page + 1)} aria-label="Next page">
        ›
      </button>
      {showEdges && (
        <button type="button" className="mg-pagination__btn" disabled={page === pageCount} onClick={() => onPageChange(pageCount)} aria-label="Last page">
          »
        </button>
      )}
    </nav>
  );
}
