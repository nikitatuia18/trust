import type { ReactNode } from 'react';
import { cn } from '../cn';
import './TextContainer.css';

export type TextContainerProps = {
  /** Figma-ось Alignment */
  align?: 'left' | 'center' | 'right';
  /** Figma-ось Size */
  size?: 'default' | 'large' | 'xlarge' | '2xlarge';
  /** Figma: title / show-title (скрыто, если не передано) */
  title?: ReactNode;
  subtitle?: ReactNode;
  description?: ReactNode;
  caption?: ReactNode;
  className?: string;
};

const TITLE = { default: 'text-label-md', large: 'text-heading-h4', xlarge: 'text-heading-h2', '2xlarge': 'text-heading-h1' } as const;
const SUBTITLE = { default: 'text-label-sm', large: 'text-body-sm', xlarge: 'text-body-sm', '2xlarge': 'text-body-md' } as const;

export function TextContainer({ align = 'left', size = 'default', title, subtitle, description, caption, className }: TextContainerProps) {
  return (
    <div className={cn('at-text', className)} data-align={align} data-size={size}>
      {(title || subtitle) && (
        <div className="at-text__row">
          {title && <span className={cn('at-text__title', TITLE[size])}>{title}</span>}
          {subtitle && <span className={cn('at-text__subtitle', SUBTITLE[size])}>{subtitle}</span>}
        </div>
      )}
      {description && <span className="at-text__description text-body-xs">{description}</span>}
      {caption && <span className="at-text__caption text-caption-default">{caption}</span>}
    </div>
  );
}
