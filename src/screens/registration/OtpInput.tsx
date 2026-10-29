import { useRef, type ClipboardEvent, type KeyboardEvent } from 'react';
import { TextField } from '../../components';

type OtpInputProps = {
  /** Введённые цифры, без пробелов */
  value: string;
  onChange: (value: string) => void;
  length?: number;
  label?: string;
};

/** Код из письма: по одной цифре в ячейке (TextField), фокус сам идёт дальше, поддерживается вставка целиком. */
export function OtpInput({ value, onChange, length = 4, label = 'Verification code' }: OtpInputProps) {
  const root = useRef<HTMLDivElement>(null);
  // TextField не отдаёт ref на input — ячейки берём из контейнера
  const focusCell = (i: number) => root.current?.querySelectorAll('input')[Math.max(0, Math.min(length - 1, i))]?.focus();

  const setDigit = (i: number, raw: string) => {
    const digits = raw.replace(/\D/g, '');
    const next = value.padEnd(length, ' ').split('');
    if (!digits) next[i] = ' ';
    else digits.split('').slice(0, length - i).forEach((d, k) => { next[i + k] = d; });
    onChange(next.join('').replace(/ +$/, ''));
    if (digits) focusCell(i + digits.length);
  };

  const onKeyDown = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[i]?.trim()) { e.preventDefault(); focusCell(i - 1); }
    if (e.key === 'ArrowLeft') focusCell(i - 1);
    if (e.key === 'ArrowRight') focusCell(i + 1);
  };

  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const digits = e.clipboardData.getData('text').replace(/\D/g, '');
    if (!digits) return;
    e.preventDefault();
    onChange(digits.slice(0, length));
    focusCell(digits.length);
  };

  return (
    <div ref={root} className="scr-otp" role="group" aria-label={label}>
      {Array.from({ length }, (_, i) => (
        <TextField
          key={i}
          className="scr-otp__cell"
          placeholder="-"
          inputMode="numeric"
          autoComplete={i === 0 ? 'one-time-code' : 'off'}
          aria-label={`${label}, digit ${i + 1} of ${length}`}
          value={value[i]?.trim() ?? ''}
          maxLength={length}
          onChange={(e) => setDigit(i, e.target.value)}
          onKeyDown={(e) => onKeyDown(i, e)}
          onPaste={onPaste}
          onFocus={(e) => e.currentTarget.select()}
        />
      ))}
    </div>
  );
}
