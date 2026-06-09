import type { Meta, StoryObj } from '@storybook/react';
import { ChartCard, ChartCardActions, LineChart, type LineSeries } from '@mygarage/react';

const coolantTemp: LineSeries[] = [
  {
    label: 'Coolant Temperature',
    color: 'var(--mg-color-chart-series2)',
    values: [42, 48, 55, 62, 58, 71, 68, 82, 78, 91, 88, 102, 98, 114],
  },
];

const meta: Meta<typeof LineChart> = {
  title: 'Charts/LineChart',
  component: LineChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded', backgrounds: { default: 'page' } },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const CoolantTempVsTime: Story = {
  render: () => (
    <ChartCard
      title="1. WER - Coolant Temp vs Time"
      actions={<ChartCardActions />}
      legend={[{ label: 'Coolant Temperature', color: 'var(--mg-color-chart-series2)' }]}
    >
      <LineChart
        series={coolantTemp}
        xLabels={['Apr 05', 'Apr 09', 'Apr 13', 'Apr 17', 'Apr 21', 'Apr 25', 'Apr 29']}
        yAxisLabel="Value"
        xAxisLabel="Time"
        height={260}
      />
    </ChartCard>
  ),
};

export const SpeedAcceleration: Story = {
  render: () => (
    <LineChart
      series={[
        { label: 'Speed', color: 'var(--mg-color-chart-series1)', values: [0.2, 0.4, 0.6, 0.5, 0.8, 0.7, 0.9] },
        { label: 'Acceleration', color: 'var(--mg-color-chart-series2)', values: [0.1, 0.3, 0.2, 0.5, 0.4, 0.6, 0.5] },
      ]}
      yAxisLabel="Value"
      xAxisLabel="Time"
      height={200}
    />
  ),
};
