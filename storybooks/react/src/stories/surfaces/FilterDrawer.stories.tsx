import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { FilterDrawer, Button, type FilterGroup } from '@mygarage/react';

const groups: FilterGroup[] = [
  {
    key: 'status',
    label: 'Vehicle Status',
    options: [
      { key: 'moving',       label: 'Moving',        count: 18, selected: true },
      { key: 'idle',         label: 'Idle',          count: 7 },
      { key: 'stopped',      label: 'Stopped',       count: 3 },
      { key: 'notReachable', label: 'Not Reachable', count: 2 },
    ],
  },
  {
    key: 'type',
    label: 'Vehicle Type',
    options: [
      { key: 'truck',  label: 'Truck',  count: 12 },
      { key: 'van',    label: 'Van',    count: 8, selected: true },
      { key: 'sedan',  label: 'Sedan',  count: 6 },
      { key: 'ev',     label: 'EV',     count: 4 },
    ],
  },
];

const meta: Meta<typeof FilterDrawer> = {
  title: 'Surfaces/FilterDrawer',
  component: FilterDrawer,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: { open: { control: 'boolean' } },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: { open: true, title: 'Filter Vehicles', groups, showClearAll: true, showSubmit: true, onClose: () => {}, onToggleOption: () => {}, onClearAll: () => {}, onSubmit: () => {} },
};
export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>Open Filters</Button>
        <FilterDrawer open={open} title="Filter Vehicles" groups={groups} showClearAll showSubmit
          onClose={() => setOpen(false)} onToggleOption={() => {}} onClearAll={() => {}} onSubmit={() => setOpen(false)} />
      </>
    );
  },
};
