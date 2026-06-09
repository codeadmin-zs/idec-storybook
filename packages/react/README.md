# @mygarage/react

React component library for the **My Garage** fleet-tracking platform. Ships ESM + CJS
builds, full TypeScript types, and a single consolidated stylesheet built on
[`@mygarage/design-tokens`](../tokens).

## Install

```bash
npm install @mygarage/react @mygarage/design-tokens react react-dom
```

## Setup

Import the stylesheet once at your application root (it pulls in the `--mg-*` CSS
custom properties from the tokens package, plus all `.mg-*` component classes):

```tsx
import '@mygarage/design-tokens/css';
import '@mygarage/react/styles.css';
```

## Usage

```tsx
import {
  AppShell, NavBar, SideNav,
  KpiStatBar, StatusBadge, Card, DataTable, Tabs, Pagination,
  Modal, FilterDrawer, DropdownMenu,
  ChartCard, DonutChart, LineChart, BarChart,
  MapShell, VehicleCard, TelemetryStatTile, SegmentSummaryCard,
  Button, Toggle, Breadcrumbs,
} from '@mygarage/react';

function FleetOverview() {
  return (
    <KpiStatBar
      selectedKey="moving"
      tiles={[
        { key: 'moving', label: 'Moving', value: 128, tone: 'moving' },
        { key: 'idle', label: 'Idle', value: 42, tone: 'idle' },
        { key: 'stopped', label: 'Stopped', value: 17, tone: 'stopped' },
        { key: 'notReachable', label: 'Not Reachable', value: 3, tone: 'notReachable' },
      ]}
      onSelect={(key) => console.log('selected', key)}
    />
  );
}
```

## Component inventory

| Category | Components |
| --- | --- |
| Layout | `AppShell`, `NavBar`, `SideNav` |
| Status & feedback | `StatusBadge`, `Tag`, `Badge` tones (moving/idle/stopped/notReachable/critical/diy) |
| Surfaces | `Card`, `Modal`, `FilterDrawer`, `DropdownMenu` |
| Navigation | `Tabs`, `Pagination`, `Breadcrumbs` |
| Data | `DataTable`, `KpiStatBar`, `TelemetryStatTile`, `SegmentSummaryCard` |
| Charts | `ChartCard`, `DonutChart`, `PieChart`, `BarChart`, `LineChart` |
| Maps & fleet | `MapShell`, `VehicleCard` |
| Forms & inputs | `Button`, `IconButton`, `Toggle`, `SettingsToggleRow`, `SearchInput`, `DateRangePill` |

Every component is fully typed — see the generated `.d.ts` files for prop
references, or hover in your editor for inline docs.

## Theming

All visual values come from CSS custom properties (`--mg-color-*`, `--mg-space-*`,
`--mg-radius-*`, …) emitted by `@mygarage/design-tokens`. Override any token at the
`:root` (or a scoped container) to re-theme the library without touching component
code:

```css
:root {
  --mg-color-brand-primary: #2b4c7e;
  --mg-color-status-moving-fg: #3fa84b;
}
```

## Development

```bash
npm install
npm run dev       # tsup --watch
npm run build     # ESM + CJS + .d.ts to dist/
npm run typecheck # tsc --noEmit
```

## Publishing

```bash
npm run build
npm publish --access public
```
