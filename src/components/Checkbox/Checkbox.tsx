import type { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '../cn';
import './Checkbox.css';

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'children'> & {
  /** Figma: label / show-label. Нет значения — подпись скрыта */
  label?: ReactNode;
};

/** Круглый чекбокс (квадратного в системе нет — решение владельца). Нативный input спрятан, состояние читает CSS. */
export function Checkbox({ label, className, ...input }: CheckboxProps) {
  return (
    <label className={cn('at-checkbox', className)} data-disabled={input.disabled || undefined}>
      <input {...input} type="checkbox" className="at-checkbox__input" />
      <span className="at-checkbox__box" aria-hidden="true">
        <svg className="at-checkbox__tick" viewBox="0 0 16 16" fill="none">
          <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {label && <span className="at-checkbox__label text-body-xs">{label}</span>}
    </label>
  );
}
