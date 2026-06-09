import React, { type ReactNode } from 'react';

export interface FilterOption {
  key: string;
  label: string;
  checked: boolean;
}

export interface FilterGroup {
  key: string;
  title: string;
  options: FilterOption[];
}

export interface FilterDrawerProps {
  open: boolean;
  title?: string;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  groups: FilterGroup[];
  onToggleOption: (groupKey: string, optionKey: string, checked: boolean) => void;
  onClearAll?: () => void;
  onSubmit?: () => void;
  onClose: () => void;
  searchIcon?: ReactNode;
}

/**
 * Right slide-over "Criteria" panel from the Tracker filter flow: search box, grouped
 * checkboxes (Segment / Type / Operational Status / Fuel Type / Alerts), Clear All + Submit.
 */
export function FilterDrawer({
  open,
  title = 'Criteria',
  searchPlaceholder = 'Search',
  searchValue,
  onSearchChange,
  groups,
  onToggleOption,
  onClearAll,
  onSubmit,
  onClose,
  searchIcon,
}: FilterDrawerProps) {
  if (!open) return null;
  return (
    <>
      <div className="mg-drawer-overlay" onClick={onClose} />
      <aside className="mg-drawer" role="dialog" aria-label={title} aria-modal="true">
        <div className="mg-drawer__header">
          <h2 className="mg-drawer__title">{title}</h2>
          <button type="button" className="mg-drawer__close" onClick={onClose} aria-label="Close filters">×</button>
        </div>
        <div className="mg-drawer__body">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--mg-space-3)', marginBottom: 'var(--mg-space-5)' }}>
            <label className="mg-search" style={{ flex: 1 }}>
              {searchIcon}
              <input
                type="search"
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
              />
            </label>
            {onClearAll && (
              <button type="button" className="mg-btn mg-btn--ghost mg-btn--sm" onClick={onClearAll}>
                Clear All
              </button>
            )}
          </div>

          {groups.map((group) => (
            <div className="mg-drawer__group" key={group.key}>
              <h3 className="mg-drawer__group-title">{group.title}</h3>
              <div className="mg-drawer__options">
                {group.options.map((opt) => (
                  <label key={opt.key} className="mg-drawer__option">
                    <input
                      type="checkbox"
                      checked={opt.checked}
                      onChange={(e) => onToggleOption(group.key, opt.key, e.target.checked)}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        {onSubmit && (
          <div className="mg-drawer__footer">
            <button type="button" className="mg-btn mg-btn--primary" style={{ width: '100%' }} onClick={onSubmit}>
              Submit
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
