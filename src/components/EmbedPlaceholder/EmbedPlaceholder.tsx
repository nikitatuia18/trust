import { cn } from '../cn';
import './EmbedPlaceholder.css';

export type EmbedPlaceholderProps = {
  /** Figma-ось Size: default — min-height 400, compact — 285 */
  size?: 'default' | 'compact';
  /** Figma: title */
  title?: string;
  /** Figma: description */
  description?: string;
  className?: string;
};

/** Заглушка внешнего встраиваемого блока, например iframe (Figma 669:10, 760:6168). Высота растёт по содержимому. */
export function EmbedPlaceholder({ size = 'default', title = 'iframe', description = 'External component', className }: EmbedPlaceholderProps) {
  return (
    <div className={cn('at-embed-placeholder', className)} data-size={size}>
      <p className="at-embed-placeholder__title text-heading-h4">{title}</p>
      <p className="at-embed-placeholder__description text-body-sm">{description}</p>
    </div>
  );
}
