import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { IconButton } from '@mygarage/react';

const CloseIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="3" x2="13" y2="13"/><line x1="13" y1="3" x2="3" y2="13"/></svg>;
const MoreIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="3" r="1.5"/><circle cx="8" cy="8" r="1.5"/><circle cx="8" cy="13" r="1.5"/></svg>;

const meta: Meta<typeof IconButton> = {
  title: 'Primitives/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    onDark: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { label: 'Close', children: <CloseIcon /> } };
export const Small: Story = { args: { label: 'More options', size: 'sm', children: <MoreIcon /> } };
export const OnDark: Story = {
  args: { label: 'Close', onDark: true, children: <CloseIcon /> },
  parameters: { backgrounds: { default: 'navy' } },
};
