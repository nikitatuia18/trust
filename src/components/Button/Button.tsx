import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../cn';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'destructive' | 'link';

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  /** Figma-ось Style */
  variant?: ButtonVariant;
  /** Figma-ось Size */
  size?: 'm' | 's';
  /** Figma-ось Density. compact — уменьшенные боковые отступы (селекторы, фильтры) */
  density?: 'default' | 'compact';
  /** Подпись (Figma: label / show-label) */
  children?: ReactNode;
  /** Слот иконки слева (Figma: icon-left / show-icon-left). Нет значения — слой скрыт */
  iconLeft?: ReactNode;
  /** Слот иконки справа (Figma: icon-right / show-icon-right) */
  iconRight?: ReactNode;
  /** Figma-ось Content=icon-only: квадрат с одной иконкой (iconLeft), подпись — aria-label */
  iconOnly?: boolean;
};

export function Button({
  variant = 'primary',
  size = 'm',
  density = 'default',
  iconLeft,
  iconRight,
  iconOnly = false,
  children,
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      className={cn('at-button', className)}
      data-variant={variant}
      data-size={size}
      data-density={density}
      data-icon-only={iconOnly || undefined}
    >
      {iconLeft && <span className="at-button__icon" aria-hidden="true">{iconLeft}</span>}
      {!iconOnly && children != null && (
        <span className="at-button__text">
          <span className="at-button__label text-label-md">{children}</span>
        </span>
      )}
      {!iconOnly && iconRight && <span className="at-button__icon" aria-hidden="true">{iconRight}</span>}
    </button>
  );
}
