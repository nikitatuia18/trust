import type { ReactNode } from 'react';
import { cn } from '../cn';
import './List.css';

export type ListProps = {
  /** Figma-ось Style */
  variant?: 'card' | 'list';
  /** Figma: слот items — элементы List Item */
  children: ReactNode;
  className?: string;
};

export function List({ variant = 'card', children, className }: ListProps) {
  return (
    <div role="list" className={cn('at-list', className)} data-variant={variant}>
      {children}
    </div>
  );
}
