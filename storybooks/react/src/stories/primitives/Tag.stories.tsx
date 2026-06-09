import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Tag } from '@mygarage/react';

const meta: Meta<typeof Tag> = {
  title: 'Primitives/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: 'EV' } };
export const Multiple: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '6px' }}>
      <Tag>EV</Tag><Tag>Diesel</Tag><Tag>Seeding</Tag><Tag>Truck</Tag>
    </div>
  ),
};
