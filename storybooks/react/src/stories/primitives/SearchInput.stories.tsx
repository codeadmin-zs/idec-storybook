import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { SearchInput } from '@mygarage/react';

const SearchIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="6.5" cy="6.5" r="4"/><line x1="10" y1="10" x2="14" y2="14"/></svg>;

const meta: Meta<typeof SearchInput> = {
  title: 'Primitives/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { placeholder: 'Search vehicles…' } };
export const WithIcon: Story = { args: { placeholder: 'Search vehicles…', icon: <SearchIcon /> } };
export const Disabled: Story = { args: { placeholder: 'Search disabled', disabled: true } };
