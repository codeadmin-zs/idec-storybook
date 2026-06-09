import React, { type ReactNode } from 'react';

const GarageIcon = () => (
  <svg className="mg-navbar__logo-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M2 8.5L10 3l8 5.5V17a1 1 0 01-1 1h-5v-5H8v5H3a1 1 0 01-1-1V8.5z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

const RefreshIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path
      d="M11.5 7A4.5 4.5 0 104.2 4.2M4.2 1.5v2.7h2.7"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FullscreenIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M2.5 6V2.5H6M10 2.5h3.5V6M10 13.5h3.5V10M2.5 10v3.5H6"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M3 13.5c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

/* -------------------------------- NavBar -------------------------------- */
export interface NavBarProps {
  logo?: ReactNode;
  /** Garage / org selector control — overrides the default pill when provided */
  garageSelector?: ReactNode;
  /** Label for the built-in garage selector pill */
  garageLabel?: string;
  onRefresh?: () => void;
  /** Live / connection indicator — overrides the default green dot when provided */
  liveIndicator?: ReactNode;
  /** Show the built-in live indicator (default true when liveIndicator is not provided) */
  showLive?: boolean;
  /** Timestamp text or node shown below the action icons on the right */
  timestamp?: ReactNode;
  /** User avatar node — overrides the built-in avatar when provided */
  avatar?: ReactNode;
  /** Initials for the built-in avatar circle */
  userInitials?: string;
  refreshIcon?: ReactNode;
  onFullscreen?: () => void;
  className?: string;
}

/** Dark top navigation bar matching the MY GARAGE fleet-management header */
export function NavBar({
  logo,
  garageSelector,
  garageLabel = 'My Garage',
  onRefresh,
  liveIndicator,
  showLive = true,
  timestamp,
  avatar,
  userInitials,
  refreshIcon,
  onFullscreen,
  className = '',
}: NavBarProps) {
  const resolvedLogo = logo ?? (
    <>
      <GarageIcon />
      <span>My Garage</span>
    </>
  );

  const resolvedGarageSelector = garageSelector ?? (
    <button type="button" className="mg-navbar__select" aria-label="Select garage">
      {garageLabel}
      <span aria-hidden="true">▾</span>
    </button>
  );

  const resolvedLive =
    liveIndicator ??
    (showLive ? (
      <span className="mg-navbar__live">
        <span className="mg-navbar__live-dot" aria-hidden="true" />
        Live
      </span>
    ) : null);

  const resolvedAvatar =
    avatar ??
    (userInitials ? (
      <div className="mg-navbar__avatar" aria-label="User profile">
        {userInitials}
      </div>
    ) : (
      <div className="mg-navbar__avatar" aria-label="User profile">
        <UserIcon />
      </div>
    ));

  return (
    <header className={`mg-navbar ${className}`}>
      <div className="mg-navbar__start">
        <div className="mg-navbar__logo">{resolvedLogo}</div>
        {resolvedGarageSelector}
        {onRefresh && (
          <button type="button" className="mg-navbar__refresh" aria-label="Refresh" onClick={onRefresh}>
            {refreshIcon ?? <RefreshIcon />}
            Refresh
          </button>
        )}
        {resolvedLive}
      </div>
      <div className="mg-navbar__end">
        <div className="mg-navbar__actions">
          <div className="mg-navbar__icon-group">
            {onFullscreen && (
              <button
                type="button"
                className="mg-icon-btn mg-icon-btn--on-dark"
                aria-label="Toggle fullscreen"
                onClick={onFullscreen}
              >
                <FullscreenIcon />
              </button>
            )}
            {resolvedAvatar}
          </div>
          {timestamp && <span className="mg-navbar__timestamp">{timestamp}</span>}
        </div>
      </div>
    </header>
  );
}

/** Alias for NavBar — the fleet-themed top navigation component */
export const TopNavBar = NavBar;

/* -------------------------------- SideNav -------------------------------- */
export interface SideNavItem {
  key: string;
  label: string;
  icon: ReactNode;
  href?: string;
}

export interface SideNavProps {
  items: SideNavItem[];
  activeKey: string;
  onSelect?: (key: string) => void;
  /** Renders the rail expanded with labels instead of icon-only */
  expanded?: boolean;
  /** Light (default) or dark navy rail */
  variant?: 'light' | 'dark';
  footer?: ReactNode;
  className?: string;
}

/** Icon rail side navigation with active state, optionally expanded with labels */
export function SideNav({
  items,
  activeKey,
  onSelect,
  expanded,
  variant = 'light',
  footer,
  className = '',
}: SideNavProps) {
  return (
    <nav
      className={[
        'mg-side-nav',
        expanded && 'mg-side-nav--expanded',
        variant === 'dark' && 'mg-side-nav--dark',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label="Primary"
    >
      <ul className="mg-side-nav__list">
        {items.map((item) => {
          const active = item.key === activeKey;
          return (
            <li key={item.key}>
              <a
                href={item.href ?? '#'}
                className={`mg-side-nav__item ${active ? 'mg-side-nav__item--active' : ''}`}
                aria-current={active ? 'page' : undefined}
                onClick={(e) => {
                  if (onSelect) {
                    e.preventDefault();
                    onSelect(item.key);
                  }
                }}
              >
                <span className="mg-side-nav__icon" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="mg-side-nav__label">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
      {footer && <div className="mg-side-nav__footer">{footer}</div>}
    </nav>
  );
}

/* -------------------------------- AppShell -------------------------------- */
export interface AppShellProps {
  navBar: ReactNode;
  sideNav?: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Page-level shell combining NavBar + SideNav + main content region */
export function AppShell({ navBar, sideNav, children, className = '' }: AppShellProps) {
  return (
    <div className={`mg-app-shell ${className}`}>
      {navBar}
      <div className="mg-app-shell__body">
        {sideNav}
        <main className="mg-app-shell__main">{children}</main>
      </div>
    </div>
  );
}
