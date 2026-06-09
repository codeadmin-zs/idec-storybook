import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DateRangePill } from '@mygarage/react';

const CalIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="2" width="12" height="11" rx="1"/><line x1="1" y1="6" x2="13" y2="6"/><line x1="4" y1="0" x2="4" y2="4"/><line x1="10" y1="0" x2="10" y2="4"/></svg>;

const meta: Meta<typeof DateRangePill> = {
  title: 'Navigation/DateRangePill',
  component: DateRangePill,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: { from: { control: 'text' }, to: { control: 'text' } },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { from: 'Jun 1, 2025', to: 'Jun 30, 2025', onClick: () => {} } };
export const WithIcon: Story = { args: { from: 'Jun 1, 2025', to: 'Jun 30, 2025', icon: <CalIcon />, onClick: () => {} } };
