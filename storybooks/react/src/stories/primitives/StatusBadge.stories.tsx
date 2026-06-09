import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { StatusBadge, type StatusTone } from '@mygarage/react';

const meta: Meta<typeof StatusBadge> = {
  title: 'Primitives/StatusBadge',
  component: StatusBadge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    tone: { control: 'select', options: ['moving','idle','stopped','notReachable','critical','diy','success','info','warning','danger','neutral'] },
    dot: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Moving: Story = { args: { tone: 'moving', children: 'Moving' } };
export const Idle: Story = { args: { tone: 'idle', children: 'Idle' } };
export const Stopped: Story = { args: { tone: 'stopped', children: 'Stopped' } };
export const Critical: Story = { args: { tone: 'critical', children: 'Active Alert' } };
export const NotReachable: Story = { args: { tone: 'notReachable', children: 'Not Reachable' } };
export const Diy: Story = { args: { tone: 'diy', children: 'DIY' } };
export const WithDot: Story = { args: { tone: 'moving', dot: true, children: 'Live' } };
export const AllTones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {(['moving','idle','stopped','notReachable','critical','diy','success','info','warning','danger','neutral'] as StatusTone[]).map((tone) => (
        <StatusBadge key={tone} tone={tone}>{tone}</StatusBadge>
      ))}
    </div>
  ),
};
