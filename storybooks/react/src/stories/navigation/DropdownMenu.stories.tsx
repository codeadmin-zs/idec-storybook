import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DropdownMenu, Button } from '@mygarage/react';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Navigation/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: { align: { control: 'select', options: ['left', 'right'] } },
};
export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { key: 'edit',   label: 'Edit Vehicle' },
  { key: 'assign', label: 'Assign Driver' },
  { key: 'export', label: 'Export Data' },
  { key: 'delete', label: 'Delete' },
];

export const Default: Story = {
  args: {
    items,
    align: 'right',
    trigger: <Button variant="secondary" size="sm">Actions ▾</Button>,
    onSelect: () => {},
  },
};
export const AlignLeft: Story = {
  args: { items, align: 'left', trigger: <Button variant="ghost" size="sm">More ▾</Button>, onSelect: () => {} },
};
