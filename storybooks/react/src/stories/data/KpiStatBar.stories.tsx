import type { Meta, StoryObj } from '@storybook/react';
import { KpiStatBar, type KpiTile } from '@mygarage/react';

const tiles: KpiTile[] = [
  { key: 'total',        label: 'Total Vehicles', value: '142',  tone: 'neutral' },
  { key: 'moving',       label: 'Moving',         value: '89',   tone: 'moving' },
  { key: 'idle',         label: 'Idle',           value: '31',   tone: 'idle' },
  { key: 'stopped',      label: 'Stopped',        value: '15',   tone: 'stopped' },
  { key: 'notReachable', label: 'Not Reachable',  value: '7',    tone: 'notReachable' },
];

const meta: Meta<typeof KpiStatBar> = {
  title: 'Data Display/KpiStatBar',
  component: KpiStatBar,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { tiles, onSelect: () => {} } };
export const WithSelection: Story = { args: { tiles, selectedKey: 'moving', onSelect: () => {} } };
