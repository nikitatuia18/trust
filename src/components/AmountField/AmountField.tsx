import type { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '../cn';
import './AmountField.css';

export type AmountFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> & {
  /** Figma-ось State=error (default и focus определяются по фокусу ввода) */
  error?: boolean;
  /** Figma: label / show-label (label/sm-caps) */
  label?: ReactNode;
  /** Селектор валюты — экспонированный Button (secondary, s, compact). Figma: selector */
  selector?: ReactNode;
  /** Слот над подписью (Figma: top-slot / show-top-slot) */
  topSlot?: ReactNode;
  /** Слот под суммой (Figma: bottom-slot): например Min-chip */
  bottomSlot?: ReactNode;
  /** Вторичная сумма/подсказка справа в нижнем слоте */
  hint?: ReactNode;
};

export function AmountField({ error, label, selector, topSlot, bottomSlot, hint, className, ...input }: AmountFieldProps) {
  return (
    <div className={cn('at-amount', className)} data-error={error || undefined}>
      {topSlot && <div className="at-amount__top">{topSlot}</div>}
      {label && <span className="at-amount__label text-label-sm-caps">{label}</span>}
      <div className="at-amount__row">
        {selector && <div className="at-amount__selector">{selector}</div>}
        <input
          {...input}
          className="at-amount__value text-heading-h2"
          inputMode="decimal"
          aria-invalid={error || undefined}
          aria-label={input['aria-label'] ?? (typeof label === 'string' ? label : undefined)}
        />
      </div>
      {(bottomSlot || hint) && (
        <div className="at-amount__bottom">
          {bottomSlot}
          {hint && <span className="at-amount__hint text-label-sm">{hint}</span>}
        </div>
      )}
    </div>
  );
}
