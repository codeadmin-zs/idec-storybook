import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, type TabItem } from '@mygarage/react';

const items: TabItem[] = [
  { key: 'overview', label: 'Overview', count: 0 },
  { key: 'alerts',   label: 'Alerts',   count: 5 },
  { key: 'dtc',      label: 'DTC',      count: 12 },
  { key: 'history',  label: 'History' },
];

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { items, activeKey: 'overview', onChange: () => {} } };
export const WithCounts: Story = { args: { items, activeKey: 'alerts', onChange: () => {} } };
