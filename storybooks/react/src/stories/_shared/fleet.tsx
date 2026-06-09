import React from 'react';
import { TopNavBar, type SideNavItem } from '@mygarage/react';

const icon = (paths: React.ReactNode) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
    {paths}
  </svg>
);

export const DashboardIcon = () =>
  icon(
    <>
      <rect x="2" y="2" width="6" height="6" rx="1" />
      <rect x="10" y="2" width="6" height="6" rx="1" />
      <rect x="2" y="10" width="6" height="6" rx="1" />
      <rect x="10" y="10" width="6" height="6" rx="1" />
    </>,
  );

export const TrackerIcon = () =>
  icon(
    <>
      <polygon points="1,4 6,1 12,4 17,1 17,14 12,17 6,14 1,17" />
      <line x1="6" y1="1" x2="6" y2="14" />
      <line x1="12" y1="4" x2="12" y2="17" />
    </>,
  );

export const AnalyticsIcon = () =>
  icon(
    <>
      <rect x="2" y="10" width="3" height="6" />
      <rect x="7" y="6" width="3" height="10" />
      <rect x="12" y="2" width="3" height="14" />
    </>,
  );

export const CaseIcon = () =>
  icon(
    <>
      <rect x="3" y="5" width="12" height="10" rx="1" />
      <path d="M3 8h12" />
      <path d="M7 5V4a2 2 0 014 0v1" />
    </>,
  );

export const DtcIcon = () =>
  icon(
    <>
      <circle cx="9" cy="9" r="6" />
      <path d="M9 6v3l2 2" />
    </>,
  );

export const EventsIcon = () =>
  icon(
    <>
      <rect x="3" y="4" width="12" height="11" rx="1" />
      <path d="M3 8h12M6 2v3M12 2v3" />
    </>,
  );

export const VehiclesIcon = () =>
  icon(
    <>
      <path d="M3 11V8l2-5h8l2 5v3" />
      <rect x="1" y="11" width="16" height="4" rx="1" />
      <circle cx="4.5" cy="15" r="1.5" />
      <circle cx="13.5" cy="15" r="1.5" />
    </>,
  );

export const RulesIcon = () =>
  icon(
    <>
      <circle cx="5" cy="5" r="2" />
      <circle cx="13" cy="5" r="2" />
      <circle cx="9" cy="13" r="2" />
      <path d="M6.5 6.5L7.8 11M11.2 11L12.5 6.5" />
    </>,
  );

export const SettingsIcon = () =>
  icon(
    <>
      <circle cx="9" cy="9" r="2.5" />
      <path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.1 3.1l1.4 1.4M13.5 13.5l1.4 1.4M3.1 14.9l1.4-1.4M13.5 4.5l1.4-1.4" />
    </>,
  );

export const fleetSideNavItems: SideNavItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: <DashboardIcon />, href: '#' },
  { key: 'tracker', label: 'Tracker', icon: <TrackerIcon />, href: '#' },
  { key: 'analytics', label: 'Analytics', icon: <AnalyticsIcon />, href: '#' },
  { key: 'case', label: 'Case', icon: <CaseIcon />, href: '#' },
  { key: 'dtc', label: 'DTC', icon: <DtcIcon />, href: '#' },
  { key: 'events', label: 'Events', icon: <EventsIcon />, href: '#' },
  { key: 'vehicles', label: 'Vehicles', icon: <VehiclesIcon />, href: '#' },
  { key: 'rules', label: 'Rules', icon: <RulesIcon />, href: '#' },
  { key: 'settings', label: 'Settings', icon: <SettingsIcon />, href: '#' },
];

export const fleetTimestamp = 'Apr 30, 2024, 5:44:03 PM Asia/Calcutta';

export function FleetTopNav(props: { onRefresh?: () => void; onFullscreen?: () => void }) {
  return (
    <TopNavBar
      garageLabel="My Garage"
      timestamp={fleetTimestamp}
      onRefresh={props.onRefresh ?? (() => {})}
      onFullscreen={props.onFullscreen ?? (() => {})}
    />
  );
}
