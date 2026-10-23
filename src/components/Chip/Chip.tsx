import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../cn';
import './Chip.css';

export type ChipProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  /** Figma-ось Style */
  variant?: 'brand' | 'neutral';
  /** Figma-ось Size */
  size?: 's' | 'l';
  /** Figma-ось Selected (aria-pressed) */
  selected?: boolean;
  /** Figma: label */
  children: ReactNode;
  /** Figma: icon-left / show-icon-left */
  iconLeft?: ReactNode;
  /** Figma Content=with-slots: слоты вокруг подписи (токены Chip/M/*) */
  leadingSlot?: ReactNode;
  trailingSlot?: ReactNode;
};

export function Chip({
  variant = 'brand',
  size = 's',
  selected = false,
  iconLeft,
  leadingSlot,
  trailingSlot,
  className,
  children,
  type = 'button',
  ...rest
}: ChipProps) {
  const slots = Boolean(leadingSlot || trailingSlot);
  return (
    <button
      {...rest}
      type={type}
      aria-pressed={selected}
      className={cn('at-chip', className)}
      data-variant={variant}
      data-size={size}
      data-selected={selected || undefined}
      data-content={slots ? 'slots' : undefined}
    >
      {slots ? (
        <>
          {leadingSlot && <span className="at-chip__slot">{leadingSlot}</span>}
          <span className="at-chip__text"><span className={cn('at-chip__label', size === 'l' ? 'text-label-md' : 'text-caption-default')}>{children}</span></span>
          {trailingSlot && <span className="at-chip__slot">{trailingSlot}</span>}
        </>
      ) : (
        <>
          {iconLeft && <span className="at-chip__icon">{iconLeft}</span>}
          <span className="at-chip__text"><span className={cn('at-chip__label', size === 'l' ? 'text-label-md' : 'text-caption-default')}>{children}</span></span>
        </>
      )}
    </button>
  );
}
