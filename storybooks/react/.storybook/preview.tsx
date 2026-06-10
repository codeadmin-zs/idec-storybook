import type { Preview } from '@storybook/react';
import React from 'react';
import '@mygarage/design-tokens/css';
import '@mygarage/react/styles.css';

const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Flex:opsz,wght@8..144,400;8..144,500&family=Roboto:wght@400;500;600;700&display=swap';
document.head.appendChild(fontLink);

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
