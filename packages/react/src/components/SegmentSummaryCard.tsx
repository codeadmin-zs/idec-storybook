import React, { type ReactNode } from 'react';

export interface SegmentMetric {
  label: string;
  value: ReactNode;
}

export interface SegmentSummaryCardProps {
  icon?: ReactNode;
  title: string;
  count: ReactNode;
  metrics?: [SegmentMetric, SegmentMetric] | SegmentMetric[];
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

/** Selectable summary card — icon + headline count + up to two nested metrics (dashboard segment cards) */
export function SegmentSummaryCard({ icon, title, count, metrics, selected, onClick, className = '' }: SegmentSummaryCardProps) {
  return (
    <div
      className={`mg-segment-card ${selected ? 'mg-segment-card--selected' : ''} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      aria-pressed={onClick ? !!selected : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="mg-segment-card__head">
        {icon && <span className="mg-segment-card__icon" aria-hidden="true">{icon}</span>}
        <span className="mg-segment-card__title">{title}</span>
      </div>
      <div className="mg-segment-card__count">{count}</div>
      {metrics && metrics.length > 0 && (
        <div className="mg-segment-card__metrics">
          {metrics.map((m) => (
            <div key={m.label} className="mg-segment-card__metric">
              <span className="mg-segment-card__metric-value">{m.value}</span>
              <span className="mg-segment-card__metric-label">{m.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
