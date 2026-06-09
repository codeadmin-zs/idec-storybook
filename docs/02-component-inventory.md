# My Garage Design System — Component Inventory

29 components, grouped by category. Every component is implemented identically (same
props/events semantics, same `mg-*` class names and DOM shape, same design tokens) across
all four framework packages — only the binding syntax differs:

| Concept | React | Angular | Svelte | Web Components |
|---|---|---|---|---|
| Primitive prop | `prop={value}` | `[prop]="value"` / attribute | `export let prop` | HTML attribute (kebab-case), reflected getter/setter |
| Complex prop (array/object) | `prop={value}` | `[prop]="value"` | `export let prop` | JS property only (`el.items = [...]`) |
| Callback / event | `onAction={fn}` | `(action)="fn($event)"` | `on:action={fn}` | `addEventListener('action', e => ...)` — `CustomEvent<T>` |
| Content projection | `children` / named props | `<ng-content select>` | `<slot>` | named `<slot>` |

---

## 1. Primitives & form controls

| Component | Tag / name | Summary | Key API |
|---|---|---|---|
| **Button** | `Button` / `mg-button` | Primary action button | `variant` (primary\|secondary\|ghost), `size` (sm\|md\|lg), `disabled`; icon slot |
| **IconButton** | `IconButton` / `mg-icon-button` | Icon-only button with a11y label | `label`, `size` (sm\|md), `onDark`, `disabled` |
| **StatusBadge** | `StatusBadge` / `mg-status-badge` | Colored status pill (uses status palette) | `tone` (moving\|idle\|stopped\|notReachable\|critical\|diy\|...), `dot` |
| **Tag** | `Tag` / `mg-tag` | Minimal labeled chip | content only |
| **Toggle** | `Toggle` / `mg-toggle` | Standalone on/off switch | `label`, `checked`, `disabled`; emits `change: boolean` |
| **SettingsToggleRow** | `SettingsToggleRow` / `mg-settings-toggle-row` | Labeled row with description + toggle (Settings screens) | `title`, `description`, `checked`, `disabled`; emits `change: boolean` |
| **SearchInput** | `SearchInput` / `mg-search-input` | Search field with clear button | `placeholder`, `disabled`, `value`; emits `input: string`, `clear` |

## 2. Navigation

| Component | Tag / name | Summary | Key API |
|---|---|---|---|
| **NavBar** | `NavBar` / `mg-nav-bar` | Top app bar (garage selector, live indicator, refresh, avatar) | `onRefresh`/`refresh` event; slots: logo, garageSelector, liveIndicator, timestamp, refreshIcon, avatar |
| **SideNav** | `SideNav` / `mg-side-nav` | Icon-rail side navigation, collapsible | `items: SideNavItem[]`, `activeKey`, `expanded`; emits `select: string`; per-item icon slots, footer slot |
| **AppShell** | `AppShell` / `mg-app-shell` | Page layout wrapper (nav bar + side nav + main content) | layout-only; slots: navBar, sideNav, default |
| **Breadcrumbs** | `Breadcrumbs` / `mg-breadcrumbs` | Breadcrumb trail | `items: BreadcrumbItem[]`; emits `select` for items without `href` |
| **Tabs** | `Tabs` / `mg-tabs` | Tab strip with optional counts | `items: TabItem[]`, `activeKey`; emits `select: string` |
| **DropdownMenu** | `DropdownMenu` / `mg-dropdown-menu` | Trigger + positioned menu, closes on outside click | `items: DropdownMenuItem[]`, `align` (left\|right); emits `select: DropdownMenuItem`; trigger slot |
| **DateRangePill** | `DateRangePill` / `mg-date-range-pill` | Clickable date-range filter chip | `label`; icon slot; emits `click` |
| **Pagination** | `Pagination` / `mg-pagination` | Windowed page-number control with ellipsis | `page`, `pageCount`; emits `change: number` |

## 3. Surfaces & layout

