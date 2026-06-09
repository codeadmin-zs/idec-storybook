import React, { type ReactNode, useEffect } from 'react';

export interface ModalProps {
  open: boolean;
  title?: ReactNode;
  children?: ReactNode;
  onClose: () => void;
  /** Footer actions, e.g. <Button variant="secondary">No</Button><Button>Yes</Button> */
  footer?: ReactNode;
  className?: string;
}

/** Centered confirmation/info dialog, e.g. the "Export — Are you sure you want to download excel?" prompt */
export function Modal({ open, title, children, onClose, footer, className = '' }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="mg-modal-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={`mg-modal ${className}`.trim()} role="dialog" aria-modal="true" aria-label={typeof title === 'string' ? title : 'Dialog'}>
        <div className="mg-modal__header">
          {title ? <h2 className="mg-modal__title">{title}</h2> : <span />}
          <button type="button" className="mg-modal__close" onClick={onClose} aria-label="Close dialog">×</button>
        </div>
        {children ? <div className="mg-modal__body">{children}</div> : null}
        {footer ? <div className="mg-modal__footer">{footer}</div> : null}
      </div>
    </div>
  );
}
