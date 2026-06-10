import React, { type ReactNode } from 'react';
import type { StatusTone } from './primitives';

export interface ProductProfileLabel {
  key: string;
  label: string;
  /** `neutral` renders grey chip (e.g. "Not Reachable") */
  tone?: 'default' | 'neutral';
}

export interface ProductProfileMetric {
  key: string;
  label: string;
  value: ReactNode;
}

export interface ProductProfileSideAction {
  key: string;
  icon: ReactNode;
  label: string;
  /** Top rail button is the primary CTA; others are informational */
  variant: 'cta' | 'info';
  onClick?: () => void;
}

export interface ProductProfileCardProps {
  /** Chassis / product identifier shown in the header */
  productId: string;
  title: string;
  /** Small status dot beside the product id */
  status?: { tone: StatusTone };
  /** Property chips rendered above the image */
  labels?: ProductProfileLabel[];
  image?: ReactNode;
  /**
   * Vertical action rail on the right — first item should be the CTA,
   * followed by informational icon buttons.
   */
  sideActions?: ProductProfileSideAction[];
  /** Inner stat tiles at the bottom */
  metrics?: ProductProfileMetric[];
  className?: string;
}

const STATUS_DOT_CLASS: Record<StatusTone, string> = {
  moving: 'mg-product-profile-card__status-dot--moving',
  success: 'mg-product-profile-card__status-dot--moving',
  idle: 'mg-product-profile-card__status-dot--idle',
  info: 'mg-product-profile-card__status-dot--idle',
  stopped: 'mg-product-profile-card__status-dot--stopped',
  warning: 'mg-product-profile-card__status-dot--stopped',
  notReachable: 'mg-product-profile-card__status-dot--neutral',
  neutral: 'mg-product-profile-card__status-dot--neutral',
  critical: 'mg-product-profile-card__status-dot--critical',
  danger: 'mg-product-profile-card__status-dot--critical',
  diy: 'mg-product-profile-card__status-dot--idle',
};

/** Product profile card — id header, property labels, image + side action rail, metric tiles */
export function ProductProfileCard({
  productId,
  title,
  status,
  labels,
  image,
  sideActions,
  metrics,
  className = '',
}: ProductProfileCardProps) {
  return (
    <article className={`mg-product-profile-card ${className}`.trim()}>
      <div className="mg-product-profile-card__body">
        <div className="mg-product-profile-card__content">
          <header className="mg-product-profile-card__header">
            <div className="mg-product-profile-card__id-row">
              {status && (
                <span
                  className={`mg-product-profile-card__status-dot ${STATUS_DOT_CLASS[status.tone]}`}
                  aria-hidden="true"
                />
              )}
              <span className="mg-product-profile-card__id">{productId}</span>
            </div>
          </header>

          <h3 className="mg-product-profile-card__title">{title}</h3>

          {labels && labels.length > 0 && (
            <div className="mg-product-profile-card__labels">
              {labels.map((item) => (
                <span
                  key={item.key}
                  className={`mg-product-profile-card__label${item.tone === 'neutral' ? ' mg-product-profile-card__label--neutral' : ''}`}
                >
                  {item.label}
                </span>
              ))}
            </div>
          )}

          {image && <div className="mg-product-profile-card__media">{image}</div>}
        </div>

        {sideActions && sideActions.length > 0 && (
          <aside className="mg-product-profile-card__rail" aria-label="Product actions">
            {sideActions.map((action) => (
              <button
                key={action.key}
                type="button"
                className={`mg-product-profile-card__rail-btn mg-product-profile-card__rail-btn--${action.variant}`}
                aria-label={action.label}
                title={action.label}
                onClick={action.onClick}
              >
                {action.icon}
              </button>
            ))}
          </aside>
        )}
      </div>

      {metrics && metrics.length > 0 && (
        <div className="mg-product-profile-card__metrics">
          {metrics.map((metric) => (
            <div key={metric.key} className="mg-product-profile-card__metric">
              <span className="mg-product-profile-card__metric-value">{metric.value}</span>
              <span className="mg-product-profile-card__metric-label">{metric.label}</span>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
