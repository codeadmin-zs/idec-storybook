import type { Preview } from '@storybook/react';
import React from 'react';
import '@mygarage/react/styles.css';
import '@mygarage/design-tokens/css';

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    backgrounds: {
      default: 'page',
      values: [
        { name: 'page', value: '#F2F4F7' },
        { name: 'card', value: '#FFFFFF' },
        { name: 'navy', value: '#16223A' },
      ],
    },
    layout: 'padded',
    docs: {
      toc: true,
    },
    a11y: {
      config: { rules: [{ id: 'color-contrast', reviewOnFail: true }] },
    },
  },
  decorators: [
    (Story) => (
      <div className="mg-root" style={{ fontFamily: 'var(--mg-font-family-base, system-ui, sans-serif)' }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
