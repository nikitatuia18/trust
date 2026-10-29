import type { ReactNode } from 'react';
import { cn } from '../cn';
import './StatTile.css';

export type StatTileProps = {
  /** Иконка над значением (Glyph из Icon, цвет — currentColor) */
  icon?: ReactNode;
  /** Главное число или текст: «0 USDT» */
  value: ReactNode;
  /** Подпись под значением */
  label: ReactNode;
  className?: string;
};

/** Плитка показателя: иконка, крупное значение и подпись, по центру. Плитки в ряду делят ширину поровну. */
export function StatTile({ icon, value, label, className }: StatTileProps) {
  return (
    <div className={cn('at-stat-tile', className)}>
      {icon && <span className="at-stat-tile__icon" aria-hidden="true">{icon}</span>}
      <div className="at-stat-tile__text">
        <span className="at-stat-tile__value text-heading-h4">{value}</span>
        <span className="at-stat-tile__label text-caption-default">{label}</span>
      </div>
    </div>
  );
}
