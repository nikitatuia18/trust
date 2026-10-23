import type { ReactNode } from 'react';
import { cn } from '../cn';
import { Divider } from '../Divider/Divider';
import './FormCard.css';

export type FormCardProps = {
  /** Figma-ось Actions: кнопки друг под другом или в ряд */
  actions?: 'stacked' | 'inline';
  /** Figma: slot header (show-header — виден, когда передан) */
  header?: ReactNode;
  /** Figma: slot body (show-body) */
  children?: ReactNode;
  /** Figma: primary-action */
  primaryAction?: ReactNode;
  /** Figma: secondary-action (show-secondary-action) */
  secondaryAction?: ReactNode;
  /** Figma: alt-actions (show-alt-action) */
  altActions?: ReactNode;
  /** Figma: подпись divider между основными и альтернативными действиями (show-divider) */
  dividerLabel?: ReactNode;
  className?: string;
};

export function FormCard({
  actions = 'stacked',
  header,
  children,
  primaryAction,
  secondaryAction,
  altActions,
  dividerLabel,
  className,
}: FormCardProps) {
  const showFooter = primaryAction || secondaryAction || altActions;
  return (
    <section className={cn('at-form-card', className)} data-actions={actions}>
      {header && <div className="at-form-card__zone">{header}</div>}
      {children && <div className="at-form-card__zone at-form-card__body">{children}</div>}
      {showFooter && (
        <footer className="at-form-card__zone at-form-card__footer">
          {(primaryAction || secondaryAction) && (
            <div className="at-form-card__actions">
              {primaryAction}
              {secondaryAction}
            </div>
          )}
          {altActions && dividerLabel && <Divider label={dividerLabel} />}
          {altActions && <div className="at-form-card__actions">{altActions}</div>}
        </footer>
      )}
    </section>
  );
}
