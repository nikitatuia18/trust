import type { ReactNode } from 'react';
import { cn } from '../cn';
import './Badge.css';

export type BadgeProps = {
  /** Смысл статуса: success — выполнено (зелёный), warning — в процессе (оранжевый), error — отказ (красный), brand — акцент, neutral — без оценки */
  variant?: 'success' | 'warning' | 'error' | 'brand' | 'neutral';
  children: ReactNode;
  className?: string;
};

/** Плашка статуса: pill с короткой подписью. Не интерактивна (кликабельная — Chip). */
export function Badge({ variant = 'success', children, className }: BadgeProps) {
  return (
    <span className={cn('at-badge text-label-sm', className)} data-variant={variant}>
      {children}
    </span>
  );
}
