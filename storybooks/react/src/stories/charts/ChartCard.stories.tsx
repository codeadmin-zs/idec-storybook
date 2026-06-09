import type { Meta, StoryObj } from '@storybook/react';
import { BarChart, ChartCard, ChartCardActions, DonutChart, LineChart, PieChart } from '@mygarage/react';

const meta: Meta<typeof ChartCard> = {
  title: 'Charts/ChartCard',
  component: ChartCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded', backgrounds: { default: 'page' } },
};
export default meta;
type Story = StoryObj<typeof meta>;

/** Dashboard row — DTC donut + Alert pie side by side */
export const DashboardCharts: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--mg-space-5)' }}>
      <ChartCard
        title="DTC Count / Sedan"
        legend={[
          { label: 'Active', color: 'var(--mg-color-status-critical-fg)' },
          { label: 'Closed', color: 'var(--mg-color-status-moving-fg)' },
        ]}
      >
        <DonutChart
          segments={[{ label: 'Active', value: 1, color: 'var(--mg-color-status-critical-fg)' }]}
          centerValue="1"
          centerLabel="Total DTC"
          size={150}
          thickness={24}
        />
      </ChartCard>
      <ChartCard
        title="Alert Status / Sedan"
        legend={[
          { label: 'critical', color: 'var(--mg-color-status-critical-fg)' },
          { label: 'major', color: 'var(--mg-color-status-stopped-fg)' },
          { label: 'minor', color: 'var(--mg-color-status-diy-fg)' },
        ]}
      >
        <PieChart
          segments={[{ label: 'critical', value: 33, color: 'var(--mg-color-status-critical-fg)' }]}
          overlayValue="33"
          size={150}
        />
      </ChartCard>
    </div>
  ),
};

export const AnalyticsWidget: Story = {
  render: () => (
    <ChartCard title="1. WER - Coolant Temp vs Time" actions={<ChartCardActions />}>
      <LineChart
        series={[{ label: 'Coolant Temperature', color: 'var(--mg-color-chart-series2)', values: [42, 55, 62, 71, 82, 98, 114] }]}
        xLabels={['Apr 05', 'Apr 13', 'Apr 21', 'Apr 29']}
        yAxisLabel="Value"
        xAxisLabel="Time"
      />
    </ChartCard>
  ),
};

export const DtcMasterRow: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--mg-space-5)' }}>
      <ChartCard title="Status">
        <DonutChart
          segments={[{ label: 'Active', value: 1, color: 'var(--mg-color-status-critical-fg)' }]}
          centerValue="1"
          centerLabel="Total Count"
          size={120}
          thickness={20}
          legend={[
            { label: 'Active', color: 'var(--mg-color-status-critical-fg)', value: 1 },
            { label: 'Closed', color: 'var(--mg-color-status-moving-fg)', value: 0 },
          ]}
        />
      </ChartCard>
      <ChartCard title="Active DTC State">
        <BarChart
          data={[
            { label: 'Occurred', value: 0 },
            { label: 'Recurred', value: 1, color: 'var(--mg-color-status-stopped-fg)' },
          ]}
          maxValue={1}
          height={180}
          width={240}
        />
      </ChartCard>
      <ChartCard title="Severity">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--mg-space-3)' }}>
          {[
            { label: 'Stop Now', value: 0, bg: 'var(--mg-color-status-critical-bg)', color: 'var(--mg-color-status-critical-fg)' },
            { label: 'Visit Soon', value: 0, bg: 'var(--mg-color-status-stopped-bg)', color: 'var(--mg-color-status-stopped-fg)' },
            { label: 'DIY', value: 1, bg: 'var(--mg-color-status-diy-bg)', color: 'var(--mg-color-status-diy-fg)', border: true },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: item.bg,
                color: item.color,
                border: item.border ? `2px solid ${item.color}` : '1px solid var(--mg-color-border-default)',
                borderRadius: 'var(--mg-radius-md)',
                padding: 'var(--mg-space-4)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 28, fontWeight: 700 }}>{item.value}</div>
              <div style={{ fontSize: 12, marginTop: 4 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </ChartCard>
    </div>
  ),
};
