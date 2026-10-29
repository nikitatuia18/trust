import type { ReactNode } from 'react';
import { cn } from '../cn';
import './LogoWithBadge.css';

export type LogoWithBadgeProps = {
  /** Figma-ось Size: s | m | l = Asset Logo/S|M|L/size (20 | 24 | 32) */
  size?: 's' | 'm' | 'l';
  /** Figma: INSTANCE_SWAP main — монета, валюта, банк */
  main: ReactNode;
  /** Figma: INSTANCE_SWAP badge; show-badge = badge передан */
  badge?: ReactNode;
  className?: string;
};

export function LogoWithBadge({ size = 'm', main, badge, className }: LogoWithBadgeProps) {
  return (
    <span className={cn('at-logo', className)} data-size={size}>
      <span className="at-logo__main">{main}</span>
      {badge && <span className="at-logo__badge">{badge}</span>}
    </span>
  );
}
