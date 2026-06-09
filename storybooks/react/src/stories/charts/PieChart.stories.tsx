import type { Meta, StoryObj } from '@storybook/react';
import { ChartCard, PieChart } from '@mygarage/react';

const meta: Meta<typeof PieChart> = {
  title: 'Charts/PieChart',
  component: PieChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded', backgrounds: { default: 'page' } },
};
export default meta;
type Story = StoryObj<typeof meta>;

/** Dashboard — Alert Status / Sedan (all critical) */
export const AlertStatus: Story = {
  render: () => (
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
        size={160}
      />
    </ChartCard>
  ),
};
