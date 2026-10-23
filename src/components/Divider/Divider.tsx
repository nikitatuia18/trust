import type { ReactNode } from 'react';
import { cn } from '../cn';
import './Divider.css';

export type DividerProps = {
  /** Figma-ось Orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Figma: label / show-label — только у horizontal */
  label?: ReactNode;
  className?: string;
};

export function Divider({ orientation = 'horizontal', label, className }: DividerProps) {
  const labeled = orientation === 'horizontal' && label;
  return (
    <div role="separator" aria-orientation={orientation} className={cn('at-divider', className)} data-orientation={orientation}>
      <span className="at-divider__line" />
      {labeled && <span className="at-divider__label text-body-sm">{label}</span>}
      {labeled && <span className="at-divider__line" />}
    </div>
  );
}
