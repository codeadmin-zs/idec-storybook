import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from '@mygarage/react';

const meta: Meta<typeof Toggle> = {
  title: 'Primitives/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = { args: { label: 'Enable notifications' } };
export const On: Story = { args: { label: 'Enable notifications', defaultChecked: true } };
export const Disabled: Story = { args: { label: 'Disabled option', disabled: true } };
export const DisabledChecked: Story = { args: { label: 'Locked on', disabled: true, defaultChecked: true } };
