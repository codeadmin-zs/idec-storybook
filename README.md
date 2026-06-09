# idec-storybook

Storybook 8 for the **My Garage** fleet management design system — React components, design tokens, and fleet-themed stories matching the production UI (Tracker, Dashboard, Vehicles, Case, DTC, Analytics).

## What's included

| Path | Description |
|---|---|
| `packages/tokens` | `@mygarage/design-tokens` — CSS variables, SCSS, JSON |
| `packages/react` | `@mygarage/react` — 29 React components + `styles.css` |
| `storybooks/react` | Storybook app — component stories, token docs, a11y addon |
| `docs/` | Design token spec and component inventory |

## Prerequisites

- Node.js 18+
- npm 9+

## Setup

```bash
# Install all workspace dependencies
npm install

# Build tokens and React package (required before Storybook)
npm run build:tokens
npm run build:react
```

## Run Storybook

```bash
npm run storybook
# → http://localhost:6006
```

## Build static Storybook

```bash
npm run build
# Output: storybooks/react/storybook-static/
```

## Key stories

- **Navigation → TopNavBar → Fleet Header** — dark MY GARAGE top nav
- **Navigation → AppShell → Tracker Summary** — full fleet page layout
- **Data Display → DataTable → Tracker Vehicles** — production-style table
- **Charts → ChartCard → Dashboard Charts** — DTC donut + Alert pie

## License

UNLICENSED — internal My Garage platform asset.
