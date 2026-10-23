import type { ReactNode } from 'react';
import { cn } from '../cn';
import './WindowHeader.css';

export type WindowHeaderProps = {
  title?: ReactNode;
  /** Figma: left-action (show-left-action) — обычно Button icon-only secondary S */
  leftAction?: ReactNode;
  /** Figma: right-action (show-right-action) */
  rightAction?: ReactNode;
  /** Figma: step-indicator (compact), виден только когда передан */
  stepIndicator?: ReactNode;
  className?: string;
};

export function WindowHeader({ title, leftAction, rightAction, stepIndicator, className }: WindowHeaderProps) {
  return (
    <header className={cn('at-window-header', className)}>
      <div className="at-window-header__row">
        <span className="at-window-header__slot">{leftAction}</span>
        <h2 className="at-window-header__title text-label-lg">{title}</h2>
        <span className="at-window-header__slot" data-side="right">{rightAction}</span>
      </div>
      {stepIndicator && <div className="at-window-header__steps">{stepIndicator}</div>}
    </header>
  );
}
