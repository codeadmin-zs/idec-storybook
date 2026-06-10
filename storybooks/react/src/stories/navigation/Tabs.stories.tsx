import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, type TabItem } from '@mygarage/react';

const trackerItems: TabItem[] = [
  { key: 'map', label: 'Map View' },
  { key: 'summary', label: 'Summary' },
];

const items: TabItem[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'alerts', label: 'Alerts' },
  { key: 'dtc', label: 'DTC' },
  { key: 'history', label: 'History' },
];

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: { layout: 'padded', backgrounds: { default: 'page' } },
};
export default meta;
type Story = StoryObj<typeof meta>;

/** Tracker screen — white active tab with teal top border on grey rail */
export const TrackerView: Story = {
  render: () => (
    <div style={{ background: 'var(--mg-color-surface-page)', padding: 'var(--mg-space-4)', borderRadius: 'var(--mg-radius-md)' }}>
      <Tabs items={trackerItems} activeKey="summary" onChange={() => {}} />
    </div>
  ),
};

export const MapViewActive: Story = {
  render: () => (
    <div style={{ background: 'var(--mg-color-surface-page)', padding: 'var(--mg-space-4)', borderRadius: 'var(--mg-radius-md)' }}>
      <Tabs items={trackerItems} activeKey="map" onChange={() => {}} />
    </div>
  ),
};

export const Default: Story = { args: { items, activeKey: 'overview', onChange: () => {} } };
