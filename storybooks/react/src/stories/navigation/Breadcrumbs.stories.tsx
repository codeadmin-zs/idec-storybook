import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from '@mygarage/react';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const TwoLevels: Story = {
  args: { items: [{ label: 'Vehicles', href: '#' }, { label: 'Fleet Overview' }] },
};
export const ThreeLevels: Story = {
  args: { items: [{ label: 'Fleet', href: '#' }, { label: 'Vehicle Detail', href: '#' }, { label: 'DTC Codes' }] },
};
export const SingleItem: Story = {
  args: { items: [{ label: 'Dashboard' }] },
};
