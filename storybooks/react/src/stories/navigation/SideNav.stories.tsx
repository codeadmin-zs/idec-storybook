import type { Meta, StoryObj } from '@storybook/react';
import { SideNav } from '@mygarage/react';
import { fleetSideNavItems } from '../_shared/fleet';

const meta: Meta<typeof SideNav> = {
  title: 'Navigation/SideNav',
  component: SideNav,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen', backgrounds: { default: 'page' } },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Collapsed: Story = {
  render: () => (
    <div style={{ display: 'flex', minHeight: 480 }}>
      <SideNav items={fleetSideNavItems} activeKey="tracker" onSelect={() => {}} />
    </div>
  ),
};

export const Expanded: Story = {
  render: () => (
    <div style={{ display: 'flex', minHeight: 480 }}>
      <SideNav items={fleetSideNavItems} activeKey="vehicles" expanded onSelect={() => {}} />
    </div>
  ),
};

export const DarkVariant: Story = {
  render: () => (
    <div style={{ display: 'flex', minHeight: 480 }}>
      <SideNav items={fleetSideNavItems} activeKey="settings" variant="dark" onSelect={() => {}} />
    </div>
  ),
};
