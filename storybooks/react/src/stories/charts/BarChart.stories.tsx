import type { Meta, StoryObj } from '@storybook/react';
import { BarChart, ChartCard, ChartCardActions } from '@mygarage/react';

const meta: Meta<typeof BarChart> = {
  title: 'Charts/BarChart',
  component: BarChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded', backgrounds: { default: 'page' } },
};
export default meta;
type Story = StoryObj<typeof meta>;

const weekData = [
  { label: 'Mon', value: 42 },
  { label: 'Tue', value: 58 },
  { label: 'Wed', value: 37 },
  { label: 'Thu', value: 71 },
  { label: 'Fri', value: 65 },
  { label: 'Sat', value: 28 },
  { label: 'Sun', value: 19 },
];

export const Default: Story = {
  render: () => <BarChart data={weekData} yAxisLabel="Count" height={200} width={360} />,
};

export const Tall: Story = {
  render: () => <BarChart data={weekData} yAxisLabel="Count" height={280} width={360} />,
};

export const CustomColor: Story = {
  render: () => <BarChart data={weekData} color="var(--mg-color-status-moving-fg)" height={200} width={360} />,
};

export const MultiColor: Story = {
  render: () => (
    <BarChart
      data={weekData.map((d, i) => ({
        ...d,
        color: [
          'var(--mg-color-brand-primary)',
          'var(--mg-color-chart-series1)',
          'var(--mg-color-chart-series2)',
          'var(--mg-color-chart-series3)',
          'var(--mg-color-chart-series4)',
          'var(--mg-color-chart-series5)',
          'var(--mg-color-status-not-reachable-fg)',
        ][i],
      }))}
      yAxisLabel="Count"
      height={200}
      width={360}
    />
  ),
};

/** DTC Master — Active DTC State (Occurred / Recurred) */
export const ActiveDtcState: Story = {
  render: () => (
    <ChartCard title="Active DTC State" actions={<ChartCardActions />}>
      <BarChart
        data={[
          { label: 'Occurred', value: 0 },
          { label: 'Recurred', value: 1, color: 'var(--mg-color-status-stopped-fg)' },
        ]}
        yAxisLabel="Count"
        maxValue={1}
        height={200}
        width={280}
      />
    </ChartCard>
  ),
};

/** Analytics — Odo Jump occurrence histogram */
export const OdoJump: Story = {
  render: () => (
    <ChartCard title="3. Odo Jump - ROD - EV" actions={<ChartCardActions />}>
      <BarChart
        data={[
          { label: '0-10', value: 4 },
          { label: '40-50', value: 12 },
          { label: '80-90', value: 8 },
          { label: '100+', value: 22 },
        ]}
        yAxisLabel="Occurrence Count"
        threshold={{ value: 87.703, label: 'Max: 87.703' }}
        height={240}
        width={400}
      />
    </ChartCard>
  ),
};
