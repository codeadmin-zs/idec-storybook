# My Garage Design System — Token Spec

Extracted from the My Garage fleet-tracking UI (Tracker, Dashboard, Vehicles, Case, DTC,
Analytics, Settings screens). This spec is the single source of truth consumed by all four
framework packages.

## 1. Color

### Brand / surfaces
| Token | Value | Usage |
|---|---|---|
| `color.brand.navy900` | `#16223A` | App header / nav bar background |
| `color.brand.navy700` | `#22344F` | Header hover / secondary nav surfaces |
| `color.brand.primary` | `#2B4C7E` | Primary buttons, active tab underline, links-on-dark, "Submit" CTA |
| `color.brand.primaryHover` | `#1F3A63` | Primary button hover/active |
| `color.surface.page` | `#F2F4F7` | App canvas / page background |
| `color.surface.card` | `#FFFFFF` | Cards, tables, panels |
| `color.surface.subtle` | `#EAF1F8` | Table header rows, selected segment card, criteria header |
| `color.surface.tint` | `#EFE9F7` | Nested stat tiles (In-House / Seeding breakdown) |
| `color.border.default` | `#E1E6ED` | Card/table borders, dividers |
| `color.border.strong` | `#C7D0DC` | Input borders |

### Text
| Token | Value | Usage |
|---|---|---|
| `color.text.primary` | `#1A2233` | Headings, primary numbers |
| `color.text.secondary` | `#5B6472` | Body copy, labels |
| `color.text.muted` | `#9AA3B0` | Placeholder text, secondary metadata, "---" cells |
| `color.text.onDark` | `#FFFFFF` | Text on navy header / filled buttons |
| `color.text.link` | `#1C6FCF` | Chassis-number links, "Clear All", underlined values |

### Status palette (core of this system — badges, KPI tiles, chart legends, alerts)
| Token | fg | bg (12% tint) | Meaning |
|---|---|---|---|
| `color.status.moving` / `success` | `#3FA84B` | `#E3F4E5` | Moving, Closed, success |
| `color.status.idle` / `info` | `#2E8FE6` | `#E4F0FC` | Idle, informational |
| `color.status.stopped` / `warning` | `#F2A33D` | `#FCEEDB` | Stopped, WIP, "Visit Soon" |
| `color.status.notReachable` / `neutral` | `#9AA3B0` | `#EDEFF2` | Not Reachable, neutral |
| `color.status.critical` / `danger` | `#E5484D` | `#FBE2E3` | Active alerts, "Stop Now", recurred DTC |
| `color.status.diy` / `accentBlue` | `#5AA9E6` | `#E5F1FC` | "DIY" tier, minor alerts |

### Data-viz
| Token | Value |
|---|---|
| `color.chart.series1` | `#2E8FE6` |
| `color.chart.series2` | `#3FA84B` |
| `color.chart.series3` | `#F2A33D` |
| `color.chart.series4` | `#E5484D` |
| `color.chart.series5` | `#8B6FD6` |
| `color.chart.gridline` | `#E6EAF0` |

## 2. Typography

```
--font-family-base: "Inter", "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-family-mono: "Roboto Mono", "SFMono-Regular", Consolas, monospace;
```

| Token | Size / Line-height | Weight | Usage |
|---|---|---|---|
| `font.display` | 28px / 36px | 700 | KPI numbers ("63", "47") |
| `font.h1` | 22px / 28px | 700 | Page titles ("Tracker", "Dashboard") |
| `font.h2` | 17px / 24px | 600 | Card / section titles |
| `font.body` | 14px / 20px | 400 | Table cells, body copy |
| `font.bodyStrong` | 14px / 20px | 600 | Table header labels |
| `font.caption` | 12px / 16px | 400 | Timestamps, helper text, pill labels |
| `font.label` | 13px / 18px | 500 | Form labels, filter group headers |

## 3. Spacing scale (4px base)
`space.0=0, space.1=4, space.2=8, space.3=12, space.4=16, space.5=20, space.6=24, space.7=32, space.8=40, space.9=48, space.10=64`

## 4. Radii
| Token | Value | Usage |
|---|---|---|
| `radius.sm` | 4px | Inputs, small chips |
| `radius.md` | 8px | Cards, tables, modals |
| `radius.lg` | 12px | KPI tiles, dialogs |
| `radius.pill` | 999px | Status badges, tag pills, buttons |
| `radius.circle` | 50% | Avatars, locate-pin buttons, map clusters |

## 5. Elevation
| Token | Value | Usage |
|---|---|---|
| `shadow.xs` | `0 1px 2px rgba(16,24,40,0.06)` | Cards at rest |
| `shadow.sm` | `0 2px 8px rgba(16,24,40,0.08)` | Hover cards, dropdowns |
| `shadow.md` | `0 8px 24px rgba(16,24,40,0.12)` | Drawers, modals |
| `shadow.lg` | `0 16px 48px rgba(16,24,40,0.18)` | Export dialog, popovers |

## 6. Motion
| Token | Value |
|---|---|
| `motion.fast` | 120ms ease-out |
| `motion.base` | 200ms ease-in-out |
| `motion.slow` | 320ms ease-in-out (drawer slide-in, modal fade) |

## 7. Layout
| Token | Value | Usage |
|---|---|---|
| `layout.navHeight` | 56px | Top app bar |
| `layout.sidebarWidth` | 72px (rail) / 240px (expanded) | Side nav |
| `layout.maxContentWidth` | 1440px | Page container |
| `breakpoint.sm/md/lg/xl` | 640 / 1024 / 1280 / 1536px | Responsive grids |

## 8. Component inventory (drives packages/*)

1. **AppShell / NavBar** — dark top bar: logo, garage selector, refresh, live indicator, fullscreen + avatar
2. **SideNav** — icon rail, active state (Dashboard, Tracker, Analytics, Case, DTC, Events, Vehicles, Rules, Settings)
3. **KpiStatBar** — row of clickable summary tiles (All Vehicle / Moving / Idle / Stopped / Not Reachable), one selectable/filled
4. **StatusBadge / Pill** — colored pill for state + tag chips (EV, Seeding, Diesel)
5. **Card** — generic surface, optional title + action icons (edit/delete/expand)
6. **DataTable** — tinted header, link cells, badge cells, icon-button cell, pagination footer
7. **Tabs** — underline tab group
8. **FilterDrawer / CriteriaPanel** — right slide-over: search, checkbox groups, Clear All + Submit
9. **Modal / Dialog** — centered confirm dialog (Yes/No)
10. **DropdownMenu** — small anchored menu (export format choices)
11. **DonutChart / PieChart / LineChart / BarChart cards** — chart wrapper with title & legend
12. **MapShell** — map container + KPI overlay strip + status-colored cluster markers
13. **VehicleCard** — image, status pill, tag pills, mini stats, action icons, kebab menu
14. **TelemetryStatTile** — metric card with big value + history icon
15. **Pagination** — numbered pager, active circle, prev/next/first/last
16. **Toggle / Switch** — labeled on/off with description text
17. **Breadcrumbs** — secondary nav under page title
18. **DateRangePicker (display pill)** — bordered pill, calendar icon, date range text
19. **IconButton** — circular button (refresh, locate, download, expand)
20. **SegmentSummaryCard** — icon + count + 2 metrics, selectable
