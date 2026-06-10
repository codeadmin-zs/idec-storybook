import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MapShell, type MapClusterMarker } from '@mygarage/react';

const markers: MapClusterMarker[] = [
  { id: 'm1', x: 20,  y: 30,  count: 8,  level: 'success', label: 'Zone A' },
  { id: 'm2', x: 55,  y: 45,  count: 3,  level: 'warning', label: 'Zone B' },
  { id: 'm3', x: 75,  y: 25,  count: 15, level: 'neutral', label: 'Zone C' },
  { id: 'm4', x: 40,  y: 70,  count: 1,  level: 'danger',  label: 'Zone D' },
];

const meta: Meta<typeof MapShell> = {
  title: 'Charts/MapShell',
  component: MapShell,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: { height: { control: { type: 'range', min: 200, max: 700 } } },
};
export default meta;
type Story = StoryObj<typeof meta>;

const MockMapBg = () => (
  <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #EAF1F8 0%, #D0E0EF 100%)' }}>
    <svg width="100%" height="100%" style={{ opacity: 0.3 }}>
      {Array.from({ length: 8 }).map((_, i) => <line key={`h${i}`} x1="0" y1={`${i * 14}%`} x2="100%" y2={`${i * 14}%`} stroke="#006E74" strokeWidth="0.5"/>)}
      {Array.from({ length: 12 }).map((_, i) => <line key={`v${i}`} x1={`${i * 9}%`} y1="0" x2={`${i * 9}%`} y2="100%" stroke="#006E74" strokeWidth="0.5"/>)}
    </svg>
  </div>
);

export const Default: Story = {
  args: { markers, height: 400, onMarkerClick: () => {} },
  render: (args) => <MapShell {...args} background={<MockMapBg />} />,
};
export const WithOverlay: Story = {
  args: { markers, height: 400, onMarkerClick: () => {} },
  render: (args) => (
    <MapShell {...args} background={<MockMapBg />}
      overlay={<div style={{ position: 'absolute', top: 12, right: 12, background: '#fff', borderRadius: 8, padding: '8px 12px', fontSize: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>142 vehicles</div>}
    />
  ),
};
