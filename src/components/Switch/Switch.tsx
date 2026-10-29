import type { InputHTMLAttributes } from 'react';
import { cn } from '../cn';
import './Switch.css';

export type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'role' | 'children'>;

/** Переключатель вкл/выкл (Figma-ось Checked = checked). Нативный input спрятан, состояние читает CSS; подпись — aria-label. */
export function Switch({ className, ...input }: SwitchProps) {
  return (
    <label className={cn('at-switch', className)} data-disabled={input.disabled || undefined}>
      <input {...input} type="checkbox" role="switch" className="at-switch__input" />
      <span className="at-switch__track" aria-hidden="true">
        <span className="at-switch__ball-container">
          <span className="at-switch__ball" />
        </span>
      </span>
    </label>
  );
}
