import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@mygarage/react';

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost'], table: { defaultValue: { summary: 'primary' } } },
    size:    { control: 'select', options: ['sm', 'md', 'lg'], table: { defaultValue: { summary: 'md' } } },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: 'primary', children: 'Save Changes' } };
export const Secondary: Story = { args: { variant: 'secondary', children: 'Cancel' } };
export const Ghost: Story = { args: { variant: 'ghost', children: 'View Details' } };
export const Small: Story = { args: { variant: 'primary', size: 'sm', children: 'Small Action' } };
export const Large: Story = { args: { variant: 'primary', size: 'lg', children: 'Large Action' } };
export const Disabled: Story = { args: { variant: 'primary', disabled: true, children: 'Unavailable' } };
