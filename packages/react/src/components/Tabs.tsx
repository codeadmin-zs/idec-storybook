import React, { type ReactNode } from 'react';

export interface TabItem {
  key: string;
  label: ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  activeKey: string;
  onChange: (key: string) => void;
  className?: string;
}

/** Underline tab group, e.g. "Map View / Summary" or "Attributes Trends / Telemetry Trails / …" */
export function Tabs({ items, activeKey, onChange, className = '' }: TabsProps) {
  return (
    <div className={`mg-tabs ${className}`.trim()} role="tablist">
      {items.map((item) => (
        <button
          key={item.key}
          type="button"
          role="tab"
          aria-selected={item.key === activeKey}
          className="mg-tab"
          onClick={() => onChange(item.key)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
