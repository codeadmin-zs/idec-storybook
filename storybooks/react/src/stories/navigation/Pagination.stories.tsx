import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from '@mygarage/react';

const meta: Meta<typeof Pagination> = {
  title: 'Navigation/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    page:      { control: { type: 'number', min: 1 } },
    pageCount: { control: { type: 'number', min: 1 } },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Early: Story = { args: { page: 1, pageCount: 10, onPageChange: () => {} } };
export const Middle: Story = { args: { page: 5, pageCount: 10, onPageChange: () => {} } };
export const End: Story = { args: { page: 10, pageCount: 10, onPageChange: () => {} } };
export const Short: Story = { args: { page: 2, pageCount: 3, onPageChange: () => {} } };
