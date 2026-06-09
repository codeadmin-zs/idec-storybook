import React, { type ReactNode } from 'react';
import { Pagination } from './Pagination';

export interface DataTableColumn<T> {
  key: string;
  header: ReactNode;
  /** Render the cell; falls back to `row[key]` when omitted */
  render?: (row: T) => ReactNode;
  align?: 'left' | 'right' | 'center';
  width?: string;
}

export interface DataTablePagination {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** Total row count for compact footer, e.g. 47 */
  totalItems?: number;
  /** Rows per page — drives compact range text and page-size selector */
  pageSize?: number;
  pageSizeOptions?: number[];
  onPageSizeChange?: (size: number) => void;
  /** `compact` matches Tracker / Vehicles / Case tables; `numbered` for Telemetry Trails */
  variant?: 'numbered' | 'compact';
  /** Legacy summary slot — compact variant computes this automatically when totalItems is set */
  summary?: ReactNode;
}

export type DataTableRowKey<T> = ((row: T) => string | number) | (keyof T & string);

export type DataTableRowAccent = 'critical' | 'info' | 'none';

function resolveRowKey<T extends { [key: string]: any }>(
  rowKey: DataTableRowKey<T>,
  row: T,
  index: number,
): string | number {
  if (typeof rowKey === 'function') return rowKey(row);
  const value = row[rowKey];
  return value ?? index;
}

function emptyCell(value: unknown): ReactNode {
  if (value === null || value === undefined || value === '') {
    return <span className="mg-table__muted">---</span>;
  }
  return String(value);
}

/** Underlined link cell used for Chassis Number, Case ID, DTC, etc. */
export function TableLink({ href = '#', children }: { href?: string; children: ReactNode }) {
  return (
    <a href={href} className="mg-table__link">
      {children}
    </a>
  );
}

export interface DataTableProps<T extends { [key: string]: any }> {
  columns: DataTableColumn<T>[];
  rows: T[];
  /** Property name (e.g. `"id"`) or function returning a stable key per row */
  rowKey?: DataTableRowKey<T>;
  pagination?: DataTablePagination;
  /** Optional left accent stripe per row (alerts = critical, DTC = info) */
  rowAccent?: (row: T) => DataTableRowAccent;
  /** Toolbar above the table — Show Records dropdown + download/export actions */
  toolbar?: ReactNode;
  /** Show the built-in "Show Records" selector in the toolbar */
  showRecords?: boolean;
  /** Rendered top-right of the footer (e.g. an export/download IconButton) */
  footerActions?: ReactNode;
  emptyState?: ReactNode;
  className?: string;
}

/**
 * Generic data table matching the Tracker / Vehicles / Case / DTC list screens:
 * tinted header row, link + badge cells, optional toolbar, pagination footer.
 */
export function DataTable<T extends { [key: string]: any }>({
  columns,
  rows,
  rowKey = 'id',
  pagination,
  rowAccent,
  toolbar,
  showRecords = false,
  footerActions,
  emptyState,
  className = '',
}: DataTableProps<T>) {
  const pageSize = pagination?.pageSize ?? 10;
  const pageSizeOptions = pagination?.pageSizeOptions ?? [10, 25, 50];

  const builtInToolbar =
    showRecords && pagination ? (
      <div className="mg-table-toolbar__records">
        <label className="mg-table-toolbar__records-label" htmlFor="mg-table-page-size">
          Show Records
        </label>
        <select
          id="mg-table-page-size"
          className="mg-table-toolbar__records-select"
          value={pageSize}
          onChange={(e) => pagination.onPageSizeChange?.(Number(e.target.value))}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    ) : null;

  const showToolbar = toolbar || builtInToolbar || footerActions;

  return (
    <div className={`mg-table-wrap ${className}`.trim()}>
      {showToolbar && (
        <div className="mg-table-toolbar">
          <div className="mg-table-toolbar__start">{builtInToolbar}</div>
          <div className="mg-table-toolbar__end">
            {toolbar}
            {footerActions}
          </div>
        </div>
      )}
      <div className="mg-table-body">
        <table className="mg-table">
          <thead>
            <tr>
              {rowAccent && <th className="mg-table__accent-col" aria-hidden="true" />}
              {columns.map((col) => (
                <th key={col.key} style={{ width: col.width, textAlign: col.align ?? 'left' }}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && emptyState ? (
              <tr>
                <td colSpan={columns.length + (rowAccent ? 1 : 0)} className="mg-table__empty">
                  {emptyState}
                </td>
              </tr>
            ) : (
              rows.map((row, index) => {
                const accent = rowAccent?.(row) ?? 'none';
                return (
                  <tr
                    key={resolveRowKey(rowKey, row, index)}
                    className={accent !== 'none' ? `mg-table__row--accent-${accent}` : undefined}
                  >
                    {rowAccent && (
                      <td className="mg-table__accent-col" aria-hidden="true">
                        <span className={`mg-table__accent mg-table__accent--${accent}`} />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td key={col.key} style={{ textAlign: col.align ?? 'left' }}>
                        {col.render ? col.render(row) : emptyCell(row[col.key])}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {pagination && (
        <div className="mg-table__footer">
          {pagination.variant === 'compact' && pagination.pageSize && (
            <div className="mg-table__footer-size">
              <span className="mg-table__footer-size-label">Items per page:</span>
              <select
                className="mg-table-toolbar__records-select"
                value={pagination.pageSize}
                onChange={(e) => pagination.onPageSizeChange?.(Number(e.target.value))}
              >
                {pageSizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          )}
          {pagination.summary && pagination.variant !== 'compact' && (
            <span className="mg-table__muted mg-table__footer-summary">{pagination.summary}</span>
          )}
          <Pagination
            page={pagination.page}
            pageCount={pagination.pageCount}
            onPageChange={pagination.onPageChange}
            variant={pagination.variant ?? 'numbered'}
            totalItems={pagination.totalItems}
            pageSize={pagination.pageSize}
          />
        </div>
      )}
    </div>
  );
}
