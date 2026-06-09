import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { TelemetryStatTile } from '@mygarage/react';

const SpeedIcon = () => <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="9" cy="9" r="7"/><path d="M9 9l3-5"/><circle cx="9" cy="9" r="1.5" fill="currentColor" stroke="none"/></svg>;

const meta: Meta<typeof TelemetryStatTile> = {
  title: 'Data Display/TelemetryStatTile',
  component: TelemetryStatTile,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: { label: { control: 'text' }, value: { control: 'text' }, unit: { control: 'text' } },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Speed: Story = { args: { label: 'Current Speed', value: '72', unit: 'km/h' } };
export const WithIcon: Story = { args: { label: 'Current Speed', value: '72', unit: 'km/h', icon: <SpeedIcon /> } };
export const Fuel: Story = { args: { label: 'Fuel Level', value: '48', unit: '%' } };
export const Row: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <TelemetryStatTile label="Speed" value="72" unit="km/h" />
      <TelemetryStatTile label="Fuel" value="48" unit="%" />
      <TelemetryStatTile label="Odometer" value="112,440" unit="km" />
      <TelemetryStatTile label="Engine Temp" value="92" unit="°C" />
    </div>
  ),
};
