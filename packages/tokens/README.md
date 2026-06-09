# @mygarage/design-tokens

Framework-agnostic design tokens for the **My Garage** design system — color, typography,
spacing, radii, shadow, motion and layout — generated from a single JSON source of truth
(`src/tokens.json`) into CSS custom properties, SCSS variables, and JS/TS modules.

Every other package in this system (`@mygarage/react`, `@mygarage/angular`,
`@mygarage/svelte`, `@mygarage/web-components`) consumes these tokens, so changing a
value here propagates everywhere after a rebuild.

## Install

```bash
npm install @mygarage/design-tokens
```

## Usage

### CSS custom properties (any framework / vanilla HTML)

```html
<link rel="stylesheet" href="node_modules/@mygarage/design-tokens/dist/css/variables.css" />
<style>
  .badge--moving {
    color: var(--mg-color-status-moving-fg);
    background: var(--mg-color-status-moving-bg);
    border-radius: var(--mg-radius-pill);
  }
</style>
```

or import in a bundler:

```js
import '@mygarage/design-tokens/css';
```

### SCSS

```scss
@use '@mygarage/design-tokens/scss' as tokens;

.badge--moving {
  color: tokens.$mg-color-status-moving-fg;
  background: tokens.$mg-color-status-moving-bg;
}
```

### JS / TS

```ts
import { tokens, cssVar } from '@mygarage/design-tokens';

tokens.color.status.moving.fg; // '#3FA84B'
cssVar['color.status.moving.fg']; // '--mg-color-status-moving-fg'
```

## Token categories

| Category | Examples |
|---|---|
| `color` | `color.brand.*`, `color.status.{moving,idle,stopped,notReachable,critical,diy}.{fg,bg}`, `color.surface.*`, `color.text.*`, `color.chart.*` |
| `font` | `font.family.*`, `font.size.*`, `font.lineHeight.*`, `font.weight.*` |
| `space` | `space.0` … `space.10` (4px base scale) |
| `radius` | `radius.{sm,md,lg,pill,circle}` |
| `shadow` | `shadow.{xs,sm,md,lg}` |
| `motion` | `motion.{fast,base,slow}` |
| `layout` | `layout.{navHeight,sidebarRail,sidebarExpanded,maxContentWidth}` |
| `breakpoint` | `breakpoint.{sm,md,lg,xl}` |

See [`docs/01-design-tokens-spec.md`](../../docs/01-design-tokens-spec.md) in the repo root
for the full annotated spec with usage rationale extracted from the source UI.

## Build

```bash
npm run build   # reads src/tokens.json -> writes dist/{css,scss,*.js,*.d.ts,tokens.json}
```

## Publishing

This package is fully publish-ready:

```bash
npm version <patch|minor|major>
npm publish --access public
```

`prepublishOnly` regenerates `dist/` from source automatically.
