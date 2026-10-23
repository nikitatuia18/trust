import { useId, useRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../cn';
import { Button } from '../Button/Button';
import { MinusIcon, PlusIcon } from '../Icon/Glyphs';
import './TextField.css';

export type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> & {
  /** Figma-ось Type. stepper — число с кнопками −/+ по краям */
  type?: 'text' | 'stepper';
  /** Figma-ось Validation */
  validation?: 'none' | 'error' | 'success';
  /** Figma: label / show-label */
  label?: ReactNode;
  /** Figma: description / show-description */
  description?: ReactNode;
  /** Figma: hint / show-hint */
  hint?: ReactNode;
  /** Слот слева (Figma: left-slot). У stepper занят кнопкой «−» */
  leftSlot?: ReactNode;
  /** Слот справа (Figma: right-slot). У stepper занят кнопкой «+» */
  rightSlot?: ReactNode;
};

export function TextField({
  type = 'text',
  validation = 'none',
  label,
  description,
  hint,
  leftSlot,
  rightSlot,
  className,
  id,
  disabled,
  ...input
}: TextFieldProps) {
  const auto = useId();
  const inputId = id ?? auto;
  const ref = useRef<HTMLInputElement>(null);
  const stepper = type === 'stepper';

  // Шаг через нативный stepUp/stepDown + input-событие, чтобы сработал onChange
  const step = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    if (dir === 1) el.stepUp(); else el.stepDown();
    el.dispatchEvent(new Event('input', { bubbles: true }));
  };

  return (
    <div className={cn('at-textfield', className)} data-validation={validation} data-type={type} data-disabled={disabled || undefined}>
      {label && <label className="at-textfield__label text-label-sm" htmlFor={inputId}>{label}</label>}
      {description && <p className="at-textfield__description text-body-xs">{description}</p>}
      <div className="at-textfield__shell">
        {stepper ? (
          <Button variant="secondary" size="s" iconOnly iconLeft={<MinusIcon />} aria-label="Decrease" disabled={disabled} onClick={() => step(-1)} className="at-textfield__step" />
        ) : (
          leftSlot && <span className="at-textfield__slot">{leftSlot}</span>
        )}
        <span className="at-textfield__field">
          <input
            {...input}
            ref={ref}
            id={inputId}
            disabled={disabled}
            type={stepper ? 'number' : 'text'}
            className="at-textfield__input text-body-sm"
            aria-invalid={validation === 'error' || undefined}
          />
        </span>
        {stepper ? (
          <Button variant="secondary" size="s" iconOnly iconLeft={<PlusIcon />} aria-label="Increase" disabled={disabled} onClick={() => step(1)} className="at-textfield__step" />
        ) : (
          rightSlot && <span className="at-textfield__slot">{rightSlot}</span>
        )}
      </div>
      {hint && <p className="at-textfield__hint text-body-xs">{hint}</p>}
    </div>
  );
}