| Component | Tag / name | Summary | Key API |
|---|---|---|---|
| **Card** | `Card` / `mg-card` | General-purpose content surface | `padding` (none\|sm\|md\|lg), `interactive`; header + default slots |
| **Modal** | `Modal` / `mg-modal` | Dialog overlay with Escape-to-close | `open`, `title`; emits `close`; default + footer slots |
| **FilterDrawer** | `FilterDrawer` / `mg-filter-drawer` | Slide-out filter panel with grouped, searchable options | `groups: FilterGroup[]`, `open`, `title`, `searchPlaceholder`, `searchValue`, `showClearAll`, `showSubmit`; emits `close`, `searchChange`, `toggleOption`, `clearAll`, `submit` |

## 4. Data display

| Component | Tag / name | Summary | Key API |
|---|---|---|---|
| **DataTable** | `DataTable` / `mg-data-table` | Sortable/paginated data table | `columns: DataTableColumn[]`, `rows`, `rowKey`, `pagination`, `emptyState`; emits `pageChange: number`; footerActions slot |
| **KpiStatBar** | `KpiStatBar` / `mg-kpi-stat-bar` | Row of selectable KPI tiles | `tiles: KpiTile[]`, `selectedKey`; emits `select: string` |
| **TelemetryStatTile** | `TelemetryStatTile` / `mg-telemetry-stat-tile` | Single metric tile (value + unit + icon/hint) | `label`, `value`, `unit`; icon + hint slots |
| **SegmentSummaryCard** | `SegmentSummaryCard` / `mg-segment-summary-card` | Selectable summary card with metric list | `title`, `count`, `metrics: SegmentMetric[]`, `selected`, `clickable`; emits `click`; icon slot |
| **VehicleCard** | `VehicleCard` / `mg-vehicle-card` | Fleet vehicle summary card (status, stats, actions) | `name`, `subtitle`, `status`, `tags`, `stats`, `actions`, `clickable`; emits `click`, `action`; image/menu/per-action slots |

## 5. Charts & maps

| Component | Tag / name | Summary | Key API |
|---|---|---|---|
| **ChartCard** | `ChartCard` / `mg-chart-card` | Card wrapper for charts with title + legend | `title`, `legend: LegendEntry[]`; actions + default slots |
| **DonutChart** | `DonutChart` / `mg-donut-chart` | SVG donut/ring chart with center label | `segments: DonutSegment[]`, `size`, `thickness`, `centerLabel`, `centerValue` |
| **PieChart** | `PieChart` / `mg-pie-chart` | Pie chart (thin wrapper over DonutChart) | `segments: DonutSegment[]`, `size` |
| **BarChart** | `BarChart` / `mg-bar-chart` | Simple SVG bar chart | `data: BarDatum[]`, `height`, `color` |
| **LineChart** | `LineChart` / `mg-line-chart` | SVG line/area chart with optional grid | `series: LineSeries[]`, `width`, `height`, `showGrid` |
| **MapShell** | `MapShell` / `mg-map-shell` | Map container with cluster markers | `markers: MapClusterMarker[]`, `height`; emits `markerClick: MapClusterMarker`; background + overlay slots |

---

## Notes on shared conventions

- **Status palette** (`StatusBadge`, `KpiStatBar` tones, chart colors) maps directly to
  the seven status tokens in the design-tokens spec: `moving`/`success`,
  `idle`/`info`, `stopped`/`warning`, `notReachable`/`neutral`, `critical`/`danger`,
  `diy`/`accentBlue`, plus the brand palette for primary actions.
- **Events vs. callbacks**: React uses callback props (`onSelect`), Angular uses
  `@Output` EventEmitters bound with `(select)`, Svelte uses `createEventDispatcher` /
  `on:select`, and Web Components dispatch bubbling, composed `CustomEvent`s — all four
  carry the same `detail`/payload shape, documented per-component in each package's
  TypeScript types.
- **Theming**: every visual property resolves to a `--mg-*` CSS custom property from
  `@mygarage/design-tokens`. Overriding those variables (globally or scoped to a
  container) re-themes every component in every framework without touching component
  code — see `docs/01-design-tokens-spec.md`.
