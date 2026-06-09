import type { Meta, StoryObj } from '@storybook/react';
import { ChartCard, ChartCardActions, DonutChart } from '@mygarage/react';

const meta: Meta<typeof DonutChart> = {
  title: 'Charts/DonutChart',
  component: DonutChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded', backgrounds: { default: 'page' } },
};
export default meta;
type Story = StoryObj<typeof meta>;

/** DTC Master — Status card with side legend */
export const DtcStatus: Story = {
  render: () => (
    <ChartCard title="Status" actions={<ChartCardActions />}>
      <DonutChart
        segments={[{ label: 'Active', value: 1, color: 'var(--mg-color-status-critical-fg)' }]}
        centerValue="1"
        centerLabel="Total Count"
        size={140}
        thickness={24}
        legend={[
          { label: 'Active', color: 'var(--mg-color-status-critical-fg)', value: 1 },
          { label: 'Closed', color: 'var(--mg-color-status-moving-fg)', value: 0 },
        ]}
      />
    </ChartCard>
  ),
};

/** Dashboard — DTC Count / Sedan */
export const DashboardDtcCount: Story = {
  render: () => (
    <ChartCard
      title="DTC Count / Sedan"
      legend={[
        { label: 'Active', color: 'var(--mg-color-status-critical-fg)' },
        { label: 'Closed', color: 'var(--mg-color-status-moving-fg)' },
      ]}
    >
      <DonutChart
        segments={[
          { label: 'Active', value: 1, color: 'var(--mg-color-status-critical-fg)' },
          { label: 'Closed', value: 0, color: 'var(--mg-color-status-moving-fg)' },
        ]}
        centerValue="1"
        centerLabel="Total DTC"
        size={160}
        thickness={26}
      />
    </ChartCard>
  ),
};
