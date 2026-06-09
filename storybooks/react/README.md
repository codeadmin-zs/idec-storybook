# @mygarage/storybook-react

Storybook 8 for `@mygarage/react` — 29 components, token docs, a11y checks.

## Prerequisites

The `@mygarage/react` and `@mygarage/design-tokens` packages must be built first:

```bash
# From design-system root
cd packages/tokens && npm install && npm run build && cd ../..
cd packages/react  && npm install && npm run build && cd ../..
```

## Run

```bash
cd storybooks/react
npm install
npm run storybook        # dev server on :6006
npm run build-storybook  # static build → storybook-static/
```

## Contents

- **29 story files** covering every component variant, state, and interactive example
- **3 token doc pages** — Colors, Spacing & Radius, Typography
- **a11y addon** — WCAG checks on every story
- **Controls** — all props are wired to Storybook's Controls panel via `argTypes`
- **Autodocs** — every component tagged `autodocs` gets a generated API reference page
