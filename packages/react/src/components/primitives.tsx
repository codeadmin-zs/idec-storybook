import React, { type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode } from 'react';

/* ----------------------------- Button ----------------------------- */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Optional leading icon/element */
  icon?: ReactNode;
}

export function Button({ variant = 'primary', size = 'md', icon, className = '', children, ...rest }: ButtonProps) {
  const sizeClass = size !== 'md' ? ` mg-btn--${size}` : '';
  return (
    <button className={`mg-btn mg-btn--${variant}${sizeClass} ${className}`.trim()} {...rest}>
      {icon}
      {children}
    </button>
  );
}

/* --------------------------- IconButton --------------------------- */
export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Accessible label, required since the control is icon-only */
  label: string;
  size?: 'sm' | 'md';
  onDark?: boolean;
  children: ReactNode;
}

export function IconButton({ label, size = 'md', onDark = false, className = '', children, ...rest }: IconButtonProps) {
  const cls = ['mg-icon-btn', size === 'sm' && 'mg-icon-btn--sm', onDark && 'mg-icon-btn--on-dark', className]
    .filter(Boolean)
    .join(' ');
  return (
    <button className={cls} aria-label={label} title={label} {...rest}>
      {children}
    </button>
  );
}

/* ----------------------------- Badge ------------------------------ */
export type StatusTone = 'moving' | 'idle' | 'stopped' | 'notReachable' | 'critical' | 'diy' | 'success' | 'info' | 'warning' | 'danger' | 'neutral';

const TONE_CLASS: Record<StatusTone, string> = {
  moving: 'mg-badge--moving',
  success: 'mg-badge--success',
  idle: 'mg-badge--idle',
  info: 'mg-badge--info',
  stopped: 'mg-badge--stopped',
  warning: 'mg-badge--warning',
  notReachable: 'mg-badge--not-reachable',
  neutral: 'mg-badge--neutral',
  critical: 'mg-badge--critical',
  danger: 'mg-badge--danger',
  diy: 'mg-badge--diy',
};

export interface StatusBadgeProps {
  /** Semantic state tone — maps 1:1 to design-token status colors */
  tone: StatusTone;
  children: ReactNode;
  /** Renders a small leading dot (used for live/status indicators) */
  dot?: boolean;
  className?: string;
}

/** Pill used for vehicle/case/DTC state ("Moving", "Recurred", "Not Reachable"...) */
export function StatusBadge({ tone, children, dot = false, className = '' }: StatusBadgeProps) {
  return (
    <span className={`mg-badge ${TONE_CLASS[tone]}${dot ? ' mg-badge--dot' : ''} ${className}`.trim()}>
      {children}
    </span>
  );
}

export interface TagProps {
  children: ReactNode;
  className?: string;
}

/** Neutral grey pill for attribute chips ("EV", "Diesel", "Seeding"...) */
export function Tag({ children, className = '' }: TagProps) {
  return <span className={`mg-tag ${className}`.trim()}>{children}</span>;
}

/* ----------------------------- Toggle ------------------------------ */
export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label: string;
}

/** Bare switch control (no row/description — see SettingsToggleRow for that) */
export function Toggle({ label, className = '', ...rest }: ToggleProps) {
  return (
    <label className={`mg-toggle ${className}`.trim()}>
      <input type="checkbox" aria-label={label} {...rest} />
      <span className="mg-toggle__track" aria-hidden="true" />
      <span className="mg-toggle__thumb" aria-hidden="true" />
    </label>
  );
}

export interface SettingsToggleRowProps extends ToggleProps {
  title: string;
  description?: ReactNode;
}

/** Full settings row: title + description + toggle, as seen on the Controls screen */
export function SettingsToggleRow({ title, description, ...toggleProps }: SettingsToggleRowProps) {
  return (
    <div className="mg-toggle-row">
      <div>
        <p className="mg-toggle-row__title">{title}</p>
        {description ? <p className="mg-toggle-row__desc">{description}</p> : null}
      </div>
      <Toggle {...toggleProps} />
    </div>
  );
}

/* --------------------------- Breadcrumbs --------------------------- */
export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="mg-breadcrumbs" aria-label="Breadcrumb">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <React.Fragment key={item.label}>
            {i > 0 && <span className="mg-breadcrumbs__sep" aria-hidden="true">|</span>}
            {isLast ? (
              <span className="mg-breadcrumbs__current" aria-current="page">{item.label}</span>
            ) : (
              <a href={item.href ?? '#'} onClick={item.onClick}>{item.label}</a>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

/* -------------------------- DateRangePill -------------------------- */
export interface DateRangePillProps {
  from: string;
  to: string;
  icon?: ReactNode;
  onClick?: () => void;
}

/** Display pill for a date/time range, with optional calendar icon (click opens your picker) */
export function DateRangePill({ from, to, icon, onClick }: DateRangePillProps) {
  return (
    <button type="button" className="mg-date-pill" onClick={onClick}>
      {icon}
      <strong>{from}</strong>
      <span aria-hidden="true">–</span>
      <strong>{to}</strong>
    </button>
  );
}

/* ----------------------------- Search ------------------------------ */
export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
}

export function SearchInput({ icon, className = '', ...rest }: SearchInputProps) {
  return (
    <label className={`mg-search ${className}`.trim()}>
      {icon}
      <input type="search" {...rest} />
    </label>
  );
}
