import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ProductProfileCard } from '@mygarage/react';

const DocIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M8 4h8l4 4v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" strokeLinejoin="round" />
    <path d="M16 4v4h4M9 13h6M9 17h4" strokeLinecap="round" />
  </svg>
);

const ToolsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.8-2.8 2.5-2.5z" strokeLinejoin="round" />
  </svg>
);

const AlertIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M12 4L3 20h18L12 4z" strokeLinejoin="round" />
    <path d="M12 10v4M12 17h.01" strokeLinecap="round" />
  </svg>
);

const sideActions = [
  { key: 'documents', icon: <DocIcon />, label: 'View documents', variant: 'cta' as const, onClick: () => {} },
  { key: 'maintenance', icon: <ToolsIcon />, label: 'Maintenance info', variant: 'info' as const, onClick: () => {} },
  { key: 'alerts', icon: <AlertIcon />, label: 'Alerts', variant: 'info' as const, onClick: () => {} },
];

const meta: Meta<typeof ProductProfileCard> = {
  title: 'Data Display/ProductProfileCard',
  component: ProductProfileCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered', backgrounds: { default: 'page' } },
};
export default meta;
type Story = StoryObj<typeof meta>;

/** Matches the MY GARAGE product profile page card */
export const Default: Story = {
  args: {
    productId: 'AB2V7PRT0RH118134',
    title: 'UST - ProDrive X2025 -',
    status: { tone: 'notReachable' },
    labels: [
      { key: 'type1a', label: 'Type 1' },
      { key: 'diesel', label: 'Diesel' },
      { key: 'type1b', label: 'Type 1' },
      { key: 'ev', label: 'EV' },
      { key: 'seeding', label: 'Seeding' },
      { key: 'status', label: 'Not Reachable', tone: 'neutral' },
    ],
    image: (
      <img
        src="https://images.unsplash.com/photo-1519641471654-76cebc7abf67?w=480&h=280&fit=crop"
        alt="ProDrive X2025"
      />
    ),
    sideActions,
    metrics: [
      { key: 'distance', label: 'Distance', value: '101.51 km' },
      { key: 'hours', label: 'Operating Hour', value: '0 Hrs' },
      { key: 'rpm', label: 'RPM', value: '1.00' },
    ],
  },
};

export const Moving: Story = {
  args: {
    ...Default.args,
    status: { tone: 'moving' },
    labels: [
      { key: 'type1', label: 'Type 1' },
      { key: 'diesel', label: 'Diesel' },
      { key: 'ev', label: 'EV' },
    ],
    metrics: [
      { key: 'distance', label: 'Distance', value: '248.30 km' },
      { key: 'hours', label: 'Operating Hour', value: '12 Hrs' },
      { key: 'rpm', label: 'RPM', value: '1,850' },
    ],
  },
};

export const WithoutSideRail: Story = {
  args: {
    productId: 'FLT-001',
    title: 'Toyota Hilux',
    status: { tone: 'idle' },
    labels: [{ key: 'diesel', label: 'Diesel' }, { key: 'truck', label: 'Truck' }],
    image: (
      <img
        src="https://images.unsplash.com/photo-1533473359331-0135ef1b58dd?w=480&h=280&fit=crop"
        alt="Toyota Hilux"
      />
    ),
    metrics: [
      { key: 'speed', label: 'Speed', value: '72 km/h' },
      { key: 'fuel', label: 'Fuel', value: '78%' },
    ],
  },
};
