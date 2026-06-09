import React, { type ReactNode } from 'react';
import { StatusBadge, type StatusTone } from './primitives';

export interface VehicleCardStat {
  label: string;
  value: ReactNode;
}

export interface VehicleCardAction {
  key: string;
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}

export interface VehicleCardProps {
  name: string;
  subtitle?: string;
  image?: ReactNode;
  status: { label: string; tone: StatusTone };
  tags?: string[];
  stats?: VehicleCardStat[];
  actions?: VehicleCardAction[];
  /** Kebab / overflow menu trigger, e.g. a DropdownMenu */
  menu?: ReactNode;
  onClick?: () => void;
  className?: string;
}

/** Vehicle summary card — image, status pill, tag pills, mini stats, action icons, kebab menu */
export function VehicleCard({ name, subtitle, image, status, tags, stats, actions, menu, onClick, className = '' }: VehicleCardProps) {
  return (
    <div className={`mg-vehicle-card ${className}`} onClick={onClick} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined}>
      <div className="mg-vehicle-card__media">
        {image}
        <StatusBadge tone={status.tone} className="mg-vehicle-card__status">{status.label}</StatusBadge>
        {menu && <div className="mg-vehicle-card__menu">{menu}</div>}
      </div>
      <div className="mg-vehicle-card__body">
        <div className="mg-vehicle-card__title">{name}</div>
        {subtitle && <div className="mg-vehicle-card__subtitle">{subtitle}</div>}
        {tags && tags.length > 0 && (
          <div className="mg-vehicle-card__tags">
            {tags.map((t) => (
              <span key={t} className="mg-tag">{t}</span>
            ))}
          </div>
        )}
        {stats && stats.length > 0 && (
          <div className="mg-vehicle-card__stats">
            {stats.map((s) => (
              <div key={s.label} className="mg-vehicle-card__stat">
                <span className="mg-vehicle-card__stat-value">{s.value}</span>
                <span className="mg-vehicle-card__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        )}
        {actions && actions.length > 0 && (
          <div className="mg-vehicle-card__actions">
            {actions.map((a) => (
              <button key={a.key} type="button" className="mg-icon-btn mg-icon-btn--sm" aria-label={a.label} onClick={a.onClick}>
                {a.icon}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
