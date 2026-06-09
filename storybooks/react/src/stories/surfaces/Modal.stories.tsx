import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Modal, Button } from '@mygarage/react';

const meta: Meta<typeof Modal> = {
  title: 'Surfaces/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: { open: { control: 'boolean' }, title: { control: 'text' } },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    title: 'Confirm Action',
    onClose: () => {},
    children: <p style={{ margin: 0, color: '#5B6472' }}>Are you sure you want to archive this vehicle? This action cannot be undone.</p>,
    footer: (
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Confirm</Button>
      </div>
    ),
  },
};
export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal open={open} title="Edit Vehicle" onClose={() => setOpen(false)}
          footer={<div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}><Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button><Button variant="primary" onClick={() => setOpen(false)}>Save</Button></div>}>
          <p style={{ margin: 0, color: '#5B6472' }}>Edit vehicle details here.</p>
        </Modal>
      </>
    );
  },
};
