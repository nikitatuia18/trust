import type { ReactNode } from 'react';
import { cn } from '../cn';
import './IconCircle.css';

export type IconCircleProps = {
  /** Иконка внутри (Glyph из Icon, цвет — currentColor) */
  children: ReactNode;
  /** subtle — светлый круг с брендовой иконкой; brand — залитый круг с белой иконкой (выбранный пункт) */
  tone?: 'subtle' | 'brand';
  className?: string;
};

/** Круг с иконкой для строк списков (пункты меню, строка со ссылкой). Размер — Size/xl, иконка — Size/icon/md. */
export function IconCircle({ children, tone = 'subtle', className }: IconCircleProps) {
  return (
    <span className={cn('at-icon-circle', className)} data-tone={tone} aria-hidden="true">
      {children}
    </span>
  );
}
