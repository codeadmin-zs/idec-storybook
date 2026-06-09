import type { Meta, StoryObj } from '@storybook/react';
import { NavBar, TopNavBar } from '@mygarage/react';
import { fleetTimestamp } from '../_shared/fleet';

const meta: Meta<typeof NavBar> = {
  title: 'Navigation/TopNavBar',
  component: NavBar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof meta>;

/** Full MY GARAGE fleet header — dark navy bar with garage selector, refresh, live status, and user actions */
export const FleetHeader: Story = {
  render: () => (
    <TopNavBar
      garageLabel="My Garage"
      timestamp={fleetTimestamp}
      onRefresh={() => {}}
      onFullscreen={() => {}}
    />
  ),
};

/** Minimal header with only logo and live indicator */
export const Minimal: Story = {
  render: () => <NavBar showLive timestamp={fleetTimestamp} />,
};

/** Custom slots for advanced composition */
export const CustomSlots: Story = {
  render: () => (
    <NavBar
      logo={<span style={{ fontWeight: 700 }}>Fleet Ops</span>}
      garageSelector={<button type="button" className="mg-navbar__select">West Region ▾</button>}
      liveIndicator={<span className="mg-navbar__live"><span className="mg-navbar__live-dot" />Offline</span>}
      timestamp="Last sync: 3 min ago"
      userInitials="SK"
      onRefresh={() => {}}
      onFullscreen={() => {}}
    />
  ),
};
