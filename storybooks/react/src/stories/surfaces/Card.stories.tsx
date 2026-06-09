import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card, Button } from '@mygarage/react';

const meta: Meta<typeof Card> = {
  title: 'Surfaces/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: { padding: { control: 'select', options: ['none', 'sm', 'md', 'lg'] } },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { title: 'Vehicle Summary', children: <p style={{ margin: 0, color: '#5B6472' }}>Card content goes here.</p> },
};
export const WithActions: Story = {
  args: {
    title: 'Fleet Overview',
    actions: <Button variant="ghost" size="sm">View All</Button>,
    children: <p style={{ margin: 0, color: '#5B6472' }}>Showing 24 active vehicles.</p>,
  },
};
export const NoPadding: Story = {
  args: { padding: 'none', children: <div style={{ padding: '16px 20px', background: '#EAF1F8', borderRadius: '8px' }}>Custom inner layout</div> },
};
export const SmallPadding: Story = {
  args: { title: 'Compact', padding: 'sm', children: <p style={{ margin: 0, color: '#5B6472' }}>Compact padding.</p> },
};
