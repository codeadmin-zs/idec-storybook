import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from '@mygarage/react';
import {
  FleetCaseTable,
  FleetTrackerTable,
  caseColumns,
  caseRows,
  trackerColumns,
  trackerRows,
  TableDownloadButton,
} from '../_shared/fleet-tables';

const meta: Meta<typeof DataTable> = {
  title: 'Data Display/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  parameters: { layout: 'padded', backgrounds: { default: 'page' } },
};
export default meta;
type Story = StoryObj<typeof meta>;

/** Tracker / Vehicles list — 10 columns, download button, compact pagination */
export const TrackerVehicles: Story = {
  render: () => <FleetTrackerTable />,
};

/** Case / DTC list — Show Records toolbar, link cells, Recurred badges */
export const CaseList: Story = {
  render: () => <FleetCaseTable />,
};

export const TrackerVehiclesRaw: Story = {
  render: () => (
    <DataTable
      columns={trackerColumns}
      rows={trackerRows}
      rowKey="id"
      footerActions={<TableDownloadButton />}
      pagination={{
        page: 1,
        pageCount: 5,
        totalItems: 47,
        pageSize: 10,
        variant: 'compact',
        onPageChange: () => {},
        onPageSizeChange: () => {},
      }}
    />
  ),
};

export const CaseListRaw: Story = {
  render: () => (
    <DataTable
      columns={caseColumns}
      rows={caseRows}
      rowKey="caseId"
      showRecords
      footerActions={<TableDownloadButton />}
      pagination={{
        page: 1,
        pageCount: 19,
        totalItems: 181,
        pageSize: 10,
        variant: 'compact',
        onPageChange: () => {},
        onPageSizeChange: () => {},
      }}
    />
  ),
};

export const Empty: Story = {
  render: () => (
    <DataTable
      columns={trackerColumns}
      rows={[]}
      rowKey="id"
      emptyState="No vehicles found matching your filters."
    />
  ),
};
