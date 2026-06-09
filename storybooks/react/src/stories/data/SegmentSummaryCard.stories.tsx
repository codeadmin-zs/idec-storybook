import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { SegmentSummaryCard, type SegmentMetric } from '@mygarage/react';

const metrics: SegmentMetric[] = [
  { label: 'Moving',       value: '18' },
  { label: 'Idle',         value: '7' },
  { label: 'Stopped',      value: '3' },
  { label: 'Not Reachable',value: '2' },
];
const FleetIcon = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 13V9l2.5-6h9l2.5 6v4"/><rect x="1" y="13" width="18" height="4" rx="1"/><circle cx="5" cy="17" r="1.5"/><circle cx="15" cy="17" r="1.5"/></svg>;

const meta: Meta<typeof SegmentSummaryCard> = {
  title: 'Data Display/SegmentSummaryCard',
  component: SegmentSummaryCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: { selected: { control: 'boolean' }, clickable: { control: 'boolean' } },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { title: 'City Fleet', count: 30, metrics, onClick: () => {} } };
export const Selected: Story = { args: { title: 'City Fleet', count: 30, metrics, selected: true, clickable: true, onClick: () => {} } };
export const WithIcon: Story = { args: { title: 'Highway Fleet', count: 28, metrics, icon: <FleetIcon />, clickable: true, onClick: () => {} } };
