import React, { type ReactNode } from 'react';

export interface TelemetryStatTileProps {
  label: string;
  value: ReactNode;
  unit?: string;
  /** e.g. a clock / history icon shown at top-right */
  icon?: ReactNode;
  hint?: ReactNode;
  className?: string;
}

/** Metric tile — big value + unit, label, and an optional history/clock icon (telemetry pages) */
export function TelemetryStatTile({ label, value, unit, icon, hint, className = '' }: TelemetryStatTileProps) {
  return (
    <div className={`mg-stat-tile ${className}`}>
      <div className="mg-stat-tile__head">
        <span className="mg-stat-tile__label">{label}</span>
        {icon && <span className="mg-stat-tile__icon" aria-hidden="true">{icon}</span>}
      </div>
      <div className="mg-stat-tile__value">
        {value}
        {unit && <span className="mg-stat-tile__unit">{unit}</span>}
      </div>
      {hint && <div className="mg-stat-tile__hint">{hint}</div>}
    </div>
  );
}
