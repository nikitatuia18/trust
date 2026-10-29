import { useRef, type KeyboardEvent, type ReactNode } from 'react';
import { cn } from '../cn';
import './SegmentedControl.css';

export type SegmentedOption<T extends string> = { value: T; label: ReactNode };

export type SegmentedControlProps<T extends string> = {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Figma-ось Size сегмента: s — шапка сайта и формы, m — крупные вкладки внутри карточки */
  size?: 's' | 'm';
  'aria-label'?: string;
  className?: string;
};

export function SegmentedControl<T extends string>({ options, value, onChange, size = 's', className, ...rest }: SegmentedControlProps<T>) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  // Стрелки переключают сегмент (паттерн tablist)
  const onKey = (e: KeyboardEvent, i: number) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (i + d + options.length) % options.length;
    onChange(options[next].value);
    refs.current[next]?.focus();
  };

  return (
    <div className={cn('at-segmented', className)} role="tablist" aria-label={rest['aria-label']} data-size={size}>
      {options.map((o, i) => {
        const selected = o.value === value;
        return (
          <button
            key={o.value}
            ref={(el) => { refs.current[i] = el; }}
            type="button"
            role="tab"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            className={cn('at-segmented__item', size === 'm' ? 'text-label-md' : 'text-label-sm')}
            data-selected={selected || undefined}
            onClick={() => onChange(o.value)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
