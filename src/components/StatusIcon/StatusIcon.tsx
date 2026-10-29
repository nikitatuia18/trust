import { cn } from '../cn';
import { CloseCircleIcon, TickCircleIcon } from '../Icon/Glyphs';
import './StatusIcon.css';

export type StatusIconProps = {
  /** Figma-ось Type */
  type: 'success' | 'failed';
  /** Подпись для скринридера; по умолчанию Success / Failed */
  label?: string;
  className?: string;
};

/** Итог операции (Figma 692:5460): halo 64 + круг-глиф 48 с галочкой или крестом. */
export function StatusIcon({ type, label, className }: StatusIconProps) {
  const Glyph = type === 'success' ? TickCircleIcon : CloseCircleIcon;
  return (
    <span className={cn('at-status-icon', className)} data-type={type} role="img" aria-label={label ?? (type === 'success' ? 'Success' : 'Failed')}>
      <Glyph />
    </span>
  );
}
