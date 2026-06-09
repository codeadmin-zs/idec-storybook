import type { Meta, StoryObj } from '@storybook/react';
import { SettingsToggleRow } from '@mygarage/react';

const meta: Meta<typeof SettingsToggleRow> = {
  title: 'Primitives/SettingsToggleRow',
  component: SettingsToggleRow,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    disabled: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'push-alerts', title: 'Push Alerts', description: 'Receive real-time push notifications for critical events.' },
};
export const Checked: Story = {
  args: { label: 'push-alerts', title: 'Push Alerts', description: 'Receive real-time push notifications.', defaultChecked: true },
};
export const NoDescription: Story = {
  args: { label: 'maintenance-mode', title: 'Maintenance Mode' },
};
