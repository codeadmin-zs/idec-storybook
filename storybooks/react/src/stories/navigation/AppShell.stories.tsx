import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  AppShell,
  DateRangePill,
  IconButton,
  KpiStatBar,
  SideNav,
  Tabs,
  TopNavBar,
  type KpiTile,
} from '@mygarage/react';
import { FleetTopNav, fleetSideNavItems } from '../_shared/fleet';
import { FleetTrackerTable } from '../_shared/fleet-tables';

const kpiTiles: KpiTile[] = [
  { key: 'all', label: 'All Vehicle', value: 63, tone: 'neutral' },
  { key: 'moving', label: 'Moving', value: 47, tone: 'moving' },
  { key: 'idle', label: 'Idle', value: 0, tone: 'idle' },
  { key: 'stopped', label: 'Stopped', value: 0, tone: 'stopped' },
  { key: 'notReachable', label: 'Not Reachable', value: 16, tone: 'notReachable' },
];

const meta: Meta<typeof AppShell> = {
  title: 'Navigation/AppShell',
  component: AppShell,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof meta>;

/** Tracker summary page — matches the MY GARAGE fleet UI from production screenshots */
export const TrackerSummary: Story = {
  render: () => (
    <AppShell
      navBar={<FleetTopNav />}
      sideNav={<SideNav items={fleetSideNavItems} activeKey="tracker" onSelect={() => {}} />}
    >
      <div className="mg-page-header">
        <h1 className="mg-page-header__title">Tracker</h1>
        <div className="mg-page-header__actions">
          <DateRangePill from="1 Apr, 2024 00:00:00" to="30 Apr, 2024 17:44:03" onClick={() => {}} />
          <IconButton label="Filter">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M2 4h12M4 8h8M6 12h4" strokeLinecap="round" />
            </svg>
          </IconButton>
        </div>
      </div>

      <div style={{ background: 'var(--mg-color-surface-page)', borderRadius: 'var(--mg-radius-md) var(--mg-radius-md) 0 0', marginTop: 'var(--mg-space-2)' }}>
        <Tabs
          items={[
            { key: 'map', label: 'Map View' },
            { key: 'summary', label: 'Summary' },
          ]}
          activeKey="summary"
          onChange={() => {}}
        />
      </div>

      <div style={{ marginTop: 'var(--mg-space-5)' }}>
        <KpiStatBar tiles={kpiTiles} selectedKey="moving" onSelect={() => {}} />
      </div>

      <div style={{ marginTop: 'var(--mg-space-5)' }}>
        <FleetTrackerTable />
      </div>
    </AppShell>
  ),
};

export const ShellOnly: Story = {
  render: () => (
    <AppShell
      navBar={<TopNavBar timestamp="Apr 30, 2024, 5:44:03 PM" onRefresh={() => {}} onFullscreen={() => {}} />}
      sideNav={<SideNav items={fleetSideNavItems} activeKey="dashboard" onSelect={() => {}} />}
    >
      <div className="mg-page-header">
        <h1 className="mg-page-header__title">Dashboard</h1>
      </div>
      <p style={{ margin: 0, color: 'var(--mg-color-text-secondary)' }}>
        Page content area on the light <code>#F2F4F7</code> canvas.
      </p>
    </AppShell>
  ),
};
