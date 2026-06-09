import React from 'react';
import {
  DataTable,
  IconButton,
  StatusBadge,
  TableLink,
  type DataTableColumn,
} from '@mygarage/react';

const LocateIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M7 1.5a4 4 0 014 4c0 3-4 7.5-4 7.5S3 8.5 3 5.5a4 4 0 014-4z" />
    <circle cx="7" cy="5.5" r="1.25" fill="currentColor" stroke="none" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M8 2v8M5 7l3 3 3-3M3 13h10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const statusLabel: Record<string, string> = {
  moving: 'Moving',
  idle: 'Idle',
  stopped: 'Stopped',
  notReachable: 'Not Reachable',
  recurred: 'Recurred',
};

export type TrackerRow = {
  id: string;
  segment: string;
  chassis: string;
  mode: string;
  fuelType: string;
  str: string;
  dtcCases: string;
  ruleCases: string;
  alerts: string;
  state: 'moving' | 'idle' | 'stopped' | 'notReachable';
};

export const trackerColumns: DataTableColumn<TrackerRow>[] = [
  { key: 'segment', header: 'Segment' },
  { key: 'chassis', header: 'Chassis Number', render: (row) => <TableLink>{row.chassis}</TableLink> },
  { key: 'mode', header: 'Mode' },
  { key: 'fuelType', header: 'Fuel Type' },
  { key: 'str', header: 'STR' },
  { key: 'dtcCases', header: 'Active DTC Cases' },
  { key: 'ruleCases', header: 'Rule Cases' },
  {
    key: 'alerts',
    header: 'Active Alerts',
    render: (row) =>
      row.alerts === '---' ? <span className="mg-table__muted">---</span> : <TableLink>{row.alerts}</TableLink>,
  },
  {
    key: 'state',
    header: 'State',
    render: (row) => <StatusBadge tone={row.state}>{statusLabel[row.state]}</StatusBadge>,
  },
  {
    key: 'locate',
    header: 'Locate Vehicle',
    align: 'center',
    render: () => (
      <button type="button" className="mg-table__locate" aria-label="Locate vehicle">
        <LocateIcon />
      </button>
    ),
  },
];

export const trackerRows: TrackerRow[] = [
  {
    id: '1',
    segment: 'HB',
    chassis: 'GC2BBMRC0PG099...',
    mode: 'Inhouse',
    fuelType: 'Petrol',
    str: '3653',
    dtcCases: '---',
    ruleCases: '---',
    alerts: '45',
    state: 'moving',
  },
  {
    id: '2',
    segment: 'Sedan',
    chassis: 'GC2BUFRC0RE114693',
    mode: 'Seeding',
    fuelType: 'Petrol',
    str: '3652',
    dtcCases: '181',
    ruleCases: '---',
    alerts: '9',
    state: 'moving',
  },
  {
    id: '3',
    segment: 'SUV',
    chassis: 'AB2V7PRT0RH118142',
    mode: 'Inhouse',
    fuelType: 'Petrol',
    str: '3651',
    dtcCases: '---',
    ruleCases: '---',
    alerts: '3',
    state: 'moving',
  },
  {
    id: '4',
    segment: 'EV',
    chassis: 'AB2V7PRT0RH118134',
    mode: 'Seeding',
    fuelType: 'EV',
    str: '3650',
    dtcCases: '---',
    ruleCases: '---',
    alerts: '---',
    state: 'moving',
  },
];

export type CaseRow = {
  id: string;
  createdTime: string;
  caseId: string;
  dtc: string;
  ticketNumber: string;
  chassis: string;
  state: 'recurred';
};

export const caseColumns: DataTableColumn<CaseRow>[] = [
  { key: 'createdTime', header: 'Created Time' },
  { key: 'caseId', header: 'Case ID', render: (row) => <TableLink>{row.caseId}</TableLink> },
  { key: 'dtc', header: 'DTC', render: (row) => <TableLink>{row.dtc}</TableLink> },
  { key: 'ticketNumber', header: 'Ticket Number' },
  { key: 'chassis', header: 'Chassis Number', render: (row) => <TableLink>{row.chassis}</TableLink> },
  {
    key: 'state',
    header: 'State',
    render: (row) => <StatusBadge tone="stopped">{statusLabel[row.state]}</StatusBadge>,
  },
];

export const caseRows: CaseRow[] = [
  {
    id: '1',
    createdTime: 'Apr 3, 2026, 4:50:16 PM',
    caseId: 'Voc1707c1862f4f',
    dtc: 'P0B5E',
    ticketNumber: '---',
    chassis: 'GC2BUFRC0RE114693',
    state: 'recurred',
  },
  {
    id: '2',
    createdTime: 'Apr 3, 2026, 4:48:02 PM',
    caseId: 'Voc1707c1862f3a',
    dtc: 'P0B5E',
    ticketNumber: '---',
    chassis: 'GC2BBMRC0PG099210',
    state: 'recurred',
  },
  {
    id: '3',
    createdTime: 'Apr 3, 2026, 4:45:31 PM',
    caseId: 'Voc1707c1862f1c',
    dtc: 'P0B5E',
    ticketNumber: '---',
    chassis: 'AB2V7PRT0RH118131',
    state: 'recurred',
  },
];

export function TableDownloadButton() {
  return (
    <IconButton label="Download">
      <DownloadIcon />
    </IconButton>
  );
}

export function FleetTrackerTable() {
  return (
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
  );
}

export function FleetCaseTable() {
  return (
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
  );
}
