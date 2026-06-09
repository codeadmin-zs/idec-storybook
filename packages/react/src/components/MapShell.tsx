import React, { type ReactNode } from 'react';

export interface MapClusterMarker {
  id: string;
  /** Position as percentage of the map container (0-100) */
  x: number;
  y: number;
  count: number;
  /** low = healthy/green, high = attention/red */
  level?: 'low' | 'high';
  label?: string;
}

export interface MapShellProps {
  /** Optional KPI overlay strip rendered at the top-left of the map */
  overlay?: ReactNode;
  markers?: MapClusterMarker[];
  onMarkerClick?: (marker: MapClusterMarker) => void;
  /** Background image / tiles layer; falls back to a neutral surface */
  background?: ReactNode;
  height?: number | string;
  className?: string;
}

/** Map container with cluster markers and an optional KPI overlay strip, matching the fleet map view */
export function MapShell({ overlay, markers = [], onMarkerClick, background, height = 480, className = '' }: MapShellProps) {
  return (
    <div className={`mg-map-shell ${className}`} style={{ height }}>
      {background}
      {overlay && <div className="mg-map-shell__overlay">{overlay}</div>}
      {markers.map((m) => (
        <button
          key={m.id}
          type="button"
          className={`mg-map-cluster mg-map-cluster--${m.level ?? 'low'}`}
          style={{ left: `${m.x}%`, top: `${m.y}%` }}
          aria-label={m.label ?? `${m.count} vehicles`}
          onClick={() => onMarkerClick?.(m)}
        >
          {m.count}
        </button>
      ))}
    </div>
  );
}
