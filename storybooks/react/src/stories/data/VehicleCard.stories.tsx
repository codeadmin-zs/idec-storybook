import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { VehicleCard, StatusBadge, Tag } from '@mygarage/react';

const meta: Meta<typeof VehicleCard> = {
  title: 'Data Display/VehicleCard',
  component: VehicleCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: { clickable: { control: 'boolean' } },
};
export default meta;
type Story = StoryObj<typeof meta>;

const baseProps = {
  name: 'Toyota Hilux — FLT-001',
  subtitle: 'Driver: Ali Hassan',
  status: <StatusBadge tone="moving">Moving</StatusBadge>,
  tags: [<Tag key="ev">Diesel</Tag>, <Tag key="truck">Truck</Tag>],
  stats: [
    { label: 'Speed',    value: '72 km/h' },
    { label: 'Fuel',     value: '78%' },
    { label: 'Location', value: 'Riyadh, Zone 3' },
  ],
  actions: [{ key: 'view', label: 'View Details' }, { key: 'assign', label: 'Reassign' }],
};

export const Default: Story = { args: { ...baseProps } };
export const Clickable: Story = { args: { ...baseProps, clickable: true, onClick: () => {} } };
export const Stopped: Story = {
  args: { ...baseProps, name: 'Ford Transit — FLT-014', status: <StatusBadge tone="stopped">Stopped</StatusBadge> },
};
