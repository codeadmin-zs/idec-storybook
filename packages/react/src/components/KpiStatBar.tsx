import React from 'react';
import type { StatusTone } from './primitives';

export interface KpiTile {
  key: string;
  label: string;
  value: number | string;
  /** Drives the accent color of the value/selected fill — omit for neutral */
  tone?: Extract<StatusTone, 'moving' | 'idle' | 'stopped' | 'notReachable'> | 'neutral';
}

export interface KpiStatBarProps {
  tiles: KpiTile[];
  /** Key of the currently-selected/filtered tile (renders filled, as on the Tracker summary) */
  selectedKey?: string;
  onSelect?: (key: string) => void;
}

const TONE_CLASS: Record<string, string> = {
  moving: 'mg-kpi-tile--moving',
  idle: 'mg-kpi-tile--idle',
  stopped: 'mg-kpi-tile--stopped',
  notReachable: 'mg-kpi-tile--not-reachable',
  neutral: 'mg-kpi-tile--neutral',
};

/**
 * Row of clickable summary tiles, e.g. "All Vehicle 63 / Moving 47 / Idle 0 / Stopped 0 /
 * Not Reachable 16" from the Tracker screen. Clicking a tile typically filters the view
 * below it; the active filter renders as a filled tile.
 */
export function KpiStatBar({ tiles, selectedKey, onSelect }: KpiStatBarProps) {
  return (
    <div className="mg-kpi-bar" role="tablist">
      {tiles.map((tile) => {
        const tone = tile.tone ?? 'neutral';
        const selected = tile.key === selectedKey;
        const cls = ['mg-kpi-tile', TONE_CLASS[tone], selected && 'mg-kpi-tile--selected']
          .filter(Boolean)
          .join(' ');
        return (
          <button
            key={tile.key}
            type="button"
            role="tab"
            aria-selected={selected}
            className={cls}
            onClick={() => onSelect?.(tile.key)}
          >
            <span className="mg-kpi-tile__label">{tile.label}</span>
            <span className="mg-kpi-tile__value">{tile.value}</span>
          </button>
        );
      })}
    </div>
  );
}
