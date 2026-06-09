import React, { type HTMLAttributes, type ReactNode } from 'react';

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode;
  /** Action icons/buttons rendered top-right (edit, delete, expand…) */
  actions?: ReactNode;
  children?: ReactNode;
}

/** Generic surface used throughout (KPI panels, chart cards, table wrappers, settings sections) */
export function Card({ title, actions, children, className = '', ...rest }: CardProps) {
  return (
    <div className={`mg-card ${className}`.trim()} {...rest}>
      {(title || actions) && (
        <div className="mg-card__header">
          {title ? <h3 className="mg-card__title">{title}</h3> : <span />}
          {actions ? <div className="mg-card__actions">{actions}</div> : null}
        </div>
      )}
      {children}
    </div>
  );
}
